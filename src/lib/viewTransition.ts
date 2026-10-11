/**
 * Progressive enhancement wrapper for the View Transition API.
 * Feature-detected: browsers without `document.startViewTransition`
 * silently fall back to running the update directly.
 */
export function withViewTransition(update: () => void): void {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown
  }
  if (typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(update)
  } else {
    update()
  }
}
