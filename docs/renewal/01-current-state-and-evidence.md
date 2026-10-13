# 01. 현재 홈페이지 진단과 근거 — 2026-10-13
상태: 현 상태 분석 자료. 배포본-저장소 일치 여부는 미검증.

## 확인한 자료
- 운영 사이트: https://www.hwoasung.com/
- GitHub: hwoasung0067/hwoasung, 기본 브랜치 main.
- GA4: hwoasung.com 측정 ID와 src/firebase.js의 ID가 일치하는 것 확인.
- GSC Wizard: hwoasung.com 도메인의 Google Search Console 및 GA4 연결 완료.
- GA4 검토 기준기간: 2026-09-15 ~ 2026-10-12(28일), 이전 기간 대비 일부 지표 감소.
- Gmail: 사업용 계정으로 들어온 홈페이지 Tally 문의와 관련 후속 메일의 익명화된 패턴 확인.
- 블로그 전략: hwoasung0067/blog-agent 의 2026-10-13 현행 전략/회사 팩트/AI 검색 계획 확인.

## 관찰된 사실
1. GA4는 page_view, session_start, user_engagement, first_visit 등 기본 이벤트를 수집하고 있음.
2. 조회된 GA4 페이지 경로가 '/' 한 곳에 집중됨(수개월간 동일 경향). 제품별 조회/이탈 비교에 바로 활용할 수 없음.
3. src/App.jsx는 React의 view 상태를 setView로 변경하고 navigateTo 함수가 해당 상태만 변경. 기존 소스에서 별도 브라우저 URL 갱신/개별 라우트는 확인되지 않았음. 이 현상은 GA4 기록과 일치하지만 운영 빌드와 코드 동일성은 추가 확인 필요.
4. 주요 제품 카드의 상세는 모달 방식이고 Firestore(products) 기반 동적 제품과 소스 내 정적 제품을 함께 사용함.
5. 현재 디자인은 제조 기술/샘플 분석 중심의 고급스러운 톤이나, 실제 판매하는 개별 제품과 공급조건을 첫 방문자에게 더 명확하게 제시할 여지가 있음.
6. 별도 문의 전환/제품 클릭 이벤트의 기록은 확인되지 않음. '문의 0건'이라는 뜻 아님.
7. 네이버 파워링크를 운영 중. 기존 광고 추적 기능은 꺼져 있었음. 사용자가 PC/모바일 연결 URL에 UTM을 넣은 새 소재를 등록했고 심사 후 '운영 가능' 상태를 확인함. 실제 광고 클릭 후 GA4에서 naver/cpc로 기록되는지는 검증 전.
8. 블로그 링크 삽입과 검색 노출 하락 경험은 있으나 인과관계가 입증되지 않음. 블로그와 홈페이지 URL/콘텐츠 역할은 조심스럽게 설계.
9. AI 검색 유입의 일부는 소스/미디엄으로 식별 가능하나 AI 개요 전체 인용을 GA4만으로 측정할 수 없음.

## 해석 / 가설
- 홈페이지가 다양한 원단 문의를 유입하나 주력 사업과 맞지 않는 요청을 거르지 못할 가능성.
- 메인페이지 단일 URL/모달 구조는 제품별 검색 색인과 측정 정밀도에 불리할 가능성.
- 제품 페이지를 독립시키고 샘플 상담을 분기시키면 적합한 문의 비율이 증가할 가능성.
- 근거 있는 성과를 위해 현 데이터 계측부터 정리해야 함.

## 다음 데이터 점검(연결된 앱에서 재조회)
- GSC Wizard: https://tool.gscwizard.com/ 의 hwoasung.com Search Console 및 GA4.
- GA4 보고서: source/medium, default channel, landing page, page path+title, event name, engagement/bounce, direct/organic/paid, mobile/desktop. 동일 기간 비교.
- 네이버 광고: 광고 클릭과 GA4 naver/cpc 세션을 같은 날짜 범위로 비교(동일 건수가 반드시 일치하지는 않음). 새 광고 소재의 UTM 유지 여부 확인.
- GA4 이벤트: product_view/select, sample_inquiry_start, contact_click, form_submit_success는 계획이지 현재 설치 사실이 아님.
- 일반 전화/카카오 문의 및 제품 거래 전환은 Gmail 폼만으로 알 수 없어 운영자 확인 필요.
- 현 운영 빌드의 배포 리포지터리/호스팅(실제 도메인 DNS·Vercel/Firebase 등)을 증거로 확인해야 함.

## 개인정보·영업 비밀
이 저장소는 공개. 방문·광고·견적의 세부 원자료, 고객 실명/연락처/메일 본문/첨부 인증 URL을 넣지 않음. 재현 가능한 조회처 및 날짜만 저장하고 상세 재분석은 연결 소스로 수행.
