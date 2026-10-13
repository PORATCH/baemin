import { useState } from "react";
import { Minus, Plus, X, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../state/useApp";
import { restaurants } from "../data/mockRestaurants";
import { EmptyState, Header } from "../components/common/Header";
import { won } from "../utils/format";
export function CartPage() {
  const { state, dispatch, placeOrder } = useApp();
  const navigate = useNavigate();
  const [request, setRequest] = useState("문 앞에 두고 벨 눌러주세요.");
  const [payment, setPayment] = useState("카드결제");
  const restaurant = restaurants.find(
    (r) => r.id === state.cart[0]?.restaurantId,
  );
  const subtotal = state.cart.reduce((n, i) => n + i.quantity * i.unitPrice, 0);
  function order() {
    const id = placeOrder(request);
    if (id) navigate(`/orders/${id}`);
  }
  return (
    <div className="bm-cart-page">
      <Header title="장바구니" />
      {!restaurant ? (
        <EmptyState
          title="장바구니가 비어있어요"
          description="가게에서 원하는 메뉴를 담아주세요."
        >
          <Link className="bm-outline-button" to="/">
            홈으로 가기
          </Link>
        </EmptyState>
      ) : (
        <>
          <section className="bm-cart-store">
            <Link to={`/restaurant/${restaurant.id}`}>
              <h2>{restaurant.name}</h2>
              <ChevronRight size={19} />
            </Link>
            {state.cart.map((item) => (
              <div className="bm-cart-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <button
                    className="bm-icon-button"
                    aria-label={`${item.name} 삭제`}
                    onClick={() =>
                      dispatch({ type: "cart/remove", id: item.id })
                    }
                  >
                    <X size={16} />
                  </button>
                </div>
                <p>
                  {item.option} · {won(item.unitPrice)}
                </p>
                <div className="bm-cart-item-bottom">
                  <strong>{won(item.unitPrice * item.quantity)}</strong>
                  <div className="bm-quantity-control">
                    <button
                      aria-label={`${item.name} 수량 줄이기`}
                      disabled={item.quantity === 1}
                      onClick={() =>
                        dispatch({
                          type: "cart/quantity",
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      }
                    >
                      <Minus size={14} />
                    </button>
                    <output>{item.quantity}</output>
                    <button
                      aria-label={`${item.name} 수량 늘리기`}
                      disabled={item.quantity >= 20}
                      onClick={() =>
                        dispatch({
                          type: "cart/quantity",
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="bm-cart-add-menu"
            >
              <Plus size={15} />
              메뉴 추가하기
            </Link>
          </section>
          <section className="bm-cart-section">
            <h2>배달받을 주소</h2>
            <Link to="/address" className="bm-cart-address">
              <span>
                <strong>우리집</strong>
                {state.address}
              </span>
              <ChevronRight size={17} />
            </Link>
            <label className="bm-cart-request">
              요청사항
              <select
                aria-label="배달 요청사항"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              >
                {[
                  "문 앞에 두고 벨 눌러주세요.",
                  "문 앞에 두고 노크해주세요.",
                  "문 앞에 두고 연락해주세요.",
                  "직접 받을게요.",
                ].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          </section>
          <section className="bm-cart-section">
            <h2>결제수단</h2>
            <div className="bm-payment-options">
              {["카드결제", "만나서 결제"].map((method) => (
                <label key={method}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method}
                    onChange={() => setPayment(method)}
                  />
                  {method}
                </label>
              ))}
            </div>
            <p className="bm-checkout-notice">
              예시 주문입니다. 실제 결제나 배달은 진행되지 않아요.
            </p>
          </section>
          <section className="bm-cart-section bm-cart-total">
            <h2>결제금액</h2>
            <div>
              <span>주문금액</span>
              <strong>{won(subtotal)}</strong>
            </div>
            <div>
              <span>배달팁</span>
              <strong>{won(restaurant.deliveryFee)}</strong>
            </div>
            <div className="total">
              <span>총 결제금액</span>
              <strong>{won(subtotal + restaurant.deliveryFee)}</strong>
            </div>
          </section>
          <div className="bm-checkout-cta">
            {subtotal < restaurant.minimumOrder && (
              <p>
                최소주문금액 {won(restaurant.minimumOrder)}부터 주문할 수
                있어요.
              </p>
            )}
            <button
              className="bm-primary-button"
              disabled={subtotal < restaurant.minimumOrder}
              onClick={order}
            >
              {won(subtotal + restaurant.deliveryFee)} 주문하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
