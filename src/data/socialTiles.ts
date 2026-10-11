import type { GarnishKind } from '../types'

/**
 * Social gallery tiles. These are BRAND IMAGERY rendered with Fizzora's own
 * illustration system — not customer posts. The link is configurable.
 */
export interface SocialTile {
  id: string
  caption: string
  /** Cup art re-used from the illustration system. */
  layers: [string, string, ...string[]]
  foam?: string
  garnish: GarnishKind
  bg: string
  blob: string
}

export const SOCIAL_TILES: SocialTile[] = [
  {
    id: 'tile-king-coco',
    caption: 'King Coco, extra coconut',
    layers: ['#3B2418', '#6B4226', '#C89F6E'],
    foam: '#FFF3DC',
    garnish: 'coconut',
    bg: '#F5E642',
    blob: '#A78BFA',
  },
  {
    id: 'tile-snack-flight',
    caption: 'Snack flight, ready for takeoff',
    layers: ['#5B2A86', '#B14AC4', '#E86BB0'],
    garnish: 'berries',
    bg: '#F46BCE',
    blob: '#F5E642',
  },
  {
    id: 'tile-lime-hour',
    caption: 'Lime o’clock, somewhere sunny',
    layers: ['#2D5BE3', '#37A6F0', '#9BE7F0'],
    foam: '#FFFDF4',
    garnish: 'lime',
    bg: '#C7F464',
    blob: '#F46BCE',
  },
  {
    id: 'tile-glow',
    caption: 'Golden hour, Glow Up edition',
    layers: ['#F07818', '#FFA435', '#FFC96B'],
    foam: '#FFF6E3',
    garnish: 'orange',
    bg: '#FFF7E8',
    blob: '#A78BFA',
  },
  {
    id: 'tile-dark-matter',
    caption: 'Late-night Dark Matter',
    layers: ['#241A4A', '#4A2B8F', '#2D9BE8'],
    garnish: 'pineapple',
    bg: '#191719',
    blob: '#C7F464',
  },
  {
    id: 'tile-peach',
    caption: 'Princess Peach picnic',
    layers: ['#43251A', '#B0522E', '#FFB18C'],
    foam: '#FFEFE0',
    garnish: 'peach',
    bg: '#A78BFA',
    blob: '#FFF7E8',
  },
]
