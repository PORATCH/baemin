import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
export function MenuRow({
  to,
  children,
  description,
  badge,
}: {
  to: string;
  children: ReactNode;
  description?: string;
  badge?: string;
}) {
  return (
    <Link className="bm-menu-row" to={to}>
      <span>
        {children}
        {description && <small>{description}</small>}
      </span>
      {badge && <strong>{badge}</strong>}
      <ChevronRight size={18} />
    </Link>
  );
}
