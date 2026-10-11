import { useState } from 'react'
import { motion } from 'motion/react'
import { CalendarHeart, Cake, Briefcase, GlassWater, Tent, Info } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { EVENT_TYPES } from '../data/siteConfig'
import { validateEmail, validateEventDate, validateGuestCount, validateName } from '../lib/validate'
import { submitForm } from '../lib/submitForm'
import { onceViewport, staggerContainer, staggerItem } from '../motion/variants'

const EVENT_ICONS = [CalendarHeart, Cake, Briefcase, GlassWater, Tent]

interface Errors {
  name?: string
  email?: string
  eventType?: string
  eventDate?: string
  guestCount?: string
}

export function EventBooking() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [eventType, setEventType] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [guestCount, setGuestCount] = useState('')
  const [details, setDetails] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [resultMessage, setResultMessage] = useState('')

  const today = new Date().toISOString().slice(0, 10)

  const validate = (): boolean => {
    const next: Errors = {
      name: validateName(name) ?? undefined,
      email: validateEmail(email) ?? undefined,
      eventType: eventType ? undefined : 'Please pick an event type.',
      eventDate: validateEventDate(eventDate) ?? undefined,
      guestCount: validateGuestCount(guestCount) ?? undefined,
    }
    setErrors(next)
    return Object.values(next).every((v) => !v)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    const result = await submitForm('event', {
      name,
      email,
      eventType,
      eventDate,
      guestCount: Number(guestCount),
      details,
    })
    setResultMessage(result.message)
    setStatus('done')
  }

  const field = (error: string | undefined, id: string) => ({
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  })

  return (
    <section id="events" className="grain relative overflow-hidden bg-fizz-yellow py-20 lg:py-28" aria-label="Event booking">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Events"
          title={
            <>
              Let's bring the <span className="text-fizz-pink">fizz</span> to you.
            </>
          }
          sub="Make your next celebration unforgettable with a colorful soda bar, customizable drinks, and a little extra fun."
        />

        {/* Event types */}
        <motion.ul
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {EVENT_TYPES.map((type, i) => {
            const Icon = EVENT_ICONS[i % EVENT_ICONS.length]
            return (
              <motion.li
                key={type}
                variants={staggerItem}
                className="flex flex-col items-center gap-3 rounded-3xl bg-fizz-cream p-5 text-center text-fizz-charcoal shadow-card transition-transform hover:-translate-y-1.5"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-fizz-pink text-fizz-charcoal">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-black uppercase tracking-wide">{type}</span>
              </motion.li>
            )
          })}
        </motion.ul>

        {/* Inquiry form */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="mx-auto mt-12 max-w-3xl"
        >
          {status === 'done' ? (
            <div className="rounded-[2rem] bg-fizz-cream p-8 text-center shadow-card" role="status">
              <p className="font-display text-3xl uppercase text-fizz-charcoal">
                Demo inquiry received!
              </p>
              <p className="mx-auto mt-3 max-w-lg text-sm text-ink-soft">{resultMessage}</p>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle')
                  setName('')
                  setEmail('')
                  setEventType('')
                  setEventDate('')
                  setGuestCount('')
                  setDetails('')
                }}
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-fizz-charcoal px-6 py-3 text-sm font-black uppercase tracking-wide text-fizz-yellow"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={onSubmit}
              className="rounded-[2rem] bg-fizz-cream p-7 shadow-card sm:p-10"
            >
              <h3 className="font-display text-2xl uppercase text-fizz-charcoal">
                Book the Fizzora soda bar
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ev-name" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                    Your name
                  </label>
                  <input
                    id="ev-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    {...field(errors.name, 'ev-name')}
                    className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 outline-none focus:border-fizz-lavender"
                  />
                  {errors.name && (
                    <p id="ev-name-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ev-email" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                    Email
                  </label>
                  <input
                    id="ev-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    {...field(errors.email, 'ev-email')}
                    className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 outline-none focus:border-fizz-lavender"
                  />
                  {errors.email && (
                    <p id="ev-email-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ev-type" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                    Event type
                  </label>
                  <select
                    id="ev-type"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    {...field(errors.eventType, 'ev-type')}
                    className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 outline-none focus:border-fizz-lavender"
                  >
                    <option value="">Choose one…</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p id="ev-type-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">
                      {errors.eventType}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ev-date" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                    Event date
                  </label>
                  <input
                    id="ev-date"
                    type="date"
                    min={today}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    {...field(errors.eventDate, 'ev-date')}
                    className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 outline-none focus:border-fizz-lavender"
                  />
                  {errors.eventDate && (
                    <p id="ev-date-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">
                      {errors.eventDate}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ev-guests" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                    Guest count
                  </label>
                  <input
                    id="ev-guests"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    {...field(errors.guestCount, 'ev-guests')}
                    className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 outline-none focus:border-fizz-lavender"
                    placeholder="42"
                  />
                  {errors.guestCount && (
                    <p id="ev-guests-error" role="alert" className="mt-1.5 text-sm font-semibold text-red-600">
                      {errors.guestCount}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ev-details" className="text-xs font-black uppercase tracking-[0.18em] text-ink-soft">
                    Additional details <span className="normal-case opacity-60">(optional)</span>
                  </label>
                  <textarea
                    id="ev-details"
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="mt-2 w-full rounded-2xl border-2 border-fizz-charcoal/15 bg-white px-4 py-3 outline-none focus:border-fizz-lavender"
                    placeholder="Theme, colors, flavors you love…"
                  />
                </div>
              </div>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-fizz-charcoal px-8 py-3.5 text-sm font-black uppercase tracking-wider text-fizz-yellow transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 sm:w-auto"
                >
                  {status === 'sending' ? 'Fizzling…' : 'Send inquiry'}
                </button>
                <p className="flex items-center gap-1.5 text-xs text-ink-soft">
                  <Info className="size-3.5 shrink-0" aria-hidden="true" />
                  Demo form — nothing is actually sent until a backend is connected.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
