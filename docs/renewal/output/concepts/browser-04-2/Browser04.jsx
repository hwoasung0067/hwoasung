import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown, Menu, X, Plus, Minus } from 'lucide-react'
import factory from '../../assets/knitting_unit.jpg'
import './browser04.css'
import './detail.css'
import './gateway.css'

const materials = [
  { id:'01', name:'폴라폴리스', en:'POLAR FLEECE', type:'fleece', desc:'표면의 감촉부터 가공 조건까지.', text:'필요한 중량과 폭, 색상과 가공 조건을 기준으로 공급 가능한 원단을 확인합니다.' },
  { id:'02', name:'인타록', en:'INTERLOCK', type:'interlock', desc:'원단의 조직에서 시작하는 선택.', text:'사용 목적과 중량, 폭을 함께 확인합니다. 본딩·누빔 등 후속 공정 조건도 상담 시 알려주세요.' },
  { id:'03', name:'T/R 싱글', en:'T/R SINGLE', type:'tr', desc:'혼용과 사양을 함께 살펴봅니다.', text:'혼용률, 중량과 가공 조건 등 찾으시는 원단의 기준을 알려주세요.' },
  { id:'04', name:'DTY 싱글', en:'DTY SINGLE', type:'dty', desc:'원사와 편직이 만드는 차이.', text:'원사와 조직, 원하는 사양을 바탕으로 공급 가능 여부를 확인합니다.' },
  { id:'05', name:'보드레', en:'BODRE', type:'bodre', desc:'다른 원단도 찾고 계신가요?', text:'색상과 중량, 필요한 수량을 알려주시면 해당 조건으로 상담합니다.' },
]
const stories = [
 ['FABRIC & APPLICATION','본딩용 인타록 원단,','바닥지 발주 전 무엇을 확인해야 할까?','224432424560'],
 ['YARN & STRUCTURE','DTY와 FDY 원사 차이,','편직 후 원단은 어떻게 달라질까?','224434216016'],
 ['FROM OUR FLOOR','폴라폴리스 원단은 어떻게 만들어질까?','편직부터 기모 가공까지','224439014607'],
]
function MaterialStudy({ type, large=false }) {
  return <div className={`b4-study ${type} ${large?'large':''}`} aria-label="실물 원단 사진 대기용 그래픽"><div className="b4-fabric-fold fold-one"/><div className="b4-fabric-fold fold-two"/><div className="b4-fabric-fold fold-three"/><span className="b4-study-cross">+</span><span className="b4-study-label">MATERIAL STUDY<br/>실물 이미지 적용 예정</span></div>
}
function MaterialDialog({ material, returnFocus, onClose, onInquiry }) {
  const ref=useRef(null)
  useEffect(()=>{const previous=returnFocus || document.activeElement; const old=document.body.style.overflow;document.body.style.overflow='hidden';ref.current.showModal();return()=>{document.body.style.overflow=old;previous?.focus()}},[returnFocus])
  return <dialog ref={ref} className="b4-dialog" aria-labelledby="b4-dialog-heading" onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===ref.current)onClose()}}><button autoFocus className="b4-dialog-close" onClick={onClose} aria-label="원단 안내 닫기"><X size={23}/></button><div className="b4-dialog-art"><MaterialStudy type={material.type}/></div><div className="b4-dialog-copy"><span className="b4-kicker">MATERIAL / {material.id}</span><h2 id="b4-dialog-heading">{material.name}</h2><small>{material.en}</small><p>{material.text}</p><div className="b4-dialog-spec"><span>상담할 때 함께 확인해요</span><p>중량 · 폭 · 색상 · 가공 · 수량 · 납기</p></div><p className="b4-fine">검토용 원단군 안내입니다. 실물 사진·상세 사양은 확인 후 반영하며, 재고와 공급 가능 여부는 개별 상담으로 확인합니다.</p><button className="b4-fill-link" onClick={()=>onInquiry(material.name)}>{material.name} 상담하기 <ArrowUpRight size={20}/></button></div></dialog>
}
export default function Browser04(){
 const [menu,setMenu]=useState(false),[selected,setSelected]=useState(null),[inquiry,setInquiry]=useState(''),[open,setOpen]=useState(0)
 const [direction,setDirection]=useState('editorial')
 useEffect(()=>{document.title='HWOASUNG — 홈페이지 시안 04.2';const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('b4-in-view');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.b4-reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[])
 const nav=[['원단','#b4-materials'],['제조·공급','#b4-work'],['현장 기록','#b4-notes']]
 function chooseInquiry(name){setInquiry(`${name} 원단 문의`);setSelected(null);requestAnimationFrame(()=>document.getElementById('b4-contact').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}))}
 return <div className={`browser04 ${direction==='immersive'?'b4-immersive':''}`}>
  <a className="b4-skip" href="#b4-materials">원단으로 바로가기</a>
  <div className="b4-review-bar"><span>DESIGN STUDY 04.2 <i/> 검토용 시안</span><div role="group" aria-label="히어로 구성 비교"><button aria-pressed={direction==='editorial'} onClick={()=>setDirection('editorial')}>A. 에디토리얼</button><button aria-pressed={direction==='immersive'} onClick={()=>setDirection('immersive')}>B. 사진 중심</button></div></div>
  <header className="b4-header"><a className="b4-logo" href="#b4-home">HWOASUNG<span>화성섬유</span></a><nav aria-label="주 메뉴">{nav.map(([name,url])=><a key={url} href={url}>{name}</a>)}</nav><a className="b4-header-contact" href="#b4-contact">원단 문의 <ArrowUpRight size={17}/></a><button className="b4-menu-toggle" aria-label="메뉴" aria-expanded={menu} aria-controls="b4-mobile-nav" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
  {menu&&<nav id="b4-mobile-nav" className="b4-mobile-nav">{[...nav,['원단 문의','#b4-contact']].map(([name,url])=><a key={url} href={url} onClick={()=>setMenu(false)}>{name}<ArrowUpRight size={18}/></a>)}</nav>}
  <main>
   <section className="b4-hero" id="b4-home"><div className="b4-hero-aside"><span className="b4-kicker"><span>MADE WITH KNOWLEDGE.</span><br/><span className="b4-hero-kicker-secondary">CONNECTED THROUGH FABRIC.</span></span><div className="b4-hero-tiny"><span>원사를 고르고,<br/>조직을 만들고,<br/>원단으로 이어집니다.</span><span>YEONCHEON<br/>SOUTH KOREA</span></div></div><div className="b4-hero-photo"><img src={factory} alt="기존 화성섬유 홈페이지의 환편기와 원사 콘 이미지" fetchPriority="high"/><span className="b4-image-caption">기존 편직 이미지 / 촬영 원본 확인 예정</span><span className="b4-image-coordinate">H / 01<br/>KNITTING FLOOR</span></div><div className="b4-hero-head"><h1><span className="b4-title-first"><span>제조의 깊이를,</span></span><span className="b4-title-second">더 가깝게.</span></h1></div><div className="b4-hero-bottom"><p>직접 편직하는 화성섬유.<br/><span>환편 원단 제조·공급사</span></p><a href="#b4-materials">우리의 원단을 만나보세요 <span><ArrowDown size={22}/></span></a><span className="b4-hero-index">01 — 05</span></div></section>
   <section className="b4-materials b4-section b4-gateway" id="b4-materials">
    <div className="b4-section-top"><span className="b4-kicker">01 / OUR FABRICS</span><span>원단과 쓰임을 살펴보세요</span></div>
    <div className="b4-gateway-heading b4-reveal">
     <h2>다음에 필요한 원단,<br/><em>여기서부터.</em></h2>
     <p>원단명으로 살펴보거나, <br/>사용처에서 시작해 보세요.</p>
    </div>
    <div className="b4-gateway-body">
     <div className="b4-gateway-index">
      <div className="b4-gateway-grid">
       {materials.slice(0,4).map(mat=><button className="b4-gateway-material" key={mat.id} aria-label={`${mat.name} 원단 안내`} onClick={event=>setSelected({material:mat,trigger:event.currentTarget})}>
        <div className="b4-gateway-swatch" aria-hidden="true"><MaterialStudy type={mat.type}/></div>
        <span className="b4-gateway-name"><span>{mat.en}</span><strong>{mat.name}</strong></span><ArrowUpRight size={20}/>
       </button>)}
      </div>
      <div className="b4-gateway-extra"><span>함께 살펴볼 원단</span><button onClick={event=>setSelected({material:materials[4],trigger:event.currentTarget})}>보드레 <ArrowUpRight size={18}/></button></div>
      <p className="b4-gateway-image-note">색상 그래픽은 시안용입니다. 실물 원단 사진 적용 예정.</p>
     </div>
     <aside className="b4-gateway-uses" aria-labelledby="b4-uses-heading">
      <span className="b4-kicker">START WITH A USE</span><h3 id="b4-uses-heading">사용처가 먼저라면</h3>
      <div>{['본딩','누빔','담요','PU코팅'].map(name=><a key={name} href="#b4-contact" onClick={()=>setInquiry(`${name} 용도 원단 문의`)}>{name}<ArrowUpRight size={17}/></a>)}</div>
      <p>중량·폭·가공 조건까지 함께 확인합니다.</p>
     </aside>
    </div>
    <a className="b4-gateway-next" href="#b4-work"><span>원단을 만드는 현장으로</span><ArrowDown size={20}/></a>
   </section>
   <section className="b4-work" id="b4-work"><div className="b4-work-heading b4-reveal"><span className="b4-kicker">02 / INSIDE HWOASUNG</span><h2>말보다 가까이.<br/><span>우리의 편직 현장.</span></h2><p>원사에서 생지까지, 직접 편직합니다.<br/>원단을 이해하는 일은 만드는 현장에서 시작됩니다.</p></div><div className="b4-work-photo"><img src={factory} alt="환편기와 원사가 배치된 편직 현장" loading="lazy"/><div className="b4-work-stamp"><span>THE WORK<br/>BEHIND<br/>THE FABRIC.</span><ArrowDown size={32}/></div><span className="b4-work-photo-caption">MANUFACTURING ARCHIVE / 기존 홈페이지 이미지</span></div><div className="b4-work-foot"><span className="b4-kicker">FROM YARN TO GREIGE</span><div>{[['직접 하는 일','원사 매입 · 환편 편직 · 생지 생산'],['협력 염색·후가공','염색·기모 등 후가공은 협력업체와 진행합니다.']].map(([title,text],i)=><div className="b4-process" key={title}><button aria-expanded={open===i} aria-controls={`b4-process-${i}`} onClick={()=>setOpen(open===i?-1:i)}><span>0{i+1}</span>{title}{open===i?<Minus size={19}/>:<Plus size={19}/>}</button>{open===i&&<p id={`b4-process-${i}`}>{text}</p>}</div>)}</div></div></section>
   <section className="b4-notes b4-section" id="b4-notes"><div className="b4-section-top"><span className="b4-kicker">03 / FIELD NOTES</span><a href="https://blog.naver.com/hwoasung_story" target="_blank" rel="noreferrer">블로그의 더 많은 기록 <ArrowUpRight size={16}/></a></div><div className="b4-notes-title b4-reveal"><h2>원단을 다루며,<br/>쌓아온 이야기.</h2><p>발주 전의 작은 질문부터<br/>원사와 공정의 이야기까지.</p></div><div className="b4-story-grid">{stories.map(([tag,title,sub,id],i)=><a className={`b4-story b4-story-${i} b4-reveal`} key={id} href={`https://blog.naver.com/hwoasung_story/${id}`} target="_blank" rel="noreferrer"><div className="b4-story-visual" aria-hidden="true">{i===0?<div className="b4-bond-diagram"><i/><i/><i/></div>:i===1?<div className="b4-thread-diagram"><i/><i/></div>:<span className="b4-process-diagram">편직<br/><ArrowDown/><br/>가공</span>}<span>EDITORIAL GRAPHIC / 개념 그래픽</span></div><span className="b4-story-tag">{tag}</span><h3>{title} {sub}</h3><span className="b4-story-link">현장 노트 읽기 <ArrowUpRight size={19}/></span></a>)}</div></section>
   <section className="b4-contact b4-section" id="b4-contact"><div className="b4-section-top"><span className="b4-kicker">04 / A CONVERSATION STARTS HERE</span><span>원단을 찾는 다음 단계</span></div><div className="b4-contact-heading b4-reveal"><h2>원단 이야기,<br/><span>편하게 나눠요.</span></h2><ArrowUpRight className="b4-contact-big-arrow" strokeWidth={1}/></div><div className="b4-contact-details"><div><p>원단명과 사양을 알고 계셔도,<br/>용도나 샘플부터 시작하셔도 좋습니다.</p><div className="b4-inquiry-options">{['원단명·사양으로','용도·샘플로'].map(name=><button aria-pressed={inquiry===name+' 문의'} key={name} onClick={()=>setInquiry(name+' 문의')}>{name} <ArrowUpRight size={16}/></button>)}</div><p className="b4-inquiry-status" role="status">{inquiry?`${inquiry} · 이메일로 상담을 시작하세요.`:'공급 가능 여부와 조건은 상담을 통해 함께 확인합니다.'}</p></div><div className="b4-contact-links"><a href="tel:0318320068"><span>PHONE</span><strong>031-832-0068</strong><ArrowUpRight/></a><a href={`mailto:hwoasung0068@gmail.com?subject=${encodeURIComponent(inquiry||'원단 상담 문의')}`}><span>EMAIL</span><strong>hwoasung0068@gmail.com</strong><ArrowUpRight/></a><span>평일 09:00–18:00 / 주말·공휴일 휴무</span></div></div></section>
  </main><footer className="b4-footer"><div className="b4-footer-top"><a href="#b4-home" className="b4-logo">HWOASUNG<span>화성섬유</span></a><p>경기도 연천군 청산면 전영로 441<br/>대표 이원화 · 사업자등록번호 127-12-70903</p><a href="#b4-home">위로 <ArrowUpRight size={17}/></a></div><div className="b4-footer-word" aria-hidden="true">HWOASUNG<span>↗</span></div><div className="b4-footer-bottom"><span>© HWOASUNG TEXTILE</span><span>BROWSER 04.2 — DRAFT / 카피·색상·실사 최종 확정 전</span></div></footer>
  {selected&&<MaterialDialog material={selected.material} returnFocus={selected.trigger} onClose={()=>setSelected(null)} onInquiry={chooseInquiry}/>}
 </div>
}
