import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Check, Search } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Header, EmptyState } from "../components/common/Header";
import { Sheet } from "../components/common/Sheet";
import { RestaurantCard } from "../components/restaurant/RestaurantCard";
import { categories } from "../data/mockCategories";
import { restaurants } from "../data/mockRestaurants";
export function CategoryPage() {
  const { id = "all" } = useParams();
  const [params] = useSearchParams();
  const [sort, setSort] = useState("기본순");
  const [free, setFree] = useState(params.get("free") === "1");
  const [coupon, setCoupon] = useState(false);
  const [sheet, setSheet] = useState(false);
  const category = categories.find((c) => c.id === id);
  const delivery = params.get("delivery") || "all";
  const filtered = restaurants
    .filter(
      (r) =>
        (id === "all" || r.categoryId === id) &&
        (!free || r.deliveryFee === 0) &&
        (!coupon || r.coupon) &&
        (delivery !== "one" || r.tags.includes("배민1")),
    )
    .sort((a, b) =>
      sort === "별점 높은 순"
        ? b.rating - a.rating
        : sort === "배달 빠른 순"
          ? a.deliveryMin - b.deliveryMin
          : sort === "가까운 순"
            ? a.distance - b.distance
            : 0,
    );
  return (
    <div className="bm-category-page">
      <Header
        title={delivery === "pickup" ? "포장" : category?.name || "음식배달"}
        right={
          <Link
            className="bm-icon-button"
            to="/search"
            aria-label="검색으로 이동"
          >
            <Search size={22} />
          </Link>
        }
      />
      <div className="bm-delivery-tabs">
        <Link
          to={`/category/${id}`}
          className={delivery === "all" ? "active" : ""}
        >
          배달
        </Link>
        <Link
          to={`/category/${id}?delivery=one`}
          className={delivery === "one" ? "active" : ""}
        >
          배민1
        </Link>
        <Link
          to={`/category/${id}?delivery=pickup`}
          className={delivery === "pickup" ? "active" : ""}
        >
          포장
        </Link>
      </div>
      <div className="bm-category-strip">
        <Link to="/category/all" className={id === "all" ? "active" : ""}>
          전체
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            className={id === c.id ? "active" : ""}
            to={`/category/${c.id}`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div className="bm-list-filters">
        <button onClick={() => setSheet(true)}>
          <SlidersHorizontal size={12} />
          {sort}
          <ChevronDown size={11} />
        </button>
        <button
          className={free ? "selected" : ""}
          aria-pressed={free}
          onClick={() => setFree(!free)}
        >
          배달팁 무료
        </button>
        <button
          className={coupon ? "selected" : ""}
          aria-pressed={coupon}
          onClick={() => setCoupon(!coupon)}
        >
          할인쿠폰
        </button>
        <button onClick={() => setSheet(true)}>
          필터 <ChevronDown size={11} />
        </button>
      </div>
      <div className="bm-list-promotion">
        <span>우리 동네 맛집</span>
        <strong>맛있는 한 끼, 할인받고 주문하세요!</strong>
        <span>💌</span>
      </div>
      <div className="bm-list-heading">
        <h2>
          주변 가게 <span>{filtered.length}</span>
        </h2>
        <small>현재 주소 기준</small>
      </div>
      <div className="bm-restaurant-list">
        {filtered.length ? (
          filtered.map((r) => <RestaurantCard key={r.id} restaurant={r} />)
        ) : (
          <EmptyState
            title="조건에 맞는 가게가 없어요"
            description="선택한 필터를 다시 확인해주세요."
          />
        )}
      </div>
      {sheet && (
        <Sheet title="정렬" onClose={() => setSheet(false)}>
          <div className="bm-sort-options">
            {["기본순", "별점 높은 순", "배달 빠른 순", "가까운 순"].map(
              (option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSort(option);
                    setSheet(false);
                  }}
                >
                  {option}
                  {option === sort && <Check size={19} />}
                </button>
              ),
            )}
          </div>
        </Sheet>
      )}
    </div>
  );
}
