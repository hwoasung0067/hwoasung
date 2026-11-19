(() => {
  const id = 'G-9NS8FC41WC';
  const preferenceKey = 'hwoasung-analytics-v1';
  const disableKey = 'ga-disable-' + id;
  const english = document.documentElement.lang === 'en'
    || new URLSearchParams(location.search).get('lang') === 'en';
  const messages = english ? {
    title: 'Website analytics',
    description: 'Allow Google Analytics to measure visits and improve this website?',
    privacy: 'Privacy policy', allow: 'Allow', decline: 'Decline', settings: 'Analytics settings'
  } : {
    title: '방문 통계',
    description: '홈페이지 개선을 위해 Google Analytics 방문 통계 수집을 허용하시겠어요?',
    privacy: '개인정보 처리방침', allow: '허용', decline: '거부', settings: '통계 수집 설정'
  };

  let enabled = false;
  let started = false;
  let timer;
  let submitted = false;
  let currentSection;
  let lastSample = 0;
  const sections = [...document.querySelectorAll('[data-analytics-section]')];
  const sectionTotals = new Map();
  const reachedSections = new Set();
  const scrollLevels = new Set();
  const stats = document.createElement('aside');
  stats.className = 'analytics-preferences';
  stats.setAttribute('aria-label', messages.title);
  stats.hidden = true;

  const description = document.createElement('p');
  description.textContent = messages.description;
  const privacy = document.createElement('a');
  privacy.href = 'privacy.html';
  privacy.textContent = messages.privacy;
  description.append(' ', privacy);
  stats.append(description);
  const actions = document.createElement('div');
  actions.className = 'analytics-actions';
  function button(label, action) {
    const control = document.createElement('button');
    control.type = 'button';
    control.textContent = label;
    control.addEventListener('click', action);
    return control;
  }
  const decline = button(messages.decline, () => choose(false));
  const allow = button(messages.allow, () => choose(true));
  actions.append(decline, allow);
  stats.append(actions);
  document.body.append(stats);

  const settings = button(messages.settings, () => {
    stats.hidden = false;
    decline.focus();
  });
  settings.className = 'analytics-settings';
  const footer = document.querySelector('footer');
  if (footer) footer.append(settings);

  function preference() {
    try {
      const saved = JSON.parse(localStorage.getItem(preferenceKey));
      if (saved?.expires > Date.now()) return saved.allowed === true;
    } catch {}
    return null;
  }

  function choose(allowed) {
    try {
      localStorage.setItem(preferenceKey, JSON.stringify({
        allowed, expires: Date.now() + 180 * 86400000
      }));
    } catch {}
    stats.hidden = true;
    applyPreference(allowed);
    settings.focus({ preventScroll: true });
  }

  function applyPreference(allowed) {
    if (allowed && !enabled) {
      enabled = true;
      window[disableKey] = false;
      startGoogleTag();
      lastSample = performance.now();
      sample();
      timer = setInterval(sample, 1000);
    }
    if (!allowed && enabled) {
      enabled = false;
      window[disableKey] = true;
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
      clearInterval(timer);
      currentSection = undefined;
      sectionTotals.clear();
      for (const entry of document.cookie.split(';')) {
        const key = entry.trim().split('=')[0];
        if (!/^_ga(?:_|$)/.test(key)) continue;
        document.cookie = key + '=; Max-Age=0; Path=/';
        document.cookie = key + '=; Max-Age=0; Path=/; Domain=hwoasung.com';
      }
    }
  }

  function startGoogleTag() {
    if (started) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    const tag = window.gtag;
    const denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
    tag('consent', 'default', { ...denied, analytics_storage: 'denied' });
    tag('consent', 'update', { ...denied, analytics_storage: 'granted' });
    tag('js', new Date());

    const cleanLocation = new URL(location.pathname === '/index.html' ? '/' : location.pathname, location.origin);
    const params = new URLSearchParams(location.search);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
      const value = params.get(key);
      if (value && /^[a-z][a-z0-9_.-]{0,49}$/i.test(value)) cleanLocation.searchParams.set(key, value);
    }
    let referrer = '';
    try {
      const previous = new URL(document.referrer);
      referrer = previous.origin === location.origin ? previous.origin + previous.pathname : previous.origin;
    } catch {}
    tag('set', { page_location: cleanLocation.href, page_referrer: referrer });
    tag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 180 * 86400
    });
    if (!['www.hwoasung.com', 'hwoasung.com'].includes(location.hostname)) return;
    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }

  function send(event, parameters = {}) {
    if (enabled) window.gtag('event', event, { ...parameters, send_to: id });
  }

  function mostVisibleSection() {
    if (document.querySelector('.fabric-dialog[open]')) return undefined;
    let largestOverlap = 0;
    let visible;
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const overlap = Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0);
      if (overlap <= largestOverlap || overlap < Math.min(rect.height, innerHeight) * 0.3) continue;
      largestOverlap = overlap;
      visible = section.dataset.analyticsSection;
    }
    return visible;
  }

  function flush(section) {
    const ms = sectionTotals.get(section) || 0;
    const seconds = Math.floor(ms / 1000);
    if (!seconds || !reachedSections.has(section)) return;
    send('section_engagement', { content_section: section, visible_seconds: seconds });
    sectionTotals.set(section, ms - seconds * 1000);
  }

  function sample(stop = false) {
    if (!enabled) return;
    const now = performance.now();
    if (currentSection) {
      const total = (sectionTotals.get(currentSection) || 0) + Math.min(now - lastSample, 2000);
      sectionTotals.set(currentSection, total);
      if (total >= 1000 && !reachedSections.has(currentSection)) {
        reachedSections.add(currentSection);
        send('section_view', { content_section: currentSection });
      }
      if (total >= 15000) flush(currentSection);
    }

    lastSample = now;
    const visible = !stop && !document.hidden;
    const next = visible ? mostVisibleSection() : undefined;
    if (currentSection !== next) flush(currentSection);
    currentSection = next;
    if (!visible) return;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    if (maxScroll <= 0) return;
    for (const level of [25, 50, 75, 90]) {
      if (scrollY / maxScroll * 100 >= level && !scrollLevels.has(level)) {
        scrollLevels.add(level);
        send('scroll_depth', { scroll_percent: level });
      }
    }
  }

  document.addEventListener('visibilitychange', () => sample(document.hidden));
  window.addEventListener('pagehide', () => sample(true));
  window.addEventListener('pageshow', () => sample());
  document.addEventListener('click', event => {
    if (!enabled || !(event.target instanceof Element)) return;
    const target = event.target.closest('a[href], [data-analytics-fabric]');
    if (!target) return;
    const fabric = target.dataset.analyticsFabric || target.dataset.fabric;
    if (['polar', 'interlock', 'tr', 'dty', 'bodre'].includes(fabric)) {
      send('fabric_select', { fabric_type: fabric });
    }
    if (!(target instanceof HTMLAnchorElement)) return;
    const section = target.closest('[data-analytics-section]')?.dataset.analyticsSection || 'navigation';
    if (target.protocol === 'tel:') send('phone_click', { content_section: section });
    if (target.origin === location.origin && (target.pathname.endsWith('/inquiry.html') || target.hash === '#contact')) {
      send('inquiry_click', { content_section: section });
    }
  }, true);

  const form = document.querySelector('#tally-inquiry');
  if (form) window.addEventListener('message', event => {
    if (submitted || !enabled || event.origin !== 'https://tally.so' || event.source !== form.contentWindow) return;
    let message;
    try { message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch { return; }
    if (message?.event !== 'Tally.FormSubmitted' || message.payload?.formId !== 'aOeOxq') return;
    submitted = true;
    send('generate_lead', { method: 'tally_embed' });
  });

  window.addEventListener('storage', event => {
    if (event.key !== preferenceKey) return;
    const saved = preference();
    stats.hidden = saved !== null;
    applyPreference(saved === true);
  });
  const saved = preference();
  stats.hidden = saved !== null;
  applyPreference(saved === true);
})();
