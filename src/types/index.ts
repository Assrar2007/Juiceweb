/* ------------------------------------------------------------------ */
/*  Core domain types for Fizzora. All money values are integer cents. */
/* ------------------------------------------------------------------ */

export type SodaCategory = 'drink' | 'snack'

export type CupSize = 'small' | 'medium' | 'large'

/* ----------------------------- Drinks ----------------------------- */

export type GarnishKind =
  | 'lime'
  | 'cherry'
  | 'strawberry'
  | 'orange'
  | 'peach'
  | 'pineapple'
  | 'berries'
  | 'coconut'
  | 'none'

/** Spec for the reusable SVG drink illustration. */
export interface DrinkArtSpec {
  /** Liquid layers, bottom -> top. */
  layers: [string, string, ...string[]]
  /** Cream / cold-foam cap. */
  foam?: string
  straw: string
  garnish: GarnishKind
  /** Background blob color used on cards. */
  blob: string
}

export interface Product {
  id: string
  name: string
  tagline: string
  ingredients: string[]
  /** Price in cents. */
  price: number
  badge?: 'BESTSELLER' | 'NEW'
  /** Card accent color. */
  cardColor: string
  /** Ink color for text on the card accent. */
  cardInk: string
  art: DrinkArtSpec
}

/* ----------------------------- Snacks ----------------------------- */

export type SnackArtKind =
  | 'candy'
  | 'chips'
  | 'mango'
  | 'chocolate'
  | 'spicy'
  | 'gummy'

export interface Snack {
  id: string
  name: string
  origin: string
  description: string
  /** Short tasting note revealed by the Explore button. */
  notes: string
  /** Price in cents. */
  price: number
  art: SnackArtKind
  accent: string
}

/* --------------------------- Customizer --------------------------- */

export interface CustomizerOption {
  id: string
  label: string
  /** Price delta in cents. */
  price: number
  /** Color(s) contributed to the cup illustration. */
  colors?: string[]
}

export interface CustomizerSelections {
  base: string
  syrup: string
  cream: string
  fruit: string
  size: CupSize
}

/* ------------------------------ Cart ------------------------------ */

export interface CartItemMeta {
  size?: CupSize
  hasFoam?: boolean
  hasCream?: boolean
}

export interface CartItem {
  /** Unique line id (a custom drink and a signature drink are separate lines). */
  lineId: string
  kind: 'signature' | 'custom' | 'snack'
  refId: string
  name: string
  detail: string
  /** Unit price in cents. */
  unitPrice: number
  qty: number
  categories: SodaCategory[]
  art?: DrinkArtSpec
  meta?: CartItemMeta
}

/* ---------------------------- Membership --------------------------- */

export type TierId = 'fizz-fan' | 'fizz-insider' | 'fizz-vip'

export interface Tier {
  id: TierId
  name: string
  /** Price in cents per month. 0 for the free tier. Demo-only. */
  monthlyPrice: number
  tagline: string
  perks: string[]
  accent: string
  popular?: boolean
}

export interface Member {
  name: string
  email: string
  tierId: TierId
  joinedAt: string
}

/* ------------------------------ Deals ------------------------------ */

export type DealKind = 'percent' | 'fixed' | 'free-addon' | 'bundle'

export type DealAppliesTo =
  | { type: 'all' }
  | { type: 'categories'; categories: SodaCategory[] }
  | { type: 'products'; ids: string[] }

export interface Deal {
  id: string
  title: string
  description: string
  kind: DealKind
  /**
   * percent  -> whole percent (e.g. 15)
   * fixed    -> cents off
   * bundle   -> cents off when a drink + snack are both in the cart
   * free-addon -> cents value of the add-on that becomes free
   */
  value: number
  appliesTo: DealAppliesTo
  /** 'everyone' means no membership needed; otherwise a minimum tier. */
  minTier: TierId | 'everyone'
  /** Minimum cart subtotal in cents. */
  minSubtotal?: number
  /** Minimum number of snack units (snack-duo style deals). */
  minSnackQty?: number
  /** For free-addon deals: which add-on becomes free. */
  freeAddon?: { addon: 'foam' | 'cream'; size?: CupSize }
  /** ISO date strings. */
  startsAt?: string
  endsAt?: string
  badge?: string
  /** Which filter chips the deal appears under. */
  categories: SodaCategory[] | 'all'
}

export interface LockedDeal {
  deal: Deal
  reason: string
  /** Where the unlock CTA should point. */
  unlockAction: 'join-club' | 'add-more' | 'add-items' | 'wait'
}

export interface DealEvaluation {
  eligible: Deal[]
  locked: LockedDeal[]
  /** Best eligible deal for the current cart, if any. */
  best: Deal | null
  /** Discount in cents for every deal id (0 when not applicable). */
  discounts: Record<string, number>
}

/* ------------------------------ Misc ------------------------------ */

export interface AssetCredit {
  file: string
  source: string
  sourceUrl: string
  author: string
  license: string
  licenseUrl: string
  retrieved: string
}

export interface EventInquiryPayload {
  name: string
  email: string
  eventType: string
  eventDate: string
  guestCount: number
  details: string
}

export type FormKind = 'event' | 'newsletter' | 'club'

export interface SubmitResult {
  status: 'demo' | 'sent'
  message: string
}

export interface CheckoutTotals {
  subtotal: number
  discount: number
  total: number
}

export interface CheckoutResult {
  status: 'not-connected'
  message: string
}

/** A real payment provider can implement this later. */
export interface CheckoutAdapter {
  startCheckout(items: CartItem[], totals: CheckoutTotals): Promise<CheckoutResult>
}
