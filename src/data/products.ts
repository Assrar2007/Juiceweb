import type { Product } from '../types'

/**
 * Signature dirty sodas. Prices are integer cents — edit freely.
 * Every drink gets its own illustration spec (layers, foam, garnish).
 */
export const PRODUCTS: Product[] = [
  {
    id: 'king-coco',
    name: 'King Coco',
    tagline: 'The smooth-talking island classic.',
    ingredients: ['cola', 'coconut', 'vanilla', 'coconut cream'],
    price: 645,
    badge: 'BESTSELLER',
    cardColor: '#F5E642',
    cardInk: '#191719',
    art: {
      layers: ['#3B2418', '#6B4226', '#C89F6E'],
      foam: '#FFF3DC',
      straw: '#191719',
      garnish: 'coconut',
      blob: '#A78BFA',
    },
  },
  {
    id: 'electric-slide',
    name: 'Electric Slide',
    tagline: 'Blue raspberry with a lime-light kick.',
    ingredients: ['lemon-lime soda', 'blue raspberry', 'lime', 'cold foam'],
    price: 625,
    cardColor: '#A78BFA',
    cardInk: '#191719',
    art: {
      layers: ['#2D5BE3', '#37A6F0', '#9BE7F0'],
      foam: '#FFFDF4',
      straw: '#F46BCE',
      garnish: 'lime',
      blob: '#F5E642',
    },
  },
  {
    id: 'glow-up',
    name: 'Glow Up',
    tagline: 'Orange sunshine under a cloud of foam.',
    ingredients: ['orange soda', 'vanilla', 'cold foam'],
    price: 595,
    cardColor: '#FFF7E8',
    cardInk: '#191719',
    art: {
      layers: ['#F07818', '#FFA435', '#FFC96B'],
      foam: '#FFF6E3',
      straw: '#A78BFA',
      garnish: 'orange',
      blob: '#F46BCE',
    },
  },
  {
    id: 'princess-peach',
    name: 'Princess Peach',
    tagline: 'Cola gone blushing and velvet-smooth.',
    ingredients: ['cola', 'peach', 'vanilla cream'],
    price: 645,
    cardColor: '#F46BCE',
    cardInk: '#191719',
    art: {
      layers: ['#43251A', '#B0522E', '#FFB18C'],
      foam: '#FFEFE0',
      straw: '#F5E642',
      garnish: 'peach',
      blob: '#FFF7E8',
    },
  },
  {
    id: 'dark-matter',
    name: 'Dark Matter',
    tagline: 'Zero-sugar energy, maximum glow.',
    ingredients: ['sugar-free energy drink', 'pineapple', 'blue raspberry'],
    price: 675,
    badge: 'NEW',
    cardColor: '#191719',
    cardInk: '#FFF7E8',
    art: {
      layers: ['#241A4A', '#4A2B8F', '#2D9BE8'],
      straw: '#C7F464',
      garnish: 'pineapple',
      blob: '#A78BFA',
    },
  },
  {
    id: 'tropical-escape',
    name: 'Tropical Escape',
    tagline: 'Pineapple, coconut, and a one-way ticket.',
    ingredients: ['lemon-lime soda', 'pineapple', 'coconut'],
    price: 625,
    cardColor: '#C7F464',
    cardInk: '#191719',
    art: {
      layers: ['#1E9E6A', '#5ECF8F', '#F8E27A'],
      foam: '#FFFDF0',
      straw: '#F46BCE',
      garnish: 'pineapple',
      blob: '#F5E642',
    },
  },
  {
    id: 'cherry-voltage',
    name: 'Cherry Voltage',
    tagline: 'A jolt of cherry, a swirl of cream.',
    ingredients: ['cola', 'cherry', 'vanilla', 'cream'],
    price: 645,
    badge: 'BESTSELLER',
    cardColor: '#F5E642',
    cardInk: '#191719',
    art: {
      layers: ['#3B1620', '#8F1D3F', '#E0455A'],
      foam: '#FFF1E8',
      straw: '#191719',
      garnish: 'cherry',
      blob: '#F46BCE',
    },
  },
  {
    id: 'berry-galaxy',
    name: 'Berry Galaxy',
    tagline: 'Mixed berries drifting in lime-green fizz.',
    ingredients: ['lemon-lime soda', 'mixed berries', 'lime'],
    price: 625,
    badge: 'NEW',
    cardColor: '#A78BFA',
    cardInk: '#191719',
    art: {
      layers: ['#5B2A86', '#B14AC4', '#E86BB0'],
      straw: '#C7F464',
      garnish: 'berries',
      blob: '#C7F464',
    },
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
