# HWOASUNG — AI 보조 히어로 영상 스토리보드 v1
작성: 2026-10-20
상태: **제작 방향 추천 / 실제 장면·영상 결과·메인 시안·배포 미승인**
연계: D-030 제조 전문성×현대적 파트너, D-032 사양 상담, D-034 Yitai 실사+Camira 표현, D-035 기존 자료 재사용, 11·12 설계 문서

## 1. 제작 원칙
- 브랜딩 목표: 회사가 직접 환편해 원단을 공급한다는 신뢰 + 부드럽고 정제된 현대적 인상. **프리미엄 원단의 등급/기능성을 암시하지 않는다.**
- **AI 도구를 많이 쓰되, 제조 사실은 진짜 자산으로 확인한다.** AI는 콘셉트·카메라 리프레이밍·정제된 움직임·영상 편집·색 보정·리듬 설계에 적극 사용. 실제 화성섬유에 존재하지 않는 설비·작업자·원사 시스템·원단을 '자사 제조 과정'이라 표시하지 않는다.
- 실제 설비의 세부 기구 운동은 AI가 물리적/기계적으로 틀리게 생성할 수 있다. 환편기 작동 장면은 원본 실촬영 영상 우선. 정지 사진으로 만든 AI 카메라 이동/조명 연출은 검수 후 채택. 원단 클로즈업 생성 시 실제 판매품의 조직/규격을 거짓 표현하지 않음.
- **AI만으로 만든 버전은 내부 콘셉트 검토용**. 실재 공장 기록으로 오인될 컷은 최종 홈페이지에서 사용하지 않거나 시각화/예시로 구분한다.
- 재사용 우선: 기존 `src/assets/company_intro.gif` 약 47.7MB(실제 장면 검수 필요), `knitting_unit.jpg`, `processed_inventory.jpg`, Cloudinary의 제품 실사/보유 원본 영상. 사용자가 첨부한 'GIF'는 전송본에서 정지 PNG 960×540임. 촬영 원본 존재 확인.
- 영상 위의 실제 문구/CTA는 **웹 DOM 텍스트**, 생성 영상에 자막·상표를 입히지 않는다(가독성/SEO/모바일/다국어 유지 및 AI 오타 방지).

## 2. 가설 콘셉트
**MADE IN MOTION / 원단이 만들어지는 움직임**
- 길이 약 12초, 4개 숏, 16:9 기준, 무음 반복. 방문객은 첫 프레임에서도 직접 편직 제조사임을 이해해야 함.
- 톤: 실제 현장, 조용한 자신감, 군더더기 없는 산업 에디토리얼. 화면의 자연스러운 움직임과 차분한 전환. 로봇/미래형 공장/럭셔리 패션 필름 느낌 금지.
- 타이틀 예시(미승인): '원단을 만드는 현장. 소통으로 이어지는 공급.' 또는 '원단을 직접 편직합니다. 공급은 함께 검토합니다.'
- 보조정보 예시(미승인): '폴리에스테르 중심 환편 원단 제조·공급 / 폴라폴리스 · 인타록 · T/R 싱글 · DTY 싱글 등'
- CTA 예시: '원단 살펴보기' / '용도·샘플로 상담' — 실제 제품을 골라도 건별 조건/사양 확인 필수.

