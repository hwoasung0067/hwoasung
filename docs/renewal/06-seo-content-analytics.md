# 06. SEO·AI 검색·콘텐츠·분석 설계 브리프
상태: 연구/후보. 실제 구현·이벤트 반영은 미실행.

## 검색/콘텐츠 목표
- 키워드 반복보다 실제 B2B 구매자가 묻는 질문에 대해 확실한 제품·공급 정보.
- 네이버 블로그: 원단 비교·구매 판단·제조 경험 등 정보 검색.
- 홈페이지: 화성섬유의 제품·실제 가능한 사양/공급 상태·회사 팩트·문의.
- 동일 블로그 글을 홈페이지 컬럼으로 복제하지 않는다.
- AI 검색 최적화는 검색 가능한 명료한 본문, 출처·고유 회사 사실·정보 일관성·갱신에 초점. 인용 보장 주장 금지.

## 기술 SEO 필수 요구
- 각 주력 제품에 안정된 고유 URL, title/meta description, canonical, OG 등.
- 실제 텍스트와 검색 가능 구조(렌더링 포함). JS 상태 변경만으로 유일 경로를 숨기지 않는다.
- sitemap.xml, robots.txt, 잘못된 URL 처리, 구조화 데이터는 적용 자격 확인 후.
- 기존 URL 영향과 Search Console 성과를 대조하여 필요할 때만 301·기존 색인 보호 계획.
- 번역 영문 페이지의 독립 URL/언어 태그는 실제 콘텐츠 범위 확인 후 결정.
- 현재 index.html의 og:url이 hwoasung.vercel.app 주소로 설정된 점은 운영 배포/대표 도메인 확인 후 교정 후보.
- 회사 팩트 검증 전 '0% 결함률' '즉시 모든 샘플 대응' '무조건 빠른 납기' 같은 문구를 확정하지 않는다.

## 제품 콘텐츠 템플릿(초안)
제품명/용도/제품코드/실제 이미지/혼용률/대표 중량·폭/조직 또는 특징/생지·가공지 구분/가공 가능 조건/대표 사용처/문의 전 준비자료/관련 원단/관련 구매 가이드/최종 갱신일.
실제 품목별 해당 데이터가 없으면 임의로 만들어 채우지 않는다.

## 유입 구분 및 광고
- 자연 검색/네이버 파워링크/직접/플레이스/블로그/AI 어시스턴트의 단일 지표 합산 금지.
- 네이버 광고 기존 소재의 추적 URL에는 UTM이 없었음. 새 소재에 utm_source=naver, utm_medium=cpc, utm_campaign=powerlink 주소를 설정, 브라우저 접속 테스트 및 광고 심사 '운영 가능' 확인.
- 신규 소재 성과와 기존 소재 성과는 따로 기록. GA4에 실제 paid 세션이 쌓이는지 1~2일 이상 확인 후 추적 완료 판정.
- 직접 방문/referral/organic 분류가 섞일 수 있으므로 과거 지표 역산하여 광고 효과 단정하지 않는다.

## 제안 GA4 측정 계획(아직 설치되지 않음)
| 행동 | 이벤트 후보 | 권장 속성 |
|---|---|---|
| 제품 상세 진입 | view_item 또는 fabric_view | item_id/품목, page_location |
| 제품 상담 클릭 | select_item / contact_click | item_id, contact_method |
| 샘플 상담 진입 | sample_inquiry_start | source_page, inquiry_type |
| 폼 정상 제출 완료 | generate_lead | inquiry_type, selected_product |
| 전화/카카오 클릭 | contact_click | method, source_page |
실제 운영 GA4 및 Tally 구조에 맞게 이벤트명·중복 발화·개인정보 전송 방지를 검토. 이메일·전화번호·문의 원문을 GA4에 전달 금지.
- GA4는 페이지 경로별 측정 우선 정상화. 버추얼 page_view 또는 라우팅 전환 및 실제 URL 적용 중 선택.

## AI 검색 검증
- 실제 네이버 AI 브리핑의 출처 여부는 로그인 여부·질문·PC/모바일·확인일을 기록하여 관찰.
- Google AI Overviews/AI Mode는 별도 마법의 태그보다 접근 가능하고 유용한 고유 정보를 우선.
- 인용 여부/참조 출처/식별 가능한 추천 유입을 별도 보며 검색 트래픽·문의와 혼동하지 않는다.

## 참고 내부 프로젝트
- blog-agent/context/blog-ai-search-plan-2026-10-13.md
- blog-agent/context/blog-strategy-state.md
- blog-agent/context/company-facts.md
- blog-agent/context/content-index.md
각 링크/문서의 최신 상태를 다시 확인. 일부 초기 전략 메모와 후속 사용자 정정이 충돌하면 후속 '원단 판매 중심' 정정을 우선한다.
