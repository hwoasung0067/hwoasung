# 화성섬유 Figma 첫 시안 현황 — Hero·Fabrics 탐색 v1
작성: 2026-10-23 KST
상태: **실제 Figma 편집 가능한 프레임 생성/검증 성공; 디자인 사용자 검토·문구/컬러/사진 채택 전, 운영 코드 수정/배포 없음**
Figma: https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP
페이지: `01_DIRECTIONS · Hero`, page id `4:4`.
기준: D-044 제조 전문성×가까운 소통, D-046 상징적인 A형 히어로, D-050 5장면 밝은 Tintex 에디토리얼×Arville 제조 실사 대비 조합 승인. `제조의 깊이를, 더 가깝게.` 작업 문구는 최종 슬로건 아님.

## 이번 제작으로 추가한 편집 가능한 디자인
- `EXP-001 | HERO | R2 editorial | Desktop 1440 | DRAFT` id `16:2` — 1440×900 밝은 에디토리얼 화면. HWOASUNG 로고 타입, 가독성 높은 한글 A형 메시지, 실제 자체 환편 기반 제조·공급 앵커와 `원단 살펴보기` CTA, 검증 전 공장 실사 교체 슬롯. [프레임 열기](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=16-2)
- `EXP-002 | HERO | R1 manufacturing | Desktop 1440 | DRAFT` id `16:28` — 1440×900 진한 제조 현장 몰입형 대안. **실제 자사 환편 장면 이미지 검수 전**으로 배경은 사진이 아니라 기하학적 레이아웃 가이드, 원단·제조 실사로 오해하지 않게 한국어 캡션. [프레임 열기](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=16-28)
- `EXP-003 | FIRST SCROLL | Fabric gateway | Desktop 1440 | DRAFT` id `16:54` — 1440×885 원단 갤러리 첫 스크롤. 폴라폴리스/인타록/T-R 싱글/DTY 싱글/보드레 대표군 5종, 사용처 본딩·누빔·담요·PU코팅의 짧은 연결 스트립. 실물 품목 이미지 검증 전이어서 추상 레이아웃 안내 그래픽으로만 표시. [프레임 열기](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=16-54)
- 세 프레임은 일반 프레임/텍스트/사각형으로 각 요소가 독립 수정 가능한 Figma 레이어. **실제 고객 제품이나 현장 사진이라고 주장하지 않음**. Figma에서 검증한 세 프레임의 TEXT 개수 각각 9/9/15개, 음수·0 크기의 텍스트 없음.

## 발견된 기존 디자인(동일 페이지에 이전 또는 병렬로 이미 존재함 — 이번에 생성한 것 아님)
검증 당시 프레임 목록에 같은 페이지에서 다음 4개가 추가로 확인됨: id `6:2` R2 Desktop, `6:23` R1 Desktop, `6:41` R2 Mobile 390×844, `6:55` R1 Mobile 390×844. **출처나 작성 시점은 확정할 수 없으므로 기존/병렬 프레임으로만 구분**. 삭제나 덮어쓰기를 하지 않고 보존.
- [기존/병렬 R2 PC](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-2), [기존/병렬 R1 PC](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-23)
- [기존/병렬 R2 모바일](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-41), [기존/병렬 R1 모바일](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-55)
- 디자인 검토 시 **이번 세 프레임과 기존 네 프레임을 혼동하지 않도록** 버전과 원본 확보 상태를 비교할 것.

## 이번 제작의 한계와 다음 기준
- 실제 환편 공정 GIF/JPG/제품별 Cloudinary 실물 이미지 원본 시각 검수 미완료. 배경 도형은 **실사 대체 슬롯임을 명시**. 실제 자사 이미지가 들어가고 모든 내용이 검증되기 전까지 완성 시안이라고 주장 금지.
- 모션은 Figma 정적 화면에서 **영상과 실제 웹 포인터 효과가 동작하는 것으로 구현했다고 주장하지 않음**. 스크롤·사진 reveal/hover는 프로토타입 또는 구현 사양으로 구분.
- 추천 유지: **R2 밝은 에디토리얼이 1순위**, 현장 몰입형 R1은 검증된 환편 현장 자료가 강할 때만 경쟁력 있는 대안. `EXP-003` 원단 갤러리는 제품명이 기초, 사용처는 통합형 작은 탐색으로.
- 이어질 디자인 QA: 모바일 원단 갤러리 실사 대체·텍스트, 전체 5개 섹션 PC/모바일, 실제 제품군 이미지 후보·공정 사진 검증, 한글 타이포 시각 비교, 사용자 한 번에 평가하기 좋은 Figma 비교 보드. 승인 전 Codex·운영 변경 금지.
