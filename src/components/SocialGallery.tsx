import { motion } from 'motion/react'
import { Camera, ExternalLink } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { SOCIAL_TILES } from '../data/socialTiles'
import { GALLERY_SOCIAL_LINK } from '../data/siteConfig'
import { DrinkCup } from './illustrations/DrinkCup'
import { onceViewport, staggerContainer, staggerItem } from '../motion/variants'

export function SocialGallery() {
  return (
    <section id="social" className="bg-fizz-cream py-20 lg:py-28" aria-label="Fizzora brand gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Fizzora in the wild"
          title={
            <>
              Spread the <span className="text-fizz-pink">fizz.</span>
            </>
          }
          sub="Brand imagery from the Fizzora studio — drinks, snacks and fizzy moments."
        />

        <motion.ul
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
        >
          {SOCIAL_TILES.map((tile) => (
            <motion.li key={tile.id} variants={staggerItem}>
              <a
                href={GALLERY_SOCIAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-[1.75rem] shadow-card focus-visible:outline-fizz-charcoal"
                aria-label={`${tile.caption} — view on Instagram (opens in a new tab)`}
              >
                <div className="absolute inset-0" style={{ backgroundColor: tile.bg }} />
                <div
                  className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-blob opacity-70"
                  style={{ backgroundColor: tile.blob }}
                />
                <DrinkCup
                  art={{
                    layers: tile.layers,
                    foam: tile.foam,
                    straw: '#191719',
                    garnish: tile.garnish,
                    blob: tile.blob,
                  }}
                  shadow={false}
                  className="absolute left-1/2 top-1/2 h-[86%] w-auto -translate-x-1/2 -translate-y-[46%] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-fizz-charcoal/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <p className="text-sm font-bold text-fizz-cream">{tile.caption}</p>
                  <ExternalLink className="size-4 shrink-0 text-fizz-yellow" aria-hidden="true" />
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
          <Camera className="size-4" aria-hidden="true" />
          Fizzora brand imagery — not customer posts
        </p>
      </div>
    </section>
  )
}
