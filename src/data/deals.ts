import type { Deal } from '../types'

/**
 * Fizz Club deals. All money values are integer cents; `percent` values are
 * whole percents. `startsAt` / `endsAt` are real ISO dates — countdowns are
 * only shown when a deal truly has an `endsAt`.
 */
export const DEALS: Deal[] = [
  {
    id: 'welcome-fizz',
    title: 'Welcome Fizz',
    description: '10% off any order over $15 — drinks, snacks, the works.',
    kind: 'percent',
    value: 10,
    appliesTo: { type: 'all' },
    minTier: 'everyone',
    minSubtotal: 1500,
    badge: 'EVERYONE',
    categories: 'all',
  },
  {
    id: 'fizz-and-munch',
    title: 'Fizz + Munch',
    description: 'Any drink plus any snack in the same cart? That’s $2 off.',
    kind: 'bundle',
    value: 200,
    appliesTo: { type: 'all' },
    minTier: 'everyone',
    badge: 'BUNDLE',
    categories: 'all',
  },
  {
    id: 'snack-duo',
    title: 'Snack Duo',
    description: 'Grab two or more snacks and knock $1.50 off the pair.',
    kind: 'fixed',
    value: 150,
    appliesTo: { type: 'categories', categories: ['snack'] },
    minTier: 'everyone',
    minSnackQty: 2,
    categories: ['snack'],
  },
  {
    id: 'insider-sips',
    title: 'Insider Sips',
    description: '$2 off any drink order over $12, just for Insiders.',
    kind: 'fixed',
    value: 200,
    appliesTo: { type: 'categories', categories: ['drink'] },
    minTier: 'fizz-insider',
    minSubtotal: 1200,
    categories: ['drink'],
  },
  {
    id: 'foam-on-us',
    title: 'Foam On Us',
    description: 'Large custom drink with cold foam? The foam’s on us.',
    kind: 'free-addon',
    value: 100,
    appliesTo: { type: 'categories', categories: ['drink'] },
    minTier: 'fizz-insider',
    freeAddon: { addon: 'foam', size: 'large' },
    categories: ['drink'],
  },
  {
    id: 'vip-custom-craft',
    title: 'VIP Custom Craft',
    description: 'Fizz VIP members save 15% on every customized drink.',
    kind: 'percent',
    value: 15,
    appliesTo: { type: 'products', ids: ['custom-drink'] },
    minTier: 'fizz-vip',
    badge: 'VIP',
    categories: ['drink'],
  },
  {
    id: 'member-sip-perk',
    title: 'Member Sip Perk',
    description: 'Every Fizz Club member saves 5% on signature dirty sodas, always.',
    kind: 'percent',
    value: 5,
    appliesTo: { type: 'categories', categories: ['drink'] },
    minTier: 'fizz-fan',
    badge: 'MEMBERS',
    categories: ['drink'],
  },
  {
    id: 'october-fizz-drop',
    title: 'October Fizz Drop',
    description: 'All month long: 12% off everything, just for Fizz Fans.',
    kind: 'percent',
    value: 12,
    appliesTo: { type: 'all' },
    minTier: 'fizz-fan',
    startsAt: '2026-10-09T00:00:00',
    endsAt: '2026-11-01T00:00:00',
    badge: 'ENDS OCT 31',
    categories: 'all',
  },
]

/** Price of a cold-foam add-on in the customizer (used by free-addon deals). */
export const COLD_FOAM_PRICE = 100
