# Browser 04.1 — 화면·타이포 디테일 개선 / DRAFT
2026-10-23 KST

이전 04를 보존하고 사용자 요청에 따라 크기·문구 위치·글자/간격·모바일 읽기 크기를 다듬은 버전이다. 브랜드/5장면 변경이나 최종 디자인 승인 아님.

## 실행
실제 앱 파일은 src/concepts/browser04/Browser04.jsx, browser04.css, detail.css. 검토용 ?preview=renewal 경로만 이 컴포넌트를 렌더한다. 저장된 JSX의 ../../assets/knitting_unit.jpg는 src/assets 기존 자산을 가리킨다. browser04.css 후 detail.css를 로드해야 한다. npm run dev 후 http://127.0.0.1:5173/?preview=renewal. 이 폴더는 재개용 스냅샷이며 단독 실행 앱/영구 호스팅이 아니다.

## 디테일 원칙
- 제목은 34~100px의 범위에서 화면 폭에 맞춰 변화. 사진 경계에서 한 글자가 두 색으로 갈라지지 않는다.
- 첫 화면 높이는 화면 높이에 맞추되 작은 화면에서는 정상 세로 스크롤 허용. 중요한 내용은 잘라내지 않는다.
- 주요 본문 모바일 14px/PC 15px. 안내·캡션/영문 라벨은 역할에 따라 9~13px, 주요 버튼/링크는 44px 이상 터치 영역.
- 600px에서 모바일 세로 구성, 900px에서 메뉴/기록 레이아웃 전환, 1100px에서 문의 단일 열 전환. 대형 콘텐츠 최대 너비 제한.
- 원단 카드 라벨·화살표 분리, 한글 단어 단위 줄바꿈, 긴 연락처 줄바꿈 방어.
- native dialog 높이는 동적 viewport에 맞추고 닫기 버튼은 스크롤 중 접근 가능하게 유지.

캡처: captures/desktop-1440.png, captures/mobile-390.png. 수치: responsive-checks.json. 실제 검사/한계는 ../../reviews/browser-04-1.md.
