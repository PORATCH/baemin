import { useState } from "react";
import { useApp } from "../state/useApp";
import { EmptyState, Header } from "../components/common/Header";
import { OrderCard } from "../components/order/OrderCard";
export function OrderPage() {
  const { state } = useApp();
  const [tab, setTab] = useState("배달·포장");
  return (
    <div className="bm-orders-page">
      <Header title="주문내역" back={false} />
      <div className="bm-order-tabs">
        {["배달·포장", "B마트", "배민스토어"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "배달·포장" ? (
        <div className="bm-order-list">
          {state.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="주문내역이 없어요"
          description={`${tab}에서 주문한 내역이 여기에 표시돼요.`}
        />
      )}
    </div>
  );
}
