import { Link } from 'react-router-dom'
import { CommandPalette } from './CommandPalette'
import { useTheme } from './ThemeContext'
import { useAuth } from './AuthContext'

export function Nav() {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="font-mono font-bold text-[15px] text-ink tracking-tight flex-shrink-0">
          compo<span className="text-amber">_</span>
        </Link>
        <div className="hidden sm:block flex-1 max-w-xs">
          <CommandPalette />
        </div>
        <div className="flex items-center gap-4 text-[13px] text-ink-dim font-medium">
          <Link to="/" className="hover:text-ink transition-colors">Browse</Link>
          <Link to="/templates" className="hover:text-ink transition-colors">Templates</Link>
          <Link to="/favorites" className="hover:text-ink transition-colors">★ Saved</Link>
          <Link to="/docs" className="hover:text-ink transition-colors">Docs</Link>
          <Link
            to={user ? '/account' : '/auth'}
            className="hover:text-ink transition-colors"
          >
            {user ? 'Account' : 'Sign in'}
          </Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-ink-dim hover:text-ink hover:border-border-hi transition-colors"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </header>
  )
}
