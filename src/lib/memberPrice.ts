import type { CartItem, Product, TierId } from '../types'
import { DEALS } from '../data/deals'
import { evaluateDeals } from './deals'

/**
 * The price a member would pay for a single unit of this product, assuming
 * the best eligible deal. Returns null when membership changes nothing.
 * Pure helper — builds a pretend one-item cart and runs the deal engine.
 */
export function memberPriceFor(product: Product, tierId: TierId): number | null {
  const pretendItem: CartItem = {
    lineId: 'preview',
    kind: 'signature',
    refId: product.id,
    name: product.name,
    detail: '',
    unitPrice: product.price,
    qty: 1,
    categories: ['drink'],
  }

  const evaluation = evaluateDeals([pretendItem], tierId, DEALS)
  if (!evaluation.best) return null
  const discount = evaluation.discounts[evaluation.best.id] ?? 0
  if (discount <= 0) return null
  return product.price - discount
}
