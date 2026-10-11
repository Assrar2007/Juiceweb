/**
 * Editable site-wide config: contact placeholders, social links and nav.
 * Contact details are deliberately placeholders — this is a fictional brand.
 */

export const SITE = {
  name: 'Fizzora',
  announcement: 'GOOD VIBES. BOLD FLAVORS. ENDLESS FIZZ.',
  email: 'hello@fizzora.example',
  phone: '+1 (555) 010-FIZZ',
  address: 'The Fizz Lab — 000 Sparkle Street, Flavor Town',
  hours: 'Open every day in demo mode, 24/7',
}

export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/fizzora.demo' },
  { id: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@fizzora.demo' },
  { id: 'x', label: 'X / Twitter', href: 'https://x.com/fizzora.demo' },
] as const

/** One configurable social link used by the gallery tiles. */
export const GALLERY_SOCIAL_LINK = 'https://instagram.com/fizzora.demo'

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'drinks', label: 'Dirty Sodas' },
  { id: 'snacks', label: 'Exotic Snacks' },
  { id: 'fizz-club', label: 'Fizz Club' },
  { id: 'story', label: 'Our Story' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
] as const

export const EVENT_TYPES = [
  'Wedding',
  'Birthday party',
  'Corporate event',
  'Private celebration',
  'Pop-up / community event',
] as const
