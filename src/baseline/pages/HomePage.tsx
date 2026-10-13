import { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  ShoppingCart,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FoodArt } from "../components/common/FoodArt";
import { RestaurantCard } from "../components/restaurant/RestaurantCard";
import { restaurants } from "../data/mockRestaurants";
import { useApp } from "../state/useApp";
const promotions = [
  {
    heading: "오늘도 맛있는 한 끼!",
    description: "우리 동네 맛집에서 할인받아요",
    color: "#fbe15d",
    food: "rice" as const,
  },
  {
    heading: "치킨이 생각나는 날",
    description: "바삭한 즐거움, 지금 만나보세요",
    color: "#d2d3f7",
    food: "chicken" as const,
  },
  {
    heading: "맛있는 시간은 함께",
    description: "피자 한 판으로 행복한 저녁",
    color: "#ffb7aa",
    food: "pizza" as const,
  },
];
export function HomePage() {
  const { state } = useApp();
  const [banner, setBanner] = useState(0);
  const promo = promotions[banner];
  return (
    <div className="bm-home-page">
      <header className="bm-home-header">
        <div className="bm-address-row">
          <Link to="/address" className="bm-address-button">
            <MapPin size={18} fill="white" />
            <strong>
              {state.address.includes("봉은사로") ? "회사" : "우리집"}
            </strong>
            <ChevronDown size={18} />
          </Link>
          <Link
            to="/notifications"
            className="bm-icon-button"
            aria-label="알림"
          >
            <Bell size={21} />
            <span className="bm-notification-dot" />
          </Link>
          <Link
            to="/cart"
            className="bm-icon-button bm-cart-icon"
            aria-label="장바구니"
          >
            <ShoppingCart size={22} />
            {state.cart.length > 0 && (
              <span>{state.cart.reduce((n, i) => n + i.quantity, 0)}</span>
            )}
          </Link>
        </div>
        <Link to="/search" className="bm-home-search">
          <Search size={20} />
          <span>찾는 맛집이 있나요?</span>
        </Link>
      </header>
      <div className="bm-home-services">
        <div className="bm-main-services">
          <Link to="/category/all" className="bm-service-tile delivery">
            <h2>음식배달</h2>
            <p>
              세상은 넓고
              <br />
              맛집은 많다
            </p>
            <FoodArt kind="chicken" />
          </Link>
          <Link to="/category/all?delivery=one" className="bm-service-tile one">
            <h2>
              배민<span>1</span>
            </h2>
            <p>
              한 번에 한 집만
              <br />
              빠르게 배달해요
            </p>
            <div className="bm-one-bag">
              <span>
                배민<span>1</span>
              </span>
              <i />
              <b />
            </div>
          </Link>
        </div>
        <div className="bm-sub-services">
          <Link to="/service/bmart">
            <span className="bm-service-emoji bmart">🛒</span>
            <strong>B마트</strong>
          </Link>
          <Link to="/service/store">
            <span className="bm-service-emoji store">🛍️</span>
            <strong>배민스토어</strong>
          </Link>
          <Link to="/category/all?delivery=pickup">
            <span className="bm-service-emoji pickup">🥡</span>
            <strong>포장</strong>
          </Link>
          <Link to="/service/gift">
            <span className="bm-service-emoji gift">🎁</span>
            <strong>선물하기</strong>
          </Link>
        </div>
      </div>
      <div className="bm-promotion" style={{ background: promo.color }}>
        <Link to="/my/coupons">
          <div>
            <strong>{promo.heading}</strong>
            <p>{promo.description}</p>
            <span>
              혜택 보러가기 <ChevronRight size={10} />
            </span>
          </div>
          <FoodArt kind={promo.food} />
        </Link>
        <button
          aria-label="다음 프로모션"
          onClick={() => setBanner((banner + 1) % promotions.length)}
        >
          {banner + 1} / {promotions.length} <ChevronRight size={10} />
        </button>
      </div>
      <section className="bm-home-categories">
        <div className="bm-section-title">
          <h2>오늘은 뭐 먹지?</h2>
          <Link to="/category/all">
            전체보기 <ChevronRight size={12} />
          </Link>
        </div>
        <CategoryGrid />
      </section>
      <div className="bm-home-small-banner">
        <span>배달팁 걱정 없이!</span>
        <strong>무료배달 맛집 모아보기</strong>
        <Link to="/category/all?free=1" aria-label="무료배달 맛집 보기">
          🛵 <ChevronRight size={18} />
        </Link>
      </div>
      <section className="bm-home-recommendations">
        <div className="bm-section-title">
          <h2>우리 동네 인기 맛집</h2>
          <Link to="/category/all">
            더보기 <ChevronRight size={12} />
          </Link>
        </div>
        <div className="bm-horizontal-restaurants">
          {restaurants.slice(0, 5).map((r) => (
            <RestaurantCard key={r.id} restaurant={r} compact />
          ))}
        </div>
      </section>
      <section className="bm-home-recommendations bm-home-local">
        <div className="bm-section-title">
          <h2>이런 메뉴는 어때요?</h2>
          <span className="bm-ad-label">광고</span>
        </div>
        {restaurants.slice(5, 7).map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </section>
      <footer className="bm-home-footer">
        <strong>배달의민족</strong>
        <p>맛있는 즐거움이 있는 일상</p>
        <span>사업자 정보 · 이용약관 · 개인정보처리방침</span>
      </footer>
    </div>
  );
}
