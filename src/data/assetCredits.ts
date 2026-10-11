import type { AssetCredit } from '../types'

/**
 * Provenance record for every non-original asset on the site.
 *
 * Fizzora ships 100% original SVG illustration (drink cups, fruit, snacks,
 * gallery tiles and scene art are all drawn in code), and no third-party
 * photos or video are used — the sandbox this build was created in has no
 * access to image libraries, and the design brief prefers original
 * illustration first anyway. If licensed photos are added later, append one
 * entry per file here with source, author, licence and retrieval date.
 */
export const ASSET_CREDITS: AssetCredit[] = [
  {
    file: 'src/components/illustrations/DrinkCup.tsx (all drink renders)',
    source: 'Fizzora studio (original)',
    sourceUrl: '',
    author: 'Fizzora',
    license: 'Original Fizzora illustration — all rights reserved',
    licenseUrl: '',
    retrieved: '2026-10-11',
  },
  {
    file: 'src/components/illustrations/Fruit.tsx (citrus, cherries, berries…)',
    source: 'Fizzora studio (original)',
    sourceUrl: '',
    author: 'Fizzora',
    license: 'Original Fizzora illustration — all rights reserved',
    licenseUrl: '',
    retrieved: '2026-10-11',
  },
  {
    file: 'src/components/illustrations/SnackArt.tsx (snack cards)',
    source: 'Fizzora studio (original)',
    sourceUrl: '',
    author: 'Fizzora',
    license: 'Original Fizzora illustration — all rights reserved',
    licenseUrl: '',
    retrieved: '2026-10-11',
  },
  {
    file: 'src/components/illustrations/Scenes.tsx (story + campaign art)',
    source: 'Fizzora studio (original)',
    sourceUrl: '',
    author: 'Fizzora',
    license: 'Original Fizzora illustration — all rights reserved',
    licenseUrl: '',
    retrieved: '2026-10-11',
  },
]

export const FONTS_NOTE =
  'Typefaces: Anton and Space Grotesk, self-hosted from open-licensed Google Fonts packages (SIL Open Font License) via Fontsource.'
