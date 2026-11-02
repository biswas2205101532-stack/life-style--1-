const KEY = 'lifestyle.v1'
export function load(fallback) {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}
export function save(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)) } catch {}
}
