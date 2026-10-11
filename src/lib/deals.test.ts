import { describe, expect, it } from 'vitest'
import type { CartItem, Deal } from '../types'
import { discountForDeal, evaluateDeals } from './deals'
import { computeTotals } from './cart'

const drink = (over: Partial<CartItem> = {}): CartItem => ({
  lineId: 'd1',
  kind: 'signature',
  refId: 'king-coco',
  name: 'King Coco',
  detail: '',
  unitPrice: 645,
  qty: 1,
  categories: ['drink'],
  ...over,
})

const snack = (over: Partial<CartItem> = {}): CartItem => ({
  lineId: 's1',
  kind: 'snack',
  refId: 'galaxy-gummies',
  name: 'Galaxy Gummies',
  detail: '',
  unitPrice: 425,
  qty: 1,
  categories: ['snack'],
  ...over,
})

const percentDeal: Deal = {
  id: 'p10',
  title: 'Ten off',
  description: '',
  kind: 'percent',
  value: 10,
  appliesTo: { type: 'all' },
  minTier: 'everyone',
  minSubtotal: 1000,
  categories: 'all',
}

const bundleDeal: Deal = {
  id: 'bundle',
  title: 'Fizz + Munch',
  description: '',
  kind: 'bundle',
  value: 200,
  appliesTo: { type: 'all' },
  minTier: 'everyone',
  categories: 'all',
}

const vipDeal: Deal = {
  id: 'vip',
  title: 'VIP 15',
  description: '',
  kind: 'percent',
  value: 15,
  appliesTo: { type: 'categories', categories: ['drink'] },
  minTier: 'fizz-vip',
  categories: ['drink'],
}

const foamDeal: Deal = {
  id: 'foam',
  title: 'Foam on us',
  description: '',
  kind: 'free-addon',
  value: 100,
  appliesTo: { type: 'categories', categories: ['drink'] },
  minTier: 'fizz-insider',
  freeAddon: { addon: 'foam', size: 'large' },
  categories: ['drink'],
}

describe('discountForDeal', () => {
  it('computes percent discounts in integer cents', () => {
    const items = [drink({ unitPrice: 633 })]
    expect(discountForDeal(percentDeal, items)).toBe(63) // 63.3 rounds to 63
  })

  it('bundle requires a drink AND a snack', () => {
    expect(discountForDeal(bundleDeal, [drink()])).toBe(0)
    expect(discountForDeal(bundleDeal, [drink(), snack()])).toBe(200)
  })

  it('free-addon only matches qualifying custom drinks', () => {
    const largeFoam = drink({
      kind: 'custom',
      refId: 'custom-drink',
      meta: { size: 'large', hasFoam: true },
      unitPrice: 700,
    })
    const smallFoam = drink({
      kind: 'custom',
      refId: 'custom-drink',
      meta: { size: 'small', hasFoam: true },
    })
    expect(discountForDeal(foamDeal, [largeFoam])).toBe(100)
    expect(discountForDeal(foamDeal, [smallFoam])).toBe(0)
  })
})

describe('evaluateDeals', () => {
  it('locks tier-gated deals with a human reason', () => {
    const result = evaluateDeals([drink()], null, [vipDeal])
    expect(result.eligible).toHaveLength(0)
    expect(result.locked).toHaveLength(1)
    expect(result.locked[0].reason).toContain('Fizz VIP')
    expect(result.locked[0].unlockAction).toBe('join-club')
  })

  it('locks subtotal deals with the exact missing amount', () => {
    const items = [drink({ unitPrice: 600 })]
    const result = evaluateDeals(items, null, [percentDeal]) // needs 1000
    expect(result.locked[0].reason).toBe('Add $4.00 more to qualify.')
  })

  it('picks the best eligible deal automatically', () => {
    const items = [drink({ unitPrice: 2000 })]
    const result = evaluateDeals(items, 'fizz-vip', [percentDeal, vipDeal])
    expect(result.best?.id).toBe('vip') // 300 > 200
  })

  it('never lets a discount exceed the subtotal when totals are computed', () => {
    const items = [snack({ unitPrice: 150 })]
    const hugeFixed: Deal = { ...bundleDeal, kind: 'fixed', value: 5000, minTier: 'everyone' }
    const totals = computeTotals(items, hugeFixed)
    expect(totals.discount).toBe(150)
    expect(totals.total).toBe(0)
  })

  it('keeps one deal at a time: only the applied deal discounts', () => {
    const items = [drink(), snack()]
    const totals = computeTotals(items, bundleDeal)
    expect(totals.subtotal).toBe(645 + 425)
    expect(totals.discount).toBe(200)
    expect(totals.total).toBe(645 + 425 - 200)
  })
})
