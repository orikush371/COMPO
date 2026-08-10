import { Link } from 'react-router-dom'
import { getRecentlyViewed } from './viewTracking'

export function RecentlyViewed({ registry }) {
  const slugs = getRecentlyViewed()
  if (slugs.length === 0) return null

  const items = slugs
    .map((slug) => registry.find((c) => c.slug === slug))
    .filter(Boolean)

  if (items.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-[11px] font-mono uppercase tracking-wider text-ink-faint mb-3">Recently viewed</h2>
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`/components/${item.slug}`}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-surface-2 border border-border text-[12px] text-ink-dim hover:text-ink hover:border-border-hi transition-colors whitespace-nowrap"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