## 3. 12초 스토리보드
| 구간 | 장면/카메라 | 시각적 목적 | 원본 우선순위 | AI의 역할 | 오해 위험 |
|---|---|---|---|---|---|
| 0–3초 | **실제 환편기 동작 근접/전경**. 관객이 이해 가능한 실제 설비와 원단 생산 장면, 느린 수평 카메라 움직임 | 첫 1초 제조 정체성+몰입 | 현장 영상 1순위, 정지 사진은 샘플 프로토타입 | 원본 실사 컷 편집·안정화·색 보정, AI 이동은 기구 왜곡 여부 판단 | 가짜 기계/없는 공장 확장 금지 |
| 3–6초 | **원사 공급부/실의 흐름**. 디테일 타이트 컷, 부드러운 포커스 | 직접 편직 과정의 손맛·전문성 | 원사 공급/피더 실제 사진·영상 | AI 미세 카메라 이동·빛·조도 연출 | 원사 투입 경로나 작동 불가능한 움직임 생성 금지 |
| 6–9초 | **사람이 원단·설비 점검하는 모습** 또는 확인된 원단 표면 매크로 | 유연한 소통/관리의 사람이 있는 현장 | 직원·원단 점검 실촬영과 동의된 인물 이미지, 대체로 제품 실사 | 컷 호흡·색상 통일·크롭/저강도 패럴랙스 | 가짜 직원/실제처럼 꾸민 AI 작업 행동 금지 |
| 9–12초 | **완성 원단 롤/원단 조직 표면 디테일** → 0초 장면과 자연스럽게 연결 | 결과물이 원단이라는 명확함; 루프 | 판매 가능 실제 원단 사진·동영상 | 미세 줌/페이드/전환·루프 | 존재하지 않는 질감/혼용/제품 과장 금지 |
- 위 컷 배치는 임시이며 기존 자료의 품질에 맞춰 교체 가능. 길이를 늘리기 위해 장면을 중복·과장하지 않는다. 공장 외관은 히어로 내 필수 컷 아님; 소개/제조 역량 섹터에 우선 배치.

## 4. 제작 절차 — 비용 낭비 방지
1. **소재 수집/분류:** 기존 공장 GIF에서 유효 컷·사용자 원본 MP4 여부 확인. 공장 외관·환편기·원사·작업자·원단 4테마마다 사진·영상 보유 여부. 회사/고객 비공개 정보·얼굴/안전 점검.
2. **프레임 보드 4장 제작:** 실제 사진이나 실제 촬영본 프레임을 16:9로 크롭·톤 보정. 동일한 자연광·차콜/뉴트럴 느낌, 읽히는 타이틀 자리를 한쪽에 확보. 필요하면 AI로 무드보드/탐색용 이미지를 만들지만 자사 실제 장면으로 최종 사용하지 않음.
3. **AI 1개 숏만 먼저 테스트:** 실제 원단 근접 사진 1장으로 image-to-video 3~5초, 한 모델에서 2개 결과 비교. 자연스러운 카메라 이동/조명에 집중, 실제 조직/기계 왜곡 검수. 합격하면 나머지 숏으로 확장.
4. **4개 숏 제작/조합:** 실제 환편기 움직임은 실촬영을 기준으로, AI에 맞는 장면만 고급스러운 움직임을 부여. 12초로 편집, 자막은 영상 파일 밖에서 웹에 고정.
5. **히어로 웹 프리뷰:** 정지 포스터/무음 자동재생/사용자 일시정지/reduced motion, 모바일 가독성·LCP/용량·메시지 이해 여부 비교. 데스크톱 16:9/모바일 별도 크롭 또는 사진 대체.
6. **검토/승인:** 화면을 보여준 뒤 수정 부분만 피드백. 작품성·실체 신뢰·사양 사실성·로딩 성능·접근성 모두 확인 후 구현 승인.

## 5. 장면별 AI 영상 프롬프트 예시 (image-to-video, 실제 자료 선행)
> 영어 예시는 입력 사진이 실제 화성섬유 촬영 자료라는 전제. 사진이 기준이므로 장비 형태·원단 조직 변경 없는 최소 카메라 연출에 집중. 완벽하게 기계 동작을 재현하지 못하면 원본 영상으로 교체.

