import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Order } from "../../types";
import { restaurants } from "../../data/mockRestaurants";
import { FoodArt } from "../common/FoodArt";
import { won } from "../../utils/format";
export function OrderCard({ order }: { order: Order }) {
  const restaurant = restaurants.find((r) => r.id === order.restaurantId)!;
  const total =
    order.items.reduce((n, i) => n + i.unitPrice * i.quantity, 0) +
    order.deliveryFee;
  return (
    <article className="bm-order-card">
      <div className="bm-order-card-top">
        <time>{order.date}</time>
        <strong className={order.status === "preparing" ? "preparing" : ""}>
          {order.status === "preparing" ? "조리중" : "배달완료"}
        </strong>
      </div>
      <Link to={`/orders/${order.id}`} className="bm-order-card-store">
        <FoodArt kind={restaurant.food} background />
        <div>
          <h2>{restaurant.name}</h2>
          <p>
            {order.items.map((i) => `${i.name} ${i.quantity}개`).join(", ")}
          </p>
          <strong>{won(total)}</strong>
        </div>
        <ChevronRight size={17} />
      </Link>
      <div className="bm-order-card-actions">
        <Link to={`/restaurant/${restaurant.id}`}>가게보기</Link>
        <Link to={`/orders/${order.id}`}>주문상세</Link>
      </div>
    </article>
  );
}
