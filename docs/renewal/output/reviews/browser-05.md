# Browser 05 — QA와 판단
2026-10-26 KST

실행/설계/자산 출처와 상세 한계는 ../concepts/browser-05/README.md. 기존 시안 코드를 참조하지 않은 신규 정적 세 안, 비교 화면과 문의/원단/모바일 동작을 제작했다.

## 실제 검사
- JS 구문: node --check design-studies/renewal-05/app.js PASS. 빌드 없는 정적 페이지이므로 운영 App 빌드 반복 안 함.
- 로컬 서버 HEAD / HTTP 200.
- A/B/C 각각 320/390/768/1024/1440/1920px: 문서 scrollWidth=clientWidth. 주요 제목·원단명·문의 연락처·검토 바 클리핑 없음, 이미지 로드 누락 없음. 데이터: ../concepts/browser-05/responsive-checks.json.
- 비교 화면 320/390/768/1440px: 동일 기준 PASS, 세 경로 모두 존재. 데이터: ../concepts/browser-05/comparison-checks.json.
- 세 안 모두 390px에서 메뉴 열기→원단 이동→닫힘, 인타록 안내→문의 subject, PU코팅→용도 문의 subject 확인. 메일 전송하지 않음.
- 세 안 모두 보드레 안내→Escape 닫기→실행 버튼 초점 복귀·배경 스크롤 복구 확인.
- PC 전체 페이지를 시각 검토. A/B/C 첫 화면·390px 모바일 구도를 확인/캡처했다. C는 모바일에서 사진을 별도 격자로 재배치하며 큰 제목과 사진이 겹치지 않는다.

## 발견하고 수정한 것
색상 변수를 body에서 바꿨지만 root의 computed color/background를 상속하던 문제를 발견해 body에 색/바탕 적용. 비교 헤더 일반 span 크기가 워드마크를 축소하던 문제 수정. C 사진의 겹침 때문에 개별 캡션만으로 출처가 충분히 드러나지 않을 수 있어 검토 바에 AI 소재 연출을 함께 명시. 변경 후 최종 너비 검증/캡처를 수행했다.

구조 검사: python3 docs/renewal/tools/check_structure.py PASS. 기존 기획 스냅샷 41개 해시와 내부 링크 검사 통과.

## 한계와 미완료
실제 제품 이미지/조직 매칭, 촬영 원본·권리, 신규 사람/영상 촬영, 정확한 제품 상세 사양, 최종 글꼴/문구/색/디자인 채택 대기. 실기기·전체 스크린리더·다른 OS·전환율 미검증. 구현된 reduced-motion 대체의 OS 전환 QA는 미실행. 기존 운영 앱·main 커밋/푸시·DB·ERP·배포 없음.
