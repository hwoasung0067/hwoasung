# 새 Chat 세션 시작 안내 — 화성섬유 홈페이지 리뉴얼
최초 작성: 2026-10-13 KST
주의: 이 문서는 시작 지시문이며, 대화/질문 없이 설계를 자동 확정하라는 뜻이 아니다.

## 복사할 시작 프롬프트

화성섬유 홈페이지 리뉴얼 프로젝트의 다음 단계로 이어서 진행하자.

GitHub 저장소: hwoasung0067/hwoasung
설계 브랜치: planning/website-renewal (main이 아님)
설계 폴더: docs/renewal/

먼저 반드시 아래 파일을 설계 브랜치에서 읽어줘:
1. docs/renewal/README.md
2. docs/renewal/project-state.md
3. docs/renewal/00-project-charter.md
4. docs/renewal/01-current-state-and-evidence.md
5. docs/renewal/02-inquiry-patterns.md
6. docs/renewal/03-business-strategy-workbook.md
7. docs/renewal/decisions.md

필요할 때 나머지 UX, 디자인, SEO, 기술, 로드맵 브리프도 읽어줘.

현재 단계는 Phase 1 사업·마케팅 전략의 심화 설계다.
지금까지 정리한 회사의 주력 공급 구조와 홈페이지 분석을 반복해서 처음부터 설명받지 말고, 미결정 사항 위주로 진행해줘.
우선 고객 유형과 우선 판매 제품군(실제 재고/생지/가공 가능 범위)을 정하고, 적합한 샘플 상담의 경계를 논의하자.
그 다음 제품 구매 중심 홈페이지 목표와 성공 지표 정의로 넘어가자.

설계안은 실제로 확인된 사실 / 해석 / 후보 / 사용자 승인 결정을 구분하고, 중요한 선택마다 대안·장단점·타 분야 영향(UX/디자인/SEO/기술/분석)을 설명해줘.
한 번에 전 영역을 완성하지 말고 한 전문 분야를 충분히 검토한 다음 결정 사항만 GitHub의 관련 문서·decisions.md·project-state.md에 저장해줘.
저장 시 파일 경로와 커밋 링크를 확인하고 알려줘.
실제 홈페이지 코드 수정, 운영 배포, 대규모 구조 변경, Codex 구현 지시는 내 승인 전에는 진행하지 마.
참고로 이 GitHub 저장소는 PUBLIC이라 Gmail 원문, 고객 개인정보, 세부 영업 데이터나 비공개 통계 수치를 커밋하면 안 돼.

## 시작 세션의 바람직한 첫 결과물
- 사업 전략에서 이미 충분히 확인된 것과 새로 결정할 것을 표로 구분.
- '우선 판매할 제품 2~4개'를 정할 수 있는 정보(제품별 샘플/보유 생지/공급 형태/반복성)를 확인.
- 문의 적합성 기준의 초안과 해당 기준에 대한 사용자 피드백.
- 우선순위를 확정한 뒤 03-business-strategy-workbook.md, decisions.md, project-state.md 갱신.

## 다음 분야
Phase 1 승인 후:
UX/사이트맵 → 디자인 레퍼런스/무드보드/화면 시안 → 콘텐츠·SEO/AI 검색 → 기술 선택·데이터/계측 → 통합 검증 → Codex 개발.

## 참고
- 설계브랜치는 아직 기본(main)에 합쳐지지 않음. GitHub 도구에서 ref=planning/website-renewal로 파일을 열어야 함.
- GSC Wizard와 GA4 데이터는 해당 도구에 다시 조회(서치콘솔 도메인 hwoasung.com). 공개 GitHub에는 원시 수치를 보관하지 않음.
- 사업용 Gmail의 홈페이지 Tally 문의는 필요할 때 해당 Gmail 계정에서 다시 검색하되 비공개 자료를 공개 커밋하지 않음.
- blog-agent의 현행 2026-10-13 '원단 판매 중심' 보정 문서가 예전 공장 편직 의뢰 우선 전략보다 우선.
