import { motion } from 'motion/react'
import { SectionHeading } from './ui/SectionHeading'
import { ShopScene } from './illustrations/Scenes'
import { scrollToId } from '../lib/scroll'
import { onceViewport, staggerContainer, staggerItem } from '../motion/variants'

export function BrandStory() {
  return (
    <section id="story" className="bg-fizz-cream py-20 lg:py-28" aria-label="Our story">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={onceViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 lg:order-1"
        >
          <ShopScene className="w-full rounded-[2.5rem] shadow-pop" />
          <p className="mt-3 text-center text-xs text-ink-soft">
            Brand illustration — Fizzora is a fictional demo brand.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="order-1 lg:order-2"
        >
          <motion.div variants={staggerItem}>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title={
                <>
                  Small-batch energy.{' '}
                  <span className="text-fizz-lavender">Big-time flavor.</span>
                </>
              }
            />
          </motion.div>
          <motion.p variants={staggerItem} className="mt-6 max-w-xl text-lg text-ink-soft">
            We believe the best moments are the ones you share. Fizzora was created around the
            joy of discovering new flavors, trying unexpected combinations, and making ordinary
            moments a little more exciting.
          </motion.p>
          <motion.blockquote
            variants={staggerItem}
            className="mt-8 border-l-8 border-fizz-yellow pl-5 font-display text-2xl uppercase leading-snug text-fizz-charcoal"
          >
            Our mission: pour a little more fizz into everyday life.
          </motion.blockquote>
          <motion.div variants={staggerItem} className="mt-8">
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="inline-flex min-h-12 items-center rounded-full border-[3px] border-fizz-charcoal px-7 py-3 text-sm font-black uppercase tracking-wider text-fizz-charcoal transition-transform duration-200 hover:scale-[1.04] hover:bg-fizz-yellow active:scale-95"
            >
              Say hello
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
