const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-menu');
function setMenu(open){menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기')}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){setMenu(false);toggle.focus()}});

const journey=document.querySelector('.journey');
if(journey){if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){journey.classList.add('is-visible');observer.disconnect()}},{threshold:.18});observer.observe(journey)}else{journey.classList.add('is-visible')}}
