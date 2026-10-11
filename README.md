# Fizzora 🥤

A premium **dirty-soda brand site** with a members-only deals club — built with React 19, TypeScript, Vite, Tailwind CSS v4 and Motion (`motion/react`).

Fizzora is a **fictional demo brand**. Everything is front-end only: forms, membership and checkout are clearly labeled demos and nothing is sent, charged or stored server-side.

## Quick start

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # type-check + production build
npm test         # vitest unit tests (deal engine + app smoke test)
```

## What's inside

- **Hero, brand intro, signature collection** (8 dirty sodas, each with its own original SVG cup render)
- **Drink customizer** — live cup preview, live price, add to cart
- **Fizz Club** — 3 demo tiers, local-only membership (localStorage), deals board with filters, lock reasons and a live countdown
- **Deal engine** — pure functions in `src/lib/deals.ts`; one deal at a time, best-deal auto-suggest, integer-cent math, discounts never exceed the subtotal
- **Cart** — persistent, quantity controls, deal picker, "You saved $X", demo checkout adapter
- **Exotic snacks, campaign banner, story, event booking, social gallery, newsletter, footer**
- **Accessibility** — `MotionConfig reducedMotion="user"`, a persistent "Pause animations" toggle (WCAG 2.2.2), focus-trapped modals/drawers, labeled forms with inline errors, single `h1`, semantic landmarks

All artwork is original SVG illustration shipped in `src/components/illustrations` — no third-party photos or video, no hotlinked assets. Fonts (Anton, Space Grotesk) are self-hosted via Fontsource (SIL Open Font License). See `src/data/assetCredits.ts`.

## Plugging in the real thing

- Backend form handling: `src/lib/submitForm.ts`
- Payments/checkout: `src/lib/checkoutAdapter.ts`
- Prices, deals, tiers, snacks, contact details: `src/data/*`
