import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Clock, Lock, Sparkles, Wand2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import type { Deal, LockedDeal } from '../types'
import { formatCents } from '../lib/format'
import { useCountdown } from '../hooks/useCountdown'
import { scrollToId } from '../lib/scroll'

type Filter = 'all' | 'unlocked' | 'locked' | 'drinks' | 'snacks'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'unlocked', label: 'Unlocked' },
  { id: 'locked', label: 'Locked' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'snacks', label: 'Snacks' },
]

function Countdown({ endsAt }: { endsAt: string }) {
  const { days, hours, minutes, seconds, over } = useCountdown(endsAt)
  if (over) return null
  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-fizz-charcoal px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-fizz-lime">
      <Clock className="size-3.5" aria-hidden="true" />
      Ends in {days > 0 && `${days}d `}
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
      {String(seconds).padStart(2, '0')}
    </p>
  )
}

function DealCardEligible({ deal }: { deal: Deal }) {
  const { evaluation, selectedDealId, setSelectedDealId, items } = useStore()
  const discount = evaluation.discounts[deal.id] ?? 0
  const isBest = evaluation.best?.id === deal.id
  const auto = selectedDealId === 'auto'
  const applied = auto ? isBest : selectedDealId === deal.id

  return (
    <article
      className={`flex flex-col gap-3 rounded-3xl p-6 transition-colors ${
        applied ? 'bg-fizz-lime text-fizz-charcoal' : 'bg-white/5 text-fizz-cream'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {deal.badge && (
          <span className="rounded-full bg-fizz-pink px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-fizz-charcoal">
            {deal.badge}
          </span>
        )}
        {isBest && items.length > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-fizz-yellow px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-fizz-charcoal">
            <Wand2 className="size-3" aria-hidden="true" /> Best for your cart
          </span>
        )}
        {deal.endsAt && <Countdown endsAt={deal.endsAt} />}
      </div>
      <h4 className="font-display text-2xl uppercase leading-none">{deal.title}</h4>
      <p className={`text-sm ${applied ? 'text-fizz-charcoal/75' : 'text-fizz-cream/70'}`}>
        {deal.description}
      </p>
      <p className={`text-sm font-black ${discount > 0 ? 'text-fizz-lime' : applied ? 'text-fizz-charcoal/70' : 'text-fizz-cream/60'}`}>
        {discount > 0
          ? `Saves you ${formatCents(discount)} right now`
          : items.length === 0
            ? 'Add items to your cart to use it'
            : 'Not applicable to your current cart yet'}
      </p>
      <button
        type="button"
        onClick={() => setSelectedDealId(applied ? null : deal.id)}
        aria-pressed={applied}
        className={`mt-auto inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-transform hover:scale-[1.02] active:scale-95 ${
          applied
            ? 'bg-fizz-charcoal text-fizz-lime'
            : 'bg-fizz-cream text-fizz-charcoal'
        }`}
      >
        {applied ? 'Applied ✓ — tap to remove' : 'Use this deal'}
      </button>
    </article>
  )
}

function DealCardLocked({ locked }: { locked: LockedDeal }) {
  const { deal, reason, unlockAction } = locked
  const cta = {
    'join-club': { label: 'Join the Fizz Club', target: 'fizz-club' },
    'add-more': { label: 'Browse the menu', target: 'drinks' },
    'add-items': {
      label: deal.categories === 'all' || deal.categories.includes('drink') ? 'Add drinks & snacks' : 'Browse snacks',
      target: deal.categories !== 'all' && !deal.categories.includes('drink') ? 'snacks' : 'drinks',
    },
    wait: { label: 'Browse while you wait', target: 'drinks' },
  }[unlockAction]

  return (
    <article className="flex flex-col gap-3 rounded-3xl border-2 border-dashed border-fizz-cream/20 bg-transparent p-6 text-fizz-cream">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-fizz-cream/80">
          <Lock className="size-3" aria-hidden="true" /> Locked
        </span>
        {deal.badge && (
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-fizz-cream/70">
            {deal.badge}
          </span>
        )}
        {deal.endsAt &&
          (!deal.startsAt || Date.now() >= new Date(deal.startsAt).getTime()) && (
            <Countdown endsAt={deal.endsAt} />
          )}
      </div>
      <h4 className="font-display text-2xl uppercase leading-none text-fizz-cream/70">{deal.title}</h4>
      <p className="text-sm text-fizz-cream/55">{deal.description}</p>
      <p className="text-sm font-bold text-fizz-yellow">{reason}</p>
      <button
        type="button"
        onClick={() => scrollToId(cta.target)}
        className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full border-2 border-fizz-cream/25 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-fizz-cream transition-colors hover:border-fizz-lime hover:text-fizz-lime"
      >
        {cta.label}
      </button>
    </article>
  )
}

export function DealsBoard() {
  const { evaluation, member, selectedDealId, setSelectedDealId } = useStore()
  const [filter, setFilter] = useState<Filter>('all')

  const rows = useMemo(() => {
    const eligible = evaluation.eligible.map((deal) => ({ kind: 'eligible' as const, deal }))
    const locked = evaluation.locked.map((l) => ({ kind: 'locked' as const, locked: l, deal: l.deal }))
    const all = [...eligible, ...locked]
    return all.filter((row) => {
      const cats = row.deal.categories
      switch (filter) {
        case 'all':
          return true
        case 'unlocked':
          return row.kind === 'eligible'
        case 'locked':
          return row.kind === 'locked'
        case 'drinks':
          return cats === 'all' || cats.includes('drink')
        case 'snacks':
          return cats === 'all' || cats.includes('snack')
      }
    })
  }, [evaluation, filter])

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-display text-3xl uppercase text-fizz-cream sm:text-4xl">
          The deals board
        </h3>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter deals">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`relative min-h-10 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                filter === f.id ? 'text-fizz-charcoal' : 'text-fizz-cream/70 hover:text-fizz-cream'
              }`}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="deal-filter-chip"
                  className="absolute inset-0 rounded-full bg-fizz-lime"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm text-fizz-cream/60">
        One deal applies at a time.{' '}
        {evaluation.best
          ? 'We auto-suggest the best eligible deal — switch any time in your cart or here.'
          : 'Add items to your cart to start unlocking savings.'}
        {!member && (
          <>
            {' '}
            <button
              type="button"
              onClick={() => scrollToId('club-tiers')}
              className="font-bold text-fizz-lime underline underline-offset-4 hover:text-fizz-yellow"
            >
              Members unlock more.
            </button>
          </>
        )}
      </p>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {rows.map((row) => (
            <motion.div
              layout
              key={row.deal.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
            >
              {row.kind === 'eligible' ? (
                <DealCardEligible deal={row.deal} />
              ) : (
                <DealCardLocked locked={row.locked} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selectedDealId === null && (
        <p className="mt-4 flex items-center gap-2 text-xs text-fizz-cream/60">
          <Sparkles className="size-3.5 text-fizz-yellow" aria-hidden="true" />
          You turned auto-apply off — no deal is selected. Pick one above or re-enable auto in
          your cart.
          <button
            type="button"
            onClick={() => setSelectedDealId('auto')}
            className="font-bold uppercase tracking-wide text-fizz-lime underline underline-offset-4"
          >
            Auto on
          </button>
        </p>
      )}
    </div>
  )
}
