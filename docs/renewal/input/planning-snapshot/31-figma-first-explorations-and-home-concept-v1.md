# 화성섬유 홈페이지 — Figma 첫 디자인 시안 및 검증 기록 v1
날짜: 2026-10-23 KST
상태: **D-051 실제 Figma 디자인 초기안 제작 성공 / 최종 승인되지 않은 검토 시안. 현재 운영 사이트·main·DB·ERP 수정 없음.**
사전 승인된 방향: D-043 비언어적 브랜드 경험, D-044 제조 전문성×가까운 소통, D-046 상징 카피 방식, D-050 **H1 임시 브랜드 카피 + S1 5장면 + V1 밝은 편집×실사 제조 섹션** 기본 디자인 방향.
Figma Design Lab: https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP
파일키: `rvui4wljLmXy0BJXTM7IXP`
연결 계정 권한: Figma Starter 3 page 제한이 실제 생성 중 확인되어, 디자인 파일은 **3개 Figma 페이지**로 간략화. 기존 29의 제안 6~7개 페이지 대신 현재 실현 가능한 구조를 우선.

## 1. 완료된 실제 편집 가능한 디자인
**Page 00 — Brief & References**
- [Brief·Media·Working palette](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=0-1)
- 승인 브랜드 철학·5장면·H1 임시 문구/미디어 검수 필수 조건, 기존 실제 사이트에 쓰던 환편 이미지 `src/assets/knitting_unit.jpg`를 정확한 출처 주석과 함께 임베드. 임시 컬러 관계. 이미지와 텍스트는 Figma의 개별 편집 레이어.
- 같은 파일 내 실제 핀된 `knitting_unit.jpg` JPEG 데이터에서 만든 이미지 fill은 별도 레이어로 저장. 바이트 318420. 본문용 이미지 hash 1e20a432d013fc5033f8043d0530163405e77752. 기존 홈에서 사용 사실만 검증, 화성섬유 직접 촬영 원본/고화질 버전은 미검증.

**Page 01 — Hero explorations**
- [EXP-001 | R2 editorial | Desktop 1440](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-2)
- [EXP-002 | R1 factory immersive | Desktop 1440](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-23)
- [EXP-001 | R2 editorial | Mobile 390](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-41)
- [EXP-002 | R1 immersive | Mobile 390](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-55)
- 4개 프레임은 동일 H1 임시 카피 `제조의 깊이를, 더 가깝게.`와 동일 기존 편직 JPG로 디자인 구조만 비교 가능. R2는 밝고 따뜻한 편집 여백·사진/타이포 분리·명료한 제품 바로가기, R1은 어두운 산업 현장·큰 한글 문구 대비.
- **추천 R2 1순위 유지**: 자사 전문성+고객과 가까운 인상, 제품 탐색·모바일 명료성·영상 없어도 성립. R1은 자사 고화질 공정 자료 확보 시 참고.
- 이미지 프레임에는 현재 홈페이지 기존 이미지/원본 검수 필요 라벨 표시; 자사 촬영이라는 과장 금지.

**Page 02 — Homepage first whole-scroll concepts**
- [REV-001 | HOME | Desktop 1440 / 5 scenes](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=7-2)
- [REV-001 | HOME | Mobile 390 / 5 scenes](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=8-2)
- 승인된 S1 구조를 **실제 편집 가능한 Figma 화면의 세로 스크롤**로 구성: Hero→Our Fabrics + applications short list→Manufacturing (실제 편직 사진)→Field Notes(발행된 블로그 글 3개)→Closing(Contact).
- 폴라폴리스/인타록/T/R 싱글/DTY 싱글 4개 + 보드레 별도 진입. **실물 원단 사진을 아직 확보 못해 그리드 텍스처는 '편집 가능한 임시 그래픽'**으로만 사용. 화면에 제품 실물 사진을 추후 적용/검증해야 함을 명시. 해당 그래픽은 '실제 납품 제품 사진'으로 사용 금지.
- 제조 공정 사실은 `자체 편직` 대 `협력 염색·후가공` 구분. 브랜드 메시지 반복 주장 대신 현장 감성/실제 블로그 인사이트 연결.
- 스크린샷으로 복제한 한 장짜리 가짜 UI가 아니며, 한글/영문 텍스트·카드·사진·섹션·색각 요소가 **편집 가능한 노드**로 구성.

