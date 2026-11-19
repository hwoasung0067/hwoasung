(()=>{
 const box=document.querySelector('[data-production-gallery]');if(!box)return;
 const slides=[...box.querySelectorAll('.v9-slide')],buttons=[...box.querySelectorAll('.v9-strength')],label=box.querySelector('.v9-gallery-label');
 const titles=['01 / 원사 매입','02 / 직접 편직','03 / 생지와 원단'],reduced=matchMedia('(prefers-reduced-motion: reduce)'),duration=7000;
 let index=0,elapsed=0,last=0,inView=false,focused=false,hovered=false;
 function select(n){index=n;elapsed=0;buttons.forEach((b,i)=>{b.classList.toggle('is-active',i===n);b.setAttribute('aria-pressed',String(i===n));b.style.setProperty('--motion-progress','0');b.toggleAttribute('data-motion-progress',i===n)});slides.forEach((s,i)=>{s.classList.toggle('is-active',i===n);s.setAttribute('aria-hidden',String(i!==n))});label.textContent=titles[n]}
 function tick(now){const running=inView&&!document.hidden&&!focused&&!hovered&&!reduced.matches;if(running&&last)elapsed+=Math.min(now-last,100);last=now;if(elapsed>=duration)select((index+1)%slides.length);buttons[index].style.setProperty('--motion-progress',String(Math.min(elapsed/duration,1)));requestAnimationFrame(tick)}
 buttons.forEach((b,i)=>b.addEventListener('click',()=>select(i)));
 box.addEventListener('focusin',()=>{focused=true});box.addEventListener('focusout',e=>{if(!box.contains(e.relatedTarget))focused=false});
 box.addEventListener('mouseenter',()=>{hovered=true});box.addEventListener('mouseleave',()=>{hovered=false});
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting},{threshold:.25}).observe(box);else inView=true;
 select(0);requestAnimationFrame(tick);
})();