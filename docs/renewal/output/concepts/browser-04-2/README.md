# Browser 04.2 — 간결한 원단 탐색 → 제조 현장 / DRAFT
2026-10-24 KST · F-015/016 · D-057

04.1을 보존하고 원단 장면을 압축했다. 초기 원단 노출을 긴 설득이나 상품 목록 소진 단계가 아닌 취급 원단·사용처 확인으로 재정의한다. 구체 화면의 최종 승인은 별개다.

- 주력 4종은 동일한 크기의 작은 썸네일+이름으로 빠르게 확인. 보드레 추가 접근 유지.
- 원단 선택은 안내 모달, 사용처 선택은 해당 용도의 문의 제목으로 연결.
- 제조 현장 장면을 바로 이어서 보여준다. 상세 사양/공급 조건은 개별 확인.
- 실제 제품 사진은 아직 미확보. 작은 그래픽에 실물 사진 대기 상태를 명시.
- 모달 닫기 후 실행 버튼으로 초점 복귀를 보완.

## 재개
실행 소스: src/concepts/browser04의 Browser04.jsx, browser04.css, detail.css, gateway.css. CSS는 이 순서로 import한다. factory import는 ../../assets/knitting_unit.jpg로 기존 앱 자산을 참조한다. 로컬 앱 npm run dev 후 http://127.0.0.1:5173/?preview=renewal. 이 폴더는 재현용 스냅샷이며 독립 앱/배포 URL이 아니다.

캡처: captures/desktop-1440.png, captures/mobile-390.png. 실제 QA: ../../reviews/browser-04-2.md. 수치: responsive-checks.json.
