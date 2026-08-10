import { Link } from 'react-router-dom'
import { ErrorBoundary } from './ErrorBoundary'
import { FavoriteButton } from './FavoriteButton'

export function ComponentCard({ item }) {
  const { Demo } = item
  return (
    <div className="group relative rounded-2xl border border-border bg-surface overflow-hidden hover:border-border-hi transition-colors">
      <FavoriteButton slug={item.slug} className="absolute top-3 right-3 z-10" />
      <Link to={`/components/${item.slug}`} className="block">
        <div className="h-52 flex items-center justify-center bg-dots bg-[length:16px_16px] bg-surface-2 p-6 relative">
          <ErrorBoundary>
            <Demo />
          </ErrorBoundary>
        </div>
        <div className="px-4 py-3.5 bg-surface flex items-center justify-between rounded-b-2xl">
          <div>
            <h3 className="text-[13.5px] font-semibold text-ink">{item.name}</h3>
            <span className="text-[11px] text-ink-faint font-mono">{item.category}</span>
          </div>
          <span className="text-[10px] font-mono text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity">
            compo add {item.slug}
          </span>
        </div>
      </Link>
    </div>
  )
}
