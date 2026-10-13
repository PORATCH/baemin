export type FoodKind =
  | "rice"
  | "chicken"
  | "pizza"
  | "noodles"
  | "tteokbokki"
  | "burger"
  | "sushi"
  | "coffee"
  | "steak"
  | "dumplings";
export interface Category {
  id: string;
  name: string;
  food: FoodKind;
  color: string;
}
export interface Menu {
  id: string;
  name: string;
  description: string;
  price: number;
  food: FoodKind;
  popular?: boolean;
  options?: { name: string; price: number }[];
}
export interface Restaurant {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  food: FoodKind;
  rating: number;
  reviewCount: number;
  deliveryFee: number;
  deliveryMin: number;
  deliveryMax: number;
  minimumOrder: number;
  distance: number;
  coupon?: string;
  tags: string[];
  menus: Menu[];
}
export interface CartItem {
  id: string;
  restaurantId: string;
  menuId: string;
  name: string;
  option: string;
  unitPrice: number;
  quantity: number;
  food: FoodKind;
}
export interface Order {
  id: string;
  restaurantId: string;
  status: "preparing" | "delivered";
  date: string;
  items: CartItem[];
  deliveryFee: number;
  address: string;
  request: string;
}
export interface NotificationSettings {
  orders: boolean;
  marketing: boolean;
  night: boolean;
}
export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}
