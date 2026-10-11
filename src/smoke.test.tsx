// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { act } from 'react'
import { createRoot } from 'react-dom/client'

/* ---- Browser API stubs that jsdom is missing ---- */

class FakeIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

beforeAll(() => {
  // Tell React we're in an act()-friendly test environment.
  ;(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
  Element.prototype.scrollIntoView = vi.fn()
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
  window.localStorage.clear()
})

describe('Fizzora app smoke test', () => {
  it('renders the full single-page app without crashing', async () => {
    const { default: App } = await import('./App')
    const container = document.createElement('div')
    document.body.appendChild(container)

    await act(async () => {
      createRoot(container).render(<App />)
    })

    // Hero headline present exactly once (single h1)
    const h1s = container.querySelectorAll('h1')
    expect(h1s.length).toBe(1)
    expect(h1s[0].textContent).toContain('Life is better')

    // Key sections rendered
    for (const id of [
      'drinks',
      'customizer',
      'fizz-club',
      'snacks',
      'story',
      'events',
      'social',
      'newsletter',
      'contact',
    ]) {
      expect(container.querySelector(`#${id}`), `missing section #${id}`).not.toBeNull()
    }

    // All eight signature drinks rendered
    expect(container.textContent).toContain('King Coco')
    expect(container.textContent).toContain('Berry Galaxy')

    // Deal engine surfaced in the UI
    expect(container.textContent).toContain('Welcome Fizz')

    document.body.removeChild(container)
  })
})
