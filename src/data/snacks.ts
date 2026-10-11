import type { Snack } from '../types'

/**
 * Exotic snacks. Prices are integer cents.
 * Origin labels are only used where the inspiration is unambiguous —
 * otherwise the copy says "Inspired by …". No real brand names.
 */
export const SNACKS: Snack[] = [
  {
    id: 'tokyo-sugar-drops',
    name: 'Tokyo Sugar Drops',
    origin: 'Japan',
    description:
      'Tiny jewel-toned hard candies with matcha, yuzu and plum notes. Inspired by Japanese konfectionery.',
    notes:
      'Tasting notes: floral yuzu, deep matcha, a plum-y finish.',
    price: 495,
    art: 'candy',
    accent: '#F46BCE',
  },
  {
    id: 'seoul-crisp-chips',
    name: 'Seoul Crisp Chips',
    origin: 'Korea',
    description:
      'Feather-thin potato chips seasoned with gochujang honey and toasted sesame. Inspired by Korean street snacks.',
    notes:
      'Tasting notes: sweet heat, toasted sesame, serious crunch.',
    price: 450,
    art: 'chips',
    accent: '#F5E642',
  },
  {
    id: 'mango-sun-bites',
    name: 'Mango Sun Bites',
    origin: 'Inspired by the tropics',
    description:
      'Chewy dried-mango pieces dusted with chili-lime. Sunshine, pocket-sized.',
    notes:
      'Tasting notes: ripe mango, chili-lime zing, pleasantly chewy.',
    price: 525,
    art: 'mango',
    accent: '#C7F464',
  },
  {
    id: 'pistachio-moon-rocks',
    name: 'Pistachio Moon Rocks',
    origin: 'Inspired by the Middle East',
    description:
      'Slow-roasted pistachios wrapped in dark chocolate with a whisper of cardamom.',
    notes:
      'Tasting notes: dark cocoa, buttery pistachio, warm cardamom.',
    price: 575,
    art: 'chocolate',
    accent: '#A78BFA',
  },
  {
    id: 'dragon-crunch-mix',
    name: 'Dragon Crunch Mix',
    origin: 'Inspired by Southeast Asia',
    description:
      'Fiery cracker mix with chili, lime leaf and roasted peanuts. Handle with fizz.',
    notes:
      'Tasting notes: chili first, lime leaf next, peanut last. Keep a drink nearby.',
    price: 475,
    art: 'spicy',
    accent: '#F46BCE',
  },
  {
    id: 'galaxy-gummies',
    name: 'Galaxy Gummies',
    origin: 'Fizzora original',
    description:
      'Color-shifting gummy planets — sour on the outside, fizzy candy dust in the middle.',
    notes:
      'Tasting notes: sour shell, sherbet-fizz center, zero regrets.',
    price: 425,
    art: 'gummy',
    accent: '#F5E642',
  },
]
