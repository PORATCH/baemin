import { useState } from "react";
import { Bike, Check, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../state/useApp";
import { restaurants } from "../data/mockRestaurants";
import { EmptyState, Header } from "../components/common/Header";
import { won } from "../utils/format";
import { Sheet } from "../components/common/Sheet";
export function OrderDetailPage() {
  const { id } = useParams();
  const { state } = useApp();
  const order = state.orders.find((o) => o.id === id);
  const [call, setCall] = useState(false);
  if (!order)
    return (
      <>
        <Header title="주문상세" />
        <EmptyState
          title="주문을 찾을 수 없어요"
          description="주문내역에서 다시 확인해주세요."
        />
      </>
    );
  const restaurant = restaurants.find((r) => r.id === order.restaurantId)!;
  const total =
    order.items.reduce((n, i) => n + i.unitPrice * i.quantity, 0) +
    order.deliveryFee;
  return (
    <div className="bm-order-detail">
      <Header title="주문상세" />
      <section className={`bm-order-status ${order.status}`}>
        <span>
          {order.status === "preparing" ? (
            <Bike size={40} />
          ) : (
            <Check size={40} />
          )}
        </span>
        <h1>
          {order.status === "preparing"
            ? "가게에서 맛있게 조리하고 있어요"
            : "맛있게 드셨나요?"}
        </h1>
        <p>
          {order.status === "preparing"
            ? `예상 배달시간 ${restaurant.deliveryMin}~${restaurant.deliveryMax}분`
            : "주문한 음식이 배달되었어요."}
        </p>
        <div className="bm-order-steps">
          {["주문접수", "조리중", "배달중", "배달완료"].map((s, i) => (
            <span
              key={s}
              className={order.status === "delivered" || i < 2 ? "active" : ""}
            >
              <i />
              {s}
            </span>
          ))}
        </div>
      </section>
      <section className="bm-order-detail-section">
        <Link
          to={`/restaurant/${restaurant.id}`}
          className="bm-order-restaurant-link"
        >
          <h2>{restaurant.name}</h2>
          <ChevronRight size={19} />
        </Link>
        <div className="bm-order-contact">
          <button onClick={() => setCall(true)}>
            <Phone size={16} />
            가게에 전화
          </button>
          <Link to="/help/inquiry">
            <MessageCircle size={16} />
            주문 문의
          </Link>
        </div>
        <dl className="bm-order-basic-info">
          <dt>주문일시</dt>
          <dd>{order.date}</dd>
          <dt>주문번호</dt>
          <dd>{order.id}</dd>
        </dl>
      </section>
      <section className="bm-order-detail-section">
        <h2>주문 메뉴</h2>
        {order.items.map((item) => (
          <div className="bm-order-menu" key={item.id}>
            <div>
              <strong>
                {item.name} {item.quantity}개
              </strong>
              <span>{item.option}</span>
            </div>
            <strong>{won(item.unitPrice * item.quantity)}</strong>
          </div>
        ))}
        <div className="bm-order-payment">
          <span>배달팁</span>
          <span>{won(order.deliveryFee)}</span>
        </div>
        <div className="bm-order-payment total">
          <strong>총 결제금액</strong>
          <strong>{won(total)}</strong>
        </div>
      </section>
      <section className="bm-order-detail-section">
        <h2>배달 정보</h2>
        <div className="bm-order-delivery">
          <strong>배달 주소</strong>
          <p>{order.address}</p>
          <strong>요청사항</strong>
          <p>{order.request}</p>
        </div>
      </section>
      <p className="bm-order-demo-note">
        이 주문은 화면 테스트를 위한 예시입니다.
      </p>
      {call && (
        <Sheet title="가게에 전화" onClose={() => setCall(false)}>
          <div className="bm-info-sheet">
            <h3>{restaurant.name}</h3>
            <p>전화 연결은 이 프로토타입에서 제공하지 않아요.</p>
            <button
              className="bm-primary-button"
              onClick={() => setCall(false)}
            >
              확인
            </button>
          </div>
        </Sheet>
      )}
    </div>
  );
}
