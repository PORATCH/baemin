import { Heart, Home, Search, UserRound, ReceiptText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const tabs = [
  { to: "/", name: "홈", icon: Home },
  { to: "/search", name: "검색", icon: Search },
  { to: "/favorites", name: "찜", icon: Heart },
  { to: "/orders", name: "주문내역", icon: ReceiptText },
  { to: "/my", name: "마이배민", icon: UserRound },
];
export function BottomNavigation() {
  const { pathname } = useLocation();
  return (
    <nav className="bm-bottom-nav" aria-label="하단 내비게이션">
      {tabs.map(({ to, name, icon: Icon }) => {
        const active =
          pathname === to || (to === "/" && pathname.startsWith("/category/"));
        return (
          <Link
            key={to}
            to={to}
            className={active ? "active" : ""}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={23} strokeWidth={1.8} />
            <span>{name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
