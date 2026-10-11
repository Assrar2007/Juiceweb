import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Info } from 'lucide-react'
import { Bubbles } from './illustrations/Bubbles'
import { validateEmail } from '../lib/validate'
import { submitForm } from '../lib/submitForm'
import { onceViewport } from '../motion/variants'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const problem = validateEmail(email)
    setError(problem)
    if (problem) return
    setStatus('sending')
    const result = await submitForm('newsletter', { email })
    setMessage(result.message)
    setStatus('done')
  }

  return (
    <section id="newsletter" className="grain relative overflow-hidden bg-fizz-lavender py-20 lg:py-24" aria-label="Newsletter">
      <Bubbles count={8} />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={onceViewport}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6"
      >
        <Mail className="mx-auto size-10 text-fizz-charcoal" aria-hidden="true" />
        <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-fizz-charcoal sm:text-6xl">
          Good things come in <span className="italic text-fizz-pink">fizzy</span> packages.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-fizz-charcoal/75 sm:text-lg">
          Get new flavor drops, seasonal specials, and exciting updates.
        </p>

        {status === 'done' ? (
          <div className="mx-auto mt-8 max-w-lg rounded-[2rem] bg-fizz-cream p-6 shadow-card" role="status">
            <p className="font-display text-xl uppercase text-fizz-charcoal">You're on the (demo) list!</p>
            <p className="mt-2 text-sm text-ink-soft">{message}</p>
            <button
              type="button"
              onClick={() => {
                setStatus('idle')
                setEmail('')
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-fizz-charcoal px-6 py-2.5 text-sm font-black uppercase tracking-wide text-fizz-yellow"
            >
              Subscribe another
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="mx-auto mt-8 max-w-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'nl-email-error' : undefined}
                  className="w-full rounded-full border-2 border-fizz-charcoal/15 bg-fizz-cream px-6 py-3.5 text-fizz-charcoal outline-none focus:border-fizz-charcoal"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-fizz-charcoal px-8 py-3.5 text-sm font-black uppercase tracking-wider text-fizz-yellow transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
              >
                {status === 'sending' ? 'Fizzing…' : 'Subscribe'}
              </button>
            </div>
            {error && (
              <p id="nl-email-error" role="alert" className="mt-2 text-left text-sm font-semibold text-red-700">
                {error}
              </p>
            )}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-fizz-charcoal/70">
              <Info className="size-3.5" aria-hidden="true" />
              Demo signup — no email is stored or sent.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  )
}
