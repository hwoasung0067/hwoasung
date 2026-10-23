# 화성섬유 홈페이지 리뉴얼 — 설계 허브
- 최초 기록일: 2026-10-13 (KST) / 상태 점검: 2026-10-16 (KST)
- 프로젝트: https://github.com/hwoasung0067/hwoasung
- 설계 전용 브랜치: planning/website-renewal
- 실제 운영 사이트: https://www.hwoasung.com/
- 프로젝트 상태: **D-051 최신 — Figma 첫 실제 편집 가능한 시안 제작 완료.** R2/R1 히어로 PC·모바일 4개 + 5장면 전체 홈 PC·모바일 2개. [Figma Design Lab](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP) / [31 제작·QA 로그](31-figma-first-explorations-and-home-concept-v1.md). H1은 임시 카피, 원단 제품 사진은 자리표시이며 원본 실사/사용자 시안 승인 전. 운영 구현/배포 X.
- **현재 문서는 승인된 구현 명세가 아니다. 소스코드 수정·배포 금지.**

## 새 세션은 이 문서부터 읽으세요 (2026-10-23 최신)
- **[00-CURRENT-HANDOFF.md — 최신 통합 인계 / 확정·미승인·실제 Figma 9프레임 / 최근 도구 접근 장애 / 다음 할 일](00-CURRENT-HANDOFF.md)** ← **새 세션의 첫 번째 읽기 문서**. `project-state.md` 첫머리, `decisions.md` 최신, `32-figma-rev002-resume-brief-v1.md`와 함께 최신 상태 판단.
- 연결 Figma **[HWOASUNG Design Lab](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP)** 파일에 실제 편집 가능한 초기 시안이 **2회에 걸쳐 9개 프레임 이력상 기록**됨. R2/R1 시안·REV-001 PC/모바일·원단 첫 스크롤; **REV-002 미제작**. Figma Starter MCP 호출 한도/Cloud Browser 접속 오류가 최근 재개 시도에서 발생한 상태. 시안 확정/원단 실사 검증/운영 구현은 아님.
- **새 세션 진행법:** 먼저 00 handoff를 그대로 참조한 후 저장소의 최신 브랜치를 직접 읽고, 과거 결정 반복 질문 없이 기존 디자인의 검토/수정부터 진행. 사용자의 실제 결정이 필요할 때만 근거와 1순위 추천+대안 설명.

## 브랜딩을 다시 고민할 때 가장 먼저 볼 문서
**[19. 브랜드 전략 고민 요소·점검 질문 기준서](19-brand-strategy-review-framework-v1.md)** — 사용자가 직접 중요하다고 밝힌 '브랜딩은 설득', 구매자 니즈·고민/거래처 변경 동기·화성섬유만의 선택 이유(해자)·스크롤에 따른 신뢰·증거·제품/상담까지를 **미래 재검토용 12개 질문과 10개 검사**로 보존. 일반 제조사 소개로 돌아가지 않도록 새 홈페이지 시안 전에 반드시 참조한다.

연결 문서: [17 설득/해자 재설계](17-buyer-persuasion-and-moat-reframe-v1.md) / [18 blog-agent 브랜드 자산 근거](18-blog-agent-brand-evidence-audit-v1.md) / [15 Arville·Tintex 레퍼런스](15-verified-website-design-references-v1.md).
**참고:** 체크리스트 확정은 새로운 카피/해자 우월성/웹 시안·코드 구현 승인과 다르다.

## D-051 Figma 첫 시안 및 실제 링크
- **[31. R2/R1 첫 히어로 4안·PC/모바일 전체 5장면 편집 시안 제작/QA](31-figma-first-explorations-and-home-concept-v1.md)** — Figma 파일에 사용자가 실제로 볼 수 있는 레이어형 화면 6개 생성. 이미지 실사 검증 필요·원단 실물 사진은 자리표시. Figma Starter 3페이지 제한 적용.
- [히어로 R2 PC](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-2) · [히어로 R1 PC](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=6-23) · [전체 홈 PC](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=7-2) · [전체 홈 모바일](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=8-2).

