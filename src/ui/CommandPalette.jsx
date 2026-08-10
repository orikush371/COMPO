import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registry } from '../data/registry'
import { useTheme } from './ThemeContext'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()

  const actions = [
    { id: 'action-docs', label: 'Go to Docs', hint: 'Page', run: () => navigate('/docs') },
    { id: 'action-favorites', label: 'Go to Favorites', hint: 'Page', run: () => navigate('/favorites') },
    { id: 'action-home', label: 'Go to Home', hint: 'Page', run: () => navigate('/') },
    { id: 'action-theme', label: 'Toggle dark / light theme', hint: 'Action', run: () => toggleTheme() },
  ]

  const matchedActions = query.trim()
    ? actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
    : actions

  const matchedComponents = query.trim()
    ? registry.filter((c) => {
        const q = query.toLowerCase()
        return (
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q)
        )
      })
    : registry.slice(0, 6)

  const results = [
    ...matchedActions.map((a) => ({ type: 'action', ...a })),
    ...matchedComponents.map((c) => ({ type: 'component', ...c })),
  ]

  useEffect(() => {
    function onKeyDown(e) {
      const isMod = e.metaKey || e.ctrlKey
      if (isMod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  function runResult(result) {
    setOpen(false)
    if (result.type === 'action') {
      result.run()
    } else {
      navigate(`/components/${result.slug}`)
    }
  }

  function onInputKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      runResult(results[activeIndex])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-2 border border-border text-ink-dim text-sm hover:border-border-hi transition-colors"
      >
        Search or run a command
        <span className="ml-6 flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border text-[11px] font-mono text-ink-dim">⌘</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-bg border border-border text-[11px] font-mono text-ink-dim">K</kbd>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <span className="text-ink-faint">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search components or type a command…"
                className="flex-1 bg-transparent outline-none text-[14px] text-ink placeholder:text-ink-faint"
              />
              <kbd className="px-1.5 py-0.5 rounded bg-surface-2 border border-border text-[10px] font-mono text-ink-faint">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-thin py-2">
              {results.length === 0 && (
                <p className="px-4 py-6 text-center text-[13px] text-ink-faint">No results for "{query}"</p>
              )}
              {results.map((r, i) => (
                <button
                  key={r.type === 'action' ? r.id : r.slug}
                  onClick={() => runResult(r)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                    i === activeIndex ? 'bg-surface-2' : ''
                  }`}
                >
                  <span className="text-[13.5px] text-ink font-medium">{r.label ?? r.name}</span>
                  <span className="text-[11px] text-ink-faint font-mono">{r.hint ?? r.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
