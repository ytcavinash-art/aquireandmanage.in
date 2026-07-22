interface NewsFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function NewsFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: NewsFilterProps) {
  return (
    <div className="mb-8 space-y-5" aria-label="Filter news">
      <div>
        <label htmlFor="news-search" className="sr-only">Search redevelopment news</label>
        <input
          id="news-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search redevelopment news..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-navy shadow-sm placeholder:text-slate-400 focus:border-navy"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3" aria-label="Filter news by topic">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={selectedCategory === category}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category ? 'bg-navy text-white' : 'border border-slate-300 bg-white text-slate-600 hover:border-navy hover:text-navy'
              }`}
            >
              {category}
            </button>
          ))}
      </div>
    </div>
  );
}
