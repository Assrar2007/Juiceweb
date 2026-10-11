import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Pause, Plus, Play, Rocket } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { SnackArt } from './illustrations/SnackArt'
import { SNACKS } from '../data/snacks'
import { useStore } from '../context/StoreContext'
import { formatCents } from '../lib/format'
import { onceViewport, staggerContainer, staggerItem } from '../motion/variants'

const MARQUEE_TEXT = 'GLOBAL FLAVORS • UNEXPECTED FINDS • BIG SNACK ENERGY • '

function Marquee() {
  const { animationsPaused, toggleAnimations } = useStore()
  const prefersReduced = useReducedMotion()
  const still = animationsPaused || prefersReduced

  return (
    <div className="relative mt-14">
      <p className="sr-only">{MARQUEE_TEXT}</p>
      <div className="relative overflow-hidden rounded-full bg-fizz-charcoal py-4">
        <div
          className={`flex w-max ${still ? '' : 'anim-loop animate-marquee'}`}
          aria-hidden="true"
        >
          {[0, 1].map((copy) => (
            <p
              key={copy}
              className="whitespace-nowrap px-4 font-display text-2xl uppercase tracking-[0.18em] text-fizz-lime sm:text-3xl"
            >
              {MARQUEE_TEXT.repeat(3)}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleAnimations}
          className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-fizz-yellow text-fizz-charcoal transition-transform hover:scale-105"
          aria-label={still ? 'Play marquee animation' : 'Pause marquee animation'}
        >
          {still ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}

export function SnackCollection() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const { addToCart } = useStore()

  return (
    <section id="snacks" className="grain relative overflow-hidden bg-fizz-pink py-20 lg:py-28" aria-label="Exotic snacks">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Exotic snacks"
          title={
            <>
              Snacks from <span className="text-fizz-charcoal">another planet.</span>
            </>
          }
          sub="From unexpected sweet treats to bold, crunchy discoveries — explore snacks inspired by flavors from around the world."
        />

        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {SNACKS.map((snack) => (
            <motion.li
              key={snack.id}
              variants={staggerItem}
              className="group flex flex-col rounded-[2rem] bg-fizz-cream p-6 text-fizz-charcoal shadow-card transition-transform duration-300 hover:-translate-y-2 hover:rotate-[0.6deg]"
            >
              <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-3xl" style={{ backgroundColor: `${snack.accent}55` }}>
                <SnackArt
                  kind={snack.art}
                  title={`${snack.name} illustration`}
                  className="h-36 w-36 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-fizz-charcoal px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-fizz-cream">
                  {snack.origin}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl uppercase leading-none">{snack.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{snack.description}</p>
              <AnimatePresence initial={false}>
                {revealed[snack.id] && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 overflow-hidden rounded-xl bg-fizz-lavender/25 px-3 py-2 text-sm font-semibold text-fizz-charcoal"
                  >
                    {snack.notes}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="mt-5 flex flex-1 items-end justify-between gap-3">
                <p className="font-display text-2xl">{formatCents(snack.price)}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRevealed((r) => ({ ...r, [snack.id]: !r[snack.id] }))}
                    aria-expanded={Boolean(revealed[snack.id])}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-all active:scale-95 ${
                      revealed[snack.id]
                        ? 'bg-fizz-lavender text-fizz-charcoal'
                        : 'bg-fizz-charcoal text-fizz-cream hover:scale-[1.03]'
                    }`}
                  >
                    <Rocket className="size-4" aria-hidden="true" />
                    {revealed[snack.id] ? 'Hide' : 'Explore'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        kind: 'snack',
                        refId: snack.id,
                        name: snack.name,
                        detail: snack.origin,
                        unitPrice: snack.price,
                        categories: ['snack'],
                      })
                    }
                    className="inline-flex size-11 items-center justify-center rounded-full bg-fizz-pink text-fizz-charcoal transition-transform hover:scale-110 active:scale-90"
                    aria-label={`Add ${snack.name} to cart`}
                  >
                    <Plus className="size-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <Marquee />
      </div>
    </section>
  )
}
