import { useState } from "react";
import {
  Heart,
  Star,
  ChevronRight,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import type { Menu } from "../types";
import { restaurants } from "../data/mockRestaurants";
import { useApp } from "../state/useApp";
import { Header, EmptyState } from "../components/common/Header";
import { won } from "../utils/format";
import { FoodArt } from "../components/common/FoodArt";
import { MenuSheet } from "../components/restaurant/MenuSheet";
export function RestaurantPage() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === id);
  const { state, dispatch } = useApp();
  const [tab, setTab] = useState("메뉴");
  const [menuCategory, setMenuCategory] = useState("인기메뉴");
  const [menu, setMenu] = useState<Menu | null>(null);
  const [expanded, setExpanded] = useState(false);
  if (!restaurant)
    return (
      <>
        <Header title="가게" />
        <EmptyState
          title="가게를 찾을 수 없어요"
          description="이전 화면에서 다시 선택해주세요."
        />
      </>
    );
  const r = restaurant;
  const liked = state.favorites.includes(r.id);
  const cart = state.cart.filter((i) => i.restaurantId === id);
  const cartCount = cart.reduce((n, i) => n + i.quantity, 0);
  const menus =
    menuCategory === "인기메뉴"
      ? r.menus.filter((m) => m.popular)
      : menuCategory === "메인메뉴"
        ? r.menus.slice(0, 3)
        : r.menus.slice(3);
  return (
    <div className="bm-restaurant-page">
      <Header
        title=""
        cart
        right={
          <button
            className={`bm-icon-button ${liked ? "liked" : ""}`}
            aria-label={liked ? "찜 해제" : "가게 찜하기"}
            aria-pressed={liked}
            onClick={() => dispatch({ type: "favorite", id: r.id })}
          >
            <Heart size={23} fill={liked ? "#f36f82" : "none"} />
          </button>
        }
      />
      <div className="bm-restaurant-cover">
        <FoodArt kind={r.food} background />
        <span>{r.name}</span>
        <small>1 / 3</small>
      </div>
      <section className="bm-restaurant-summary">
        <div className="bm-restaurant-name">
          <h1>{r.name}</h1>
          <span className="bm-one-badge">
            {r.tags.includes("배민1") ? "배민1" : "가게배달"}
          </span>
        </div>
        <button className="bm-detail-rating" onClick={() => setTab("리뷰")}>
          <Star size={17} fill="#f8bb1a" stroke="#f8bb1a" />
          <strong>{r.rating.toFixed(1)}</strong>
          <span>리뷰 {r.reviewCount.toLocaleString()}개</span>
          <ChevronRight size={14} />
        </button>
        <p>{r.description}</p>
        {r.coupon && (
          <Link to="/my/coupons" className="bm-restaurant-coupon">
            <span>쿠폰</span>
            <strong>{r.coupon} 쿠폰 받기</strong>
            <ChevronRight size={15} />
          </Link>
        )}
        <div className="bm-delivery-information">
          <div>
            <span>최소주문금액</span>
            <strong>{won(r.minimumOrder)}</strong>
          </div>
          <div>
            <span>배달시간</span>
            <strong>
              {r.deliveryMin}~{r.deliveryMax}분
            </strong>
          </div>
          <div>
            <span>배달팁</span>
            <strong>{r.deliveryFee ? won(r.deliveryFee) : "무료"}</strong>
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              {expanded ? <Minus size={13} /> : <Plus size={13} />}
            </button>
          </div>
          {expanded && (
            <p className="bm-delivery-explanation">
              현재 선택한 주소를 기준으로 표시됩니다. 주문 금액과 배달 지역에
              따라 배달팁이 달라질 수 있어요.
            </p>
          )}
        </div>
      </section>
      <div
        className="bm-restaurant-tabs"
        role="tablist"
        aria-label="가게 정보 탭"
      >
        {["메뉴", "정보", "리뷰"].map((name) => (
          <button
            key={name}
            role="tab"
            aria-selected={name === tab}
            className={name === tab ? "active" : ""}
            onClick={() => setTab(name)}
          >
            {name}
            {name === "리뷰" && <small>{r.reviewCount.toLocaleString()}</small>}
          </button>
        ))}
      </div>
      {tab === "메뉴" ? (
        <>
          <div className="bm-menu-categories">
            {["인기메뉴", "메인메뉴", "사이드"].map((c) => (
              <button
                key={c}
                onClick={() => setMenuCategory(c)}
                className={menuCategory === c ? "active" : ""}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="bm-menu-notice">
            가게에서 직접 조리하는 맛있는 한 끼!
            <br />
            메뉴 구성은 가게 상황에 따라 달라질 수 있어요.
          </div>
          <h2 className="bm-menu-section-title">{menuCategory}</h2>
          <div className="bm-menu-list">
            {menus.map((item) => (
              <button
                className="bm-menu-item"
                key={item.id}
                onClick={() => setMenu(item)}
                aria-label={`${item.name} 선택`}
              >
                <div>
                  {item.popular && <span>인기</span>}
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong>{won(item.price)}</strong>
                </div>
                <FoodArt kind={item.food} background />
              </button>
            ))}
          </div>
        </>
      ) : tab === "정보" ? (
        <div className="bm-store-information">
          <h2>가게 소개</h2>
          <p>{r.description}</p>
          <h2>영업 정보</h2>
          <dl>
            <dt>상호명</dt>
            <dd>{r.name}</dd>
            <dt>운영시간</dt>
            <dd>매일 11:00 ~ 23:00</dd>
            <dt>휴무일</dt>
            <dd>연중무휴</dd>
            <dt>주소</dt>
            <dd>서울특별시 강남구 역삼동</dd>
          </dl>
          <h2>원산지 정보</h2>
          <p>메뉴의 원산지는 가게에 확인해 주세요.</p>
        </div>
      ) : (
        <div className="bm-reviews">
          <div>
            <strong>{r.rating.toFixed(1)}</strong>
            <span>
              ★★★★★<small>리뷰 {r.reviewCount.toLocaleString()}개</small>
            </span>
          </div>
          {[
            "음식이 따뜻하게 도착했어요. 맛있게 먹었습니다!",
            "양도 넉넉하고 맛있어요. 다음에 또 주문할게요.",
            "배달도 빠르고 포장도 깔끔했어요.",
          ].map((review, i) => (
            <article key={review}>
              <strong>{["맛있게먹자", "배민이", "동네주민"][i]}</strong>
              <span>
                ★★★★★ <small>2026.10.{12 - i}</small>
              </span>
              <p>{review}</p>
            </article>
          ))}
        </div>
      )}
      {cartCount > 0 ? (
        <div className="bm-restaurant-cta">
          <Link to="/cart">
            <span className="bm-cart-count">{cartCount}</span>
            <strong>장바구니 보기</strong>
            <span>
              {won(cart.reduce((n, i) => n + i.quantity * i.unitPrice, 0))}
            </span>
          </Link>
        </div>
      ) : (
        <div className="bm-restaurant-cta idle">
          <ShoppingCart size={18} />
          <span>메뉴를 선택하고 장바구니에 담아주세요</span>
        </div>
      )}
      {menu && (
        <MenuSheet menu={menu} restaurant={r} onClose={() => setMenu(null)} />
      )}
    </div>
  );
}
