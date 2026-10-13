# 07. 기술 현황·아키텍처 검토 브리프
상태: 코드 읽기 기준 조사. 배포/운영 인프라와 보안 상태는 추가 확인 필요.

## 현재 소스 경로 (hwoasung/main에서 관찰)
- React 19 + Vite, Tailwind CSS 4, lucide-react.
- src/main.jsx → src/App.jsx 로드.
- src/App.jsx — 현재 홈/소개/비즈니스/문의/제품 인터페이스와 언어 전환을 상당 부분 단일 컴포넌트에서 담당.
- src/AdminPortal.jsx 및 v3/v4 버전 파일 존재. 현재 앱의 실제 참조는 AdminPortal.jsx (별도 버전 파일이 주 사용인지는 미확인).
- src/firebase.js — Firebase App / Firestore / Storage / Auth / Analytics 초기화.
- src/cloudinary.js — 제품 이미지 최적화 유틸.
- index.html — SEO 기본 메타, 외부 Tally / Cloudinary 업로드 위젯 / EmailJS 로드.
- src/App.jsx에는 Tally 문의 폼 embed, 정적+Firestore(products) 제품 데이터 합성 구조 존재.
- dist_v2, dist_v3, .firebase 등 과거 빌드·배포 흔적 존재. 실제 배포 주체/도메인 연결/자동 배포 경로는 미검증.
- 홈페이지와 Firebase Analytics 측정 ID의 일치로 관련성이 높으나, 최신 운영본과 코드의 완전 동일성은 증명하지 않음.

## 높은 우선순위 문제와 가설
1. 제품/메뉴 전환: view 상태(setView/navigateTo)로 관리하며 browser URL을 변경하지 않는 것으로 보임. GA4 페이지가 '/'로만 집계되는 문제를 설명할 수 있음.
2. 제품 상세가 selectedProduct 모달: 상세 고유 URL이 없으면 제품별 자연 검색·직접 공유·통계 추적에 한계.
3. 핵심 정보가 Firestore에서 동적으로 로드됨: 봇이 렌더링하는 최종 HTML과 색인 가능 여부 실험 필요.
4. index.html의 OG 대표 URL 일부가 과거 vercel.app과 현재 도메인으로 혼재. 실제 서비스와 비교 점검.
5. SEO 메타 useEffect에 의한 동적 변경이 있어도 독립 URL과 크롤러 확인이 필요함.
6. 프런트엔드에서 관리자 뷰로의 진입은 별도의 라우트라기보다 화면 상태로 처리되는 것으로 보임. 인증·Firestore 규칙·권한/노출 점검 필요(취약하다고 단정하지 않음).
7. 일부 페이지에 무거운 3D iframe(Spline) 등장: 모바일 성능/접근성과 전환 기여 여부 점검.
8. Cloudinary, Tally, Firebase 데이터 보존과 인증/키 관리 규칙이 리뉴얼 변경에 영향을 미침.

## 시작 전에 검증할 기술 질문
- 운영 도메인의 DNS/실제 호스팅/CI-CD가 어떤 저장소·브랜치·커밋을 참조하는가?
- 현재 Firestore products 스키마, 정적 데이터, 관리자 CRUD, 사용 중인 이미지 저장소는?
- 실제 운영 GA4 수집·GSC 소유 확인, 도메인 canonical/robots/sitemap은?
- Tally 폼과 이메일 알림은 어떤 방식으로 저장·전달되며 기존 제출 흐름이 유지되는가?
- 실제 운영 개인정보와 관리자 인증의 접근 권한·보관 정책은?
- 페이지 경로를 도입할 경우 Vite SPA 라우팅 + 프리렌더/SSR 중 어떤 방식이 현재 비용/관리 환경에 적합한가?
- 데이터/URL 마이그레이션 없이 점진 전환 가능한가?

## 구현 안전 원칙
- 메인 운영 브랜치, 배포, 제품 데이터, 관리 기능을 최초 설계 단계에서 수정하지 않는다.
- branch/deployment 분리, 운영 데이터 백업 및 복원 절차부터 작성.
- 기술 변경은 제품 상세 고유 URL과 analytics 이벤트를 포함해 단계별로 테스트.
- 별도 미리보기 환경(실데이터 읽기/수정 권한 최소)에서 QA 수행하고 승인 후 배포.
- 비밀키, Firebase service account, 비공개 API 토큰, 고객명부를 GitHub 문서/코드에 추가 금지.
- 실 서비스 환경의 공개 firebaseConfig 객체와 비밀 서버 키는 구분; 보안은 DB Rules/Auth 실제로 검증.
- 새 관리자 방식/프레임워크 전환은 영향 분석과 명시적 승인 전에는 미결.

## Codex로 넘길 때
승인된 분야별 문서를 근거로 요구사항 ID, 기존 변경 허용 범위, 금지 범위, 테스트 커맨드, 검증 자료, rollback 계획을 함께 제공. 대규모 리팩터링을 자동 수행하지 말 것.
