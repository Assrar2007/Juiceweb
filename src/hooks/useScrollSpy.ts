import { useEffect, useState } from 'react'

/** Tracks which page section is currently in view for the nav indicator. */
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null)
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
