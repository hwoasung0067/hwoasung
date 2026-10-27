# 초반 로딩 1차 점검 — 코드/라이브 구조 확인
2026-10-27 KST · F-020 · 성능 원인 확정/수정 완료 보고 아님

## 실제 확인
- 저장소 src/assets/company_intro.gif: 47,703,434 bytes(47.70MB), 960×540, 246프레임, 프레임별 duration 합계 8.27초. 기존 시안용 정지 컷 추출과 별도로 이번에 duration을 합산했다.
- src/App.jsx:849의 메인 Hero에서 외부 my.spline.design 3D iframe을 즉시 삽입. GPU/메인 스레드/네트워크 부담의 후보이며 실제 점유율은 미측정.
- src/App.jsx:981 메인 하단의 GIF img에 loading=lazy가 없음. about 뷰에서도 :1212 동일 GIF 참조. 조건부 렌더이므로 두 곳이 동시에 두 번 다운로드된다고 주장하지 않는다.
- index.html:29 Cloudinary 업로드 위젯, :30 EmailJS 스크립트에 async/defer 없음. HTML 파싱 차단 가능성이 있으며 업로드·문의 기능을 쓰기 전부터 로드되는 구조다. 필요한 시점 로딩/기능 분리 후보다.
- App.jsx에서 AdminPortal을 상단 import. 사용자 첫 방문에 불필요한 관리 기능을 분리하는 후보이나 현재 정확한 번들 비용은 이번에 측정하지 않았다.
- 브라우저에서 https://hwoasung.com/ → https://www.hwoasung.com/ 접속하여 실제 운영 페이지 DOM 확인. Spline iframe/loading 없음, company_intro-DB3Bd5wd.gif/loading 없음, Cloudinary/EmailJS async=false/defer=false가 실제 DOM에도 있었다. 운영 페이지 변경/관리 버튼 클릭/DB 수정 없음.

## 측정 한계
브라우저의 read-only evaluate 환경에서 Performance API는 제공되지 않았다. LCP/INP·실제 네트워크 전송량·FPS·각 원인의 기여율을 측정한 것으로 보고하지 않는다. 라이브 GIF는 complete=true/naturalWidth=0으로 관찰됐지만 이 브라우저 환경에서의 실패 원인은 확인되지 않았으며, 이를 모든 방문자에게 동일한 오류로 일반화하지 않는다. 라이브의 GIF 참조와 저장소 파일 크기를 구분한다. 원본 URL의 실제 cold-load 자원 워터폴/Lighthouse/기기별 성능 검사는 후속 과제다.

## 현행 새 시안과의 구분
browser-05는 운영 App/Spline/Firebase와 분리한 정적 시안이다. GIF를 재생하지 않는다. 다만 AI 연출 PNG가 약 2.92MB+2.84MB라서 첫 화면용 전달 포맷을 최적화할 여지가 있다. 이번에는 인코딩 시험만 수행했고 화면 파일은 교체하지 않았다.

WebP quality=88 인코딩 시험(동일 픽셀 크기, 의미/구도 변경 없음):
| 이미지 | PNG | WebP | 파일 감소 |
|---|---|---|---|
| cobalt-knit | 2,923,157B | 374,914B | 87.2% |
| ivory-yarn | 2,837,030B | 288,728B | 89.8% |

이 값은 파일 크기이며 사이트 로딩/스크롤이 같은 비율로 빨라졌다는 뜻이 아니다. 확대 화질 비교와 UI 반영은 미실행이다. 시험 결과 JSON: hero-media-benchmark.json. 원본 이미지/시안 소스를 변경하지 않았다.

## 개선 우선순위 제안
1. 리뉴얼 Hero는 가벼운 poster 우선 + 짧고 압축된 video로 설계. 기존 3D를 동시에 실행하지 않는 구도 제안.
2. 기존 GIF를 동영상/정지 이미지로 대체하고 하단 미디어는 화면에 가까워질 때 로드.
3. 관리/업로드/문의 스크립트와 비핵심 기능을 필요한 시점으로 분리.
4. 모바일 별도 파일·텍스트와 이미지 우선 표시·캐시/Range/fast-start 확인.
5. 같은 조건의 콜드 캐시 실기기 측정으로 개선 전후 비교. 운영 수정/배포는 별도 승인 경계 유지.

영상 기획은 ../plans/hero-video-plan-v1.md. 현재는 진단/기획과 인코딩 시험 완료, 운영 성능 수정·새 영상 제작/적용·배포 미완료.
