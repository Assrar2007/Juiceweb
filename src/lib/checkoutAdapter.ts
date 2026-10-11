import type { CartItem, CheckoutAdapter, CheckoutResult, CheckoutTotals } from '../types'

/**
 * Demo checkout adapter. No payments are processed.
 *
 * To plug in a real provider (Stripe, Square, …), implement `CheckoutAdapter`
 * and swap it in `startCheckout` below — the cart UI already passes the full
 * item list and totals in integer cents.
 */
const demoAdapter: CheckoutAdapter = {
  async startCheckout(_items: CartItem[], _totals: CheckoutTotals): Promise<CheckoutResult> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      status: 'not-connected',
      message:
        'Checkout is not connected in this demo — no payment was taken and no order was placed.',
    }
  },
}

export function startCheckout(items: CartItem[], totals: CheckoutTotals): Promise<CheckoutResult> {
  return demoAdapter.startCheckout(items, totals)
}
