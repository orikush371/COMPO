import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { ownTemplates as staticTemplates, externalTemplates } from '../data/templates'
import { PayPalBuyButton } from '../ui/PayPalBuyButton'

function OwnTemplateCard({ t }) {
  const priceLabel = t.price_cents ? `$${(t.price_cents / 100).toFixed(0)}` : t.price

  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="h-40 flex items-center justify-center bg-dots bg-[length:16px_16px] bg-surface-2 relative">
        <span className="text-[11px] font-mono text-ink-faint">preview soon</span>
        <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-bg/80 backdrop-blur border border-border text-[10px] font-mono text-ink-faint flex items-center gap-1">
          🔒 Locked
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[14px] font-semibold text-ink">{t.name}</h3>
          <span className="text-[13px] font-bold text-amber flex-shrink-0">{priceLabel}</span>
        </div>
        <p className="text-[12.5px] text-ink-dim mt-1.5 leading-relaxed">{t.desc}</p>
        {t.tags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {t.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-surface-2 border border-border text-[10.5px] text-ink-faint">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4">
          <PayPalBuyButton templateSlug={t.slug} priceLabel={priceLabel} />
        </div>
      </div>
    </div>
  )
}

function ExternalTemplateRow({ t }) {
  return (
    <a
      href={t.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-surface hover:border-border-hi transition-colors"
    >
      <div>
        <p className="text-[13.5px] font-semibold text-ink">{t.name}</p>
        <p className="text-[12px] text-ink-dim mt-0.5">{t.desc}</p>
      </div>
      <span className="text-[11px] font-mono text-ink-faint flex-shrink-0">Visit ↗</span>
    </a>
  )
}

export default function Templates() {
  const [templates, setTemplates] = useState(staticTemplates)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('templates')
      .select('slug, name, price_cents, active')
      .eq('active', true)
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return
        // Merge Supabase pricing/metadata with the static desc/tags, matched by slug.
        const merged = data.map((row) => {
          const local = staticTemplates.find((t) => t.slug === row.slug)
          return { ...local, ...row }
        })
        setTemplates(merged)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24">
      <div className="pt-12 pb-8">
        <p className="text-[12px] font-mono text-amber uppercase tracking-wider mb-2">Templates</p>
        <h1 className="text-[32px] font-bold tracking-tight">Full page templates</h1>
        <p className="text-ink-dim mt-2 text-[15px] max-w-lg">
          Whole pages built from compo components, plus a few marketplaces we
          think are worth your time if you need something we don't have yet.
        </p>
      </div>

      <section className="mb-14">
        <h2 className="text-[12px] font-mono uppercase tracking-wider text-ink-dim mb-4">Built by compo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t) => (
            <OwnTemplateCard key={t.slug} t={t} />
          ))}
        </div>
        <p className="text-[11.5px] text-ink-faint mt-4">
          Purchasing isn't live yet - these are in production. Check back soon.
        </p>
      </section>

      <section>
        <h2 className="text-[12px] font-mono uppercase tracking-wider text-ink-dim mb-4">From other marketplaces</h2>
        <div className="grid grid-cols-1 gap-3">
          {externalTemplates.map((t) => (
            <ExternalTemplateRow key={t.name} t={t} />
          ))}
        </div>
        <p className="text-[11px] text-ink-faint mt-3">
          Some of these links may be affiliate links - we may earn a commission at no extra cost to you.
        </p>
      </section>
    </div>
  )
}
