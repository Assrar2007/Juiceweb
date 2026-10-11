import type { Tier } from '../types'

/**
 * Fizz Club tiers. Prices are placeholder demo prices in integer cents —
 * no billing is implemented anywhere in this demo.
 */
export const TIERS: Tier[] = [
  {
    id: 'fizz-fan',
    name: 'Fizz Fan',
    monthlyPrice: 0,
    tagline: 'Dip a straw in.',
    perks: [
      'Welcome Fizz: 10% off orders over $15',
      'First taste of new flavor-drop news',
      'Fizz Friday drop alerts',
    ],
    accent: '#F5E642',
  },
  {
    id: 'fizz-insider',
    name: 'Fizz Insider',
    monthlyPrice: 499,
    tagline: 'The sweet spot.',
    perks: [
      'Everything in Fizz Fan',
      '$2 off drink orders over $12',
      'Free cold-foam upgrade on large custom drinks',
      'Early access to snack drops',
    ],
    accent: '#F46BCE',
    popular: true,
  },
  {
    id: 'fizz-vip',
    name: 'Fizz VIP',
    monthlyPrice: 999,
    tagline: 'Top-shelf fizz.',
    perks: [
      'Everything in Fizz Insider',
      '15% off every customized drink',
      'First look at limited flavor-lab experiments',
      'Priority booking for Fizzora events',
    ],
    accent: '#A78BFA',
  },
]

export function getTier(id: string): Tier | undefined {
  return TIERS.find((t) => t.id === id)
}
