import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { getOptimizedImage } from './cloudinary';
import AdminPortal from './AdminPortal';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import {
  Users,
  BarChart3,
  Layers,
  History,
  Settings,
  ArrowRight,
  X,
  CheckCircle2,
  Factory,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Database,
  ArrowUpRight,
  Monitor,
  Cpu,
  Globe,
  Activity,
  Plus,
  ShieldCheck,
  Briefcase,
  Terminal,
  ChevronDown,
  Menu,
  Percent,
  FileText,
  Printer,
  Clock,
  Zap,
  Search,
  ArrowDown
} from 'lucide-react';

// --- 1. 전역 상수 데이터 ---
const TRANSLATIONS = {
  KR: {
    brand: "화성섬유",
    sub: "브랜드 성공을 위한 견고한 기초",
    home: "홈",
    about: "뿌리 (ABOUT)",
    business: "비즈니스 & 제품",
    knitting: "편직 / 생지 (UNIT 01)",
    processing: "가공지 인벤토리 (UNIT 02)",
    inquiry: "문의하기",
    hero_tags: "편직공장 · 다이마루 · 폴리에스테르 전문",
    hero_h1: "느낌을 스펙으로.",
    hero_p_line1: "> 원단 이름을 몰라도 괜찮습니다.",
    hero_p_line2: "샘플 한 장이면 딱 맞는 스펙을 찾아냅니다.",
    cta: "지금 샘플 분석 요청하기",
    cta_tooltip: "30년 전문가와 연결됩니다",
    stats_history_val: "30",
    stats_history_label: "제조 연력",
    stats_history_sub: "30년 이상 숙련된 제조 연력",
    stats_partners_val: "2500",
    stats_partners_label: "누적 거래처",
    stats_partners_sub: "성공을 함께한 누적 거래처",
    stats_samples_val: "15000",
    stats_samples_label: "작업지시서 데이터",
    stats_samples_sub: "데이터화된 작업지시서",
    stats_defect_val: "1",
    stats_defect_label: "결함률",
    stats_defect_sub_top: "자체 편직으로 실현",
    stats_defect_sub: "",
    explore: "인벤토리 확인하기",
    inventory_title: "Signature",
    inventory_span: "Archive",
    inventory_p: "화성섬유가 보증하는 주력 제품군입니다. 클릭하여 상세 사양을 확인하세요.",
    biz_title: "Business",
    biz_sub: "System Solutions",
    sector_a_title: "편직 / 생지",
    sector_a_p: "최신 고성능 환편기와 다양한 게이지의 설비 인프라를 통해, 어떠한 샘플 스펙에도 즉각적으로 대응하는 탄탄한 생산 기반을 갖추고 있습니다.",
    sector_b_title: "가공지 인벤토리",
    sector_b_p: "보드레, 플리스, 기술 본딩 등 화성섬유가 엄선하고 데이터화한 프리미엄 가공 원단 인벤토리입니다.",
    learn_more: "인프라 확인하기",
    contact_title: "Visit &",
    contact_span: "Contact.",
    contact_sub: "화성섬유는 단순한 거래처가 아닌 지속적인 파트너가 되겠습니다.",
    address: "경기도 연천군 청산면 전영로 441 화성섬유",
    tel: "031-832-0068",
    fax: "031-832-0069",
    email: "hwoasung0068@gmail.com",
    hours: "평일 09:00 ~ 18:00 / 주말·공휴일 휴무",
    ceo: "대표자: 이원화",
    biz_no: "사업자번호: 127-12-70903",
    modal_title: "상세 스펙",
    label_technical: "제품 사양",
    label_logic: "특징 & 장점",
    label_raw: "소재",
    label_structure: "구조",
    label_density: "중량",
    label_width: "폭",
    label_color: "색상",
    label_code: "관리 코드",
    cta_quote: "샘플 분석 및 견적 요청하기",
    dashboard_about_cta: "화성섬유 뿌리 알아보기",
    dashboard_inventory_cta: "가공지 인벤토리 전체보기",
    modal_inventory_cta: "가공지 인벤토리 탐색",
    about_hero_tag: "ABOUT US",
    about_hero_h1: "원단 분석의 기준.",
    about_hero_h1_sub: "Textile Analysis Standard",
    about_hero_motto: "샘플이 완제품이 되는 가장 확실한 시작.",
    about_hero_sub: "30년 제조 노하우로 원사부터 공정까지 정밀 분석하여 최적의 결과물을 제안합니다.",
    about_expertise_tag: "CORE EXPERTISE",
    about_expertise_title: "전문성과 통합의 가치",
    about_process_tag: "PROCESS",
    about_process_title: "샘플에서 제품까지의 여정",
    about_factory_tag: "INFRASTRUCTURE",
    about_factory_title: "안심할 수 있는 제조 거점",
    about_closing: "화성섬유(Hwoasung)는 귀사의 생산 효율을 극대화하는 강력한 파트너가 되겠습니다.",
    expertise_01_t: "정밀 샘플 분석",
    expertise_01_d: "스와치 하나로 충분합니다. 원사, 밀도, 가공 방식을 데이터화하여 오차를 최소화합니다.",
    expertise_02_t: "원스톱 공정 통합",
    expertise_02_d: "편직부터 후가공까지 유기적으로 연결하여 유통 마진을 줄이고 생산 속도를 높입니다.",
    expertise_03_t: "공급의 안정성",
    expertise_03_d: "자체 공장을 기반으로 브랜드가 신뢰할 수 있는 균일한 품질의 원단을 적기에 공급합니다.",
    step_01_t: "샘플 정밀 분석",
    step_01_d: "원사 및 조직 판별",
    step_02_t: "최적화 편직",
    step_02_d: "연천 공장 직접 생산",
    step_03_t: "통합 후가공",
    step_03_d: "염색, 본딩, 나염 등",
    step_04_t: "최종 검수 및 출고",
    step_04_d: "공정별 퀄리티 체크"
  },
  EN: {
    brand: "Hwoasung Textile",
    sub: "A Solid Foundation for Brand Success",
    home: "HOME",
    about: "ROOTS (ABOUT)",
    business: "BUSINESS & PRODUCTS",
    knitting: "KNITTING / RAW (UNIT 01)",
    processing: "PROCESSED INVENTORY (UNIT 02)",
    inquiry: "INQUIRY",
    hero_tags: "Knitting Factory · Circular Knit · Polyester Specialist",
    hero_h1: "Sensation into Spec.",
    hero_p_line1: "> It's okay if you don't know the fabric name.",
    hero_p_line2: "We find the perfect spec with just a single sample.",
    cta: "Request Sample Analysis Now",
    cta_tooltip: "Connect with 30-year experts",
    stats_history_val: "30",
    stats_history_label: "Manufacturing History",
    stats_history_sub: "Over 30 years of experienced manufacturing history",
    stats_partners_val: "2500",
    stats_partners_label: "Cumulative Clients",
    stats_partners_sub: "Cumulative clients who shared success",
    stats_samples_val: "15000",
    stats_samples_label: "Work Order Data",
    stats_samples_sub: "Digitalized work order data",
    stats_defect_val: "1",
    stats_defect_label: "Defect Rate",
    stats_defect_sub_top: "Realized by in-house knitting",
    stats_defect_sub: "",
    explore: "Check Inventory",
    inventory_title: "Signature",
    inventory_span: "Archive",
    inventory_p: "These are the main product lines guaranteed by Hwoasung Textile. Click to check detailed specifications.",
    biz_title: "Business",
    biz_sub: "System Solutions",
    sector_a_title: "Knitting / Raw Fabric",
    sector_a_p: "Equipped with high-performance circular knitting machinery across diverse gauges, providing a solid production base capable of immediate response to any sample specification.",
    sector_b_title: "Processed Inventory",
    sector_b_p: "Premium processed fabric inventory including Boudre, Fleece, and Technical Bonding, carefully selected and digitalized by Hwoasung Textile.",
    learn_more: "Check Infrastructure",
    contact_title: "Visit &",
    contact_span: "Contact.",
    contact_sub: "Hwoasung Textile will be a lasting partner, not just a simple client.",
    address: "441 Jeon-young-ro, Cheongsan-myeon, Yeoncheon-gun, Gyeonggi-do, Hwoasung Textile",
    tel: "+82-31-832-0068",
    fax: "+82-31-832-0069",
    email: "hwoasung0068@gmail.com",
    hours: "Weekdays 09:00 ~ 18:00 / Closed on Weekends & Public Holidays",
    ceo: "CEO: Lee Won-hwa",
    biz_no: "Business No: 127-12-70903",
    modal_title: "Detailed Spec",
    label_technical: "Technical Spec",
    label_logic: "Features & Benefits",
    label_raw: "Material",
    label_structure: "Structure",
    label_density: "Weight",
    label_width: "Width",
    label_color: "Color",
    label_code: "Admin Code",
    cta_quote: "Request Sample Analysis & Quotation",
    dashboard_about_cta: "Learn about Hwoasung Roots",
    dashboard_inventory_cta: "View All Processed Inventory",
    modal_inventory_cta: "Explore Processed Inventory",
    about_hero_tag: "ABOUT US",
    about_hero_h1: "Standard of Textile Analysis.",
    about_hero_h1_sub: "Textile Analysis Standard",
    about_hero_motto: "The most reliable start for a sample to become a finished product.",
    about_hero_sub: "We suggest optimal results by precisely analyzing from yarn to process with 30 years of manufacturing know-how.",
    about_expertise_tag: "CORE EXPERTISE",
    about_expertise_title: "Value of Expertise and Integration",
    about_process_tag: "PROCESS",
    about_process_title: "Journey from Sample to Product",
    about_factory_tag: "INFRASTRUCTURE",
    about_factory_title: "Reliable Manufacturing Base",
    about_closing: "Hwoasung Textile will be a powerful partner maximizing your production efficiency.",
    expertise_01_t: "Precision Sample Analysis",
    expertise_01_d: "One swatch is enough. We minimize errors by digitalizing yarn, density, and processing methods.",
    expertise_02_t: "One-stop Process Integration",
    expertise_02_d: "We reduce distribution margins and increase production speed by organically connecting knitting to finishing.",
    expertise_03_t: "Supply Stability",
    expertise_03_d: "Based on our own factory, we provide uniform quality fabrics that brands can trust in a timely manner.",
    step_01_t: "Precision Sample Analysis",
    step_01_d: "Yarn & Tissue Identification",
    step_02_t: "Optimized Knitting",
    step_02_d: "Direct Production at Yeoncheon Factory",
    step_03_t: "Integrated Finishing",
    step_03_d: "Dyeing, Bonding, Printing, etc.",
    step_04_t: "Final Inspection & Shipment",
    step_04_d: "Quality Check by Process"
  }
};
// --- 2. 제품 데이터 로더 ---
const getProducts = (lang) => {
  return {
    knitting: [],
    processed: []
  };
};

