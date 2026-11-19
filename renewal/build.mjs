import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
const out = process.env.BUILD_OUTPUT || 'dist';
const release = process.env.SITE_RELEASE === '1' || process.env.VERCEL_ENV === 'production';
const origin='https://www.hwoasung.com';
const pages={
 'index.html': ['/', '화성섬유 | 원단 제조·공급', '경기도 연천에서 원단을 직접 편직하고 공급하는 화성섬유. 폴라폴리스, 인타록, 싱글 원단과 생산·공급 방식을 소개합니다.', 'en-index.html'],
 'company.html': ['/company.html','회사 소개 | 화성섬유','1996년부터 이어온 화성섬유의 원단과 편직 현장, 회사의 방향과 공장 위치를 소개합니다.','en-company.html'],
 'fabrics.html': ['/fabrics.html','원단 | 화성섬유','화성섬유가 만들고 공급하는 폴라폴리스, 인타록, T/R 싱글, DTY 싱글과 보드레를 살펴보세요.','en-fabrics.html'],
 'production.html': ['/production.html','생산과 공급 | 화성섬유','원사 매입과 직접 편직, 생지와 원단 준비부터 문의와 출고까지 화성섬유의 생산·공급 방식을 소개합니다.','en-production.html'],
 'en-index.html': ['/en-index.html','Hwoasung Textile | Knitted Fabrics','Hwoasung Textile knits and supplies fabrics in Yeoncheon, South Korea. Explore our fabrics and production approach.','index.html'],
 'en-company.html': ['/en-company.html','About | Hwoasung Textile','Learn about Hwoasung Textile, our knitting experience since 1996 and our factory in Yeoncheon.','company.html'],
 'en-fabrics.html': ['/en-fabrics.html','Fabrics | Hwoasung Textile','Explore polar fleece, interlock, T/R single, DTY single and Bodre fabrics from Hwoasung Textile.','fabrics.html'],
 'en-production.html': ['/en-production.html','Production & Supply | Hwoasung Textile','Discover our approach to yarn sourcing, in-house knitting and fabric supply.','production.html']
};
await rm(out, {recursive:true, force:true});await mkdir(out,{recursive:true});
for(const name of await readdir('.')) if(name==='assets'||/\.(html|css|js)$/.test(name)) await cp(name,join(out,name),{recursive:true});
if(release){
 for(const name of (await readdir(out)).filter(x=>x.endsWith('.html'))){
  let html=await readFile(join(out,name),'utf8');
  html=html.replace(/<div class="preview-note">[\s\S]*?<\/div>/,'').replace(/<title>(.*?)<\/title>/s,(_,t)=>`<title>${pages[name]?pages[name][1]:name==='inquiry.html'?'원단 생산·공급 문의 | 화성섬유':t.replace(' 시안','')}</title>`);
  if(pages[name]){
   const [path,title,description,other]=pages[name],english=name.startsWith('en-');
   const otherPath=other==='index.html'?'/':'/'+other;
   html=html.replace(/<meta content="noindex,nofollow" name="robots"\s*\/>/,'');
   const tags=`<meta name="description" content="${description}"><link rel="canonical" href="${origin}${path}"><link rel="alternate" hreflang="${english?'en':'ko'}" href="${origin}${path}"><link rel="alternate" hreflang="${english?'ko':'en'}" href="${origin}${otherPath}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${origin}${path}"><meta property="og:image" content="${origin}/assets/hero-ending.png">`;
   html=html.replace('</head>',tags+'</head>');
  }
  if(name==='index.html'||name==='en-index.html') html=html.replace('</head>','<link href="release.css" rel="stylesheet"></head>');
  html=html.replace('원단 이미지는 시안용 참고 이미지입니다.','원단 이미지는 이해를 돕기 위한 참고 이미지입니다.');
  await writeFile(join(out,name),html);
 }
 await writeFile(join(out,'release.css'),'.header{top:0}@media(max-width:800px){.header{top:0}body.palette-a .mobile-nav:not([hidden]){top:70px}}\n');
 await writeFile(join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
 const urls=Object.values(pages).map(([path])=>`  <url><loc>${origin}${path}</loc></url>`).join('\n');
 await writeFile(join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}else await writeFile(join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
console.log(`${release?'Release':'Preview'} build prepared in ${out}.`);