## D-051 실제 Figma 첫 디자인 작업
- **[31. 히어로 R2/R1 2안·원단 갤러리 첫 스크롤](31-figma-initial-hero-and-fabric-drafts-v1.md)**: 현재 파일에서 실제 편집 가능한 [밝은 에디토리얼 Hero](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=16-2), [제조 몰입 Hero](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=16-28), [원단 5군 갤러리](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP?node-id=16-54) 세 프레임 신규 제작. 원본 화성섬유 현장/제품 사진 미검수로 사진 아닌 **명시적 그래픽 플레이스홀더** 사용, 모두 DRAFT. 기존/병렬 동일 페이지 PC/모바일 프레임도 별도 존재·보존함.

## D-050 기본 디자인 방향 승인 및 Figma 파일 생성
- **사용자 '그렇게 해보자'로 H1 임시 문구+S1 5장면+V1 밝은 에디토리얼×제조 현장 대비 조합을 기본 시안 방향으로 채택**. H1 글자 자체 최종 슬로건 확정 아님.
- **[HWOASUNG Website Renewal Design Lab](https://www.figma.com/design/rvui4wljLmXy0BJXTM7IXP)**: 생성된 Figma Design 파일. 현재 빈 작업 공간이며 향후 29 문서 규칙대로 EXP/REV/APP 버전 시안 누적 예정.
- 자세한 승인 경계는 [30 문서](30-final-creative-direction-decision-board-v1.md)와 decisions D-050.

## 사용자 의사결정용 최종 추천안 — 대안·1순위·이유 (D-049)
- **[30. 히어로 문구·메인 구성·톤앤무드 추천 순위와 의사결정 보드](30-final-creative-direction-decision-board-v1.md)**: 사용자 요청에 따라 매 선택마다 **대안과 기획자 1순위, 이전 대화 기반의 이유·단점**을 먼저 설명.
- **기획자 1순위(아직 사용자 최종 승인 전)** = H1 ‘제조의 깊이를, 더 가깝게.’ + S1 **5장면** Hero→원단 갤러리+간결한 사용처→직접 편직 현장→실제 현장/블로그 기록→브랜드 잔상과 상담 + V1 **Tintex 밝은 정돈된 여백 / Arville 직접 제조 사진 깊이**. 사용처 독립 6섹션은 실제 사진이 풍부할 때만 대안.
- 정본/실물 확인·개발 경계: 파일/제품 이미지·실사/영상 검증 전, 사용자 슬로건·최종 Figma 시각 선택 전. 운영 main/DB/ERP/배포 미변경.

## 차기 시안 제작 도구·기록 방식 — Figma Design Lab (D-048)
- **[29. Figma 디자인 랩·시안 누적/버전/승인 체계](29-figma-design-lab-workflow-and-review-structure-v1.md)** — 사용자 요청에 따라 기획/설계가 확정된 **후** 연결 Figma 플러그인에서 PC·모바일, 참조 무드, 다양한 히어로 방향, 수정·승인·반려 시안을 하나의 디자인 파일에 쌓고 비교. 편집 가능한 레이어·컴포넌트와 `EXP/REV/APP` 버전 규칙, GitHub 결정 로그 연결.
- 연결 도구 접근성/편집 권한 확인 완료. **Figma 파일/디자인은 아직 생성하지 않음**. D-041 계획 우선, D-036 영상 제작 보류, 특정 헤드라인·시각 디자인 미승인.

## 최신 조사·아트디렉션 요약 (D-047)
- [28. 메인 아트디렉션 비교 및 기존 이미지·코드 사실 감사](28-visual-directors-review-and-media-evidence-audit-v1.md) — 공장 외관 사용자 화면 육안 평가, `main`의 Spline 3D/미검증 20% 납기 보장 문구/대형 GIF·제품 실사 소스 확인, **R2 에디토리얼 안전 기본안 ↔ R1 자사 환편 실사 몰입형 조건부** 대안, 제품 5종 사진 확보·섹션별 화면 리듬/인터랙션/미검증 자산 갭. **최종 시각 디자인·카피 승인 전**.
- 25·26·27의 A형 히어로와 비언어적 화면 흐름을 28에서 종합 검토했다. **HTML·영상·운영 코드 수정하지 않음**.

## 최신 브랜드 히어로 방식 결정 (D-046)
- [27. 상징적 한 문장 히어로·첫 스크롤 아트디렉션](27-hero-brand-declaration-and-first-scroll-directors-brief-v1.md) — 사용자가 **A형 짧은 브랜드 선언 + 실제 편직·원단 공급 정체성을 명확히 하는 보조 설명** 방식 승인. 정확한 히어로 문구 `제조의 깊이를, 더 가깝게.`는 아직 미승인. R1 몰입 실사형/R2 밝은 분할형, Hero→원단 실물 갤러리, 사진/모션/성능/PC·모바일 검토 원칙을 기획함.
- D-041 화면 설계 전 섹션·콘텐츠 합의, D-036 신규 히어로 영상 제작 보류 유지. 디자인 시안/운영 코드 변경 없음.

## 현재 진행한 세부 기획 (D-044~045)
- [25. 브랜드 메시지·히어로 카피 체계](25-brand-message-and-hero-copy-system-v1.md) — 브랜드 기본 철학은 확정, **3개 헤드라인 후보는 미승인**, 검토 기준과 메시지 위계.
- [26. 6개 메인 장면 콘텐츠·사진·모션 기획](26-homepage-section-content-motion-and-media-plan-v1.md) — 실제 자사 제품·편직 컷·사용처·블로그 콘텐츠, 상호작용의 필요성과 모바일 대체, 기존 자산과 부족 자료. **시안/개발 명세 최종 승인 전**.
- D-045: 결정이 꼭 필요하지 않은 조사·기획·기록은 일일이 질문 없이 진행하되 **슬로건/비주얼 선택·시안/영상 생성·구현은 사용자 승인 후**. D-041 기획 먼저, D-036 히어로 영상 제작 보류 유지.

## 최신 브랜드 표현 원칙 D-043 (2026-10-22)
- **[23. 말보다 사진·영상·움직임으로 정체성을 전달하는 메인페이지 구성](23-visual-first-homepage-architecture-v1.md):** Arville/Tintex에서 사용자가 좋아했던 요소는 영문 문구가 아니라 **톤앤무드, 고품질 실사, 여백, 포인터·스크롤 효과, 화면 전체 리듬**. 긴 Why Hwoasung 반복 설득 금지, **히어로 한 문장에 힘을 주고 제품·실제 편직 현장·사용처·블로그·클로징을 보여주는 6장면 추천안**. **장면 구성/카피는 미승인**. D-041 설계 선행·D-036 영상 실제 제작 보류 유지.
- 다음 세션은 이전 [22](22-homepage-architecture-planning-reset-v1.md)보다 **최신 D-043의 비언어적 브랜딩 우선**으로 이해해야 함. D-038의 '해자'는 내부 사실/선택 기준이지 메인에서 장문으로 영업·설득하라는 뜻 아님.

## 현재 1순위 작업: 화면 제작 전에 홈페이지 섹션 전체 설계
- **[22. 전체 섹션 구성·흐름 공동 설계](22-homepage-architecture-planning-reset-v1.md)** — D-041 사용자 요구에 따라 Arville/Tintex 실제 홈 콘텐츠 구조를 확인하고, 화성섬유 홈페이지 메인 섹션 후보/페이지별 역할/검토 순서를 정리. **기초 정보구조 연구 기록이며 23·25~29 최신 시각/메시지 계획이 그 후속 문서. 섹션 순서는 사용자 최종 승인 전.**
- D-037 레퍼런스 선택은 유효하지만 색감/카드 모양만 복제하는 설계는 불합격. D-038 범용 v1 불합격, D-041 사례 상담 중심 v2도 불합격. **기획→사용자 섹션 구성 합의→섹션별 증거/콘텐츠 상세→비주얼 디렉션→PC/모바일 시안→명시적 개발 승인→구현** 순서.
- 초기 히어로 영상은 D-036 제작 보류. 운영 홈페이지/ERP/DB/main 수정 없음.

## 최신 디자인 시안 상태 (2026-10-22)
- **[21. 설득형 첫 세 장면 반응형 시안 v2](21-proof-led-first-three-scenes-prototype-v2.md):** 히어로 → 가상 본딩용 인타록 요청의 '폭/가공상태/후공정 판단' → 보유 원단/기존 생지·후가공/신규 편직 조건부 공급 경로. HTML/PC·모바일 캡처는 당시 대화에서 전달했고 GitHub에는 설계/QA 기록만 저장. **D-041 사용자 설득·구성 부적합 평가로 브랜드 시안 불합격**.
- **[20. 구매자 설득 서사 기준](20-homepage-persuasion-blueprint-v1.md):** 브랜드 카피/증거/1개 실제 발주 상황의 판단 과정.
- 기존 **16 브랜드 시안은 D-038의 '아무 공장 이름으로 바꿔도 되는 범용 페이지' 피드백으로 불합격**이며 UI/반응형 참고자료로만 보존.
- 새 디자인 시안의 완료를 사용자 승인·실제 원단/납기·해자 입증·Codex 개발 승인으로 오해 금지.

## 이 폴더의 역할
긴 채팅에 의존하지 않고 리뉴얼 근거·가정·미결정 사항·단계별 승인 이력을 GitHub에 축적한다. 전략→UX→디자인→콘텐츠/SEO→기술→통합 검증→Codex 구현의 단계로 진행한다. 각 분야 간 상충 여부를 확인한다.

## 우선 읽기
1. project-state.md — 현재 단계, 확정/미확정, 다음 작업
2. 00-project-charter.md — 목표와 금지할 가정
3. 01-current-state-and-evidence.md — 홈페이지·분석·코드 근거
4. 02-inquiry-patterns.md — 고객 문의에서 배운 점(익명화)
5. 03-business-strategy-workbook.md — 확정한 사업 운영 기준·유효 문의·미결 과제
6. 04-ux-and-information-architecture.md — UX·정보 구조 연구
7. 05-visual-brand-design-brief.md — 디자인 조사와 시안·승인 과정
8. 06-seo-content-analytics.md — 검색·AI 검색·광고·분석 설계
9. 07-technical-baseline.md — 기존 코드·기술·배포 안전 검증
10. 08-roadmap-and-acceptance.md — 단계·검증·Codex 범위
11. decisions.md — 결정·변경 기록
12. NEXT-SESSION.md — 새 채팅 시작 프롬프트

## 결정 사항 확인 기준
- 세션이 바뀌면 가장 먼저 **project-state.md → decisions.md → 03-business-strategy-workbook.md → NEXT-SESSION.md**를 최신 브랜치에서 읽는다.
- 사용자 확인 결정은 D-001~D-024 중 해당 항목을 찾아 반영. D-023은 **A형 직접 공급 문의 1차 성과/B형 조건부 개발 별도 지표**, D-024는 **대량 신규 거래와 반복 구매 모두 가치**라는 판단이다.
- 잘못된 해석인 '신규 생산 500yd부터 가능'은 **D-019에 따라 폐기**. 구버전 문구는 최신 승인 사실보다 우선하지 않는다.
- 나머지 UX/디자인/SEO·AI 검색/기술 문서는 아직 분야별 브리프·제안이며 승인된 제작 명세가 아니다.
- 전략을 확정할 때 관련 문서·결정 기록·상태·다음 세션 안내 간 충돌을 함께 점검한다.

## 개인정보·영업정보 규칙
**주의: hwoasung 저장소는 PUBLIC이다. 이 브랜치 역시 비공개 공간이 아니다.**
이곳에는 익명화된 관찰과 공개 가능한 설계 원칙만 둔다. Gmail 고객명·이메일·전화번호·견적·거래 내용 원문, Tally 비공개 첨부 링크, 내부 전환 통계의 원시값과 비밀 키/토큰을 커밋하지 않는다. 원시 데이터를 재분석할 때는 연결된 Gmail/GSC Wizard를 다시 조회하고, 필요한 경우 별도 비공개 보관 장소를 사용자 승인 후 만든다.

## 작업 방식
- 설계 변경은 한 분야씩 토론→초안→교차 검토→사용자 승인→상태판 갱신.
- 파일 제목에 없는 사실을 확정하지 않는다. 문서의 '관찰/가설/미결/승인'을 구분한다.
- Codex는 설계 승인 전에 리뉴얼 기능을 임의 구현하지 않는다.
- 기존 main 브랜치와 운영 도메인은 어떠한 자동 수정·배포도 하지 않는다.
- 최종 배포 시 사용자 승인이 필요하다.
