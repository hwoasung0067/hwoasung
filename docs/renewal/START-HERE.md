# 리뉴얼 작업 시작점
갱신: 2026-10-26 KST · 구조 버전 1

이 프로젝트는 기존 리뉴얼의 연속이다. 새 브랜드 기획부터 다시 시작하지 않는다.

## 5분 진입 순서
1. `context/current-direction.md` — 승인된 큰그림·사업 사실·최신 도구 결정.
2. `.ai_history/handoff.md` — 물리적 진행 상태·다음 작업·검증 한계.
3. `context/design-judgment.md` — 사용자 취향에 이유와 예시를 붙인 디자인 판단 기준.
4. 해당 작업에 맞춰 아래 자료만 추가로 읽는다. 과거 30여 문서를 매번 전부 읽지 않는다.

| 작업 | 추가로 읽을 문서 |
|---|---|
| 전체 제작 계획 | `output/plans/website-delivery-plan-v1.md` |
| 새 피드백 반영 | `input/feedback/2026-10-23-user-feedback-excerpts.md`, `.ai_history/feedback-log.md`, `workflows/feedback-to-design.md` |
| 레퍼런스 확장 비교 | `output/research/2026-10-24-reference-expansion/README.md` |
| 시안 발전 | `context/references.md`, `context/page-plan.md`, `context/media-register.md`, `output/concepts/INDEX.md` |
| 검토/선택 | `qa/design-review.md`, `.ai_history/decision-log.md` |
| 이전 근거 추적 | `input/planning-snapshot/manifest.json`, `legacy-index.md`, 기존 번호 문서 |

## 폴더가 담당하는 것
- `input/`: 원문 발췌·원본 기획 스냅샷·출처 목록. 일상 편집 금지, 새 수집물은 새 파일로 추가.
- `context/`: 검증된 사업 맥락·현재 방향·판단 기준. 최신 결정을 반영한 짧은 정본.
- `workflows/`: 피드백 처리·브라우저 버전 제작·세션 마감의 반복 절차.
- `output/`: 분석과 시안 버전·검토 결과. 미승인 결과물을 사실 정본으로 승격하지 않음.
- `qa/`: 실제 검사 기준과 기록. 미실행 검사를 PASS로 표기하지 않음.
- `.ai_history/`: 피드백 원문→해석→행동 추적, 결정 이력, 재개 상태.
- `templates/`: 기록 양식.
- `tools/`: 내부 링크·원본 해시 검사.

최신 사용자 지시 > 명시적 승인 결정 > 검증된 회사 사실 > 현재 맥락 > 미승인 디자인 제안 > 과거 초안. 진실성에 영향을 주는 모순은 해당 사실을 보류한다. 시각 탐색의 빈칸은 가설을 표시하고 진행한다.

원본 번호 문서는 링크 호환을 위해 현재 위치에 보존했다. 새 세션은 이 문서로 진입하고, 기존 `00-CURRENT-HANDOFF.md`는 역사와 근거 추적에 활용한다. 실제 사이트 소스 `src/`를 문서 정리 과정에서 이동하지 않는다.
