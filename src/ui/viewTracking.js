const VIEWS_KEY = 'compo-views'
const RECENT_KEY = 'compo-recent'
const RECENT_MAX = 8

function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function recordView(slug) {
  const views = readJSON(VIEWS_KEY, {})
  views[slug] = (views[slug] || 0) + 1
  window.localStorage.setItem(VIEWS_KEY, JSON.stringify(views))

  const recent = readJSON(RECENT_KEY, []).filter((s) => s !== slug)
  recent.unshift(slug)
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, RECENT_MAX)))
}

export function getViewCount(slug) {
  const views = readJSON(VIEWS_KEY, {})
  return views[slug] || 0
}

export function getAllViews() {
  return readJSON(VIEWS_KEY, {})
}

export function getRecentlyViewed() {
  return readJSON(RECENT_KEY, [])
}
