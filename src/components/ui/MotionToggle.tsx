import { Pause, Play } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

/**
 * One visible switch that pauses all ambient movement (marquee, floating
 * hero art, drifting bubbles). The choice persists in localStorage.
 */
export function MotionToggle({ compact = false }: { compact?: boolean }) {
  const { animationsPaused, toggleAnimations } = useStore()

  return (
    <button
      type="button"
      onClick={toggleAnimations}
      aria-pressed={animationsPaused}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 font-bold transition-colors ${
        compact
          ? 'border-current/25 px-3 py-1.5 text-xs'
          : 'border-fizz-charcoal/20 bg-fizz-cream px-4 py-2 text-sm hover:bg-fizz-yellow'
      } ${animationsPaused ? 'bg-fizz-yellow' : ''}`}
    >
      {animationsPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
      {animationsPaused ? 'Resume animations' : 'Pause animations'}
    </button>
  )
}