// --- 3. 헬퍼 컴포넌트 ---
const CountUp = React.memo(({ end, duration = 2000, suffix = "", isVisible }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible || isNaN(parseFloat(end))) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * Math.abs(parseFloat(end)));
      setCount(currentCount);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  if (isNaN(parseFloat(end))) return <span>{end}{suffix}</span>;
  const displayValue = end.includes('.') ? (count / 100).toFixed(2) : count.toLocaleString();
  return <span>{displayValue}{suffix}</span>;
});

const StatBoxItem = React.memo(({ icon: Icon, label, value, suffix, sub, subTop, isVisible, highlight = false, pink = false, showArrow = false }) => (
  <div className={`p-10 border-r border-white/5 last:border-r-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${highlight ? 'bg-indigo-600/5' : ''} ${pink ? 'bg-pink-600/5' : ''}`}>
    <div className="flex items-center space-x-3 mb-6">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${pink ? 'bg-pink-600 text-white' : highlight ? 'bg-indigo-600 text-white' : 'bg-white/5 text-indigo-400'}`}>
        {Icon && <Icon size={20} />}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${pink ? 'text-pink-400' : 'text-white/40'}`}>{label}</span>
    </div>
    <div className={`text-4xl md:text-5xl font-black mb-4 tracking-tighter flex items-center ${pink ? 'text-white' : highlight ? 'text-indigo-400' : 'text-white'}`}>
      <CountUp end={value} suffix={suffix} isVisible={isVisible} />
      {showArrow && <ArrowDown size={32} className="ml-2 text-pink-400 animate-bounce" />}
    </div>
    {subTop && <p className="text-white text-[12px] font-bold mb-1 tracking-tight break-keep">{subTop}</p>}
    {sub && <p className="text-slate-500 text-[10px] font-bold tracking-tight break-keep">{sub}</p>}
  </div>
));

