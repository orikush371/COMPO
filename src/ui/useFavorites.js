import { useCallback, useEffect, useState } from 'react'

const KEY = 'compo-favorites'
const EVENT = 'compo-favorites-changed'

function readFavorites() {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeFavorites(list) {
  window.localStorage.setItem(KEY, JSON.stringify(list))
  window.dispatchEvent(new Event(EVENT))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => readFavorites())

  useEffect(() => {
    function onChange() {
      setFavorites(readFavorites())
    }
    window.addEventListener(EVENT, onChange)
    window.addEventListener('storage', onChange)
    return () => {
      window.removeEventListener(EVENT, onChange)
      window.removeEventListener('storage', onChange)
    }
  }, [])

  const toggle = useCallback((slug) => {
    const current = readFavorites()
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug]
    writeFavorites(next)
  }, [])

  const isFavorite = useCallback((slug) => favorites.includes(slug), [favorites])

  return { favorites, toggle, isFavorite }
}
