import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Menu, Restaurant } from "../../types";
import { useApp } from "../../state/useApp";
import { FoodArt } from "../common/FoodArt";
import { Sheet } from "../common/Sheet";
import { won } from "../../utils/format";
export function MenuSheet({
  menu,
  restaurant,
  onClose,
}: {
  menu: Menu;
  restaurant: Restaurant;
  onClose: () => void;
}) {
  const { state, dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState(0);
  const [confirmReplacement, setConfirmReplacement] = useState(false);
  const optionValue = menu.options?.[option];
  const price = menu.price + (optionValue?.price || 0);
  function add() {
    if (
      state.cart[0] &&
      state.cart[0].restaurantId !== restaurant.id &&
      !confirmReplacement
    ) {
      setConfirmReplacement(true);
      return;
    }
    dispatch({
      type: "cart/add",
      item: {
        id: crypto.randomUUID(),
        restaurantId: restaurant.id,
        menuId: menu.id,
        name: menu.name,
        option: optionValue?.name || "기본",
        unitPrice: price,
        quantity,
        food: menu.food,
      },
    });
    onClose();
  }
  return (
    <Sheet title="메뉴 선택" onClose={onClose}>
      <div className="bm-menu-sheet-content">
        <div className="bm-menu-sheet-art">
          <FoodArt kind={menu.food} background />
        </div>
        <h2>{menu.name}</h2>
        <p>{menu.description}</p>
        <div className="bm-menu-price">
          <span>가격</span>
          <strong>{won(menu.price)}</strong>
        </div>
        {menu.options && (
          <fieldset className="bm-menu-options">
            <legend>
              옵션 선택 <span>필수</span>
            </legend>
            {menu.options.map((o, i) => (
              <label key={o.name}>
                <input
                  type="radio"
                  name="menu-option"
                  checked={option === i}
                  onChange={() => setOption(i)}
                />
                <span>{o.name}</span>
                <strong>
                  {o.price ? `+${won(o.price)}` : "추가금액 없음"}
                </strong>
              </label>
            ))}
          </fieldset>
        )}
        <div className="bm-quantity-row">
          <strong>수량</strong>
          <div className="bm-quantity-control">
            <button
              aria-label="수량 줄이기"
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              <Minus size={17} />
            </button>
            <output>{quantity}</output>
            <button
              aria-label="수량 늘리기"
              disabled={quantity >= 20}
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={17} />
            </button>
          </div>
        </div>
        {confirmReplacement && (
          <p role="alert" className="bm-replacement-warning">
            장바구니에는 같은 가게의 메뉴만 담을 수 있어요. 기존 메뉴를 지우고
            새로 담을까요?
          </p>
        )}
        <button className="bm-primary-button" onClick={add}>
          {confirmReplacement ? "기존 메뉴 지우고 " : ""}
          {won(price * quantity)} 담기
        </button>
      </div>
    </Sheet>
  );
}
