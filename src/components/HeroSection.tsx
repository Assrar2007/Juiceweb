import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { DrinkCup } from './illustrations/DrinkCup'
import { Blob } from './illustrations/Scenes'
import { Bubbles } from './illustrations/Bubbles'
import { Cherry, LimeSlice, Strawberry, OrangeSlice, BerriesCluster } from './illustrations/Fruit'
import { useStore } from '../context/StoreContext'
import { scrollToId } from '../lib/scroll'
import { EASE_OUT } from '../motion/variants'
import { PRODUCTS } from '../data/products'

const HERO_ART = PRODUCTS[0].art // King Coco front and center

/** Floating fruit with a staggered entrance + CSS drift loop (pausable). */
function FloatingFruit({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.6 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5 + delay, duration: 0.6, ease: EASE_OUT }}
      className={`absolute ${className}`}
    >
      <div className="anim-loop animate-float-slow">{children}</div>
    </motion.div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { animationsPaused } = useStore()
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const cupY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const parallaxOn = !animationsPaused && !prefersReduced

  return (
    <section
      id="home"
      ref={sectionRef}
      className="grain relative overflow-hidden bg-fizz-yellow"
      aria-label="Welcome to Fizzora"
    >
      <Bubbles count={10} className={animationsPaused || prefersReduced ? 'hidden' : ''} />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pb-28 lg:pt-20">
        {/* Copy */}
        <motion.div style={parallaxOn ? { y: textY } : undefined} className="relative z-10 flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-fizz-charcoal px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-fizz-lime"
          >
            Dirty sodas · exotic snacks · big fizz energy
          </motion.p>

          <h1 className="font-display text-[17vw] uppercase leading-[0.9] text-fizz-charcoal sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
              >
                Life is better
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.22 }}
              >
                with a little
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="type-outline block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.34 }}
              >
                Fizz.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55, ease: EASE_OUT }}
            className="mt-6 max-w-md text-lg font-medium text-fizz-charcoal/80"
          >
            Big flavors. Wild combinations. Ridiculously refreshing drinks. Discover your new
            favorite sip.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => scrollToId('drinks')}
              className="inline-flex min-h-12 items-center rounded-full bg-fizz-charcoal px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-fizz-yellow shadow-pop transition-transform duration-200 hover:scale-[1.04] hover:-rotate-1 active:scale-95"
            >
              Explore the drinks
            </button>
            <button
              type="button"
              onClick={() => scrollToId('story')}
              className="inline-flex min-h-12 items-center rounded-full border-[3px] border-fizz-charcoal px-7 py-3 text-sm font-bold uppercase tracking-wider text-fizz-charcoal transition-transform duration-200 hover:scale-[1.04] hover:rotate-1 active:scale-95"
            >
              Discover our world
            </button>
          </motion.div>

          <motion.a
            href="#drinks"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('drinks')
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="motion-only mt-12 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-fizz-charcoal/70 transition-colors hover:text-fizz-charcoal lg:inline-flex"
          >
            <span className="anim-loop inline-flex animate-bounce">
              <ArrowDown className="size-4" aria-hidden="true" />
            </span>
            Scroll for flavor
          </motion.a>
        </motion.div>

        {/* Cup art — the headline cup overlaps the type on wide screens */}
        <motion.div
          style={parallaxOn ? { y: cupY } : undefined}
          className="relative z-0 mx-auto w-full max-w-md lg:-ml-10 lg:max-w-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.25 }}
            className="relative"
          >
            <Blob color="#F46BCE" className="absolute left-1/2 top-1/2 -z-10 w-[115%] -translate-x-1/2 -translate-y-1/2 opacity-90" />
            <DrinkCup art={HERO_ART} className="w-full drop-shadow-2xl" />
          </motion.div>

          <FloatingFruit className="left-[-4%] top-[12%] w-16 sm:w-20" delay={0.1}>
            <LimeSlice className="w-full drop-shadow-lg" />
          </FloatingFruit>
          <FloatingFruit className="right-[-2%] top-[6%] w-14 sm:w-16" delay={0.25}>
            <Cherry className="w-full drop-shadow-lg" />
          </FloatingFruit>
          <FloatingFruit className="bottom-[16%] left-[-6%] w-14 sm:w-16" delay={0.4}>
            <Strawberry className="w-full drop-shadow-lg" />
          </FloatingFruit>
          <FloatingFruit className="bottom-[8%] right-[2%] w-16 sm:w-20" delay={0.55}>
            <OrangeSlice className="w-full drop-shadow-lg" />
          </FloatingFruit>
          <FloatingFruit className="right-[16%] top-[38%] w-12 sm:w-14" delay={0.7}>
            <BerriesCluster className="w-full drop-shadow-lg" />
          </FloatingFruit>
        </motion.div>
      </div>

      {/* Wavy divider into cream */}
      <svg viewBox="0 0 1440 70" className="block w-full" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <path d="M0 70 L0 40 Q 360 -20 720 30 T 1440 20 L1440 70 Z" fill="#FFF7E8" />
      </svg>
    </section>
  )
}
