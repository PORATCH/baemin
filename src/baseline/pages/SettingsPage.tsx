import { useApp } from "../state/useApp";
import type { NotificationSettings } from "../types";
import { Header } from "../components/common/Header";
import { MenuRow } from "../components/mypage/MenuRow";
export function SettingsPage() {
  const { state, dispatch } = useApp();
  return (
    <div className="bm-settings-page">
      <Header title="환경설정" />
      <section>
        <h2>계정</h2>
        <MenuRow to="/my/account">내 정보 수정</MenuRow>
        <MenuRow to="/my/connections">연결된 계정 관리</MenuRow>
      </section>
      <section>
        <h2>알림 설정</h2>
        {(
          [
            {
              key: "orders",
              title: "주문 알림",
              description: "주문 및 배달 진행상황을 알려드려요.",
            },
            {
              key: "marketing",
              title: "혜택·이벤트 알림",
              description: "할인쿠폰과 이벤트 소식을 받아보세요.",
            },
            {
              key: "night",
              title: "야간 혜택 알림",
              description: "밤 9시부터 다음 날 오전 8시까지의 알림",
            },
          ] as {
            key: keyof NotificationSettings;
            title: string;
            description: string;
          }[]
        ).map((item) => (
          <div className="bm-setting-switch-row" key={item.key}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
            <button
              role="switch"
              aria-label={item.title}
              aria-checked={state.notifications[item.key]}
              className={`bm-switch ${state.notifications[item.key] ? "on" : ""}`}
              onClick={() => dispatch({ type: "notifications", key: item.key })}
            >
              <span />
            </button>
          </div>
        ))}
      </section>
      <section>
        <h2>앱 정보</h2>
        <MenuRow to="/my/version" badge="최신 버전">
          버전 정보
        </MenuRow>
        <MenuRow to="/my/terms">이용약관</MenuRow>
        <MenuRow to="/my/privacy">개인정보처리방침</MenuRow>
        <MenuRow to="/my/license">오픈소스 라이선스</MenuRow>
      </section>
      <section>
        <h2>기타</h2>
        <MenuRow to="/my/logout">로그아웃</MenuRow>
        <MenuRow to="/my/withdraw">회원탈퇴</MenuRow>
      </section>
      <p className="bm-settings-footer">우아한형제들</p>
    </div>
  );
}
