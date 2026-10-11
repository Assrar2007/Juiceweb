import { useMemo } from 'react'

interface BubblesProps {
  /** Number of drifting bubbles. */
  count?: number
  className?: string
}

/**
 * Ambient drifting bubbles. Pure CSS keyframes (transform + opacity only),
 * paused site-wide by the MotionToggle and disabled by prefers-reduced-motion.
 */
export function Bubbles({ count = 12, className }: BubblesProps) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 7919) % 100
        return {
          left: `${(seed * 0.97 + 2) % 100}%`,
          size: 10 + ((i * 13) % 26),
          delay: `${(i * 0.9) % 9}s`,
          duration: `${9 + ((i * 5) % 7)}s`,
          opacity: 0.25 + ((i * 17) % 30) / 100,
        }
      }),
    [count],
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="anim-loop absolute bottom-0 rounded-full border border-white/70 bg-white/25"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationName: 'bubble-rise',
            animationDuration: b.duration,
            animationDelay: b.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        />
      ))}
    </div>
  )
}
