import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { registry } from '../data/registry'
import { ComponentCard } from '../ui/ComponentCard'
import { CodeBlock } from '../ui/CodeBlock'
import { ErrorBoundary } from '../ui/ErrorBoundary'
import { FavoriteButton } from '../ui/FavoriteButton'
import { recordView } from '../ui/viewTracking'

export default function Detail() {
  const { slug } = useParams()
  const item = registry.find((c) => c.slug === slug)
  const [copied, setCopied] = useState(false)
  const [viewport, setViewport] = useState('desktop')

  useEffect(() => {
    if (item) recordView(item.slug)
  }, [item])

  if (!item) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center text-ink-dim">
        Component not found. <Link to="/" className="text-amber underline">Go back</Link>
      </div>
    )
  }

  const { Demo } = item
  const sameCategory = registry.filter((c) => c.slug !== slug && c.category === item.category)
  const others = registry.filter((c) => c.slug !== slug && c.category !== item.category)
  const related = [...sameCategory, ...others].slice(0, 3)

  function copy() {
    navigator.clipboard.writeText(item.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pb-24">
      <nav className="flex items-center gap-1.5 text-[13px] mt-10 mb-7" aria-label="Breadcrumb">
        <Link to="/" className="text-ink-dim hover:text-ink transition-colors">Home</Link>
        <span className="text-ink-faint">/</span>
        <Link
          to={`/?category=${encodeURIComponent(item.category)}`}
          className="text-ink-dim hover:text-ink transition-colors"
        >
          {item.category}
        </Link>
        <span className="text-ink-faint">/</span>
        <span className="text-ink font-medium">{item.name}</span>
      </nav>

      <div className="mb-3 flex items-center gap-2">
        <span className="text-[11px] font-mono text-amber bg-amber/10 border border-amber/25 rounded-full px-2.5 py-1">{item.category}</span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight">{item.name}</h1>
          <p className="text-ink-dim mt-2 text-[15px] max-w-lg">{item.desc}</p>
        </div>
        <FavoriteButton slug={item.slug} className="flex-shrink-0 mt-1" />
      </div>

      <div className="mt-7 flex justify-center">
        <div className="inline-flex p-1 rounded-lg bg-surface-2 border border-border text-xs font-medium">
          <button
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1.5 rounded-md transition-colors ${viewport === 'desktop' ? 'bg-amber text-[#1a1200]' : 'text-ink-dim hover:text-ink'}`}
          >
            Desktop
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1.5 rounded-md transition-colors ${viewport === 'mobile' ? 'bg-amber text-[#1a1200]' : 'text-ink-dim hover:text-ink'}`}
          >
            Mobile
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface-2 bg-dots bg-[length:18px_18px] min-h-[340px] flex items-center justify-center p-12">
        <div
          className={viewport === 'mobile' ? 'w-[340px] flex items-center justify-center' : 'flex items-center justify-center'}
        >
          <ErrorBoundary>
            <Demo />
          </ErrorBoundary>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 bg-surface-2 rounded-t-2xl">
          <span className="text-[12px] font-mono text-ink-dim">{item.slug}.jsx</span>
          <button
            onClick={copy}
            className={`text-[12.5px] font-medium px-3 py-1.5 rounded-md border transition-colors ${
              copied ? 'bg-lime/10 border-lime/40 text-lime copy-pop' : 'bg-surface-2 border-border text-ink hover:border-border-hi'
            }`}
          >
            {copied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
        <CodeBlock code={item.code} />
      </div>

      <p className="mt-4 text-[12px] text-ink-faint text-center">
        Copy-paste only - there's no npm package to install.
      </p>

      <div className="mt-14">
        <h2 className="text-[12px] font-mono uppercase tracking-wider text-ink-dim mb-4">More like this</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((c) => (
            <ComponentCard key={c.slug} item={c} />
          ))}
        </div>
      </div>
    </div>
  )
}
