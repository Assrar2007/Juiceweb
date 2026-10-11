import type {
  CartItem,
  Deal,
  DealEvaluation,
  LockedDeal,
  SodaCategory,
  TierId,
} from '../types'
import { formatCents } from './format'

/* ------------------------------------------------------------------ */
/*  Pure deal-engine functions. No UI, no side effects.                */
/*  All money math happens in integer cents.                           */
/* ------------------------------------------------------------------ */

/** Whether stacking multiple deals is allowed. Demo keeps it off. */
export const DEALS_STACK = false

export const TIER_RANK: Record<TierId | 'everyone' | 'none', number> = {
  everyone: 0,
  none: 0,
  'fizz-fan': 1,
  'fizz-insider': 2,
  'fizz-vip': 3,
}

export const TIER_NAME: Record<TierId, string> = {
  'fizz-fan': 'Fizz Fan',
  'fizz-insider': 'Fizz Insider',
  'fizz-vip': 'Fizz VIP',
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
}

function matchesCategory(item: CartItem, categories: SodaCategory[]): boolean {
  return item.categories.some((c) => categories.includes(c))
}

/** Subtotal of the cart lines a deal can actually discount. */
export function eligibleSubtotal(deal: Deal, items: CartItem[]): number {
  const appliesTo = deal.appliesTo
  if (appliesTo.type === 'all') return cartSubtotal(items)
  if (appliesTo.type === 'categories') {
    const cats = appliesTo.categories
    return items
      .filter((item) => matchesCategory(item, cats))
      .reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
  }
  const ids = appliesTo.ids
  return items
    .filter((item) => ids.includes(item.refId))
    .reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
}

function snackUnits(items: CartItem[]): number {
  return items
    .filter((item) => item.categories.includes('snack'))
    .reduce((sum, item) => sum + item.qty, 0)
}

function hasCategory(items: CartItem[], category: SodaCategory): boolean {
  return items.some((item) => item.categories.includes(category))
}

function freeAddonUnits(deal: Deal, items: CartItem[]): number {
  if (!deal.freeAddon) return 0
  return items
    .filter((item) => {
      if (item.kind !== 'custom') return false
      const sizeOk = deal.freeAddon?.size ? item.meta?.size === deal.freeAddon.size : true
      const addonOk =
        deal.freeAddon?.addon === 'foam' ? item.meta?.hasFoam : item.meta?.hasCream
      return Boolean(sizeOk && addonOk)
    })
    .reduce((sum, item) => sum + item.qty, 0)
}

/** Discount in cents a single deal would grant for this cart (0 if none). */
export function discountForDeal(deal: Deal, items: CartItem[]): number {
  const subtotal = cartSubtotal(items)
  if (items.length === 0 || subtotal <= 0) return 0

  switch (deal.kind) {
    case 'percent': {
      const base = eligibleSubtotal(deal, items)
      if (base <= 0) return 0
      return Math.round((base * deal.value) / 100)
    }
    case 'fixed': {
      const base = eligibleSubtotal(deal, items)
      if (base <= 0) return 0
      return Math.min(deal.value, base)
    }
    case 'bundle': {
      if (!(hasCategory(items, 'drink') && hasCategory(items, 'snack'))) return 0
      return Math.min(deal.value, subtotal)
    }
    case 'free-addon': {
      const units = freeAddonUnits(deal, items)
      if (units === 0) return 0
      return Math.min(deal.value * units, subtotal)
    }
  }
}

interface DateWindow {
  started: boolean
  ended: boolean
  startsAt?: string
}

function dateWindow(deal: Deal, now: Date): DateWindow {
  const started = deal.startsAt ? new Date(deal.startsAt).getTime() <= now.getTime() : true
  const ended = deal.endsAt ? new Date(deal.endsAt).getTime() < now.getTime() : false
  return { started, ended, startsAt: deal.startsAt }
}

/**
 * Evaluate every deal against the cart + membership.
 *
 * @param tierId the member's tier, or `null` for non-members.
 */
export function evaluateDeals(
  items: CartItem[],
  tierId: TierId | null,
  deals: Deal[],
  now: Date = new Date(),
): DealEvaluation {
  const eligible: Deal[] = []
  const locked: LockedDeal[] = []
  const discounts: Record<string, number> = {}

  const memberRank = tierId ? TIER_RANK[tierId] : 0
  const subtotal = cartSubtotal(items)

  for (const deal of deals) {
    const window_ = dateWindow(deal, now)
    if (window_.ended) continue

    const discount = discountForDeal(deal, items)
    discounts[deal.id] = discount

    if (!window_.started) {
      locked.push({
        deal,
        reason: `Starts ${new Date(deal.startsAt as string).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })}. Check back soon.`,
        unlockAction: 'wait',
      })
      continue
    }

    if (memberRank < TIER_RANK[deal.minTier]) {
      locked.push({
        deal,
        reason:
          deal.minTier === 'fizz-fan'
            ? 'Join the free Fizz Fan tier to unlock this deal.'
            : `Join ${TIER_NAME[deal.minTier as TierId]} to unlock this deal.`,
        unlockAction: 'join-club',
      })
      continue
    }

    if (deal.minSubtotal != null && subtotal < deal.minSubtotal) {
      locked.push({
        deal,
        reason: `Add ${formatCents(deal.minSubtotal - subtotal)} more to qualify.`,
        unlockAction: 'add-more',
      })
      continue
    }

    if (deal.minSnackQty != null && snackUnits(items) < deal.minSnackQty) {
      const missing = deal.minSnackQty - snackUnits(items)
      locked.push({
        deal,
        reason:
          missing === 1
            ? 'Add one more snack to qualify.'
            : `Add ${missing} more snacks to qualify.`,
        unlockAction: 'add-items',
      })
      continue
    }

    if (deal.kind === 'bundle' && !(hasCategory(items, 'drink') && hasCategory(items, 'snack'))) {
      locked.push({
        deal,
        reason: 'Add a drink and a snack to unlock this bundle.',
        unlockAction: 'add-items',
      })
      continue
    }

    if (deal.kind === 'free-addon' && freeAddonUnits(deal, items) === 0) {
      const sizeLabel = deal.freeAddon?.size === 'large' ? 'large ' : ''
      const addonLabel = deal.freeAddon?.addon === 'foam' ? 'cold foam' : 'cream'
      locked.push({
        deal,
        reason: `Add a ${sizeLabel}custom drink with ${addonLabel} to use this deal.`,
        unlockAction: 'add-items',
      })
      continue
    }

    eligible.push(deal)
  }

  let best: Deal | null = null
  for (const deal of eligible) {
    if (!best || discounts[deal.id] > discounts[best.id]) best = deal
  }

  return { eligible, locked, best, discounts }
}

/** Clamp a discount so it never exceeds the subtotal. */
export function clampDiscount(discount: number, subtotal: number): number {
  return Math.max(0, Math.min(Math.round(discount), Math.max(0, subtotal)))
}
