# 구조화 검사 — 2026-10-23

- PASS: 원본 기획 스냅샷 41개 SHA256 일치.
- PASS: 시작점·현재 방향·피드백·인계·워크플로우·QA·시안 색인 필수 파일 존재.
- PASS: 새로 관리하는 문서의 상대 Markdown 링크 존재 확인.
- 기존 번호 문서의 과거 링크 전체 유효성·외부 URL 상태는 이번에 재검증하지 않음.
- 원본 PDF 수정/업로드 없음. 원문 파일명과 SHA256만 기록.
- 운영 src·package·main·DB·ERP·배포 변경 없음. 이번 변경은 기획 문서·진입 안내·검사 스크립트.
- 자동 hooks/OS 읽기 전용 권한/Claude 자동 규칙/독립 QA 세션을 설치·실행한 것은 아님.

재검사: `python3 docs/renewal/tools/check_structure.py`.
