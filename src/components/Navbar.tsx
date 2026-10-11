import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, ShoppingBag, Sparkles, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/siteConfig'
import { useStore } from '../context/StoreContext'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { scrollToId } from '../lib/scroll'
import { getTier } from '../data/tiers'

export function FizzoraLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="19" fill="#F5E642" />
        <path d="M13 12 L16 31 Q 16.5 33 19 33 L21 33 Q 23.5 33 24 31 L27 12 Z" fill="#FFF7E8" />
        <path d="M14.5 15 L16.6 30 L23.4 30 L25.5 15 Z" fill="#F46BCE" />
        <path d="M14.5 15 L15.6 23 L24.4 23 L25.5 15 Z" fill="#A78BFA" />
        <rect x="23" y="4" width="3.4" height="14" rx="1.7" fill="#191719" transform="rotate(12 24 10)" />
        <circle cx="11" cy="9" r="2.2" fill="#ffffff" />
        <circle cx="31" cy="12" r="1.8" fill="#ffffff" />
      </svg>
      <span className="font-display text-2xl uppercase tracking-wide text-current">Fizzora</span>
    </span>
  )
}

const NAV_IDS = NAV_LINKS.map((l) => l.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setCartOpen, member } = useStore()
  const active = useScrollSpy(NAV_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const trapRef = useFocusTrap<HTMLDivElement>(menuOpen, () => setMenuOpen(false))

  const go = (id: string) => {
    setMenuOpen(false)
    // Wait one frame so the menu can unmount before scrolling.
    window.requestAnimationFrame(() => scrollToId(id))
  }

  const memberTier = member ? getTier(member.tierId) : null

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-fizz-charcoal px-4 py-2 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-fizz-yellow sm:text-xs">
          {SITE.announcement}
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-fizz-cream/95 shadow-card backdrop-blur-sm' : 'bg-fizz-cream'
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[72px]">
          <button
            type="button"
            onClick={() => go('home')}
            className="rounded-lg text-fizz-charcoal"
            aria-label="Fizzora — back to top"
          >
            <FizzoraLogo />
          </button>

          {memberTier && (
            <button
              type="button"
              onClick={() => go('fizz-club')}
              className="hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-fizz-charcoal md:inline-flex"
              style={{ backgroundColor: memberTier.accent }}
              title="Your Fizz Club membership"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              {memberTier.name}
            </button>
          )}

          {/* Desktop links */}
          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="relative">
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                    active === link.id
                      ? 'text-fizz-charcoal'
                      : 'text-ink-soft hover:text-fizz-charcoal'
                  }`}
                  aria-current={active === link.id ? 'true' : undefined}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-fizz-yellow"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-3">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex size-11 items-center justify-center rounded-full bg-fizz-lavender text-fizz-charcoal transition-transform hover:scale-105 active:scale-95"
              aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-fizz-pink text-[10px] font-black text-fizz-charcoal">
                  {count > 99 ? '99' : count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => go('drinks')}
              className="hidden min-h-11 items-center rounded-full bg-fizz-charcoal px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-fizz-yellow transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
            >
              Order now
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-fizz-charcoal text-fizz-cream lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-fizz-charcoal/60 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              ref={trapRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="ml-auto flex h-full w-[min(22rem,88vw)] flex-col bg-fizz-cream p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <FizzoraLogo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-fizz-charcoal text-fizz-cream"
                  aria-label="Close menu"
                  data-autofocus
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              {memberTier && (
                <p
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-fizz-charcoal"
                  style={{ backgroundColor: memberTier.accent }}
                >
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {memberTier.name} member
                </p>
              )}

              <ul className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      className="w-full rounded-2xl px-4 py-3 text-left font-display text-2xl uppercase text-fizz-charcoal transition-colors hover:bg-fizz-yellow"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  window.requestAnimationFrame(() => setCartOpen(true))
                }}
                className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-fizz-charcoal px-6 py-3 font-bold uppercase tracking-wide text-fizz-yellow"
              >
                <ShoppingBag className="size-5" aria-hidden="true" />
                Cart {count > 0 && `(${count})`}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
