const fabricInfo={'폴라폴리스':['polar','기모 표면을 가진 편직 원단입니다.'],'인타록':['interlock','양면 편직 조직으로 만든 원단입니다.'],'T/R 싱글':['tr','폴리에스터와 레이온을 사용하는 싱글 원단입니다.'],'DTY 싱글':['dty','DTY 원사를 활용한 싱글 원단입니다.'],'보드레':['bodre','FDY 계열 원사를 사용하는 편직 원단입니다.']};
const toggle=document.querySelector('.menu-toggle');const menu=document.querySelector('#mobile-menu');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'메뉴 열기':'메뉴 닫기');menu.hidden=open});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','메뉴 열기')}));const selected=document.querySelector('#selected-fabric');const email=document.querySelector('#email-link');document.querySelectorAll('.fabric-item').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.fabric-item').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-pressed','false')});button.classList.add('active');button.setAttribute('aria-pressed','true');selected.textContent=button.dataset.fabric;document.querySelector('#mobile-fabric-description').textContent=fabricInfo[button.dataset.fabric][1];document.querySelector('#fabric-contact').href='fabrics.html#fabric-'+fabricInfo[button.dataset.fabric][0];document.querySelector('#fabric-selection').hidden=false}));

const intro=document.querySelector('.hero-video');
// 모바일에서는 세로 화면에 맞춰 별도로 편집한 영상을 사용합니다.
if (window.matchMedia('(max-width: 800px)').matches) intro.src='assets/mobile/hero-720.mp4';
const ending=document.querySelector('.hero-ending');
const control=document.querySelector('.hero-control');
const hero=document.querySelector('.hero');
const heroContent=document.querySelector('.hero-content');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let finished=false;
let transitionTimer;
let contentTimer;
function hideHeroContent(){
 clearTimeout(contentTimer);
 hero.classList.add('intro-playing');
 heroContent.setAttribute('inert','');
}
function revealHeroContent(){
 hero.classList.remove('intro-playing');
 heroContent.removeAttribute('inert');
}
function showEnding(immediate=false,keepPlaying=false){
 if(finished)return;finished=true;
 ending.classList.add('is-visible');
 control.dataset.state='replay';
 control.innerHTML='영상 다시 보기 <span aria-hidden="true">↺</span>';
 control.setAttribute('aria-label','인트로 영상 다시 보기');
 clearTimeout(transitionTimer);
 clearTimeout(contentTimer);
 if(immediate)revealHeroContent();
 else contentTimer=setTimeout(revealHeroContent,350);
 transitionTimer=setTimeout(()=>{if(!keepPlaying)intro.pause();intro.classList.remove('is-visible')},immediate?0:1050);
}
intro.addEventListener('playing',()=>{if(finished)return;intro.classList.add('is-visible');hideHeroContent()});
intro.addEventListener('timeupdate',()=>{if(!finished && Number.isFinite(intro.duration) && intro.currentTime>=intro.duration-0.8)showEnding(false,true)});
intro.addEventListener('ended',()=>showEnding());
intro.addEventListener('error',()=>showEnding(true));
control.addEventListener('click',()=>{
 if(!finished){showEnding();return;}
 clearTimeout(transitionTimer);clearTimeout(contentTimer);finished=false;intro.currentTime=0;control.dataset.state='skip';
 control.innerHTML='영상 건너뛰기 <span aria-hidden="true">→</span>';
 control.setAttribute('aria-label','인트로 영상 건너뛰기');
 intro.play().then(()=>ending.classList.remove('is-visible')).catch(()=>showEnding(true));
});
if(reduced.matches){showEnding(true)}else{intro.play().catch(()=>showEnding(true))}

document.querySelectorAll('.fabric-tile').forEach(tile=>tile.addEventListener('click',()=>{
 document.querySelectorAll('.fabric-tile').forEach(item=>item.setAttribute('aria-pressed','false'));
 tile.setAttribute('aria-pressed','true');
 document.querySelector('#shelf-selected').textContent=tile.dataset.fabric;
 document.querySelector('#shelf-description').textContent=fabricInfo[tile.dataset.fabric][1];
 document.querySelector('#shelf-detail').href='fabrics.html#fabric-'+fabricInfo[tile.dataset.fabric][0];
 document.querySelector('#shelf-status').hidden=false;
}));

