export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <button
        onClick={() => onChange(null)}
        className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors ${
          active === null
            ? 'bg-amber text-[#1a1200] border-amber'
            : 'bg-surface-2 text-ink-dim border-border hover:border-border-hi'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors ${
            active === cat
              ? 'bg-amber text-[#1a1200] border-amber'
              : 'bg-surface-2 text-ink-dim border-border hover:border-border-hi'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
