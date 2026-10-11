import type { Transition, Variants } from 'motion/react'

/** Shared easings & transitions used across the site. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 26,
  mass: 0.9,
}

export const softTween: Transition = {
  duration: 0.55,
  ease: EASE_OUT,
}

/** Fade-up reveal, used for scroll-triggered entrances. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: softTween },
}

/** Bigger entrance for hero-scale elements. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
}

/** Staggered container — pair with `staggerItem`. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: softTween },
}

/** Pop-in for badges / chips. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: spring },
}

/** Overlay for modals & drawers. */
export const overlayFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
}

/** Drawer sliding from the right. */
export const drawerSlide: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 32 } },
  exit: { x: '100%', transition: { duration: 0.28, ease: 'easeIn' } },
}

/** Modal pop. */
export const modalPop: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.2 } },
}

/** Shared viewport config for scroll-triggered reveals. */
export const onceViewport = { once: true, margin: '-80px' } as const
