import { useFavorites } from './useFavorites'

export function FavoriteButton({ slug, className = '' }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(slug)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(slug)
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={active}
      className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-colors ${
        active
          ? 'bg-amber/20 text-amber border border-amber/30'
          : 'bg-surface/80 text-ink-faint border border-border hover:text-ink'
      } ${className}`}
    >
      <span className="text-[15px] leading-none">{active ? '★' : '☆'}</span>
    </button>
  )
}
