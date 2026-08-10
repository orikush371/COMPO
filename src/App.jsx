import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'
import { Nav } from './ui/Nav'
import { ScrollToTop } from './ui/ScrollToTop'
import { ThemeProvider } from './ui/ThemeContext'
import { AuthProvider } from './ui/AuthContext'
import { SEO } from './ui/SEO'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Docs from './pages/Docs'
import Favorites from './pages/Favorites'
import Shortcuts from './pages/Shortcuts'
import Templates from './pages/Templates'
import Tools from './pages/Tools'
import Auth from './pages/Auth'
import Account from './pages/Account'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

function ShortcutKeyListener() {
  const navigate = useNavigate()
  useEffect(() => {
    function onKeyDown(e) {
      const tag = document.activeElement?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if (!typing && e.key === '?') {
        navigate('/shortcuts')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])
  return null
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <SEO />
            <ScrollToTop />
            <ShortcutKeyListener />
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/components/:slug" element={<Detail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/shortcuts" element={<Shortcuts />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
