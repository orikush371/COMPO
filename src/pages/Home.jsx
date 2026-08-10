import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { registry } from '../data/registry'
import { ComponentCard } from '../ui/ComponentCard'
import { TerminalHero } from '../ui/TerminalHero'
import { DownloadAllButton } from '../ui/DownloadAllButton'
import { CategoryFilter } from '../ui/CategoryFilter'
import { SortSelect } from '../ui/SortSelect'
import { RecentlyViewed } from '../ui/RecentlyViewed'
import { getAllViews } from '../ui/viewTracking'

export default function Home() {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl || null)
  const [sort, setSort] = useState('default')

  useEffect(() => {
    if (categoryFromUrl) setActiveCategory(categoryFromUrl)
  }, [categoryFromUrl])

  const categories = useMemo(
    () => [...new Set(registry.map((c) => c.category))].sort(),
    []
  )

  const filtered = useMemo(() => {
    let list = activeCategory
      ? registry.filter((c) => c.category === activeCategory)
      : [...registry]

    if (sort === 'az') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'za') {
      list.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sort === 'most-viewed') {
      const views = getAllViews()
      list.sort((a, b) => (views[b.slug] || 0) - (views[a.slug] || 0))
    }
    return list
  }, [activeCategory, sort])

  return (
    <div className="max-w-6xl mx-auto px-6">
      <TerminalHero />
      <div className="flex justify-center mb-6 -mt-4">
        <DownloadAllButton />
      </div>
      <RecentlyViewed registry={registry} />
      <CategoryFilter categories={categories} active={activeCategory} onChange={setActiveCategory} />
      <div className="flex justify-end mb-5">
        <SortSelect value={sort} onChange={setSort} />
      </div>
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mx-auto mb-4 text-xl">🔍</div>
          <p className="text-ink-faint text-[13.5px] mb-4">No components in this category yet.</p>
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-lg bg-surface-2 border border-border text-[13px] text-ink hover:border-border-hi transition-colors"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24">
          {filtered.map((item) => (
            <ComponentCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
