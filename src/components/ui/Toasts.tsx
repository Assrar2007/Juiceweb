import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

/** Tiny stack of transient confirmations ("added to cart" etc.). */
export function Toasts() {
  const { toasts } = useStore()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col items-center gap-2"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="flex items-center gap-2.5 rounded-full bg-fizz-charcoal px-5 py-3 text-sm font-semibold text-fizz-cream shadow-pop"
          >
            <CheckCircle2 className="size-4 shrink-0 text-fizz-lime" aria-hidden="true" />
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
