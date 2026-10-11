import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, LogOut, Sparkles } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { TIERS } from '../data/tiers'
import type { Member, TierId } from '../types'
import { useStore } from '../context/StoreContext'
import { formatCents } from '../lib/format'
import { validateEmail, validateName } from '../lib/validate'
import { submitForm } from '../lib/submitForm'
import { DealsBoard } from './DealsBoard'
import { onceViewport, staggerContainer, staggerItem } from '../motion/variants'
import { scrollToId } from '../lib/scroll'

type Step = 'pick' | 'form' | 'confirm'

export function FizzClub() {
  const { member, joinClub, leaveClub, pushToast } = useStore()
  const [pendingTier, setPendingTier] = useState<TierId>('fizz-insider')
  const [step, setStep] = useState<Step>('pick')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  const startJoin = (tier: TierId) => {
    setPendingTier(tier)
    setStep('form')
    window.requestAnimationFrame(() => scrollToId('club-join'))
  }

  const validateForm = () => {
    const next = {
      name: validateName(name) ?? undefined,
      email: validateEmail(email) ?? undefined,
    }
    setErrors(next)
    return !next.name && !next.email
  }

  const finishJoin = async () => {
    setSubmitting(true)
    await submitForm('club', { name, email, tierId: pendingTier })
    const newMember: Member = {
      name: name.trim(),
      email: email.trim(),
      tierId: pendingTier,
      joinedAt: new Date().toISOString(),
    }
    joinClub(newMember)
    setSubmitting(false)
    setStep('pick')
    setName('')
    setEmail('')
    pushToast(`Welcome to the Fizz Club, ${newMember.name.split(' ')[0]}!`)
  }

  const tier = TIERS.find((t) => t.id === pendingTier) ?? TIERS[0]
  const memberTier = member ? TIERS.find((t) => t.id === member.tierId) : null

  return (
    <section id="fizz-club" className="grain relative overflow-hidden bg-fizz-charcoal py-20 lg:py-28" aria-label="Fizz Club membership and deals">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Fizz Club"
          title={
            <>
              Members sip <span className="text-fizz-lime">smarter.</span>
            </>
          }
          sub="Better prices, sweeter perks, and deals that show up right in your cart. This is a local demo — no account is created and nothing is charged."
        />

        {/* Membership state */}
        {member && memberTier ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={onceViewport}
            className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 rounded-[2rem] bg-white/5 p-8 text-center"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black uppercase tracking-wider text-fizz-charcoal"
              style={{ backgroundColor: memberTier.accent }}
            >
              <Sparkles className="size-4" aria-hidden="true" />
              {memberTier.name} member
            </span>
            <h3 className="font-display text-3xl uppercase text-fizz-cream">
              You're in, {member.name.split(' ')[0]}.
            </h3>
            <p className="max-w-xl text-sm text-fizz-cream/70">
              Member pricing is live on drink cards, and unlocked deals below apply automatically
              in your cart. Membership is stored only in this browser (demo).
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {TIERS.filter((t) => t.id !== member.tierId).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    joinClub({ ...member, tierId: t.id })
                    pushToast(`Switched to ${t.name}`)
                  }}
                  className="min-h-11 rounded-full border-2 border-fizz-cream/25 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-fizz-cream transition-colors hover:border-fizz-lime hover:text-fizz-lime"
                >
                  Switch to {t.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  leaveClub()
                  pushToast('You left the Fizz Club. The fizz will miss you.')
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-fizz-pink transition-colors hover:text-fizz-cream"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Leave club
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Tier picker */}
            <motion.ul
              id="club-tiers"
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={onceViewport}
              className="mt-14 grid gap-6 lg:grid-cols-3"
            >
              {TIERS.map((t) => {
                const active = pendingTier === t.id && step !== 'pick'
                return (
                  <motion.li
                    key={t.id}
                    variants={staggerItem}
                    className={`relative flex flex-col rounded-[2rem] p-7 transition-colors ${
                      active ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    {t.popular && (
                      <span className="absolute -top-3 right-6 rounded-full bg-fizz-lime px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-fizz-charcoal">
                        Most poured
                      </span>
                    )}
                    <span
                      className="inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-fizz-charcoal"
                      style={{ backgroundColor: t.accent }}
                    >
                      {t.name}
                    </span>
                    <p className="mt-4 font-display text-4xl text-fizz-cream">
                      {t.monthlyPrice === 0 ? 'Free' : `${formatCents(t.monthlyPrice)}`}
                      {t.monthlyPrice > 0 && <span className="text-lg text-fizz-cream/50">/mo</span>}
                    </p>
                    <p className="mt-1 text-sm italic text-fizz-cream/60">
                      {t.tagline}
                      {t.monthlyPrice > 0 && ' · placeholder demo price'}
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                      {t.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5 text-sm text-fizz-cream/85">
                          <Check className="mt-0.5 size-4 shrink-0 text-fizz-lime" aria-hidden="true" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => startJoin(t.id)}
                      className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-fizz-yellow px-6 py-3 text-sm font-black uppercase tracking-wider text-fizz-charcoal transition-transform hover:scale-[1.03] active:scale-95"
                    >
                      Join the demo club
                    </button>
                  </motion.li>
                )
              })}
            </motion.ul>

            {/* Join flow */}
            {step !== 'pick' && (
              <motion.div
                id="club-join"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mt-10 max-w-xl rounded-[2rem] bg-fizz-cream p-7 sm:p-9"
              >
                {step === 'form' ? (
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (validateForm()) setStep('confirm')
                    }}
                  >
                    <h3 className="font-display text-2xl uppercase text-fizz-charcoal">
                      Join as {tier.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      Local demo only — details never leave this browser.
                    </p>

                    <div className="mt-5">
                      <label htmlFor="club-name" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                        Your name
                      </label>
                      <input
                        id="club-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'club-name-error' : undefined}
                        className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 text-fizz-charcoal outline-none focus:border-fizz-lavender"
                        placeholder="Alex Fizzington"
                      />
                      {errors.name && (
                        <p id="club-name-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <label htmlFor="club-email" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                        Email
                      </label>
                      <input
                        id="club-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'club-email-error' : undefined}
                        className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 text-fizz-charcoal outline-none focus:border-fizz-lavender"
                        placeholder="alex@example.com"
                      />
                      {errors.email && (
                        <p id="club-email-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        type="submit"
                        className="min-h-12 flex-1 rounded-full bg-fizz-charcoal px-6 py-3 text-sm font-black uppercase tracking-wider text-fizz-yellow transition-transform hover:scale-[1.02] active:scale-95"
                      >
                        Continue
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep('pick')}
                        className="min-h-12 rounded-full border-2 border-fizz-charcoal/15 px-5 py-3 text-sm font-bold uppercase text-fizz-charcoal hover:border-fizz-charcoal"
                      >
                        Back
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <h3 className="font-display text-2xl uppercase text-fizz-charcoal">One last fizz-check</h3>
                    <dl className="mt-4 space-y-2 rounded-2xl bg-fizz-lavender/25 p-5 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="font-bold uppercase tracking-wide text-ink-soft">Tier</dt>
                        <dd className="font-bold text-fizz-charcoal">
                          {tier.name}{' '}
                          {tier.monthlyPrice > 0
                            ? `(${formatCents(tier.monthlyPrice)}/mo demo price — not charged)`
                            : '(free)'}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="font-bold uppercase tracking-wide text-ink-soft">Name</dt>
                        <dd className="font-bold text-fizz-charcoal">{name.trim()}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="font-bold uppercase tracking-wide text-ink-soft">Email</dt>
                        <dd className="font-bold text-fizz-charcoal">{email.trim()}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-xs text-ink-soft">
                      By confirming you acknowledge this is a demo: no account is created and no
                      payment is taken.
                    </p>
                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={finishJoin}
                        className="min-h-12 flex-1 rounded-full bg-fizz-charcoal px-6 py-3 text-sm font-black uppercase tracking-wider text-fizz-lime transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                      >
                        {submitting ? 'Fizzing…' : 'Confirm & join'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep('form')}
                        className="min-h-12 rounded-full border-2 border-fizz-charcoal/15 px-5 py-3 text-sm font-bold uppercase text-fizz-charcoal hover:border-fizz-charcoal"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* Deals board lives inside the club section */}
        <DealsBoard />
      </div>
    </section>
  )
}
