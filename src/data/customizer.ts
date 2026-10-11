import type { CustomizerOption, CupSize } from '../types'

/** All prices are integer cents (deltas on top of the base). */

export const BASES: CustomizerOption[] = [
  { id: 'cola', label: 'Classic Cola', price: 375, colors: ['#3B2418'] },
  { id: 'lemon-lime', label: 'Lemon-Lime Fizz', price: 375, colors: ['#B8E94C'] },
  { id: 'orange', label: 'Orange Crush', price: 375, colors: ['#FF9E2C'] },
  { id: 'zero-energy', label: 'Zero-Sugar Energy', price: 425, colors: ['#37A6F0'] },
]

export const SYRUPS: CustomizerOption[] = [
  { id: 'vanilla', label: 'Vanilla Sky', price: 75, colors: ['#F3E2B8'] },
  { id: 'blue-raspberry', label: 'Blue Raspberry', price: 75, colors: ['#2D9BE8'] },
  { id: 'cherry', label: 'Cherry Punch', price: 75, colors: ['#E0455A'] },
  { id: 'peach', label: 'Peach Dream', price: 75, colors: ['#FFB18C'] },
  { id: 'pineapple', label: 'Pineapple Wave', price: 75, colors: ['#F8E27A'] },
]

export const CREAMS: CustomizerOption[] = [
  { id: 'none', label: 'No cream', price: 0 },
  { id: 'splash', label: 'Splash of Cream', price: 75, colors: ['#FFF3DC'] },
  { id: 'cold-foam', label: 'Vanilla Cold Foam', price: 100, colors: ['#FFFDF4'] },
  { id: 'coconut-cream', label: 'Coconut Cream', price: 100, colors: ['#FFF8EC'] },
]

export const FRUITS: CustomizerOption[] = [
  { id: 'none', label: 'No fruit', price: 0 },
  { id: 'lime', label: 'Fresh Lime', price: 75 },
  { id: 'cherry', label: 'Cherry', price: 75 },
  { id: 'strawberry', label: 'Strawberry', price: 75 },
  { id: 'pineapple', label: 'Pineapple', price: 75 },
]

export const SIZES: { id: CupSize; label: string; price: number; oz: string }[] = [
  { id: 'small', label: 'Small', price: 0, oz: '12 oz' },
  { id: 'medium', label: 'Medium', price: 75, oz: '16 oz' },
  { id: 'large', label: 'Large', price: 150, oz: '22 oz' },
]

export function findOption(list: CustomizerOption[], id: string): CustomizerOption | undefined {
  return list.find((o) => o.id === id)
}

export const DEFAULT_SELECTIONS = {
  base: 'cola',
  syrup: 'vanilla',
  cream: 'splash',
  fruit: 'cherry',
  size: 'medium',
} as const
