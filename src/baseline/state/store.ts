import { createContext } from "react";
import type { CartItem, NotificationSettings, Order } from "../types";
import { deliveryAddress, initialOrders } from "../data/mockOrders";
export interface State {
  cart: CartItem[];
  favorites: string[];
  recentSearches: string[];
  orders: Order[];
  notifications: NotificationSettings;
  address: string;
}
export type Action =
  | { type: "cart/add"; item: CartItem }
  | { type: "cart/quantity"; id: string; quantity: number }
  | { type: "cart/remove"; id: string }
  | { type: "favorite"; id: string }
  | { type: "search/add"; value: string }
  | { type: "search/remove"; value?: string }
  | { type: "order"; order: Order }
  | { type: "notifications"; key: keyof NotificationSettings }
  | { type: "address"; address: string };
export function restore(): State {
  let preferences: Partial<
    Pick<State, "favorites" | "recentSearches" | "notifications">
  > = {};
  try {
    preferences = JSON.parse(
      localStorage.getItem("baemin-baseline-preferences") || "{}",
    );
  } catch {
    /* The prototype works without browser storage. */
  }
  return {
    cart: [],
    favorites: Array.isArray(preferences.favorites)
      ? preferences.favorites
      : ["chicken-house"],
    recentSearches: Array.isArray(preferences.recentSearches)
      ? preferences.recentSearches
      : ["치킨", "떡볶이", "커피"],
    orders: initialOrders,
    notifications: {
      orders: true,
      marketing: false,
      night: false,
      ...preferences.notifications,
    },
    address: deliveryAddress,
  };
}
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "cart/add": {
      const sameRestaurant =
        state.cart[0]?.restaurantId === action.item.restaurantId;
      const existing = sameRestaurant
        ? state.cart.find(
            (i) =>
              i.menuId === action.item.menuId &&
              i.option === action.item.option,
          )
        : undefined;
      return {
        ...state,
        cart: existing
          ? state.cart.map((i) =>
              i.id === existing.id
                ? { ...i, quantity: i.quantity + action.item.quantity }
                : i,
            )
          : [...(sameRestaurant ? state.cart : []), action.item],
      };
    }
    case "cart/quantity":
      return {
        ...state,
        cart: state.cart
          .map((i) =>
            i.id === action.id ? { ...i, quantity: action.quantity } : i,
          )
          .filter((i) => i.quantity > 0),
      };
    case "cart/remove":
      return { ...state, cart: state.cart.filter((i) => i.id !== action.id) };
    case "favorite":
      return {
        ...state,
        favorites: state.favorites.includes(action.id)
          ? state.favorites.filter((id) => id !== action.id)
          : [...state.favorites, action.id],
      };
    case "search/add":
      return {
        ...state,
        recentSearches: [
          action.value,
          ...state.recentSearches.filter((v) => v !== action.value),
        ].slice(0, 10),
      };
    case "search/remove":
      return {
        ...state,
        recentSearches: action.value
          ? state.recentSearches.filter((v) => v !== action.value)
          : [],
      };
    case "order":
      return { ...state, orders: [action.order, ...state.orders], cart: [] };
    case "notifications":
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.key]: !state.notifications[action.key],
        },
      };
    case "address":
      return { ...state, address: action.address };
  }
}
export interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
  placeOrder: (request: string) => string;
}
export const Context = createContext<ContextValue | null>(null);
