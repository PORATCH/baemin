import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider } from "./state/AppProvider";
import { AppLayout } from "./components/common/AppLayout";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { CategoryPage } from "./pages/CategoryPage";
import { RestaurantPage } from "./pages/RestaurantPage";
import { CartPage } from "./pages/CartPage";
import { OrderPage } from "./pages/OrderPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { MyPage } from "./pages/MyPage";
import { SettingsPage } from "./pages/SettingsPage";
import { HelpPage } from "./pages/HelpPage";
import {
  AddressPage,
  FavoritesPage,
  MySubPage,
  NotificationsPage,
  ServicePage,
} from "./pages/AdditionalPages";
import { EmptyState, Header } from "./components/common/Header";
import "./styles.css";
export function BaselineApp() {
  return (
    <AppProvider>
      <HashRouter>
        <BaselineRoutes />
      </HashRouter>
    </AppProvider>
  );
}
function BaselineRoutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="search"
          element={<SearchPage key={location.pathname + location.search} />}
        />
        <Route
          path="category/:id"
          element={<CategoryPage key={location.pathname + location.search} />}
        />
        <Route
          path="restaurant/:id"
          element={<RestaurantPage key={location.pathname} />}
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="my" element={<MyPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage key={location.pathname} />} />
        <Route path="help/faq" element={<HelpPage key={location.pathname} />} />
        <Route
          path="help/inquiry"
          element={<HelpPage key={location.pathname} />}
        />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="my/address" element={<AddressPage />} />
        <Route
          path="my/:section"
          element={<MySubPage key={location.pathname} />}
        />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="service/:id" element={<ServicePage />} />
        <Route
          path="*"
          element={
            <>
              <Header title="페이지" />
              <EmptyState
                title="페이지를 찾을 수 없어요"
                description="이전 화면으로 돌아가주세요."
              />
            </>
          }
        />
      </Route>
    </Routes>
  );
}
