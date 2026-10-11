import type { CartItem, CheckoutTotals, Deal } from '../types'
import { cartSubtotal, clampDiscount, discountForDeal } from './deals'

export function createLineId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** Add an item to the cart. Signature drinks and snacks merge by refId. */
export function addItem(
  items: CartItem[],
  item: Omit<CartItem, 'lineId' | 'qty'>,
  qty = 1,
): CartItem[] {
  const mergeable = item.kind !== 'custom'
  const existing = mergeable
    ? items.find((i) => i.kind === item.kind && i.refId === item.refId)
    : undefined

  if (existing) {
    return items.map((i) => (i.lineId === existing.lineId ? { ...i, qty: i.qty + qty } : i))
  }
  return [...items, { ...item, lineId: createLineId(), qty }]
}

export function setQty(items: CartItem[], lineId: string, qty: number): CartItem[] {
  if (qty <= 0) return items.filter((i) => i.lineId !== lineId)
  return items.map((i) => (i.lineId === lineId ? { ...i, qty } : i))
}

export function removeLine(items: CartItem[], lineId: string): CartItem[] {
  return items.filter((i) => i.lineId !== lineId)
}

export function itemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0)
}

export function computeTotals(items: CartItem[], appliedDeal: Deal | null): CheckoutTotals {
  const subtotal = cartSubtotal(items)
  const rawDiscount = appliedDeal ? discountForDeal(appliedDeal, items) : 0
  const discount = clampDiscount(rawDiscount, subtotal)
  return { subtotal, discount, total: subtotal - discount }
}
