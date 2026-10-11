import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, ShoppingBag, Sparkles, Trash2, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { computeTotals } from '../lib/cart'
import { startCheckout } from '../lib/checkoutAdapter'
import { formatCents } from '../lib/format'
import { DrinkCup } from './illustrations/DrinkCup'
import { scrollToId } from '../lib/scroll'

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    items,
    changeQty,
    removeFromCart,
    evaluation,
    selectedDealId,
    setSelectedDealId,
    member,
  } = useStore()
  const [checkoutNote, setCheckoutNote] = useState<string | null>(null)
  const [checkingOut, setCheckingOut] = useState(false)

  const trapRef = useFocusTrap<HTMLDivElement>(cartOpen, () => setCartOpen(false))

  const appliedDeal = useMemo(() => {
    if (selectedDealId === null) return null
    if (selectedDealId === 'auto') return evaluation.best
    return evaluation.eligible.find((d) => d.id === selectedDealId) ?? evaluation.best
  }, [selectedDealId, evaluation])

  const totals = computeTotals(items, appliedDeal)

  const runCheckout = async () => {
    setCheckingOut(true)
    setCheckoutNote(null)
    const result = await startCheckout(items, totals)
    setCheckoutNote(result.message)
    setCheckingOut(false)
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] bg-fizz-charcoal/60"
          onClick={() => setCartOpen(false)}
          role="presentation"
        >
          <motion.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="ml-auto flex h-full w-[min(28rem,94vw)] flex-col bg-fizz-cream"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-fizz-charcoal/10 px-6 py-5">
              <h2 className="flex items-center gap-2.5 font-display text-2xl uppercase text-fizz-charcoal">
                <ShoppingBag className="size-6" aria-hidden="true" />
                Your cart
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-full bg-fizz-charcoal text-fizz-cream transition-transform hover:scale-105"
                aria-label="Close cart"
                data-autofocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="w-32 opacity-50">
                  <DrinkCup
                    art={{ layers: ['#E8E0D0', '#D8CDB6'], straw: '#A78BFA', garnish: 'none', blob: '#fff' }}
                    shadow={false}
                    className="w-full"
                  />
                </div>
                <p className="font-display text-2xl uppercase text-fizz-charcoal">Nothing fizzy yet</p>
                <p className="text-sm text-ink-soft">Your cart is empty. Go grab something wild.</p>
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false)
                    window.requestAnimationFrame(() => scrollToId('drinks'))
                  }}
                  className="mt-2 inline-flex min-h-12 items-center rounded-full bg-fizz-charcoal px-7 py-3 text-sm font-black uppercase tracking-wide text-fizz-yellow"
                >
                  Browse drinks
                </button>
              </div>
            ) : (
              <>
                {/* Lines */}
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.lineId}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.22 }}
                        className="flex gap-3 border-b border-fizz-charcoal/10 py-4 last:border-0"
                      >
                        <div className="w-16 shrink-0">
                          {item.art ? (
                            <DrinkCup art={item.art} shadow={false} className="w-full" />
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fizz-lavender/30 text-2xl">
                              🍬
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-display text-lg uppercase leading-tight text-fizz-charcoal">
                              {item.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.lineId)}
                              className="text-ink-soft transition-colors hover:text-red-600"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="size-4" aria-hidden="true" />
                            </button>
                          </div>
                          {item.detail && <p className="mt-0.5 text-xs text-ink-soft">{item.detail}</p>}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center rounded-full border border-fizz-charcoal/15">
                              <button
                                type="button"
                                onClick={() => changeQty(item.lineId, item.qty - 1)}
                                className="inline-flex size-9 items-center justify-center rounded-l-full hover:bg-fizz-yellow"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="size-3.5" aria-hidden="true" />
                              </button>
                              <span className="w-8 text-center text-sm font-black" aria-live="polite">
                                {item.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => changeQty(item.lineId, item.qty + 1)}
                                className="inline-flex size-9 items-center justify-center rounded-r-full hover:bg-fizz-yellow"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="size-3.5" aria-hidden="true" />
                              </button>
                            </div>
                            <p className="text-sm font-black text-fizz-charcoal">
                              {formatCents(item.unitPrice * item.qty)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Deal picker */}
                <div className="border-t-2 border-fizz-charcoal/10 px-6 py-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-ink-soft">Deal</h3>
                  <div className="mt-2 flex flex-col gap-1.5" role="radiogroup" aria-label="Applied deal">
                    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-fizz-charcoal has-checked:bg-fizz-lime/60">
                      <input
                        type="radio"
                        name="cart-deal"
                        checked={selectedDealId === 'auto'}
                        onChange={() => setSelectedDealId('auto')}
                        className="size-4 accent-fizz-charcoal"
                      />
                      Auto — best deal
                      {evaluation.best && (
                        <span className="ml-auto text-xs font-black uppercase text-fizz-charcoal/60">
                          {evaluation.best.title}
                        </span>
                      )}
                    </label>
                    {evaluation.eligible
                      .filter((d) => d.id !== evaluation.best?.id)
                      .map((d) => (
                        <label
                          key={d.id}
                          className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-fizz-charcoal has-checked:bg-fizz-lime/60"
                        >
                          <input
                            type="radio"
                            name="cart-deal"
                            checked={selectedDealId === d.id}
                            onChange={() => setSelectedDealId(d.id)}
                            className="size-4 accent-fizz-charcoal"
                          />
                          {d.title}
                          <span className="ml-auto text-xs font-black uppercase text-fizz-charcoal/60">
                            −{formatCents(evaluation.discounts[d.id] ?? 0)}
                          </span>
                        </label>
                      ))}
                    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-bold text-fizz-charcoal has-checked:bg-fizz-lime/60">
                      <input
                        type="radio"
                        name="cart-deal"
                        checked={selectedDealId === null}
                        onChange={() => setSelectedDealId(null)}
                        className="size-4 accent-fizz-charcoal"
                      />
                      No deal
                    </label>
                  </div>

                  {!member && (
                    <button
                      type="button"
                      onClick={() => {
                        setCartOpen(false)
                        window.requestAnimationFrame(() => scrollToId('fizz-club'))
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-fizz-pink/30 px-3 py-2.5 text-sm font-black text-fizz-charcoal transition-colors hover:bg-fizz-pink/50"
                    >
                      <Sparkles className="size-4" aria-hidden="true" />
                      Members save more — join the Fizz Club
                    </button>
                  )}

                  {/* Totals */}
                  <dl className="mt-4 space-y-1.5 text-sm">
                    <div className="flex justify-between text-fizz-charcoal">
                      <dt>Subtotal</dt>
                      <dd className="font-bold">{formatCents(totals.subtotal)}</dd>
                    </div>
                    {appliedDeal && totals.discount > 0 && (
                      <div className="flex justify-between font-bold text-fizz-charcoal">
                        <dt className="flex items-center gap-1.5">
                          <Sparkles className="size-3.5 text-fizz-pink" aria-hidden="true" />
                          {appliedDeal.title}
                        </dt>
                        <dd className="text-fizz-charcoal">−{formatCents(totals.discount)}</dd>
                      </div>
                    )}
                    {totals.discount > 0 && (
                      <p className="rounded-lg bg-fizz-lime/70 px-3 py-1.5 text-center text-xs font-black uppercase tracking-wide text-fizz-charcoal">
                        You saved {formatCents(totals.discount)}
                      </p>
                    )}
                    <div className="flex justify-between border-t-2 border-fizz-charcoal/10 pt-2 font-display text-xl uppercase text-fizz-charcoal">
                      <dt>Total</dt>
                      <dd>{formatCents(totals.total)}</dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    onClick={runCheckout}
                    disabled={checkingOut}
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-fizz-charcoal px-6 py-3.5 text-sm font-black uppercase tracking-wider text-fizz-yellow transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                  >
                    {checkingOut ? 'Checking…' : 'Checkout (demo)'}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-ink-soft">
                    Checkout isn't connected in this demo — no payment, shipping or order is real.
                  </p>
                  {checkoutNote && (
                    <p role="status" className="mt-2 rounded-xl bg-fizz-yellow/60 px-3 py-2 text-center text-xs font-bold text-fizz-charcoal">
                      {checkoutNote}
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
