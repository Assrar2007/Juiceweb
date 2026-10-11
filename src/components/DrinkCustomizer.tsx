import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { RotateCcw, ShoppingBag } from 'lucide-react'
import { SectionHeading } from './ui/SectionHeading'
import { DrinkCup } from './illustrations/DrinkCup'
import {
  BASES,
  CREAMS,
  DEFAULT_SELECTIONS,
  FRUITS,
  SIZES,
  SYRUPS,
  findOption,
} from '../data/customizer'
import type { CupSize, CustomizerOption, DrinkArtSpec, GarnishKind } from '../types'
import { useStore } from '../context/StoreContext'
import { formatCents } from '../lib/format'
import { onceViewport, fadeUp } from '../motion/variants'

const STRAW_COLORS = ['#F46BCE', '#191719', '#A78BFA', '#C7F464', '#F5E642']

const FRUIT_TO_GARNISH: Record<string, GarnishKind> = {
  none: 'none',
  lime: 'lime',
  cherry: 'cherry',
  strawberry: 'strawberry',
  pineapple: 'pineapple',
}

function OptionGroup({
  label,
  options,
  selected,
  onSelect,
  groupId,
}: {
  label: string
  options: CustomizerOption[]
  selected: string
  onSelect: (id: string) => void
  groupId: string
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-xs font-black uppercase tracking-[0.2em] text-ink-soft">
        {label}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={label} id={groupId}>
        {options.map((option) => {
          const active = option.id === selected
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-pressed={active}
              className={`relative min-h-11 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                active
                  ? 'text-fizz-charcoal'
                  : 'bg-white/70 text-ink-soft hover:bg-white hover:text-fizz-charcoal'
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`${groupId}-chip`}
                  className="absolute inset-0 rounded-full bg-fizz-charcoal shadow-card"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className={`relative ${active ? 'text-fizz-yellow' : ''}`}>
                {option.label}
                {option.price > 0 && (
                  <span className={`ml-1.5 text-xs ${active ? 'text-fizz-lime' : 'text-ink-soft'}`}>
                    +{formatCents(option.price)}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function DrinkCustomizer() {
  const { addToCart } = useStore()
  const [base, setBase] = useState<string>(DEFAULT_SELECTIONS.base)
  const [syrup, setSyrup] = useState<string>(DEFAULT_SELECTIONS.syrup)
  const [cream, setCream] = useState<string>(DEFAULT_SELECTIONS.cream)
  const [fruit, setFruit] = useState<string>(DEFAULT_SELECTIONS.fruit)
  const [size, setSize] = useState<CupSize>(DEFAULT_SELECTIONS.size)

  const baseOpt = findOption(BASES, base) ?? BASES[0]
  const syrupOpt = findOption(SYRUPS, syrup) ?? SYRUPS[0]
  const creamOpt = findOption(CREAMS, cream) ?? CREAMS[0]
  const sizeOpt = SIZES.find((s) => s.id === size) ?? SIZES[1]

  const price = baseOpt.price + syrupOpt.price + creamOpt.price + (findOption(FRUITS, fruit)?.price ?? 0) + sizeOpt.price

  const art: DrinkArtSpec = useMemo(() => {
    const syrupColor = syrupOpt.colors?.[0] ?? '#F46BCE'
    const baseColor = baseOpt.colors?.[0] ?? '#37A6F0'
    const syrupIdx = SYRUPS.findIndex((s) => s.id === syrup)
    return {
      layers: [syrupColor, baseColor],
      foam: creamOpt.colors?.[0],
      straw: STRAW_COLORS[syrupIdx % STRAW_COLORS.length],
      garnish: FRUIT_TO_GARNISH[fruit] ?? 'none',
      blob: '#F5E642',
    }
  }, [baseOpt, syrupOpt, creamOpt, fruit, syrup])

  const name = `${syrupOpt.label} ${baseOpt.label}`

  const reset = () => {
    setBase(DEFAULT_SELECTIONS.base)
    setSyrup(DEFAULT_SELECTIONS.syrup)
    setCream(DEFAULT_SELECTIONS.cream)
    setFruit(DEFAULT_SELECTIONS.fruit)
    setSize(DEFAULT_SELECTIONS.size)
  }

  return (
    <section id="customizer" className="relative overflow-hidden bg-fizz-lavender py-20 lg:py-28" aria-label="Drink customizer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Build your own"
          title={
            <>
              Make it your <span className="italic text-fizz-charcoal">kind of fizz.</span>
            </>
          }
          sub="Choose a base, stack flavors, top it with cream or cold foam. Watch your cup update live."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={onceViewport}
          className="mt-12 grid gap-10 rounded-[2.5rem] bg-fizz-cream p-6 shadow-card sm:p-10 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* Controls */}
          <div>
            <OptionGroup label="1 · Soda base" options={BASES} selected={base} onSelect={setBase} groupId="custom-base" />
            <OptionGroup label="2 · Flavor syrup" options={SYRUPS} selected={syrup} onSelect={setSyrup} groupId="custom-syrup" />
            <OptionGroup label="3 · Cream & foam" options={CREAMS} selected={cream} onSelect={setCream} groupId="custom-cream" />
            <OptionGroup label="4 · Fresh fruit" options={FRUITS} selected={fruit} onSelect={setFruit} groupId="custom-fruit" />

            <fieldset className="mt-6">
              <legend className="text-xs font-black uppercase tracking-[0.2em] text-ink-soft">5 · Cup size</legend>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Cup size">
                {SIZES.map((s) => {
                  const active = s.id === size
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id)}
                      aria-pressed={active}
                      className={`relative min-h-11 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                        active ? 'text-fizz-charcoal' : 'bg-white/70 text-ink-soft hover:bg-white hover:text-fizz-charcoal'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="custom-size-chip"
                          className="absolute inset-0 rounded-full bg-fizz-charcoal shadow-card"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className={`relative ${active ? 'text-fizz-yellow' : ''}`}>
                        {s.label} <span className="text-xs opacity-70">{s.oz}</span>
                        {s.price > 0 && <span className={`ml-1.5 text-xs ${active ? 'text-fizz-lime' : 'text-ink-soft'}`}>+{formatCents(s.price)}</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>

          {/* Live preview */}
          <div className="relative flex flex-col items-center rounded-[2rem] bg-fizz-pink/25 p-6 sm:p-8">
            <div className="w-48 sm:w-56">
              <DrinkCup art={art} className="w-full" />
            </div>
            <p className="mt-4 text-center font-display text-2xl uppercase leading-tight text-fizz-charcoal">
              {name}
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              {sizeOpt.label} · {sizeOpt.oz}
              {creamOpt.id !== 'none' && ` · ${creamOpt.label}`}
              {fruit !== 'none' && ` · ${findOption(FRUITS, fruit)?.label}`}
            </p>
            <p className="mt-4 font-display text-4xl text-fizz-charcoal">{formatCents(price)}</p>
            <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    kind: 'custom',
                    refId: 'custom-drink',
                    name,
                    detail: `${sizeOpt.label} ${sizeOpt.oz}${creamOpt.id !== 'none' ? `, ${creamOpt.label.toLowerCase()}` : ''}${fruit !== 'none' ? `, ${findOption(FRUITS, fruit)?.label.toLowerCase()}` : ''}`,
                    unitPrice: price,
                    categories: ['drink'],
                    art,
                    meta: {
                      size,
                      hasFoam: cream === 'cold-foam',
                      hasCream: cream === 'splash' || cream === 'coconut-cream',
                    },
                  })
                }
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-fizz-charcoal px-6 py-3 text-sm font-bold uppercase tracking-wider text-fizz-yellow transition-transform hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="size-4" aria-hidden="true" />
                Add to cart
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-fizz-charcoal/20 px-5 py-3 text-sm font-bold uppercase tracking-wide text-fizz-charcoal transition-colors hover:border-fizz-charcoal"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
