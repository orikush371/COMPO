import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CommandPalette } from './CommandPalette'
import { useTheme } from './ThemeContext'
import { useAuth } from './AuthContext'

const NAV_LINKS = [
  { to: '/', label: 'Browse' },
  { to: '/templates', label: 'Templates' },
  { to: '/favorites', label: '★ Saved' },
  { to: '/docs', label: 'Docs' },
]

export function Nav() {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <Link to="/" className="font-mono font-bold text-[15px] text-ink tracking-tight flex-shrink-0">
          compo<span className="text-amber">_</span>
        </Link>

        <div className="hidden md:block flex-1 max-w-xs">
          <CommandPalette />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4 text-[13px] text-ink-dim font-medium">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-ink transition-colors whitespace-nowrap">
              {l.label}
            </Link>
          ))}
          <Link to={user ? '/account' : '/auth'} className="hover:text-ink transition-colors whitespace-nowrap">
            {user ? 'Account' : 'Sign in'}
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-ink-dim hover:text-ink hover:border-border-hi transition-colors flex-shrink-0"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-ink-dim"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-ink-dim"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg px-4 py-4 space-y-1">
          <div className="mb-3">
            <CommandPalette />
          </div>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-[14px] text-ink-dim hover:bg-surface-2 hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={user ? '/account' : '/auth'}
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-[14px] text-ink-dim hover:bg-surface-2 hover:text-ink transition-colors"
          >
            {user ? 'Account' : 'Sign in'}
          </Link>
        </div>
      )}
    </header>
  )
}
