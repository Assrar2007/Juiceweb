import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { DrinkCup } from './illustrations/DrinkCup'
import { formatCents } from '../lib/format'
import { memberPriceFor } from '../lib/memberPrice'
import { modalPop, overlayFade } from '../motion/variants'

export function ProductModal() {
  const { activeProduct, closeProduct, addToCart, member, setCartOpen } = useStore()
  const [qty, setQty] = useState(1)

  const trapRef = useFocusTrap<HTMLDivElement>(activeProduct != null, closeProduct)

  // Reset the quantity whenever a different product is opened.
  useEffect(() => {
    setQty(1)
  }, [activeProduct?.id])

  const product = activeProduct
  const memberPrice = product && member ? memberPriceFor(product, member.tierId) : null

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          variants={overlayFade}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[70] flex items-end justify-center bg-fizz-charcoal/70 p-0 sm:items-center sm:p-6"
          onClick={closeProduct}
          role="presentation"
        >
          <motion.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            variants={modalPop}
            className="relative grid max-h-[92vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-t-[2rem] bg-fizz-cream sm:grid-cols-2 sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Art panel */}
            <div
              className="relative flex items-center justify-center p-8 sm:rounded-l-[2rem]"
              style={{ backgroundColor: product.cardColor }}
            >
              <DrinkCup art={product.art} className="w-52 sm:w-60" />
              {product.badge && (
                <span className="absolute left-5 top-5 rounded-full bg-fizz-charcoal px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-fizz-yellow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info panel */}
            <div className="flex flex-col p-7 sm:p-8" style={{ color: '#191719' }}>
              <button
                type="button"
                onClick={closeProduct}
                className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full bg-fizz-charcoal text-fizz-cream transition-transform hover:scale-105"
                aria-label="Close product details"
                data-autofocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <h3 id="product-modal-title" className="font-display text-4xl uppercase leading-none">
                {product.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-ink-soft">{product.tagline}</p>

              <h4 className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-ink-soft">
                What's in it
              </h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-full bg-fizz-lavender/40 px-3 py-1.5 text-sm font-bold capitalize text-fizz-charcoal"
                  >
                    {ing}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded-full border-2 border-fizz-charcoal/15">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="inline-flex size-11 items-center justify-center rounded-l-full transition-colors hover:bg-fizz-yellow"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <span className="w-10 text-center font-display text-xl" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="inline-flex size-11 items-center justify-center rounded-r-full transition-colors hover:bg-fizz-yellow"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="font-display text-3xl">
                  {formatCents((memberPrice ?? product.price) * qty)}
                  {memberPrice != null && memberPrice < product.price && (
                    <span className="ml-2 align-middle text-base text-ink-soft line-through">
                      {formatCents(product.price * qty)}
                    </span>
                  )}
                </p>
              </div>

              {memberPrice != null && memberPrice < product.price && (
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-fizz-charcoal/60">
                  Your {member ? 'member' : ''} price applied
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  addToCart(
                    {
                      kind: 'signature',
                      refId: product.id,
                      name: product.name,
                      detail: product.ingredients.join(', '),
                      unitPrice: product.price,
                      categories: ['drink'],
                      art: product.art,
                    },
                    qty,
                  )
                  setQty(1)
                  closeProduct()
                  setCartOpen(true)
                }}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-fizz-charcoal px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-fizz-yellow transition-transform hover:scale-[1.02] active:scale-95"
              >
                Add {qty > 1 ? `${qty} ` : ''}to cart
              </button>
              <p className="mt-3 text-center text-[11px] text-ink-soft">
                Demo shop — checkout isn't connected, nothing is charged.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
