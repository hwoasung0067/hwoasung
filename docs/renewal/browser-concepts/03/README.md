# Browser Concept 03 — DRAFT

2026-10-23 사용자 승인으로 Figma 필수 경로를 제외하고 브라우저 시안으로 전환. 브랜드/5장면/R2 방향 유지. 이 디렉터리는 디자인 검토용 소스 보관이며 운영 src/main 배포 변경이 아니다.

실행: 기존 React/Vite 프로젝트의 src 아래에 두 소스를 복사하고 Renewal.jsx의 ./assets/knitting_unit.jpg가 기존 src/assets를 가리키도록 유지한다. main.jsx에서 URLSearchParams(location.search).get('preview') === 'renewal'이면 Renewal을 렌더하고 나머지는 기존 App으로 둔다. 두 앱은 React.lazy로 각각 import하여 시안에서 기존 Firebase/Spline 모듈이 로드되지 않도록 한다. npm run dev 후 /?preview=renewal. 이 보관 폴더 자체는 자동 배포/실행 경로가 아니다.

원단 이미지: 실사 대기 레이아웃 그래픽. 제조 이미지: 기존 knitting_unit.jpg이며 촬영 원본 확인 예정. 최종 카피/색/타입/실사 미확정. 메일 접수 서버/발송은 없고 mailto 제목만 반영. 외부 링크는 기획서의 블로그 글. build 통과; PC/모바일 브라우저 QA는 별도 보고. Figma 기존 시안 보존, REV-002 미제작. 운영 홈페이지·main·DB·ERP·배포 변경 승인 없음.
