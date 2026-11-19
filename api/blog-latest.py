#!/usr/bin/env python3
"""Local-only preview: read the owner's public RSS and linked article image metadata."""
import email.utils
import json
import re
import threading
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from http.server import BaseHTTPRequestHandler
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent
FEED = 'https://rss.blog.naver.com/hwoasung_story.xml'
FEATURED = '224439014607'
CACHE_TTL = 900
cache = {'time': 0.0, 'result': None}
lock = threading.Lock()

class ArticleImages(HTMLParser):
    def __init__(self):
        super().__init__()
        self.images = []
    def handle_starttag(self, tag, attrs):
        if tag != 'img':
            return
        attributes = dict(attrs)
        if 'se-image-resource' not in attributes.get('class', ''):
            return
        try:
            width = int(attributes.get('data-width', '0'))
            height = int(attributes.get('data-height', '0'))
        except (TypeError, ValueError):
            return
        if width < 300 or height < 200:
            return
        raw = attributes.get('data-lazy-src') or attributes.get('src') or ''
        parsed = urllib.parse.urlsplit(raw)
        if parsed.scheme == 'https' and parsed.hostname == 'postfiles.pstatic.net' and not parsed.username and len(raw) < 3000:
            self.images.append(raw)

def article_image(post_id):
    if not re.fullmatch(r'\d{8,20}', post_id):
        return None
    params = urllib.parse.urlencode({'blogId': 'hwoasung_story', 'logNo': post_id})
    request = urllib.request.Request('https://blog.naver.com/PostView.naver?' + params, headers={'User-Agent': 'Mozilla/5.0 HwoasungDesignPreview/1.0'})
    try:
        with urllib.request.urlopen(request, timeout=3) as response:
            source = response.read(2 * 1024 * 1024 + 1)
        if len(source) > 2 * 1024 * 1024:
            return None
        parser = ArticleImages()
        parser.feed(source.decode('utf-8', 'replace'))
        # The first image is commonly a title card; prefer a later body image.
        candidates = parser.images[1:] if len(parser.images) > 1 else parser.images
        # Do not repeat the recurring company panorama as unrelated article art.
        meaningful = [u for u in candidates if '회사전경' not in urllib.parse.unquote(u)]
        return (meaningful or candidates or [None])[0]
    except Exception:
        return None

def get_posts():
    with lock:
        if cache['result'] is not None and time.monotonic() - cache['time'] < CACHE_TTL:
            return cache['result']
        request = urllib.request.Request(FEED, headers={'User-Agent': 'HwoasungDesignPreview/1.0'})
        with urllib.request.urlopen(request, timeout=4) as response:
            data = response.read(1024 * 1024 + 1)
        if len(data) > 1024 * 1024:
            raise ValueError('feed too large')
        root = ET.fromstring(data)
        entries = []
        for item in root.findall('./channel/item'):
            title = (item.findtext('title') or '').strip()
            raw_url = (item.findtext('guid') or item.findtext('link') or '').strip()
            url = urllib.parse.urlsplit(raw_url)
            if url.scheme != 'https' or url.hostname != 'blog.naver.com' or not url.path.startswith('/hwoasung_story/') or not title:
                continue
            post_id = url.path.rstrip('/').split('/')[-1]
            if not re.fullmatch(r'\d{8,20}', post_id) or post_id == FEATURED:
                continue
            date = email.utils.parsedate_to_datetime(item.findtext('pubDate') or '')
            entries.append({'id': post_id, 'title': title[:250], 'url': urllib.parse.urlunsplit(('https', 'blog.naver.com', url.path, '', '')), 'date': date.date().isoformat(), '_sort': date.timestamp()})
        entries.sort(key=lambda x: x['_sort'], reverse=True)
        if len(entries) < 2:
            raise ValueError('feed does not contain two articles')
        with ThreadPoolExecutor(max_workers=3) as executor:
            images = list(executor.map(article_image, [entries[0]['id'], entries[1]['id'], FEATURED]))
        posts = [{'title': post['title'], 'url': post['url'], 'date': post['date'], 'image': images[i]} for i, post in enumerate(entries[:2])]
        result = {'posts': posts, 'featured_image': images[2]}
        cache.update(time=time.monotonic(), result=result)
        return result

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            data = json.dumps(get_posts(), ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600')
        except Exception:
            data = b'{"error":"feed_unavailable"}'
            self.send_response(503)
            self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)
