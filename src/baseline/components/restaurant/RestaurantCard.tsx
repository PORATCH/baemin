import { Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Restaurant } from "../../types";
import { FoodArt } from "../common/FoodArt";
import { won } from "../../utils/format";
export function RestaurantCard({
  restaurant: r,
  compact = false,
}: {
  restaurant: Restaurant;
  compact?: boolean;
}) {
  return (
    <Link
      to={`/restaurant/${r.id}`}
      className={`bm-restaurant-card ${compact ? "compact" : ""}`}
      aria-label={`${r.name} 가게 보기`}
    >
      <div className="bm-restaurant-image">
        <FoodArt kind={r.food} background />
        {r.coupon && <span className="bm-image-coupon">{r.coupon}</span>}
      </div>
      <div className="bm-restaurant-info">
        <h3>{r.name}</h3>
        <div className="bm-rating">
          <Star size={12} fill="#f5bb27" stroke="#f5bb27" />
          <strong>{r.rating.toFixed(1)}</strong>
          <span>({r.reviewCount.toLocaleString()})</span>
          <span>· {r.distance}km</span>
        </div>
        <p>
          <Clock3 size={11} />
          {r.deliveryMin}~{r.deliveryMax}분
          <span>최소주문 {won(r.minimumOrder)}</span>
        </p>
        <div className="bm-delivery-meta">
          {r.tags.includes("배민1") ? (
            <span className="bm-one-badge">배민1</span>
          ) : (
            <span>가게배달</span>
          )}
          <span>
            배달팁{" "}
            <strong>{r.deliveryFee === 0 ? "무료" : won(r.deliveryFee)}</strong>
          </span>
        </div>
      </div>
    </Link>
  );
}
