import { Link } from "react-router-dom";
import { categories } from "../../data/mockCategories";
import { FoodArt } from "../common/FoodArt";
export function CategoryGrid() {
  return (
    <div className="bm-category-grid">
      {categories.map((c) => (
        <Link
          key={c.id}
          to={`/category/${c.id}`}
          aria-label={`${c.name} 카테고리`}
        >
          <span
            style={{
              background: `radial-gradient(ellipse at center, ${c.color}45, transparent 72%)`,
            }}
          >
            <FoodArt kind={c.food} />
          </span>
          <strong>{c.name}</strong>
        </Link>
      ))}
    </div>
  );
}
