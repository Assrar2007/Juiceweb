import { motion } from 'motion/react'
import { Beaker, PartyPopper, Zap } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { DrinkCup } from './illustrations/DrinkCup'
import { PRODUCTS } from '../data/products'
import { fadeUp, onceViewport, staggerContainer, staggerItem } from '../motion/variants'

const HIGHLIGHTS = [
  {
    icon: Beaker,
    title: 'Mix it your way',
    body: 'Pick a base, stack flavors, add cream or cold foam — every cup is built to order.',
    bg: 'bg-fizz-lime',
  },
  {
    icon: Zap,
    title: 'Big flavor energy',
    body: 'Unexpected combos, turned up. Sweet, tangy, creamy, fizzy — sometimes all at once.',
    bg: 'bg-fizz-pink',
  },
  {
    icon: PartyPopper,
    title: 'Every sip is an experience',
    body: 'Layers, ice, foam and fruit. This is soda with main-character energy.',
    bg: 'bg-fizz-lavender',
  },
]

export function BrandIntro() {
  return (
    <section id="intro" className="relative overflow-hidden bg-fizz-cream py-20 lg:py-28" aria-label="What is dirty soda">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* Illustration side */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-6"
        >
          <motion.div variants={staggerItem} className="mt-10">
            <DrinkCup art={PRODUCTS[1].art} className="w-full" />
          </motion.div>
          <motion.div variants={staggerItem}>
            <DrinkCup art={PRODUCTS[7].art} className="w-full" />
          </motion.div>
          <motion.div
            variants={staggerItem}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-fizz-charcoal px-6 py-3 text-center font-display text-sm uppercase tracking-widest text-fizz-yellow shadow-pop sm:text-base"
          >
            soda + syrup + cream = ✨
          </motion.div>
        </motion.div>

        {/* Copy side */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="What is dirty soda?"
            title={
              <>
                Not your <span className="text-fizz-pink">average</span> soda.
              </>
            }
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={onceViewport}
            className="mt-6 max-w-xl text-lg text-ink-soft"
          >
            We take classic sodas, mix in unexpected flavors, add a little cream, and turn every
            sip into something worth talking about. Think of it as a mocktail with a fizz
            obsession — layered, ice-cold and completely customizable.
          </motion.p>

          <motion.ul
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={onceViewport}
            className="mt-10 flex flex-col gap-4"
          >
            {HIGHLIGHTS.map((h) => (
              <motion.li
                key={h.title}
                variants={staggerItem}
                className={`flex items-start gap-4 rounded-3xl ${h.bg} p-5 text-fizz-charcoal transition-transform duration-200 hover:-translate-y-1 hover:rotate-[0.5deg]`}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-fizz-charcoal text-fizz-cream">
                  <h.icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-wide">{h.title}</h3>
                  <p className="mt-1 text-sm font-medium text-fizz-charcoal/75">{h.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
