import { useState } from "react";
import { Search, X, ChevronLeft, Clock3 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../state/useApp";
import { categories } from "../data/mockCategories";
import { restaurants } from "../data/mockRestaurants";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { RestaurantCard } from "../components/restaurant/RestaurantCard";
import { EmptyState } from "../components/common/Header";
export function SearchPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const search = params.get("q") || "";
  const [input, setInput] = useState(search);
  const { state, dispatch } = useApp();
  function submit(value: string) {
    const q = value.trim();
    if (!q) return;
    setInput(q);
    setParams({ q });
    dispatch({ type: "search/add", value: q });
  }
  const results = restaurants.filter(
    (r) =>
      r.name.includes(search) ||
      r.menus.some((m) => m.name.includes(search)) ||
      categories.find((c) => c.id === r.categoryId)?.name.includes(search),
  );
  return (
    <div className="bm-search-page">
      <form
        className="bm-search-header"
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
      >
        <button
          type="button"
          className="bm-icon-button"
          aria-label="뒤로가기"
          onClick={() => navigate("/")}
        >
          <ChevronLeft size={25} />
        </button>
        <label>
          <Search size={18} />
          <input
            aria-label="음식이나 가게 검색"
            autoFocus
            placeholder="음식이나 가게 이름을 검색해보세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing && e.key === "Enter")
                e.preventDefault();
            }}
          />
          {input && (
            <button
              type="button"
              aria-label="검색어 지우기"
              onClick={() => {
                setInput("");
                setParams({});
              }}
            >
              <X size={15} />
            </button>
          )}
        </label>
        <button type="submit">검색</button>
      </form>
      {search ? (
        <>
          <div className="bm-search-result-heading">
            <h2>
              가게 <strong>{results.length}</strong>
            </h2>
            <span>‘{search}’ 검색 결과</span>
          </div>
          <div className="bm-search-results">
            {results.length ? (
              results.map((r) => <RestaurantCard key={r.id} restaurant={r} />)
            ) : (
              <EmptyState
                title="검색 결과가 없어요"
                description="다른 음식이나 가게 이름으로 검색해보세요."
              />
            )}
          </div>
        </>
      ) : (
        <>
          <section className="bm-search-section">
            <div className="bm-section-title">
              <h2>최근 검색어</h2>
              <button onClick={() => dispatch({ type: "search/remove" })}>
                전체 삭제
              </button>
            </div>
            {state.recentSearches.length ? (
              <div className="bm-recent-searches">
                {state.recentSearches.map((value) => (
                  <div key={value}>
                    <button onClick={() => submit(value)}>
                      <Clock3 size={15} />
                      {value}
                    </button>
                    <button
                      aria-label={`${value} 검색 기록 삭제`}
                      onClick={() => dispatch({ type: "search/remove", value })}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="bm-muted-empty">최근 검색어가 없어요.</p>
            )}
          </section>
          <section className="bm-search-section bm-popular-searches">
            <div className="bm-section-title">
              <h2>인기 검색어</h2>
              <span>오후 12:00 기준</span>
            </div>
            <div>
              {["치킨", "떡볶이", "피자", "초밥", "햄버거", "커피"].map(
                (term, i) => (
                  <button key={term} onClick={() => submit(term)}>
                    <strong>{i + 1}</strong>
                    {term}
                    <span>—</span>
                  </button>
                ),
              )}
            </div>
          </section>
          <section className="bm-search-section">
            <div className="bm-section-title">
              <h2>카테고리로 찾기</h2>
            </div>
            <CategoryGrid />
          </section>
        </>
      )}
    </div>
  );
}