### SCENE 01 — 환편 설비 전경 (실제 동작은 원본 영상 우선)
```
Documentary industrial cinematography. Keep the exact factory machinery and layout from the reference photo. The camera makes a very slow lateral dolly movement, with restrained natural lighting and realistic motion. Stable geometry, consistent materials and colors, editorial corporate documentary mood. One continuous shot, no cut. No on-video titles.
```
### SCENE 02 — 원사 공급 부위
```
A close documentary shot based on the supplied photograph. Subtle slow push-in toward the yarn feed area, delicate changes in focus, soft authentic factory light, precise industrial details remain consistent with the reference. Smooth continuous shot. No on-video titles.
```
### SCENE 03 — 손·원단 점검
```
Based on the real reference video frame, the camera slowly moves closer as the existing fabric surface catches soft light. Restrained and natural documentary motion; preserve actual hand position and textile structure. One continuous shot. No on-video titles.
```
### SCENE 04 — 원단 질감과 롤
```
An authentic cinematic close-up of the exact fabric visible in the input photograph. The camera performs a very slow sideways slide across the texture, soft natural reflections reveal the existing knitted structure without changing it. Industrial editorial style, calm, minimal, seamless continuous shot. No on-video titles.
```
- 실제 원본의 기계 운동이나 원단 조직을 AI가 마음대로 바꾸면 불합격. Prompt만으로 물성/설비 정확성이 보장되지 않음.
- 프롬프트는 **피사체 + 움직임 + 카메라 + 조명/톤 + 일관성** 정도로 간결하게. 한 컷에 4개 장면을 한꺼번에 요청하지 않는다.

## 6. 도구 선택 (도구 브랜드 종속 금지)
- **이미지→영상:** Runway의 공식 문서는 고화질 참조 사진을 첫 프레임으로 제공하고 프롬프트를 카메라/대상 움직임에 집중하도록 권장. 최신 기능/요금은 사용 시 재확인. https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide
- **참조/장면 일관성:** Google DeepMind Veo/Flow는 참조 이미지·카메라 컨트롤 등을 공개. 실제 엔진 세부 애니메이션은 별도 사실 검수. https://deepmind.google/models/veo/
- 편집과 웹 적용은 AI 생성 도구 한 곳에 종속될 필요 없음. 편집 프로그램에서 4개 컷의 길이/색감/전환·루프 정리. 이후 웹 hero overlay 텍스트/버튼 구현.
- **본안은 화질·렌더링/접근성 검증 전**. 생성물 제작비/크레딧 한도는 사용자가 승인한 뒤 실행.

## 7. 최종 홈페이지 영상 사양 후보 (기술 검증 전)
- 권장 초기 아웃풋: desktop 16:9(또는 조금 넓게 촬영), 12초 전후, 루프, 무음, 인코딩된 MP4/WebM, 예비 poster 정지 이미지. 기종/네트워크에 따라 정지 대체. 실제 타이틀·버튼은 영상에 렌더링하지 않고 웹 콘텐츠로 분리.
- WebP/GIF 애니메이션 원본을 그대로 히어로 배경으로 사용하지 않음. 특히 기존 47.7MB GIF 직사용 금지.
- 브라우저에서 모바일 autoplay는 보장되지 않으며 muted/playsinline과 정지 프레임 대체를 준비. 스크롤/일시정지·reduced motion 대응.
- Google web.dev 비디오 성능 가이드 참고 https://web.dev/learn/performance/video-performance

## 8. 다음 사용자 검토 기준
- 첫 1초에 직접 편직하는 원단 공장이라는 실체가 느껴지는가?
- 카메라가 과하게 흔들리거나 의미 없이 회전하지 않는가?
- 영상에 등장하는 기계/작업/제품이 실제 화성섬유의 것인가?
- 영상이 멋있으면서도 '폴라폴리스·인타록·싱글 원단 등을 공급하는 회사'라는 정보와 사양 상담으로 이어지는가?
- 12초를 전부 보지 않아도 타이틀과 버튼이 이해되고 모바일·저성능 환경에서도 화면이 성립하는가?
- 이 계획은 **제작 전 스토리보드·가이드**이며 사용자 전체 화면/영상 제작·배포에 대한 자동 승인 아님.
