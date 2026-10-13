import { useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { restaurants } from "../data/mockRestaurants";
import { Context, reducer, restore } from "./store";
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, restore);
  useEffect(() => {
    try {
      localStorage.setItem(
        "baemin-baseline-preferences",
        JSON.stringify({
          favorites: state.favorites,
          recentSearches: state.recentSearches,
          notifications: state.notifications,
        }),
      );
    } catch {
      /* Browser storage is optional. */
    }
  }, [state.favorites, state.recentSearches, state.notifications]);
  function placeOrder(request: string) {
    if (!state.cart.length) return "";
    const restaurant = restaurants.find(
      (r) => r.id === state.cart[0].restaurantId,
    )!;
    const id = `BM${Date.now()}`;
    const date = new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      hour12: false,
    });
    dispatch({
      type: "order",
      order: {
        id,
        restaurantId: restaurant.id,
        status: "preparing",
        date,
        items: [...state.cart],
        deliveryFee: restaurant.deliveryFee,
        address: state.address,
        request,
      },
    });
    return id;
  }
  return <Context value={{ state, dispatch, placeOrder }}>{children}</Context>;
}
