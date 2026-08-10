import { registry } from '../data/registry'
import { ComponentCard } from '../ui/ComponentCard'
import { useFavorites } from '../ui/useFavorites'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const { favorites } = useFavorites()
  const items = registry.filter((c) => favorites.includes(c.slug))

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      <div className="pt-12 pb-8">
        <p className="text-[12px] font-mono text-amber uppercase tracking-wider mb-2">Saved</p>
        <h1 className="text-[32px] font-bold tracking-tight">Your favorites</h1>
        <p className="text-ink-dim mt-2 text-[15px]">
          {items.length === 0
            ? "You haven't starred anything yet."
            : `${items.length} component${items.length === 1 ? '' : 's'} saved on this device.`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-ink-faint text-[13.5px] mb-4">
            Tap the star on any component card to save it here.
          </p>
          <Link to="/" className="inline-block px-4 py-2 rounded-lg bg-amber text-[#1a1200] text-sm font-semibold">
            Browse components
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <ComponentCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
