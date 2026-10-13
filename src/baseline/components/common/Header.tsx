import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useApp } from "../../state/useApp";
export function Header({
  title,
  back = true,
  right,
  cart = false,
}: {
  title: string;
  back?: boolean;
  right?: ReactNode;
  cart?: boolean;
}) {
  const navigate = useNavigate();
  const { state } = useApp();
  return (
    <header className="bm-header">
      {back ? (
        <button
          className="bm-icon-button"
          aria-label="뒤로가기"
          onClick={() => {
            if (window.history.state?.idx > 0) navigate(-1);
            else navigate("/");
          }}
        >
          <ArrowLeft size={23} />
        </button>
      ) : (
        <span className="bm-header-spacer" />
      )}
      <h1>{title}</h1>
      <div className="bm-header-right">
        {cart && (
          <button
            className="bm-icon-button bm-cart-icon"
            aria-label="장바구니"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} />
            {state.cart.length > 0 && (
              <span>{state.cart.reduce((n, i) => n + i.quantity, 0)}</span>
            )}
          </button>
        )}
        {right || (!cart && <span className="bm-header-spacer" />)}
      </div>
    </header>
  );
}
export function EmptyState({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="bm-empty">
      <span className="bm-empty-illustration">🍽️</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}