const VisualPlaceholder = React.memo(({ dark = false, imageSrc = null, cloudinaryId = null, text = "" }) => {
  const finalSrc = cloudinaryId ? getOptimizedImage(cloudinaryId) : imageSrc;

  return (
    <div className={`w-full h-full flex items-center justify-center relative overflow-hidden group ${dark ? 'bg-[#0a0c10]' : 'bg-slate-100'}`}>
      {/* Optional Image Background */}
      {finalSrc && (
        <div className="absolute inset-0 z-0">
          <img
            src={finalSrc}
            alt={text || "Textile Background"}
            className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-all duration-1000"
          />
          {/* Subtle vignette instead of heavy overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40"></div>
        </div>
      )}

      {/* Professional Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      {/* Subtle Mesh Gradient / Light Effect */}
      <div className="absolute -top-1/4 -right-1/4 w-full h-full bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-10"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-10"></div>

      {!finalSrc && (
        /* Subtle central motif - only if no image */
        <div className="relative z-20 flex flex-col items-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
          <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-indigo-500/40 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 w-px h-12 bg-gradient-to-b from-indigo-500/40 to-transparent"></div>
          {text && <div className="mt-4 text-[8px] font-black text-white/40 uppercase tracking-widest leading-none text-center px-4">{text}</div>}
        </div>
      )}
    </div>
  );
});

const FloatingButtons = React.memo(() => {
  const buttons = [
    {
      name: "네이버 톡톡",
      url: "https://talk.naver.com/ct/w4aqxg",
      color: "bg-[#03C75A]",
      textColor: "text-white",
      icon: (size) => (
        <svg viewBox="0 0 40 40" width={size} height={size} fill="currentColor">
          <path d="M20 0C8.954 0 0 8.351 0 18.653c0 4.148 1.486 7.971 4.022 11.026-.549 3.498-1.956 7.427-2.023 7.625-.095.275.05.57.323.659.053.018.107.026.162.026.216 0 .416-.141.488-.344.062-.174 2.859-7.854 6.703-9.176 3.166 1.189 6.641 1.841 10.325 1.841 11.046 0 20-8.351 20-18.653S31.046 0 20 0z" />
        </svg>
      )
    },
    {
      name: "카카오 채널톡",
      url: "https://pf.kakao.com/_xkhixjn/chat",
      color: "bg-[#FEE500]",
      textColor: "text-[#3C1E1E]",
      icon: (size) => (
        <svg viewBox="0 0 40 40" width={size} height={size} fill="currentColor">
          <path d="M20 3c-10.493 0-19 6.611-19 14.771 0 5.151 3.473 9.68 8.742 12.339-.395 1.442-1.427 5.215-1.636 6.007-.258.98.375.967.787.69 3.235-2.176 5.318-3.582 6.44-4.349C16.541 32.793 18.238 33 20 33c10.493 0 19-6.611 19-14.771S30.493 3 20 3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end space-y-4">
      {buttons.map((btn, i) => (
        <a
          key={i}
          href={btn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-end"
        >
          <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl">
            {btn.name}
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 border-8 border-transparent border-left-slate-900 border-l-slate-900"></div>
          </div>
          <div className={`${btn.color} ${btn.textColor} w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300`}>
            {btn.icon(28)}
          </div>
        </a>
      ))}
    </div>
  );
});

const InteractiveMap = ({ naverUrl }) => (
  <div className="relative w-full h-full group/map">
    <iframe
      src={`https://maps.google.com/maps?q=${encodeURIComponent("경기도 연천군 청산면 전영로 441")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
      className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 border-none"
      allowFullScreen
      loading="lazy"
    ></iframe>
    <a
      href={naverUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-6 left-6 bg-white shadow-2xl px-6 py-4 flex items-center space-x-3 group/btn hover:bg-slate-900 hover:text-white transition-all duration-500 rounded-sm"
    >
      <div className="text-left">
        <div className="text-[8px] font-black text-indigo-600 uppercase tracking-widest mb-0.5">Navigation</div>
        <div className="text-xs font-black uppercase tracking-tight">Open Naver Maps</div>
      </div>
      <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
    </a>
  </div>
);

const App = () => {
  const [view, setView] = useState('main');
  const [lang, setLang] = useState('KR');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState([]);

  // Fetch Dynamic Products from Firestore
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbProducts(prods);
    }, (error) => {
      console.error("App.jsx Firestore Listener Error:", error);
    });
    return unsubscribe;
  }, []);

  // 네이버 지도 검색 URL
  const NAVER_MAP_URL = "https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%97%B0%EC%B2%9C%20%EC%B2%AD%EC%82%B0%EB%A9%B4%20%EC%A0%84%EC%98%81%EB%A1%9C%20441%20%ED%99%94%EC%84%B1%EC%84%AC%EC%9C%A0";

  // About Hero Slider State
  const [heroImgIndex, setHeroImgIndex] = useState(0);
  useEffect(() => {
    if (view !== 'about') return;
    const timer = setInterval(() => {
      setHeroImgIndex((prev) => (prev === 0 ? 1 : 0));
    }, 1500);
    return () => clearInterval(timer);
  }, [view]);

  // Memoized Data
  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  const productsObj = useMemo(() => {
    const staticProds = getProducts(lang);
    // Categorize dynamic products
    const dynamicKnitting = dbProducts.filter(p => p.type === 'knitting');
    const dynamicProcessed = dbProducts.filter(p => p.type === 'processed');

    return {
      knitting: [...dynamicKnitting, ...staticProds.knitting],
      processed: [...dynamicProcessed, ...staticProds.processed]
    };
  }, [lang, dbProducts]);

  const SIGNATURE_PRODUCTS = useMemo(() => [
    ...productsObj.knitting.slice(0, 2),
    ...productsObj.processed.slice(0, 2)
  ], [productsObj]);

  const slideCount = SIGNATURE_PRODUCTS.length;
  const CLONED_PRODUCTS = useMemo(() => [
    ...SIGNATURE_PRODUCTS,
    ...SIGNATURE_PRODUCTS,
    ...SIGNATURE_PRODUCTS
  ], [SIGNATURE_PRODUCTS]);

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(slideCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const getSlideWidth = useCallback(() => {
    if (typeof window === 'undefined') return 100;
    if (window.innerWidth < 640) return 85;
    if (window.innerWidth < 1024) return 50;
    return 25;
  }, []);
  const [slideWidth, setSlideWidth] = useState(getSlideWidth());

  useEffect(() => {
    const handleResize = () => setSlideWidth(getSlideWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSlideWidth]);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (isHovered || dragStartX !== null) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered, dragStartX]);

  const handleTransitionEnd = () => {
    if (currentSlide >= slideCount * 2) {
      setIsTransitioning(false);
      setCurrentSlide(slideCount);
    } else if (currentSlide <= slideCount - 1) {
      setIsTransitioning(false);
      setCurrentSlide(slideCount * 2 - 1);
    }
  };

  const handleDragStart = (e) => {
    setIsHovered(true);
    setIsTransitioning(false);
    setIsDragging(false);
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e) => {
    if (dragStartX === null) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const offset = clientX - dragStartX;
    if (Math.abs(offset) > 5) setIsDragging(true);
    setDragOffsetX(offset);
  };

  const handleDragEnd = () => {
    if (dragStartX !== null) {
      setIsTransitioning(true);
      if (dragOffsetX > 50) setCurrentSlide(prev => prev - 1);
      else if (dragOffsetX < -50) setCurrentSlide(prev => prev + 1);
      setDragStartX(null);
      setDragOffsetX(0);
      setIsHovered(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.1 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const navigateTo = useCallback((newView) => {
    setView(newView);
    setSelectedProduct(null);
    setIsMobileMenuOpen(false);
    // 즉각적인 반응을 위해 smooth 제거
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  if (view === 'admin') {
    return <AdminPortal onBack={() => setView('main')} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 leading-relaxed overflow-x-hidden selection:bg-indigo-600 selection:text-white relative">

      {/* 1. NAVIGATION */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-100 shadow-sm' : 'bg-transparent py-10'}`}>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navigateTo('main')}>
              <div className="w-10 h-10 bg-slate-900 flex items-center justify-center text-white font-black text-xs relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">HS</span>
              </div>
              <div className={`flex flex-col transition-colors duration-500 ${!scrolled && view === 'main' ? 'text-white' : 'text-slate-900'}`}>
                <span className="font-bold text-xl tracking-[0.15em] leading-none">{t.brand}</span>
                <span className={`text-[7px] font-bold tracking-[0.2em] mt-1.5 uppercase ${!scrolled && view === 'main' ? 'text-white/70' : 'text-slate-400'}`}>{t.sub}</span>
              </div>
            </div>

            {/* Mobile Language Selector */}
            <div className={`md:hidden flex items-center space-x-2 font-mono text-[10px] px-3 py-1.5 rounded-full border transition-colors ${!scrolled && view === 'main' ? 'border-white/20 text-white' : 'border-slate-200 text-slate-400'}`}>
              <button onClick={() => setLang('KR')} className={lang === 'KR' ? 'font-black text-indigo-500 underline underline-offset-4' : 'opacity-60'}>KR</button>
              <span className="opacity-30">|</span>
              <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'font-black text-indigo-500 underline underline-offset-4' : 'opacity-60'}>EN</button>
            </div>
          </div>

          <div className="hidden md:flex space-x-10 text-[10px] font-black tracking-[0.2em] items-center">
            <button onClick={() => navigateTo('main')} className={`transition-all duration-500 ${!scrolled && view === 'main' ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-slate-900'} ${view === 'main' ? 'border-b-2 border-indigo-500 pb-1' : ''}`}>{t.home}</button>
            <button onClick={() => navigateTo('about')} className={`transition-all duration-500 ${!scrolled && view === 'main' ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-slate-900'} ${view === 'about' ? 'border-b-2 border-indigo-500 pb-1' : ''}`}>{t.about}</button>
            <div className="relative" onMouseEnter={() => setIsBusinessOpen(true)} onMouseLeave={() => setIsBusinessOpen(false)}>
              <button className={`flex items-center transition-all duration-500 uppercase ${!scrolled && view === 'main' ? 'text-white/80 hover:text-white' : 'text-slate-400 hover:text-slate-900'} ${(view === 'knitting' || view === 'processing') ? 'border-b-2 border-indigo-500 pb-1' : ''}`}>
                {t.business} <ChevronDown size={12} className={`ml-1 transition-transform ${isBusinessOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 w-64 pt-6 transition-all duration-300 transform ${isBusinessOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                <div className="bg-white border border-slate-100 shadow-2xl rounded-sm p-2">
                  <button onClick={() => navigateTo('knitting')} className="w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
                    <span className="text-[9px] block text-indigo-600 font-bold mb-1 opacity-60 uppercase font-mono tracking-widest">UNIT_01</span>
                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{t.knitting}</span>
                  </button>
                  <button onClick={() => navigateTo('processing')} className="w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors">
                    <span className="text-[9px] block text-indigo-600 font-bold mb-1 opacity-60 uppercase font-mono tracking-widest">UNIT_02</span>
                    <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{t.processing}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={`flex items-center space-x-2 border-l pl-8 font-mono ${!scrolled && view === 'main' ? 'border-white/20' : 'border-slate-200'}`}>
              <button onClick={() => setLang('KR')} className={`transition-all ${lang === 'KR' ? (!scrolled && view === 'main' ? 'text-white font-black underline underline-offset-4' : 'text-slate-900 font-black underline underline-offset-4') : (!scrolled && view === 'main' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900')}`}>KR</button>
              <span className={!scrolled && view === 'main' ? 'text-white/20' : 'text-slate-300'}>|</span>
              <button onClick={() => setLang('EN')} className={`transition-all ${lang === 'EN' ? (!scrolled && view === 'main' ? 'text-white font-black underline underline-offset-4' : 'text-slate-900 font-black underline underline-offset-4') : (!scrolled && view === 'main' ? 'text-white/40 hover:text-white' : 'text-slate-400 hover:text-slate-900')}`}>EN</button>
            </div>
          </div>
          <button aria-label="Toggle Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 ${!scrolled && view === 'main' ? 'text-white' : 'text-slate-900'}`}><Menu size={24} /></button>
        </div>
      </nav>

      {/* 2. HERO SECTION (MAIN VIEW ONLY) */}
      {view === 'main' && (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0A0D14]">
          {/* Background Stripes Pattern */}
          <div className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(255,255,255,0.02) 15px, rgba(255,255,255,0.02) 16px)'
            }}>
          </div>

          {/* Glowing Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
          </div>

          <div className="container mx-auto px-6 md:px-10 relative z-10 text-center">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
                {t.hero_tags.split(' · ').map((tag, i) => (
                  <span key={i} className="text-white/40 text-[11px] font-bold tracking-[0.2em] uppercase">
                    {tag} {i < t.hero_tags.split(' · ').length - 1 && <span className="mx-2 opacity-20">·</span>}
                  </span>
                  // Simplified tag display to match image style better
                ))}
              </div>

              <h1 className="text-5xl md:text-[6.5rem] font-black text-white leading-tight tracking-tighter mb-12 italic animate-in fade-in zoom-in-95 duration-1000 delay-200">
                <span className="relative inline-block">
                  {t.hero_h1.split('.')[0]}<span className="text-white">.</span>
                  <div className="absolute -bottom-4 left-0 w-full h-8 bg-indigo-600/40 -z-10 blur-xl"></div>
                  <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-indigo-500 rounded-full"></div>
                </span>
              </h1>

              <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <div className="max-w-xl mb-16 px-4">
                  <p className="text-white font-bold text-xl mb-4 tracking-tight drop-shadow-lg">&gt; {t.hero_p_line1}</p>
                  <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed break-keep">
                    {t.hero_p_line2}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('about')}
                  className="group relative px-16 py-8 bg-white hover:bg-slate-100 transition-all duration-500 rounded-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center space-x-6 hover:scale-105 active:scale-95"
                >
                  <span className="text-slate-950 text-base font-black tracking-[0.1em] uppercase">{t.cta}</span>
                  <ArrowRight className="text-slate-950 group-hover:translate-x-3 transition-transform" size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-20">
            <div className="text-[8px] font-black text-white tracking-[0.4em] uppercase mb-4">SCROLL</div>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </section>
      )}

      {/* 3. CORE STATS SECTION (MAIN VIEW ONLY) */}
      {view === 'main' && (
        <section ref={statsRef} className="bg-slate-900 border-y border-white/5 relative z-10">
          <div className="container mx-auto px-0 md:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <StatBoxItem
                icon={History}
                label={t.stats_history_label}
                value={t.stats_history_val}
                suffix="+"
                sub={t.stats_history_sub}
                isVisible={statsVisible}
              />
              <StatBoxItem
                icon={Users}
                label={t.stats_partners_label}
                value={t.stats_partners_val}
                suffix="+"
                sub={t.stats_partners_sub}
                isVisible={statsVisible}
              />
              <StatBoxItem
                icon={Database}
                label={t.stats_samples_label}
                value={t.stats_samples_val}
                suffix="+"
                sub={t.stats_samples_sub}
                isVisible={statsVisible}
              />
              <StatBoxItem
                icon={Settings}
                label={t.stats_defect_label}
                value={t.stats_defect_val}
                suffix="%"
                subTop={t.stats_defect_sub_top}
                sub={t.stats_defect_sub}
                isVisible={statsVisible}
                pink={true}
                showArrow={true}
              />
            </div>
          </div>
        </section>
      )}

      {/* 4. DASHBOARD PREVIEW (MAIN VIEW ONLY) */}
      {view === 'main' && (
        <section className="py-24 md:py-40 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-10">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-50 rounded-full mix-blend-multiply opacity-70"></div>
                <div className="relative aspect-square bg-slate-100 rounded-sm overflow-hidden group shadow-2xl">
                  <VisualPlaceholder text="KNITTING INFRASTRUCTURE" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-sm">
                    <button onClick={() => navigateTo('about')} className="bg-white text-slate-900 px-8 py-4 text-[10px] font-black tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                      View Infrastructure
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 bg-white p-8 shadow-2xl border border-slate-100 hidden md:block animate-bounce-slow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center text-white">
                      <Zap size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</div>
                      <div className="text-xl font-bold text-slate-900 leading-none">Fast-Track</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">자체 공장 직영으로 통상적인 납기보다 20% 빠른 생산 속도를 보장합니다.</p>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center space-x-3 mb-6">
                  <div className="w-10 h-[1px] bg-indigo-600"></div>
                  <span className="text-xs font-black text-indigo-600 tracking-[0.3em] uppercase">{t.biz_sub}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-10 italic">
                  {t.biz_title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                  {/* UNIT 01: Knitting / Raw */}
                  <div
                    onClick={() => navigateTo('knitting')}
                    className="group relative h-[450px] bg-[#0a0c10] rounded-sm overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-white/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 z-0 scale-100 group-hover:scale-110 transition-transform duration-1000">
                      <VisualPlaceholder dark={true} imageSrc="https://images.unsplash.com/photo-1558444479-c8a5105232eb?auto=format&fit=crop&q=80&w=800" text="KNITTING FACTORY" />
                      <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/30 transition-colors duration-700"></div>
                    </div>

                    <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                      <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-indigo-600/30">
                        <Factory size={20} />
                      </div>
                      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-3">Unit 01</div>
                      <h3 className="text-3xl font-black text-white mb-5 italic tracking-tighter uppercase leading-none md:text-3xl">
                        {t.sector_a_title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-6 opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-700 break-keep">
                        {t.sector_a_p}
                      </p>
                      <div className="flex items-center space-x-3 text-white text-[10px] font-black tracking-widest uppercase opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-opacity">
                        <span>Explore Infrastructure</span>
                        <ArrowRight size={12} className="md:group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* UNIT 02: Processed Inventory */}
                  <div
                    onClick={() => navigateTo('processing')}
                    className="group relative h-[450px] bg-[#0a0c10] rounded-sm overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-white/5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 z-0 scale-100 group-hover:scale-110 transition-transform duration-1000">
                      <VisualPlaceholder dark={true} imageSrc="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800" text="FABRIC INVENTORY" />
                      <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/30 transition-colors duration-700"></div>
                    </div>

                    <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                      <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-indigo-600/30">
                        <Layers size={20} />
                      </div>
                      <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-3">Unit 02</div>
                      <h3 className="text-3xl font-black text-white mb-5 italic tracking-tighter uppercase leading-none md:text-3xl">
                        {t.sector_b_title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-6 opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-700 break-keep">
                        {t.sector_b_p}
                      </p>
                      <div className="flex items-center space-x-3 text-white text-[10px] font-black tracking-widest uppercase opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-opacity">
                        <span>Check Inventory</span>
                        <ArrowRight size={12} className="md:group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('about')}
                  className="flex items-center space-x-4 text-slate-900 hover:text-indigo-600 transition-all group"
                >
                  <span className="text-xs font-black tracking-[0.2em] uppercase">{t.learn_more}</span>
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ChevronRight size={18} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      )
      }

      {/* 5. SIGNATURE INVENTORY SLIDER (MAIN VIEW ONLY) */}
      {
        view === 'main' && (
          <section className="py-24 md:py-40 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center">
              {/* Redesigned Header */}
              <div className="text-center mb-20 md:mb-32">
                <h2 className="text-[12vw] md:text-[8rem] font-black leading-[0.8] tracking-tighter mb-12 italic uppercase">
                  <span className="text-slate-950 block">Signature</span>
                  <span className="text-indigo-600 block">Archive.</span>
                </h2>
                <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed italic break-keep">
                  {t.inventory_p}
                </p>
              </div>

              <div
                className="w-full relative cursor-grab active:cursor-grabbing select-none mb-20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setIsHovered(false); handleDragEnd(); }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translateX(calc(-${currentSlide * slideWidth}% + ${dragOffsetX}px))`,
                    transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.23,1,0.32,1)' : 'none'
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {CLONED_PRODUCTS.map((p, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 px-3 transition-all duration-500"
                      style={{ width: `${slideWidth}%` }}
                    >
                      <div
                        onClick={() => !isDragging && setSelectedProduct(p)}
                        className="bg-white group/card rounded-sm overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                      >
                        <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
                          <VisualPlaceholder text={p.engName} imageSrc={p.imageSrc} cloudinaryId={p.cloudinaryId} />
                          <div className="absolute inset-0 bg-indigo-600/0 group-hover/card:bg-indigo-600/10 transition-colors duration-500"></div>
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 opacity-0 group-hover/card:opacity-100 transform translate-x-4 group-hover/card:translate-x-0 transition-all duration-500">
                            <Plus size={16} />
                          </div>
                          <div className="absolute bottom-6 left-6">
                            <div className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">{p.code}</div>
                            <div className="text-xl font-black text-white leading-none tracking-tight">{lang === 'KR' ? p.name : (p.engName || p.name)}</div>
                          </div>
                        </div>
                        <div className="p-8">
                          <div className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mb-4 font-mono">{p.material}</div>
                          <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 h-8">{p.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Dots */}
                <div className="flex justify-center mt-12 space-x-2">
                  {SIGNATURE_PRODUCTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setIsTransitioning(true); setCurrentSlide(i + slideCount); }}
                      className={`h-1 transition-all duration-500 ${currentSlide % slideCount === i ? 'w-12 bg-indigo-600' : 'w-4 bg-slate-200'}`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* View All Button (Styled like reference) */}
              <button
                onClick={() => navigateTo('processing')}
                className="group flex items-center space-x-6 text-slate-950 hover:text-indigo-600 transition-all"
              >
                <span className="text-xs font-black tracking-[0.2em] uppercase">{t.dashboard_inventory_cta}</span>
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center group-hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all group-hover:scale-110">
                  <ArrowRight size={18} />
                </div>
              </button>
            </div>
          </section>
        )
      }

      {/* 6. ABOUT SECTION (THE ROOT) */}
      {
        view === 'about' && (
          <section className="bg-slate-900 text-white min-h-screen pt-40 pb-24 overflow-hidden relative">
            <div className="container mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center">
              {/* About Hero - Centered High-Impact */}
              <div className="text-center mb-40">
                <div className="inline-block px-4 py-1 border border-indigo-500/30 text-indigo-400 text-[10px] font-black tracking-[0.3em] uppercase mb-12 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {t.about_hero_tag}
                </div>

                <h2 className="text-[12vw] md:text-[8rem] font-black leading-[0.8] tracking-tighter mb-16 italic uppercase animate-in fade-in zoom-in-95 duration-1000">
                  <span className="text-white block">Hwoasung</span>
                  <span className="text-indigo-500 block">Roots.</span>
                </h2>

                <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                  <p className="text-indigo-400 font-mono text-xl md:text-2xl mb-8 leading-tight break-keep italic">{t.about_hero_motto}</p>
                  <div className="h-[1px] w-20 bg-indigo-500/50 mx-auto mb-10"></div>
                  <p className="text-slate-400 text-xl md:text-2xl leading-relaxed font-medium break-keep">
                    {t.about_hero_sub}
                  </p>
                </div>
              </div>

              {/* Centered Image Placeholder */}
              <div className="w-full max-w-6xl mx-auto relative aspect-video bg-slate-800 rounded-sm overflow-hidden group shadow-[0_0_100px_rgba(79,70,229,0.15)] mb-40 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                <VisualPlaceholder text="HWOASUNG_ARCHIVE_FOOTAGE" dark={true} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                {/* Indicator Dots */}
                <div className="absolute bottom-10 right-10 flex space-x-3">
                  {[0, 1].map(idx => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-500 ${heroImgIndex === idx ? 'bg-indigo-500 w-8' : 'bg-white/20'}`}></div>
                  ))}
                </div>
              </div>

              {/* Core Expertise Grid */}
              <div className="mb-40">
                <div className="flex items-center space-x-6 mb-20 group">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black italic shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">HS</div>
                  <h3 className="text-3xl font-black tracking-tighter italic uppercase">{t.about_expertise_title}</h3>
                  <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-sm overflow-hidden">
                  {[
                    { t: t.expertise_01_t, d: t.expertise_01_d, icon: Search },
                    { t: t.expertise_02_t, d: t.expertise_02_d, icon: Layers },
                    { t: t.expertise_03_t, d: t.expertise_03_d, icon: ShieldCheck }
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-900 p-12 hover:bg-slate-800 transition-colors group">
                      <item.icon className="text-indigo-500 mb-8 group-hover:scale-110 transition-transform" size={32} />
                      <h4 className="text-2xl font-black mb-6 tracking-tight italic">{item.t}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed font-medium break-keep">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Flow */}
              <div className="mb-40">
                <div className="text-center mb-24">
                  <div className="text-[10px] font-black text-indigo-500 tracking-[0.4em] uppercase mb-4">{t.about_process_tag}</div>
                  <h3 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase">{t.about_process_title}</h3>
                </div>

                <div className="relative">
                  {/* Linear Connection Hidden on Mobile */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden lg:block -translate-y-1/2"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                    {[
                      { t: t.step_01_t, d: t.step_01_d, icon: Monitor },
                      { t: t.step_02_t, d: t.step_02_d, icon: Factory },
                      { t: t.step_03_t, d: t.step_03_d, icon: Activity },
                      { t: t.step_04_t, d: t.step_04_d, icon: CheckCircle2 }
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-white/5 flex items-center justify-center mb-8 group-hover:border-indigo-500 transition-all duration-500 shadow-2xl relative">
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black italic">0{i + 1}</div>
                          <step.icon size={28} className="text-indigo-400 group-hover:text-white transition-colors" />
                        </div>
                        <h4 className="text-xl font-bold mb-4 italic tracking-tight">{step.t}</h4>
                        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">{step.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Infrastructure Closing */}
              <div className="py-32 border-t border-white/5 flex flex-col items-center">
                <div className="max-w-4xl text-center">
                  <div className="w-20 h-20 mx-auto mb-12 rounded-2xl bg-indigo-600 rotate-12 flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black mb-12 italic tracking-tighter leading-tight break-keep">
                    {t.about_closing}
                  </h3>
                  <button
                    onClick={() => navigateTo('knitting')}
                    className="group relative px-12 py-6 bg-white hover:bg-indigo-600 transition-all duration-500 rounded-full"
                  >
                    <div className="relative z-10 flex items-center space-x-4">
                      <span className="text-slate-900 group-hover:text-white text-xs font-black tracking-[0.2em] uppercase">{t.dashboard_inventory_cta}</span>
                      <ArrowRight className="text-slate-900 group-hover:text-white group-hover:translate-x-2 transition-transform" size={18} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* 7. BUSINESS UNITS (ARCHIVE EXPLORER) */}
      {
        (view === 'knitting' || view === 'processing') && (
          <section className="bg-[#f8f9fa] min-h-screen pt-32 pb-24 overflow-hidden">
            <div className="container mx-auto px-6 md:px-10 h-full">
              <div className="flex flex-col lg:flex-row gap-12 items-start h-full">

                {/* Fixed Sidebar for Category/Filter */}
                <aside className="w-full lg:w-80 lg:sticky lg:top-40 space-y-12">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-[2px] bg-indigo-600"></div>
                      <span className="text-[10px] font-black text-indigo-600 tracking-[0.4em] uppercase">Archive Explorer</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">
                      Technical<br />Archive
                    </h2>
                  </div>

                  <nav className="space-y-2 border-l border-slate-200 pl-6">
                    <button
                      onClick={() => navigateTo('knitting')}
                      className={`block w-full text-left py-2 text-sm font-black transition-all group ${view === 'knitting' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <span className={`inline-block w-2 h-2 rounded-full mr-3 transition-all ${view === 'knitting' ? 'bg-indigo-600 scale-125' : 'bg-transparent border border-slate-300'}`}></span>
                      KNITTING UNIT
                    </button>
                    <button
                      onClick={() => navigateTo('processing')}
                      className={`block w-full text-left py-2 text-sm font-black transition-all group ${view === 'processing' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <span className={`inline-block w-2 h-2 rounded-full mr-3 transition-all ${view === 'processing' ? 'bg-indigo-600 scale-125' : 'bg-transparent border border-slate-300'}`}></span>
                      PROCESSING UNIT
                    </button>
                  </nav>

                  <div className="p-8 bg-white border border-slate-100 rounded-sm space-y-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</div>
                      <div className="text-[10px] font-bold text-slate-900 uppercase">{view === 'knitting' ? 'Knitted' : 'Processed'}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</div>
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold text-slate-900 uppercase">Live Archive</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Entries</div>
                      <div className="text-[10px] font-mono font-bold text-indigo-600">
                        {String((view === 'knitting' ? productsObj.knitting : productsObj.processed).length).padStart(3, '0')}
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main Product Grid */}
                <div className="flex-1 w-full h-full">
                  <div className="mb-12 flex items-center bg-white p-6 border border-slate-100 rounded-sm shadow-sm justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-slate-50 rounded-sm border border-slate-100 text-indigo-600">
                        {view === 'knitting' ? <Monitor size={20} /> : <Factory size={20} />}
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Selected Unit</div>
                        <div className="text-sm font-black uppercase text-slate-900 italic tracking-tight">{view === 'knitting' ? 'Unit 01: Circular Knitting' : 'Unit 02: Specialized Processing'}</div>
                      </div>
                    </div>
                    <div className="hidden md:block text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Hwoasung Textile R&D Center</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {(view === 'knitting' ? productsObj.knitting : productsObj.processed).map(p => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-indigo-500 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-1"
                      >
                        {/* Technical Aspect Header */}
                        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                          <span className="text-[9px] font-black text-indigo-600/60 uppercase tracking-widest font-mono">SPEC://{p.code}</span>
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                          </div>
                        </div>

                        {/* Image Presentation */}
                        <div className="aspect-[4/5] relative overflow-hidden bg-white p-4">
                          <div className="w-full h-full rounded-sm overflow-hidden relative shadow-inner">
                            <VisualPlaceholder text={p.engName} imageSrc={p.imageSrc} cloudinaryId={p.cloudinaryId} />
                            {/* Scanning Line Animation */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent w-full h-[2px] -top-full group-hover:top-full transition-all duration-[2000ms] ease-in-out pointer-events-none"></div>
                          </div>
                        </div>

                        {/* Data Sheet Content */}
                        <div className="p-6 pt-2 flex-1 flex flex-col space-y-4">
                          <div>
                            <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight italic mb-1">{lang === 'KR' ? p.name : (p.engName || p.name)}</h3>
                            <div className="w-8 h-1 bg-slate-200 group-hover:w-16 group-hover:bg-indigo-500 transition-all duration-500"></div>
                          </div>

                          <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 h-8 font-medium italic break-keep">{p.desc}</p>

                          <div className="pt-4 mt-auto border-t border-slate-100 grid grid-cols-2 gap-px bg-slate-100">
                            <div className="bg-white py-3 px-1 text-center">
                              <div className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-tighter">Material</div>
                              <div className="text-[10px] font-bold text-slate-800 uppercase truncate px-2">{p.material || 'N/A'}</div>
                            </div>
                            <div className="bg-white py-3 px-1 text-center border-l border-slate-100">
                              <div className="text-[8px] font-black text-slate-400 uppercase mb-1 tracking-tighter">Density</div>
                              <div className="text-[10px] font-bold text-slate-800 uppercase truncate px-2">{p.weight || 'N/A'}</div>
                            </div>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-600 transition-colors duration-500">
                          <span className="text-[9px] font-black text-slate-400 group-hover:text-white/80 uppercase tracking-widest">Explore Details</span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* 8. CONTACT SECTION (COMMON) */}
      <section className="bg-slate-50 py-24 md:py-40 border-t border-slate-100 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-stretch">
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-10 h-[1px] bg-indigo-600"></div>
                <span className="text-xs font-black text-indigo-600 tracking-[0.3em] uppercase">Partnership</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter italic mb-12">
                {t.contact_title} <br />
                <span className="text-indigo-600 not-italic">{t.contact_span}</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium mb-16 max-w-lg leading-relaxed break-keep">
                {t.contact_sub}
              </p>

              <div className="space-y-10">
                <div className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Office & Factory</div>
                    <div className="text-lg font-bold text-slate-900 break-keep">{t.address}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <Phone size={24} />
                  </div>
                  <div className="flex gap-10">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TEL</div>
                      <div className="text-lg font-black text-slate-900 hover:text-indigo-600 transition-colors uppercase font-mono">{t.tel}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">FAX</div>
                      <div className="text-lg font-black text-slate-900 uppercase font-mono">{t.fax}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group cursor-pointer" onClick={() => window.location.href = `mailto:${t.email}`}>
                  <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</div>
                    <div className="text-lg font-black text-slate-900 hover:text-indigo-600 transition-colors uppercase font-mono border-b-2 border-slate-900/10 group-hover:border-indigo-600/30 transition-all">{t.email}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 h-[350px] md:h-auto min-h-[350px] md:min-h-[500px] bg-slate-200 rounded-sm overflow-hidden shadow-2xl relative border-4 md:border-8 border-white mt-10 lg:mt-0">
              <InteractiveMap naverUrl={NAVER_MAP_URL} />
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-900 pt-24 pb-12 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center text-white font-black text-[10px]">HS</div>
                <span className="text-white font-bold tracking-widest text-lg uppercase">{t.brand}</span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-xs">{t.about_hero_sub}</p>
            </div>
            <div className="md:col-start-3 space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Navigation</h4>
              <button onClick={() => navigateTo('main')} className="block text-slate-500 hover:text-white text-xs transition-colors uppercase font-bold tracking-widest leading-none">{t.home}</button>
              <button onClick={() => navigateTo('about')} className="block text-slate-500 hover:text-white text-xs transition-colors uppercase font-bold tracking-widest leading-none">{t.about}</button>
              <button onClick={() => navigateTo('knitting')} className="block text-slate-500 hover:text-white text-xs transition-colors uppercase font-bold tracking-widest leading-none">{t.knitting}</button>
              <button onClick={() => navigateTo('processing')} className="block text-slate-500 hover:text-white text-xs transition-colors uppercase font-bold tracking-widest leading-none">{t.processing}</button>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">Contact</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{t.tel}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{t.email}</p>
              <p className="text-indigo-500 text-[10px] font-black uppercase tracking-widest mt-6">{t.hours}</p>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              <span>COPYRIGHT © HWOASUNG TEXTILE. ALL RIGHTS RESERVED.</span>
              <button
                onClick={() => setView('admin')}
                className="hover:text-white transition-colors uppercase tracking-[0.2em] opacity-0 hover:opacity-100"
              >
                Manage Site
              </button>
            </div>
            <div className="flex items-center space-x-6 text-slate-600">
              <Globe size={16} />
              <div className="text-[10px] font-black uppercase tracking-widest">South Korea / Yeoncheon</div>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. PRODUCT DETAIL MODAL */}
      {
        selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl" onClick={() => setSelectedProduct(null)}></div>
            <div className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500 origin-center">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white text-slate-900 border border-slate-100 flex items-center justify-center transition-all duration-300 group shadow-xl"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>

              <div className="w-full md:w-1/2 bg-slate-100 relative">
                <VisualPlaceholder text={selectedProduct.engName} cloudinaryId={selectedProduct.cloudinaryId} imageSrc={selectedProduct.imageSrc} />
                <div className="absolute top-10 left-10">
                  <div className="w-16 h-1 bg-indigo-600 mb-6"></div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2 font-mono">{selectedProduct.code}</div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">{lang === 'KR' ? selectedProduct.name : (selectedProduct.engName || selectedProduct.name)}</h3>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto max-h-[80vh] md:max-h-none">
                <div className="mb-12">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-8 flex items-center">
                    <div className="w-4 h-4 rounded-full border border-indigo-200 flex items-center justify-center mr-3"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div></div>
                    {t.label_technical}
                  </h4>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                    <div>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t.label_raw}</div>
                      <div className="text-xs font-bold text-slate-900">{selectedProduct.material}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t.label_structure}</div>
                      <div className="text-xs font-bold text-slate-900">{selectedProduct.structure}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t.label_density}</div>
                      <div className="text-xs font-bold text-slate-900">{selectedProduct.weight}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t.label_width}</div>
                      <div className="text-xs font-bold text-slate-900">{selectedProduct.width}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{t.label_color}</div>
                      <div className="text-xs font-bold text-slate-900">{selectedProduct.colors}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-8 flex items-center">
                    <div className="w-4 h-4 rounded-full border border-indigo-200 flex items-center justify-center mr-3"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div></div>
                    {t.label_logic}
                  </h4>
                  <div className="space-y-4">
                    {selectedProduct.features.map((f, i) => (
                      <div key={i} className="flex items-start space-x-3 group">
                        <CheckCircle2 size={14} className="text-indigo-600 mt-0.5" />
                        <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-6 bg-slate-900 hover:bg-indigo-600 text-white transition-all duration-500 flex items-center justify-center space-x-4 group shadow-xl shadow-slate-900/10">
                  <span className="text-xs font-black tracking-widest uppercase">{t.cta_quote}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* 11. MOBILE MENU OVERLAY */}
      {
        isMobileMenuOpen && (
          <div className="fixed inset-0 z-[150] bg-white animate-in slide-in-from-right duration-500">
            <div className="p-6 md:p-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white font-black text-[10px]">HS</div>
                  <span className="font-bold text-xl tracking-[0.15em] leading-none uppercase">{t.brand}</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center text-slate-900 border border-slate-100"><X size={24} /></button>
              </div>

              <div className="flex flex-col space-y-10">
                <button onClick={() => navigateTo('main')} className="text-left group">
                  <span className="text-[10px] font-mono text-indigo-600 block mb-1">01</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:pl-4 transition-all duration-500">{t.home}</span>
                </button>
                <button onClick={() => navigateTo('about')} className="text-left group">
                  <span className="text-[10px] font-mono text-indigo-600 block mb-1">02</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:pl-4 transition-all duration-500">{t.about}</span>
                </button>
                <button onClick={() => navigateTo('knitting')} className="text-left group">
                  <span className="text-[10px] font-mono text-indigo-600 block mb-1">03</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:pl-4 transition-all duration-500">{t.knitting}</span>
                </button>
                <button onClick={() => navigateTo('processing')} className="text-left group">
                  <span className="text-[10px] font-mono text-indigo-600 block mb-1">04</span>
                  <span className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic group-hover:pl-4 transition-all duration-500">{t.processing}</span>
                </button>
              </div>

              <div className="mt-auto py-10 border-t border-slate-100">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Support & Inquiry</div>
                <div className="text-xl font-black text-slate-900 font-mono mb-2">{t.tel}</div>
                <div className="text-xs font-bold text-slate-500">{t.email}</div>
              </div>
            </div>
          </div>
        )
      }
      <FloatingButtons />
    </div>
  );
};

export default App;

