import { useEffect, useRef } from "react";
import { BatteryFull, Wifi, Signal } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomNavigation } from "../navigation/BottomNavigation";
export function AppLayout() {
  const location = useLocation();
  const viewport = useRef<HTMLDivElement>(null);
  const showBottom =
    ["/", "/search", "/favorites", "/orders", "/my"].includes(
      location.pathname,
    ) || location.pathname.startsWith("/category/");
  useEffect(() => {
    viewport.current?.scrollTo({ top: 0 });
    document.title = "배달의민족 — Baseline";
  }, [location.pathname]);
  return (
    <div className="bm-stage">
      <div className="bm-stage-caption">
        <strong>배달의민족</strong>
        <span>Baseline prototype</span>
      </div>
      <div className="bm-device">
        <div
          className={`bm-statusbar ${location.pathname === "/" ? "home" : ""}`}
        >
          <span>9:41</span>
          <div>
            <Signal size={13} fill="currentColor" />
            <Wifi size={14} />
            <BatteryFull size={19} />
          </div>
        </div>
        <div className="bm-page-viewport" ref={viewport}>
          <Outlet />
        </div>
        {showBottom && <BottomNavigation />}
        <div className="bm-home-indicator">
          <span />
        </div>
      </div>
    </div>
  );
}
