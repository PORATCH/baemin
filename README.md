# Relay — Agent Workspace

AI Agent 관리용 데스크톱 앱처럼 구성한 웹 UI 프로토타입입니다. React 19, TypeScript, Vite 8, Tailwind CSS 4, Lucide 아이콘을 사용합니다. 외부 AI API, PC 제어, 실제 shell 실행은 연결하지 않습니다.

## 실행

Node.js **22.12 이상**을 사용하세요. 현재 클라우드 환경에서는 Node.js 24로 검증했습니다.

```bash
cd /workspace/baemin
npm ci
npm run dev
```

개발 서버는 5173 포트에서 실행됩니다. 화면 높이는 `100dvh`이며 각 패널이 독립적으로 스크롤됩니다.

클라우드 환경에서 기본 npm 캐시 경로에 쓰기 권한이 없으면 다음 명령을 사용하세요.

```bash
npm --cache /workspace/.npm-cache ci
```

## 검증

```bash
npm run build       # TypeScript 검사 + 프로덕션 빌드
npm run lint        # Oxlint
npm run test:e2e    # Chromium에서 10개 인터랙션 테스트
```

E2E 테스트는 `/usr/bin/chromium`이 있으면 사용합니다. 다른 환경에서는 `npx playwright install chromium`으로 브라우저를 설치하거나 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`에 Chromium 실행 파일 경로를 지정하세요. 테스트 서버는 자동 실행되며, 로컬에서 이미 실행 중이면 재사용합니다. 스크린샷은 `artifacts/`에, 실패한 테스트의 trace는 `test-results/`에 생성됩니다.

## 폴더 구조

```text
src/
  components/          # Sidebar, Workspace, AgentPanel, BottomPanel, 공통 UI
  data/mock.ts         # 초기 프로젝트, 에이전트, 작업, mock 파일과 대화
  state/useWorkspace.ts # useReducer 기반 상태와 mock 응답 처리
  types/index.ts       # 프로젝트·에이전트·작업·메시지 타입
  App.tsx              # 화면 구성, 메뉴 전환, 패널, 대화상자
  App.css              # 데스크톱 레이아웃과 컴포넌트 스타일
  index.css            # Tailwind, 테마, 전역 스타일
tests/                # Playwright 브라우저 테스트
```

## 기능

- Sidebar 접기·펼치기, Dashboard / Projects / Agents / Skills / Settings 전환
- 프로젝트 선택 및 세션 내 새 프로젝트 생성 (중복 이름 검사)
- Chat / Tasks / Files 탭, 작업 체크와 진행률 반영
- 에이전트 선택, working / idle / paused 변경, 일시정지·재개
- 채팅 입력과 지연 mock 응답, 프로젝트 전환 중에도 응답을 원래 프로젝트에 저장
- mock 파일 검색·미리보기와 채팅 컨텍스트 첨부
- 우측 에이전트 패널과 하단 Terminal / Logs 패널 열기·닫기
- 모의 터미널 명령: `help`, `clear`, `status`, `ls`, `echo <text>`, `npm run dev`
- 스킬 활성화·비활성화, 화면 밀도·메시지 시각 설정
- Quick search (`Ctrl / ⌘ + K`), 터미널 토글 (`Ctrl / ⌘ + 백틱`)

채팅은 Enter로 전송하며 Shift + Enter로 줄바꿈합니다. 한글 IME 조합 중에는 Enter가 메시지를 보내지 않습니다. 모든 작업과 응답은 시뮬레이션이며 파일·터미널 화면도 mock 데이터입니다. 에이전트 진행률은 고정된 샘플 값이고, 워크스페이스 진행률은 작업 완료 상태에서 계산합니다.

## 상태 관리와 확장

화면 상태는 `useWorkspace()`의 반환값을 통해 컴포넌트에 전달합니다. 도메인 타입과 초기 데이터를 UI 밖으로 분리했고, `workspaceReducer`에 상태 변화를 모아 두었습니다. Zustand로 확장할 때 훅의 반환 계약을 유지하면 컴포넌트 변경을 줄일 수 있습니다. `sendMessage()`의 타이머를 서비스 어댑터로 대체하면 실제 API 연결을 추가할 수 있습니다.

프로젝트·대화·작업·에이전트 상태는 세션 메모리에만 유지되며 새로고침하면 초기화됩니다. Compact density와 Message timestamps 설정만 브라우저 localStorage에 저장합니다.

## 설치 없이 브라우저에서 테스트

```bash
npm run build:web
```

`web-test/index.html` 하나에 JavaScript, CSS, 아이콘을 모두 포함합니다. 파일을 다운로드한 뒤 Chrome 또는 Edge에서 열면 개발 서버나 npm 설치 없이 UI를 테스트할 수 있습니다. 외부 네트워크 요청이 필요하지 않습니다. 파일 형태로 여는 환경에서는 브라우저의 저장소 정책에 따라 화면 설정 저장이 제한될 수 있습니다.

이 파일을 정적 웹 호스팅에 `index.html`로 올리면 HTTPS URL에서도 같은 UI를 사용할 수 있습니다. 현재 클라우드 환경 자체는 사용자용 웹 미리보기 URL을 제공하지 않으며, 외부 테스트 링크 생성은 네트워크 정책의 적용이 필요합니다.

정적 빌드를 클라우드 내부에서 확인하려면 `npm run web:serve`를 사용합니다. 공개 임시 링크는 아직 발급되지 않았습니다. 공식 체크섬을 확인한 Cloudflare 도구로 시도했지만 네트워크 정책 및 직접 DNS 연결 제한으로 실패했습니다.

환경 설정 초안에 추가한 도메인:

- `api.trycloudflare.com`
- `*.trycloudflare.com` (발급될 임시 URL 검증)
- `region1.v2.argotunnel.com`
- `region2.v2.argotunnel.com`
- `h2.cftunnel.com`

초안 저장은 실행 중인 네트워크 설정을 변경하지 않습니다. 설정 적용 이후에도 터널의 직접 연결 지원을 재검증해야 합니다.

## GitHub에서 다운로드 및 웹 실행

- 프로젝트 소스: https://github.com/PORATCH/baemin
- 테스트용 ZIP: https://github.com/PORATCH/baemin/raw/refs/heads/main/downloads/relay-web-test.zip
- GitHub Pages용 정적 사이트: `docs/index.html`

GitHub Pages를 활성화하려면 저장소 **Settings → Pages → Build and deployment**에서 **Deploy from a branch**, 브랜치 **main**, 폴더 **/docs**를 선택하고 저장하세요. 실제 배포 URL과 완료 상태는 그 화면에서 확인할 수 있습니다. API 접근 제한으로 Pages 활성화는 이 클라우드 환경에서 아직 확인하지 못했습니다.

UI 변경 후 게시 파일을 갱신하려면 `npm run build:web`로 빌드한 뒤 `web-test/index.html`을 `docs/index.html`에 복사하고 같은 파일로 `downloads/relay-web-test.zip`을 다시 생성하세요.
