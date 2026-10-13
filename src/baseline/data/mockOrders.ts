import type { Order } from "../types";
export const initialOrders: Order[] = [
  {
    id: "BM2026101301",
    restaurantId: "chicken-house",
    status: "preparing",
    date: "2026.10.13 12:30",
    deliveryFee: 0,
    address: "서울특별시 강남구 테헤란로 123, 101동 1001호",
    request: "문 앞에 두고 벨 눌러주세요.",
    items: [
      {
        id: "sample-1",
        restaurantId: "chicken-house",
        menuId: "chicken-house-m3",
        name: "반반 치킨",
        option: "기본",
        quantity: 1,
        unitPrice: 21000,
        food: "chicken",
      },
    ],
  },
  {
    id: "BM2026101102",
    restaurantId: "rice-table",
    status: "delivered",
    date: "2026.10.11 18:42",
    deliveryFee: 1500,
    address: "서울특별시 강남구 테헤란로 123, 101동 1001호",
    request: "수저 챙겨주세요.",
    items: [
      {
        id: "sample-2",
        restaurantId: "rice-table",
        menuId: "rice-table-m1",
        name: "직화 제육 덮밥",
        option: "기본",
        quantity: 1,
        unitPrice: 11000,
        food: "rice",
      },
    ],
  },
];
export const deliveryAddress = "서울특별시 강남구 테헤란로 123, 101동 1001호";
