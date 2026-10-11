import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  over: boolean
}

/** Live countdown to an ISO date. Ticks once per second. */
export function useCountdown(endsAt: string): CountdownParts {
  const target = new Date(endsAt).getTime()

  const compute = (): CountdownParts => {
    const diff = target - Date.now()
    if (Number.isNaN(target) || diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true }
    }
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1_000) % 60),
      over: false,
    }
  }

  const [parts, setParts] = useState<CountdownParts>(compute)

  useEffect(() => {
    const timer = window.setInterval(() => setParts(compute()), 1_000)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt])

  return parts
}
