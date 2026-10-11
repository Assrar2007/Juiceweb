/** Versioned localStorage keys — bump the version if shapes change. */
export const STORAGE_KEYS = {
  cart: 'fizzora.cart.v1',
  member: 'fizzora.member.v1',
  motionPaused: 'fizzora.motion-paused.v1',
  selectedDeal: 'fizzora.selected-deal.v1',
} as const

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* Storage full / private mode — demo site, fail silently. */
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    /* noop */
  }
}
