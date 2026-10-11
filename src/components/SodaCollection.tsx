import { motion } from 'motion/react'
import { SectionHeading } from './ui/SectionHeading'
import { SodaCard } from './SodaCard'
import { PRODUCTS } from '../data/products'
import { onceViewport, staggerContainer } from '../motion/variants'

export function SodaCollection() {
  return (
    <section id="drinks" className="relative bg-fizz-cream py-20 lg:py-28" aria-label="Signature dirty soda collection">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The signature collection"
          title={
            <>
              Dirty sodas. <span className="text-fizz-pink">Clean hits.</span>
            </>
          }
          sub="Meet the flavor combinations you never knew you needed."
        />

        <motion.ul
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="mt-14 grid grid-cols-1 gap-6 pb-8 sm:grid-cols-2 xl:grid-cols-4"
        >
          {PRODUCTS.map((product, i) => (
            <SodaCard key={product.id} product={product} index={i} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
