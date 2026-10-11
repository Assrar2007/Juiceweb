import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, X } from 'lucide-react'
import { FizzoraLogo } from './Navbar'
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '../data/siteConfig'
import { ASSET_CREDITS, FONTS_NOTE } from '../data/assetCredits'
import { MotionToggle } from './ui/MotionToggle'
import { scrollToId } from '../lib/scroll'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { modalPop, overlayFade } from '../motion/variants'

function CreditsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const trapRef = useFocusTrap<HTMLDivElement>(open, onClose)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlayFade}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-fizz-charcoal/70 p-4"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="credits-title"
            variants={modalPop}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-fizz-cream p-7 sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="credits-title" className="font-display text-3xl uppercase text-fizz-charcoal">
                Image credits
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-fizz-charcoal text-fizz-cream"
                aria-label="Close image credits"
                data-autofocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Every visual on this site is an original Fizzora illustration drawn in code (SVG) —
              no third-party photos or video are used, so there are no licence obligations to
              track. The record below exists anyway, so any future licensed asset has an obvious
              home.
            </p>
            <ul className="mt-5 space-y-3">
              {ASSET_CREDITS.map((credit) => (
                <li key={credit.file} className="rounded-2xl bg-fizz-lavender/20 p-4 text-sm">
                  <p className="font-black text-fizz-charcoal">{credit.file}</p>
                  <p className="mt-1 text-ink-soft">
                    {credit.license} · {credit.author} · retrieved {credit.retrieved}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-soft">{FONTS_NOTE}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Footer() {
  const [creditsOpen, setCreditsOpen] = useState(false)

  return (
    <footer id="contact" className="bg-fizz-charcoal text-fizz-cream" aria-label="Footer and contact">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <FizzoraLogo className="text-fizz-cream" />
          <p className="mt-4 max-w-xs text-sm text-fizz-cream/70">
            Big flavors, wild combinations and ridiculously refreshing dirty sodas. A fictional
            demo brand built for fun — every sip is pretend, every flavor idea is real.
          </p>
          <div className="mt-5">
            <MotionToggle compact />
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-fizz-yellow">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.filter((l) => l.id !== 'home').map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  className="text-sm font-semibold text-fizz-cream/75 transition-colors hover:text-fizz-lime"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menu links */}
        <nav aria-label="Menu shortcuts">
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-fizz-yellow">The menu</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              { label: 'Signature dirty sodas', id: 'drinks' },
              { label: 'Build your own fizz', id: 'customizer' },
              { label: 'Exotic snacks', id: 'snacks' },
              { label: 'Fizz Club deals', id: 'fizz-club' },
              { label: 'Newsletter', id: 'newsletter' },
            ].map((link) => (
              <li key={link.id + link.label}>
                <button
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  className="text-sm font-semibold text-fizz-cream/75 transition-colors hover:text-fizz-lime"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + socials */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.24em] text-fizz-yellow">Say hello</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-fizz-cream/75">
            <li>
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-fizz-lime">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-fizz-lime">
                {SITE.phone}
              </a>
            </li>
            <li>{SITE.address}</li>
            <li className="text-fizz-cream/50">{SITE.hours}</li>
          </ul>
          <ul className="mt-5 flex gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide transition-colors hover:bg-fizz-yellow hover:text-fizz-charcoal"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
          <p className="text-xs text-fizz-cream/60">
            © {new Date().getFullYear()} Fizzora. A fictional demo brand — nothing here is for sale.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setCreditsOpen(true)}
              className="text-xs font-bold uppercase tracking-wide text-fizz-cream/70 underline underline-offset-4 transition-colors hover:text-fizz-lime"
            >
              Image credits
            </button>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
              className="inline-flex size-11 items-center justify-center rounded-full bg-fizz-yellow text-fizz-charcoal transition-transform hover:scale-110"
              aria-label="Back to top"
            >
              <ArrowUp className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <CreditsModal open={creditsOpen} onClose={() => setCreditsOpen(false)} />
    </footer>
  )
}
