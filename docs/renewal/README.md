# 화성섬유 홈페이지 리뉴얼 — 설계 허브
- 기록일: 2026-10-13 (KST)
- 프로젝트: https://github.com/hwoasung0067/hwoasung
- 설계 전용 브랜치: planning/website-renewal
- 실제 운영 사이트: https://www.hwoasung.com/
- 프로젝트 상태: Phase 0 — 조사·정리 완료, 사업 전략 상세 설계 대기
- **현재 문서는 승인된 구현 명세가 아니다. 소스코드 수정·배포 금지.**

## 이 폴더의 역할
긴 채팅에 의존하지 않고 리뉴얼 근거·가정·미결정 사항·단계별 승인 이력을 GitHub에 축적한다. 전략→UX→디자인→콘텐츠/SEO→기술→통합 검증→Codex 구현의 단계로 진행한다. 각 분야 간 상충 여부를 확인한다.

## 우선 읽기
1. project-state.md — 현재 단계, 확정/미확정, 다음 작업
2. 00-project-charter.md — 목표와 금지할 가정
3. 01-current-state-and-evidence.md — 홈페이지·분석·코드 근거
4. 02-inquiry-patterns.md — 고객 문의에서 배운 점(익명화)
5. 03-business-strategy-workbook.md — 다음 세션에서 논의할 사업 의사결정
6. 04-ux-design-brief.md — 고객 경험과 디자인 연구 계획
7. 05-seo-content-analytics.md — 검색/AI 검색/광고/분석 설계
8. 06-technical-baseline.md — 기존 코드 및 배포 안전 요구
9. 07-roadmap-acceptance.md — 단계·검증·Codex 범위
10. decisions.md — 결정·변경 기록
11. NEXT-SESSION.md — 새 채팅 시작 프롬프트

## 개인정보·영업정보 규칙
**주의: hwoasung 저장소는 PUBLIC이다. 이 브랜치 역시 비공개 공간이 아니다.**
이곳에는 익명화된 관찰과 공개 가능한 설계 원칙만 둔다. Gmail 고객명·이메일·전화번호·견적·거래 내용 원문, Tally 비공개 첨부 링크, 내부 전환 통계의 원시값과 비밀 키/토큰을 커밋하지 않는다. 원시 데이터를 재분석할 때는 연결된 Gmail/GSC Wizard를 다시 조회하고, 필요한 경우 별도 비공개 보관 장소를 사용자 승인 후 만든다.

## 작업 방식
- 설계 변경은 한 분야씩 토론→초안→교차 검토→사용자 승인→상태판 갱신.
- 파일 제목에 없는 사실을 확정하지 않는다. 문서의 '관찰/가설/미결/승인'을 구분한다.
- Codex는 설계 승인 전에 리뉴얼 기능을 임의 구현하지 않는다.
- 기존 main 브랜치와 운영 도메인은 어떠한 자동 수정·배포도 하지 않는다.
- 최종 배포 시 사용자 승인이 필요하다.
