import { useState } from "react";
import { Check, ChevronRight, MapPin, Bell, Ticket, Coins } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../state/useApp";
import { restaurants } from "../data/mockRestaurants";
import { deliveryAddress } from "../data/mockOrders";
import { Header, EmptyState } from "../components/common/Header";
import { RestaurantCard } from "../components/restaurant/RestaurantCard";
import { Sheet } from "../components/common/Sheet";
export function FavoritesPage() {
  const { state } = useApp();
  const favorites = restaurants.filter((r) => state.favorites.includes(r.id));
  return (
    <div className="bm-favorites-page">
      <Header title="찜한 가게" back={false} />
      <div className="bm-favorites-heading">
        가게 <strong>{favorites.length}</strong>
      </div>
      {favorites.length ? (
        <div className="bm-restaurant-list">
          {favorites.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="찜한 가게가 없어요"
          description="가게 상세의 하트를 눌러 찜해보세요."
        />
      )}
    </div>
  );
}
export function AddressPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const addresses = [
    { label: "우리집", address: deliveryAddress },
    { label: "회사", address: "서울특별시 강남구 봉은사로 234, 5층" },
  ];
  return (
    <div className="bm-address-page">
      <Header title="배달 주소 선택" />
      <div className="bm-address-list">
        {addresses.map((a) => (
          <button
            key={a.label}
            onClick={() => {
              dispatch({ type: "address", address: a.address });
              if (window.history.state?.idx > 0) navigate(-1);
              else navigate("/");
            }}
          >
            <MapPin size={22} />
            <span>
              <strong>{a.label}</strong>
              <p>{a.address}</p>
            </span>
            {state.address === a.address ? (
              <Check size={20} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
export function NotificationsPage() {
  return (
    <div className="bm-notifications-page">
      <Header title="알림" />
      <div className="bm-notification-item">
        <Bell size={23} />
        <div>
          <strong>오늘의 할인쿠폰이 도착했어요</strong>
          <p>우리 동네 맛집에서 사용할 수 있는 쿠폰을 확인해보세요.</p>
          <Link to="/my/coupons">
            쿠폰 확인하기 <ChevronRight size={12} />
          </Link>
          <time>오늘 09:00</time>
        </div>
      </div>
    </div>
  );
}
const titles: Record<string, string> = {
  account: "내 정보 수정",
  connections: "연결된 계정 관리",
  reviews: "내가 쓴 리뷰",
  friends: "친구에게 알려주기",
  events: "진행 중인 이벤트",
  gift: "배민 선물하기",
  business: "배민 사장님 광장",
  notices: "공지사항",
  terms: "약관 및 정책",
  privacy: "개인정보처리방침",
  license: "오픈소스 라이선스",
  version: "버전 정보",
  logout: "로그아웃",
  withdraw: "회원탈퇴",
  safety: "고객안심센터",
  pay: "배민페이",
  coupons: "쿠폰함",
  points: "포인트",
};
export function MySubPage() {
  const { section = "account" } = useParams();
  const title = titles[section] || "마이배민";
  const [info, setInfo] = useState(false);
  if (section === "coupons")
    return (
      <div>
        <Header title={title} />
        <div className="bm-coupon-heading">
          사용 가능한 쿠폰 <strong>3장</strong>
        </div>
        <div className="bm-coupons">
          {[
            {
              amount: "2,000원",
              name: "우리 동네 치킨 할인쿠폰",
              detail: "16,000원 이상 주문 시",
              date: "2026.10.31까지",
            },
            {
              amount: "1,000원",
              name: "맛있는 한 끼 할인쿠폰",
              detail: "10,000원 이상 주문 시",
              date: "2026.10.25까지",
            },
            {
              amount: "3,000원",
              name: "피자 할인쿠폰",
              detail: "20,000원 이상 주문 시",
              date: "2026.10.31까지",
            },
          ].map((c) => (
            <div className="bm-coupon" key={c.name}>
              <Ticket size={26} />
              <div>
                <strong>{c.amount}</strong>
                <h2>{c.name}</h2>
                <p>{c.detail}</p>
                <small>{c.date}</small>
              </div>
              <span>쿠폰</span>
            </div>
          ))}
        </div>
        <p className="bm-coupon-note">쿠폰별 사용 조건을 확인해주세요.</p>
      </div>
    );
  if (section === "points")
    return (
      <div>
        <Header title={title} />
        <div className="bm-points-summary">
          <Coins size={30} />
          <span>사용 가능한 포인트</span>
          <strong>
            1,200<span>P</span>
          </strong>
        </div>
        <div className="bm-points-row">
          <div>
            <strong>이벤트 포인트 적립</strong>
            <small>2026.10.10</small>
          </div>
          <strong>+1,200 P</strong>
        </div>
      </div>
    );
  if (section === "account")
    return (
      <div>
        <Header title={title} />
        <div className="bm-account-info">
          <div>
            <span>닉네임</span>
            <strong>배민이</strong>
          </div>
          <div>
            <span>이메일</span>
            <strong>baemin@example.com</strong>
          </div>
          <div>
            <span>휴대폰 번호</span>
            <strong>010-0000-0000</strong>
          </div>
        </div>
      </div>
    );
  if (section === "version")
    return (
      <div>
        <Header title={title} />
        <div className="bm-version-info">
          <span>배민</span>
          <h2>현재 버전 12.0.0</h2>
          <p>최신 버전을 사용하고 있어요.</p>
        </div>
      </div>
    );
  if (["terms", "privacy", "license"].includes(section))
    return (
      <div>
        <Header title={title} />
        <div className="bm-policy-content">
          <h2>{title}</h2>
          <p>이 화면은 화면 탐색을 위한 예시 콘텐츠입니다.</p>
          <h3>서비스 이용 안내</h3>
          <p>
            서비스의 이용 및 정보 처리에 대한 안내를 확인할 수 있습니다. 실제
            약관 전문은 제공하지 않습니다.
          </p>
        </div>
      </div>
    );
  if (section === "safety")
    return (
      <div>
        <Header title={title} />
        <div className="bm-safety-content">
          <h2>안심하고 이용하세요</h2>
          <p>가게와의 불편한 상황이나 안전과 관련된 문의를 확인할 수 있어요.</p>
          <Link to="/help/inquiry" className="bm-primary-button">
            문의하기
          </Link>
        </div>
      </div>
    );
  if (
    ["logout", "withdraw", "pay", "friends", "business", "gift"].includes(
      section,
    )
  )
    return (
      <div>
        <Header title={title} />
        <div className="bm-generic-content">
          <h2>{title}</h2>
          <p>이 메뉴의 상세 기능은 예시 화면으로 제공됩니다.</p>
          <button className="bm-outline-button" onClick={() => setInfo(true)}>
            확인
          </button>
        </div>
        {info && (
          <Sheet title={title} onClose={() => setInfo(false)}>
            <div className="bm-info-sheet">
              <p>계정 변경이나 외부 서비스 연결은 진행되지 않아요.</p>
              <button
                className="bm-primary-button"
                onClick={() => setInfo(false)}
              >
                확인
              </button>
            </div>
          </Sheet>
        )}
      </div>
    );
  return (
    <div>
      <Header title={title} />
      <EmptyState
        title={
          section === "reviews"
            ? "아직 작성한 리뷰가 없어요"
            : section === "notices"
              ? "새로운 공지사항이 없어요"
              : "등록된 내역이 없어요"
        }
        description="내역이 생기면 이곳에서 확인할 수 있어요."
      />
    </div>
  );
}
export function ServicePage() {
  const { id } = useParams();
  const title =
    (
      { bmart: "B마트", store: "배민스토어", gift: "선물하기" } as Record<
        string,
        string
      >
    )[id || ""] || "서비스";
  return (
    <div>
      <Header title={title} />
      <div className="bm-service-page-hero">
        <span>{id === "bmart" ? "🛒" : id === "gift" ? "🎁" : "🛍️"}</span>
        <h1>{title}</h1>
        <p>
          {id === "bmart" ? "필요한 것들을 한 번에" : "일상에 더하는 즐거움"}
        </p>
      </div>
      <EmptyState
        title="상품 정보가 없어요"
        description="이 서비스의 상품은 예시 화면으로 제공됩니다."
      />
    </div>
  );
}
