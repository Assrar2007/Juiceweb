import { motion } from 'motion/react'
import { DrinkCup } from './illustrations/DrinkCup'
import { Blob } from './illustrations/Scenes'
import { BerriesCluster, Cherry, LimeSlice } from './illustrations/Fruit'
import { PRODUCTS } from '../data/products'
import { scrollToId } from '../lib/scroll'
import { EASE_OUT } from '../motion/variants'

export function CampaignBanner() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Campaign: your next favorite flavor is waiting"
    >
      {/* Split-color composition */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2" aria-hidden="true">
        <div className="bg-fizz-lime" />
        <div className="bg-fizz-lavender" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="font-display text-5xl uppercase leading-[0.92] text-fizz-charcoal sm:text-7xl lg:text-[5.2rem]"
          >
            Your next
            <br />
            favorite <span className="type-outline">flavor</span>
            <br />
            is waiting.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
            className="mt-8"
          >
            <button
              type="button"
              onClick={() => scrollToId('drinks')}
              className="inline-flex min-h-12 items-center rounded-full bg-fizz-charcoal px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-fizz-yellow shadow-pop transition-transform duration-200 hover:scale-[1.04] hover:-rotate-1 active:scale-95"
            >
              Explore the menu
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="relative mx-auto w-full max-w-sm"
        >
          <Blob color="#F46BCE" className="absolute left-1/2 top-1/2 -z-10 w-[112%] -translate-x-1/2 -translate-y-1/2" />
          <DrinkCup art={PRODUCTS[4].art} className="w-full drop-shadow-xl" />
          <div className="anim-loop absolute -left-6 top-8 w-14 animate-float-slower">
            <Cherry className="w-full drop-shadow-md" />
          </div>
          <div className="anim-loop absolute -right-4 bottom-16 w-16 animate-float-slow">
            <LimeSlice className="w-full drop-shadow-md" />
          </div>
          <div className="anim-loop absolute right-10 -top-4 w-12 animate-float-slower">
            <BerriesCluster className="w-full drop-shadow-md" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