// The first image stands on its own; transitions run only while the gallery is in view.
(()=>{
 const gallery=document.querySelector('.factory-gallery[data-autoplay]');if(!gallery)return;
 const slides=[...gallery.querySelectorAll('.factory-slide')],counter=gallery.querySelector('#factory-current'),announcement=gallery.querySelector('#factory-announcement'),pause=gallery.querySelector('.factory-pause');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let index=0,playing=!reduced.matches,inView=false,focus=false,timer;
 function updateButton(){pause.textContent=playing?'일시정지':'자동재생';pause.setAttribute('aria-label',playing?'사진 자동 전환 정지':'사진 자동 전환 시작')}
 function show(next,manual=false){index=(next+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('is-current',i===index);slide.setAttribute('aria-hidden',String(i!==index))});const slide=slides[index];counter.textContent=slide.dataset.number||String(index+1).padStart(2,'0');const caption=gallery.querySelector('#factory-caption');if(caption)caption.textContent=slide.dataset.caption||'';if(manual)announcement.textContent=`${slide.dataset.number||index+1} / 02: ${slide.dataset.caption||slide.querySelector('img').alt}`}
 function schedule(){clearTimeout(timer);if(playing&&inView&&!document.hidden&&!focus)timer=setTimeout(()=>{show(index+1);schedule()},5000)}
 gallery.querySelector('.factory-prev').addEventListener('click',()=>{playing=false;show(index-1,true);updateButton();schedule()});
 gallery.querySelector('.factory-next').addEventListener('click',()=>{playing=false;show(index+1,true);updateButton();schedule()});
 pause.addEventListener('click',()=>{playing=!playing;updateButton();schedule()});
 gallery.addEventListener('focusin',event=>{focus=event.target.matches(':focus-visible');schedule()});gallery.addEventListener('focusout',event=>{if(!gallery.contains(event.relatedTarget)){focus=false;schedule()}});
 document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>{if(reduced.matches){playing=false;updateButton();schedule()}});
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule()},{threshold:.25}).observe(gallery)}else{inView=true}
 updateButton();schedule();
})();

// Load the pinned article and the latest two posts with their own images.
(()=>{
 const cards=[...document.querySelectorAll('.journal-recent')];if(cards.length!==2)return;
 function setImage(card,raw){
  const img=card.querySelector('.journal-v28-image img'),frame=card.querySelector('.journal-v28-image');if(!img||!frame)return;
  let valid=false;try{const u=new URL(raw);valid=u.protocol==='https:'&&u.hostname==='postfiles.pstatic.net'&&!u.username}catch(_){}
  if(!valid){img.hidden=true;img.removeAttribute('src');frame.classList.add('is-empty');return}
  img.hidden=false;frame.classList.remove('is-empty');if(img.src!==raw)img.src=raw;
 }
 document.querySelectorAll('.journal-v28-image img').forEach(img=>{
  img.addEventListener('error',()=>{img.hidden=true;img.parentElement.classList.add('is-empty')});
  img.addEventListener('load',()=>{img.hidden=false;img.parentElement.classList.remove('is-empty')});
  if(img.complete&&img.naturalWidth===0){img.hidden=true;img.parentElement.classList.add('is-empty')}
 });
 (async()=>{try{
  const response=await fetch('/api/blog-latest',{signal:AbortSignal.timeout(25000),cache:'no-store'});if(!response.ok)throw new Error('feed unavailable');
  const data=await response.json();if(!Array.isArray(data.posts)||data.posts.length<2)throw new Error('not enough posts');
  const posts=data.posts.slice(0,2).map(post=>{const u=new URL(post.url);if(u.protocol!=='https:'||u.hostname!=='blog.naver.com'||!u.pathname.startsWith('/hwoasung_story/')||typeof post.title!=='string'||!post.title.trim())throw new Error('invalid post');return {...post,url:u.href}});
  posts.forEach((post,i)=>{cards[i].href=post.url;cards[i].querySelector('h3').textContent=post.title;setImage(cards[i],post.image)});
  if(data.featured_image)setImage(document.querySelector('.journal-featured'),data.featured_image);
 }catch(_){}})();
})();

// Subtle one-time scroll entrance; content remains available without JavaScript.
(()=>{
 if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const targets=[...document.querySelectorAll('[data-rhythm-reveal]')];
 if (!targets.length) return;
 document.documentElement.classList.add('rhythm-motion');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target)}
 }),{threshold:.1});
 targets.forEach(target=>observer.observe(target));
})();
