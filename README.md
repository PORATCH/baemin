# 배달의민족 — Baseline UI 프로토타입

배달의민족 모바일 UX를 Before / After 방식으로 비교하기 위한 첫 번째 **Baseline 초안**입니다. React, TypeScript, Vite, Tailwind CSS, React Router를 사용하며 모든 콘텐츠와 거래는 mock입니다.

**원본 스크린샷이 제공되지 않았으므로 현행 앱을 화면별로 정확하게 재현했다고 주장하지 않습니다.** 익숙한 주소·검색·서비스·카테고리·가게·주문·마이페이지 구조를 기준으로 만들었습니다. 시각적 대조가 필요한 부분과 가정은 [BASELINE.md](./BASELINE.md)에 기록했습니다.

## 실행

Node.js 22.12 이상이 필요합니다. 현재 환경에서는 Node.js 24와 Chromium으로 검증했습니다.

```bash
cd /workspace/baemin
npm --cache /workspace/.npm-cache ci
npm run dev
```

개발 서버 포트는 5173입니다. 데스크톱에서는 390px 모바일 프레임으로, 모바일에서는 브라우저 너비에 맞춰 표시합니다. 주요 콘텐츠는 내부 스크롤 영역에서 스크롤됩니다.

## 화면과 경로

React Router의 HashRouter를 사용하므로 정적 호스팅에서도 별도의 서버 라우팅 설정이 필요하지 않습니다.

| 화면 | 경로 |
| --- | --- |
| Home | `#/` |
| Search | `#/search` |
| Category / Restaurant List | `#/category/all`, `#/category/chicken` 등 |
| Restaurant Detail | `#/restaurant/chicken-house` 등 |
| Cart | `#/cart` |
| Order / Order Detail | `#/orders`, `#/orders/:id` |
| My Baemin | `#/my` |
| Settings | `#/settings` |
| Help / FAQ / Inquiry | `#/help`, `#/help/faq`, `#/help/inquiry` |
| 기타 | 찜, 주소 선택, 알림, 쿠폰, 포인트, 계정 정보 등 |

고객센터 기본 경로는 **마이배민 → 하단으로 스크롤 → 고객센터**입니다. 홈이나 하단 Navigation에 고객센터 바로가기를 추가하지 않았습니다. 주문상세의 주문 문의는 해당 주문 맥락에서 1:1 문의 화면으로 연결됩니다.

## 구조

```text
src/
  App.tsx                        # Baseline 진입점
  baseline/
    BaselineApp.tsx               # HashRouter와 화면 경로
    components/
      common/                    # 모바일 프레임, Header, Sheet, 로컬 음식 일러스트
      navigation/                # BottomNavigation
      home/                      # CategoryGrid
      restaurant/                # RestaurantCard, MenuSheet
      order/                     # OrderCard
      mypage/                    # MenuRow
    pages/                       # 주요 화면별 컴포넌트
    data/                        # 가게·카테고리·주문·FAQ mock 데이터
    state/                       # React Context + useReducer
    types/                       # Restaurant, Menu, CartItem, Order 등
    utils/                       # 금액 포맷
    styles.css                   # Baseline 스타일
tests/baseline.spec.ts           # Chromium 인터랙션 검증
```

Baseline 화면과 스타일을 `src/baseline/`에 모았습니다. 향후 Redesign을 별도 디렉터리로 구현할 수 있으며, 현재는 Baseline만 렌더링합니다. Version Switcher, 온보딩, 화면 커스터마이징은 없습니다.

## 동작

- 5개 하단 탭 이동 및 선택 상태 표시, 뒤로가기, 직접 경로 진입
- 검색 입력·검색 결과·최근 검색어 삭제
- 카테고리 선택, 가게 목록 정렬, 무료배달·쿠폰 필터
- 가게 상세의 메뉴·정보·리뷰 탭, 메뉴 카테고리 이동
- 메뉴 옵션·수량 선택, 장바구니 추가·수량 변경·삭제
- 같은 가게의 메뉴만 담기 위한 교체 확인
- 장바구니 합계와 최소주문금액 검사, 배달 요청사항 선택
- mock 주문 생성과 주문상세 이동
- 찜, 주소 선택, 쿠폰·포인트 확인
- 환경설정의 알림 스위치, 고객센터·FAQ 펼치기·1:1 문의

찜·최근 검색어·알림 설정은 `baemin-baseline-preferences` localStorage 키에 저장합니다. 장바구니·새 주문·선택 주소는 세션 메모리 상태이며 새로고침하면 초기 mock 데이터로 돌아갑니다.

## 검증

```bash
npm run typecheck
npm run build
npm run lint
npm run test:e2e
```

브라우저 테스트는 **14개**입니다. `/usr/bin/chromium`이 있으면 이를 사용하며, 다른 환경에서는 `npx playwright install chromium` 또는 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 설정이 필요합니다. 테스트가 실행하는 서버는 로컬 검증용입니다.

스크린샷은 `artifacts/baseline-home-mobile.png`, `baseline-home-320.png`, `baseline-home-desktop.png`, `baseline-order-mobile.png`, `baseline-help-mobile.png` 등에 생성됩니다. 오류 trace는 `test-results/`에 저장됩니다.

## 정적 빌드

```bash
npm run build:web
npm run web:serve
```

`web-test/index.html`에 JavaScript, CSS, favicon을 포함합니다. `web:serve`는 정적 빌드를 4173 포트에서 실행합니다. 정적 빌드의 직접 경로는 `/#/restaurant/chicken-house`와 같은 Hash 경로입니다.

`docs/index.html`은 GitHub Pages용 게시 파일입니다. `downloads/baemin-baseline.zip`에는 단일 HTML과 안내문이 들어 있습니다. 소스를 수정했다면 정적 빌드와 게시 파일을 함께 갱신해야 합니다. 클라우드 내부 파일 경로는 다운로드 첨부나 공개 URL이 아닙니다.

## Mock 범위와 미구현 부분

가게명, 주소, 평점, 리뷰, 배달시간, 가격, 프로모션, 쿠폰, 포인트, 주문, 사용자 정보는 모두 예시입니다. 실제 로그인, AI, 외부 API, 결제, 배달 추적, 전화 연결, 고객센터 접수는 연결하지 않았습니다.

B마트·배민스토어·선물하기 및 일부 계정·약관·서비스 메뉴는 경로 탐색용 placeholder입니다. 원본 사진과 상용 아이콘 대신 로컬 SVG 일러스트와 컬러 아이콘을 사용합니다. 정확한 원본 UI 대조와 Redesign은 수행하지 않았습니다.