## 2. 실제 검증·품질 점검
- Figma 화면 렌더 캡처로 **R2 PC/모바일, R1 PC, 제품 PC/모바일, 전체 홈 PC/모바일, Brief** 디자인을 시각 확인.
- 현재 사진은 512×288 급 기존 사이트 편직 이미지로 고화질 배경을 완전히 채우기에는 부족. 정적 사진 모드로 우선 표현, 신규 영상 제작/포토 연출은 아직 보류.
- 기존 `processed_inventory.jpg`는 육안 확인 결과 **연출된 제품 원단 더미 이미지**라서 실제 보유 가공지 증거로 사용하기 부적절. 실제 화성섬유 제품 사진 4개+보드레 자료 추가 확보가 P0.
- `EST. 1990s`처럼 정확한 설립연도를 암시하는 미검증 표현을 시안에서 제거했음.
- 당초 계획 7개 페이지는 사용자 Figma Starter 제한으로 생성 시 에러→**3개 페이지로 구성 변경 성공**; 승인/반려·PC/모바일 레이어는 같은 페이지의 프레임 네이밍(EXP, REV, APP)으로 누적.

## 3. 아직 검토해야 할 사용자 선택·실물 자료(완료로 오인 금지)
- **H1** `제조의 깊이를, 더 가깝게.`는 Figma에 넣어 보는 우선 시안 문구이지 최종 브랜드 슬로건 확정 아님.
- 디자인 방향 D-050은 승인되었지만 실제 Figma 초기 시안 EXP/REV는 **사용자가 승인하지 않았음**. PC/모바일 시안의 글자 크기/색/원단 카드 질감/영상 효과 등은 아직 사용자 피드백 전.
- 주력 5개 원단군 실제 표면 실사·원단별 허용 사용 이미지·고화질 자사 환편 원본/영상 및 사용처 대표 이미지 확인이 필요. 현재 4종 제품 카드의 질감 선화는 임시 대체이며 실제 사진처럼 판단 금지.
- 기존 GIF 47.7MB는 성능/실제 프레임 확인 전 그대로 배포 금지.
- Figma의 애니메이션은 아직 프로토타입 수준도 미제작; 스크롤/hover 구현은 26·28 문서의 후보. 실제 모션 시안은 검토/소스 확보 후 진행.
- 홈페이지 제품군 상세 링크·Tally 문의 동작은 프레임의 **표현**이지 Figma의 실제 웹 기능 구현 완료를 뜻하지 않음.
- **개발·운영 배포 명시적 승인 전 금지** (D-041 유지).

## 4. 다음에 하면 좋을 실제 일
- Figma의 R2/R1 히어로와 전체 5장면 초안을 사용자에게 공개하고, **추천 R2의 강점과 R1의 단점, 현재 가공지/제품 사진 부족으로 인한 미완성**을 설명한다.
- 사용자는 원단 실사 및 편직 고화질 원본이 있다면 공유; 없다면 함께 촬영 우선순위를 정한다. 실물 자료가 불충분해도 레이아웃 평가는 가능하며, 실재 제품 사진 없이 디자인 완성/브랜드 인상 확정은 보류.
- 피드백 반영 REV-002 등 Figma 프레임 버전 축적; 수정 이유와 승인 상태를 GitHub decisions에 동기화.
- 초안 링크는 실제 Figma에 있는 node-id만 사용하고, 검증되지 않은 스크린샷 sandbox 경로는 임의 생성하지 않는다.
