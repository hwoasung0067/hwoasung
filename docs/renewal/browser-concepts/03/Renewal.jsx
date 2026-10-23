import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown, ArrowRight, X, Menu } from 'lucide-react'
import factory from './assets/knitting_unit.jpg'
import './Renewal.css'

const fabrics = [
  { name: '폴라폴리스', en: 'POLAR FLEECE', code: '01', tone: 'sand', desc: '폴라폴리스 원단의 사양과 가공 조건을 확인해 보세요.' },
  { name: '인타록', en: 'INTERLOCK', code: '02', tone: 'sage', desc: '본딩·누빔 등 용도에 맞는 중량과 폭을 함께 확인합니다.' },
  { name: 'T/R 싱글', en: 'T/R SINGLE', code: '03', tone: 'clay', desc: '혼용률과 중량, 가공 조건을 기준으로 상담합니다.' },
  { name: 'DTY 싱글', en: 'DTY SINGLE', code: '04', tone: 'stone', desc: '원사와 조직, 사용 목적에 맞는 사양을 확인합니다.' },
  { name: '보드레', en: 'BODRE', code: '05', tone: 'cream', desc: '찾으시는 색상과 사양, 공급 가능 여부를 문의해 주세요.' },
]
const notes = [
  ['01', '발주 노트', '본딩용 인타록 원단,', '바닥지 발주 전 무엇을 확인해야 할까?', '224432424560'],
  ['02', '원사 이야기', 'DTY와 FDY 원사 차이,', '편직 후 원단은 어떻게 달라질까?', '224434216016'],
  ['03', '제조의 과정', '폴라폴리스 원단은 어떻게 만들어질까?', '편직부터 기모 가공까지', '224439014607'],
]
export default function Renewal() {
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState(null)
  const [inquiry, setInquiry] = useState('')
  const dialogRef = useRef(null)
  useEffect(() => {
    document.title = '화성섬유 | 홈페이지 리뉴얼 · 브라우저 시안 03'
    const targets = document.querySelectorAll('.section-heading, .fabric-card, .work-title, .notes-list > a, .contact-heading')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.08 })
    targets.forEach(target => { target.classList.add('reveal'); observer.observe(target) })
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!selected) return
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handler = event => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key !== 'Tab') return
      const elements = dialogRef.current?.querySelectorAll('button, a[href]')
      if (!elements?.length) return
      const first = elements[0], last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handler); previousFocus?.focus() }
  }, [selected])
  const links = [['원단', '#fabrics'], ['사용처', '#applications'], ['제조·공급', '#manufacturing'], ['회사', '#company'], ['인사이트', '#notes']]
  return <div className="renewal">
    <div className="concept-bar"><span>HWOASUNG — WEBSITE RENEWAL</span><span>BROWSER 03 · 검토용 시안</span></div>
    <header className="nav"><a className="wordmark" href="#home">HWOASUNG<span>화성섬유</span></a><nav>{links.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav><a className="nav-inquiry" href="#contact">문의 <ArrowUpRight size={16}/></a><button className="menu-toggle" aria-label="메뉴" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></header>
    {menu && <nav className="mobile-nav">{[...links, ['문의', '#contact']].map(([name, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{name}<ArrowUpRight size={18}/></a>)}</nav>}
    <main>
      <section className="hero" id="home"><div className="hero-top"><span className="eyebrow"><i/> ROOTED IN MANUFACTURING. OPEN TO YOU.</span><span className="hero-location">YEONCHEON, KOREA ↗</span></div><h1>제조의 깊이를,<br/><span>더 가깝게.</span></h1><div className="hero-bottom"><p>직접 편직하는 화성섬유.<br/>환편 원단 제조·공급사</p><a href="#fabrics" className="text-link">원단 살펴보기 <ArrowDown size={18}/></a><small>01 — THE BEGINNING</small></div><div className="hero-photo"><img src={factory} alt="기존 홈페이지에 사용된 환편 설비 이미지"/><div className="photo-overlay"><span>FROM YARN<br/>TO FABRIC.</span><span>원사에서 원단으로.<br/>우리 일의 시작.</span></div><div className="photo-caption"><span>HWOASUNG / MANUFACTURING ARCHIVE</span><span>기존 홈페이지 이미지 · 촬영 원본 확인 예정</span></div></div></section>
      <section className="fabrics section" id="fabrics"><div className="section-meta"><span className="eyebrow">02 / OUR FABRICS</span><span>소재를 만나는 가장 가까운 곳</span></div><div className="section-heading"><h2>당신의 다음 원단.</h2><p>폴라폴리스부터 싱글 원단까지.<br/>필요한 소재에서 이야기를 시작하세요.</p></div><div className="fabric-grid">{fabrics.slice(0,4).map(item => <button className={`fabric-card ${item.tone}`} key={item.code} onClick={() => setSelected(item)} aria-label={`${item.name} 원단군 보기`}><div className="swatch-art" aria-hidden="true"><div className="swatch-sheet"/><div className="swatch-tag"><span>H / {item.code}</span><span>MATERIAL STUDY</span></div><span className="swatch-placeholder">실물 사진 대기 · 레이아웃 그래픽</span></div><div className="fabric-name"><div><small>{item.en}</small><h3>{item.name}</h3></div><span className="round-arrow"><ArrowUpRight size={20}/></span></div></button>)}</div><button className="bodre-row" onClick={() => setSelected(fabrics[4])}><span>ALSO IN OUR COLLECTION</span><h3>보드레</h3><span>원단군 살펴보기 <ArrowUpRight size={18}/></span></button><div id="applications" className="applications"><span>소재에서 쓰임으로 <small>APPLICATIONS</small></span><div>{['본딩','누빔','PU코팅','담요'].map(name => <a key={name} href="#contact" onClick={() => setInquiry(`${name} 용도 원단 문의`)}>{name}<ArrowUpRight size={15}/></a>)}</div></div></section>
      <section className="manufacturing" id="manufacturing"><div className="work-title"><span className="eyebrow">03 / THE WORK BEHIND</span><h2>원단을 아는 일.<br/>직접 만드는 일.</h2><p>원사를 고르고, 조직을 만들고.<br/>화성섬유의 일은 편직 현장에서 시작됩니다.</p></div><div className="work-image"><img src={factory} alt="원사와 환편기가 배치된 편직 설비" loading="lazy"/><span>KNITTING / YEONCHEON</span></div><div className="work-facts" id="company"><div><span>01 — IN HOUSE</span><h3>자체 편직</h3><p>원사 매입 · 환편 편직 · 생지 생산</p></div><ArrowRight className="process-arrow" size={27}/><div><span>02 — WITH OUR PARTNERS</span><h3>협력 염색·후가공</h3><p>염색 · 기모 등 후가공은 협력업체와 함께합니다.</p></div><div className="company-fact"><span>OUR BASE</span><p>경기도 연천군 청산면<br/>전영로 441, 화성섬유</p></div></div></section>
      <section className="notes section" id="notes"><div className="section-meta"><span className="eyebrow">04 / FIELD NOTES</span><span>화성섬유의 기록</span></div><div className="section-heading"><h2>현장에서 이어지는 이야기.</h2><a className="text-link" href="https://blog.naver.com/hwoasung_story" target="_blank" rel="noreferrer">블로그 방문하기 <ArrowUpRight size={18}/></a></div><div className="notes-list">{notes.map(([num,tag,title,sub,id]) => <a key={id} href={`https://blog.naver.com/hwoasung_story/${id}`} target="_blank" rel="noreferrer"><span className="note-number">{num}</span><span className="note-tag">{tag}</span><h3>{title}<br/><span>{sub}</span></h3><ArrowUpRight size={23}/></a>)}</div></section>
      <section className="contact section" id="contact"><span className="eyebrow">05 / LET’S TALK FABRIC</span><div className="contact-heading"><h2>찾는 원단의 조건을<br/>편하게 이야기해 주세요.</h2><span className="contact-symbol" aria-hidden="true">↗</span></div><div className="contact-grid"><div><p>원단명과 사양을 알고 계셔도,<br/>용도나 샘플부터 시작하셔도 좋습니다.</p><div className="contact-choices">{['원단명·사양으로 문의','용도·샘플로 문의'].map(text => <button aria-pressed={inquiry === text} className={inquiry === text ? 'active' : ''} key={text} onClick={() => setInquiry(text)}>{text} <ArrowUpRight size={15}/></button>)}</div></div><div className="contact-details"><a href="tel:0318320068"><small>PHONE</small><span>031-832-0068</span><ArrowUpRight size={20}/></a><a href={`mailto:hwoasung0068@gmail.com?subject=${encodeURIComponent(inquiry || '원단 상담 문의')}`}><small>EMAIL</small><span>hwoasung0068@gmail.com</span><ArrowUpRight size={20}/></a><p>평일 09:00–18:00 · 주말 및 공휴일 휴무</p>{inquiry && <p className="inquiry-status" role="status">{inquiry} · 이메일로 상담을 시작하세요.</p>}</div></div></section>
    </main><footer className="footer"><div className="footer-top"><a href="#home" className="wordmark">HWOASUNG<span>화성섬유</span></a><p>경기도 연천군 청산면 전영로 441<br/>대표 이원화 · 사업자등록번호 127-12-70903</p><a href="#home">위로 <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© HWOASUNG TEXTILE</span><span>BROWSER 03 / EDITORIAL & MANUFACTURING</span><span>기획 기반 검토 시안 · 문구·색상 최종 확정 전</span></div></footer>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section ref={dialogRef} className="fabric-dialog" role="dialog" aria-modal="true" aria-label={`${selected.name} 원단 안내`} onClick={e=>e.stopPropagation()}><button autoFocus className="dialog-close" aria-label="닫기" onClick={()=>setSelected(null)}><X/></button><span className="eyebrow">OUR FABRICS / {selected.code}</span><h2>{selected.name}</h2><span className="dialog-en">{selected.en}</span><p>{selected.desc}</p><div className="dialog-spec"><span>상담 시 확인할 조건</span><p>중량 · 폭 · 색상 · 가공 · 수량 · 희망 납기</p></div><small>실물 이미지와 품목별 상세 사양은 확인 후 반영 예정입니다.<br/>재고와 공급 가능 여부는 개별 상담으로 확인합니다.</small><a className="dialog-cta" href="#contact" onClick={()=>{setInquiry(`${selected.name} 원단 문의`);setSelected(null)}}>이 원단으로 상담하기 <ArrowUpRight size={18}/></a></section></div>}
  </div>
}
