import { motion } from 'motion/react'
import { Plus, Star } from 'lucide-react'
import type { Product } from '../types'
import { DrinkCup } from './illustrations/DrinkCup'
import { formatCents } from '../lib/format'
import { useStore } from '../context/StoreContext'
import { staggerItem } from '../motion/variants'
import { memberPriceFor } from '../lib/memberPrice'

interface SodaCardProps {
  product: Product
  index: number
}

export function SodaCard({ product, index }: SodaCardProps) {
  const { addToCart, openProduct, member } = useStore()

  const memberPrice = member ? memberPriceFor(product, member.tierId) : null
  const offset = index % 3 === 1 ? 'lg:translate-y-8' : ''
  const tilt = index % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'

  return (
    <motion.li
      variants={staggerItem}
      className={`group relative flex flex-col rounded-[2rem] p-6 shadow-card transition-transform duration-300 ${offset} hover:-translate-y-2 ${tilt}`}
      style={{ backgroundColor: product.cardColor, color: product.cardInk }}
    >
      {product.badge && (
        <span
          className={`absolute left-5 top-5 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] ${
            product.badge === 'NEW'
              ? 'bg-fizz-lime text-fizz-charcoal'
              : 'bg-fizz-charcoal text-fizz-yellow'
          }`}
        >
          {product.badge === 'BESTSELLER' && <Star className="size-3" aria-hidden="true" />}
          {product.badge}
        </span>
      )}

      <div className="relative mx-auto mt-2 w-[70%] max-w-[220px] transition-transform duration-300 group-hover:scale-[1.06]">
        <DrinkCup art={product.art} className="w-full" />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-display text-3xl uppercase leading-none tracking-wide">{product.name}</h3>
        <p className="mt-2 text-sm font-medium opacity-70">{product.tagline}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] opacity-60">
          {product.ingredients.join(' · ')}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t-2 border-current/10 pt-4">
          <div>
            <p className="font-display text-2xl leading-none">{formatCents(product.price)}</p>
            {memberPrice != null && memberPrice < product.price && (
              <p className="mt-1 text-xs font-bold text-current/80">
                <span className="line-through opacity-60">{formatCents(product.price)}</span>{' '}
                <span className="rounded-full bg-fizz-charcoal px-2 py-0.5 text-fizz-lime">
                  {formatCents(memberPrice)} member
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => openProduct(product)}
            className="min-h-11 flex-1 rounded-full border-2 border-current px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-fizz-charcoal hover:text-fizz-cream"
          >
            View details
          </button>
          <button
            type="button"
            onClick={() =>
              addToCart({
                kind: 'signature',
                refId: product.id,
                name: product.name,
                detail: product.ingredients.join(', '),
                unitPrice: product.price,
                categories: ['drink'],
                art: product.art,
              })
            }
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-fizz-charcoal text-fizz-yellow transition-transform duration-200 hover:scale-110 active:scale-90"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.li>
  )
}
