import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, onceViewport } from '../../motion/variants'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeading({ eyebrow, title, sub, align = 'center', dark = false }: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={onceViewport}
      className={`flex max-w-3xl flex-col gap-4 ${alignCls}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] ${
            dark ? 'bg-fizz-lime text-fizz-charcoal' : 'bg-fizz-charcoal text-fizz-yellow'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-4xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl ${
          dark ? 'text-fizz-cream' : 'text-fizz-charcoal'
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p className={`max-w-xl text-base sm:text-lg ${dark ? 'text-fizz-cream/75' : 'text-ink-soft'}`}>
          {sub}
        </p>
      )}
    </motion.div>
  )
}
