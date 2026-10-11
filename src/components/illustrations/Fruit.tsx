import type { ReactElement } from 'react'
import type { GarnishKind } from '../../types'

/**
 * Original fruit illustrations used across the site — floating hero art,
 * cup garnishes and section decoration. All shapes drawn in code.
 */

interface FruitProps {
  className?: string
  /** Explicit pixel size (used when nested inside another SVG). */
  size?: number
}

function FruitSvg({
  children,
  className,
  size,
}: FruitProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function LimeSlice(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <circle cx="24" cy="24" r="22" fill="#8CC63F" />
      <circle cx="24" cy="24" r="17" fill="#EAF7C8" />
      <g fill="#B8E94C">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path key={deg} d="M24 24 L24 9 A15 15 0 0 1 37 16 Z" transform={`rotate(${deg} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="3" fill="#EAF7C8" />
    </FruitSvg>
  )
}

export function OrangeSlice(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <circle cx="24" cy="24" r="22" fill="#F07818" />
      <circle cx="24" cy="24" r="17" fill="#FFE3B8" />
      <g fill="#FFA435">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path key={deg} d="M24 24 L24 9 A15 15 0 0 1 37 16 Z" transform={`rotate(${deg} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="3" fill="#FFE3B8" />
    </FruitSvg>
  )
}

export function Cherry(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <path d="M18 22 Q 20 8 30 5" fill="none" stroke="#4C7A2F" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 24 Q 32 10 30 5" fill="none" stroke="#4C7A2F" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="33" cy="7" rx="6" ry="3.4" fill="#6FA84A" transform="rotate(-18 33 7)" />
      <circle cx="16" cy="30" r="10.5" fill="#E0455A" />
      <circle cx="34" cy="32" r="11.5" fill="#C22B4C" />
      <circle cx="12.5" cy="26.5" r="3" fill="#ffffff" opacity="0.55" />
      <circle cx="30" cy="28" r="3.2" fill="#ffffff" opacity="0.5" />
    </FruitSvg>
  )
}

export function Strawberry(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <path
        d="M24 10 C 38 10 42 20 40 28 C 38 38 30 44 24 44 C 18 44 10 38 8 28 C 6 20 10 10 24 10 Z"
        fill="#E0455A"
      />
      <g fill="#FFE08A">
        <circle cx="17" cy="24" r="1.6" />
        <circle cx="24" cy="28" r="1.6" />
        <circle cx="31" cy="24" r="1.6" />
        <circle cx="20" cy="33" r="1.6" />
        <circle cx="28" cy="33" r="1.6" />
        <circle cx="24" cy="38" r="1.6" />
      </g>
      <g fill="#4C9A3F">
        <path d="M24 12 L18 5 L23 8 L24 2 L25 8 L30 5 Z" />
        <path d="M12 14 Q 18 8 24 12 Q 30 8 36 14 Q 30 17 24 14 Q 18 17 12 14 Z" />
      </g>
    </FruitSvg>
  )
}

export function Peach(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <circle cx="24" cy="27" r="18" fill="#FFB18C" />
      <path d="M24 9 C 21 16 21 38 24 45" stroke="#F0825D" strokeWidth="3" fill="none" opacity="0.7" />
      <circle cx="17" cy="22" r="4" fill="#FFD9BE" opacity="0.8" />
      <path d="M24 9 Q 26 3 32 3 Q 30 9 24 9 Z" fill="#6FA84A" />
      <ellipse cx="31" cy="7" rx="6" ry="3" fill="#8CC63F" transform="rotate(-24 31 7)" />
    </FruitSvg>
  )
}

export function PineappleWedge(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <path d="M6 40 L42 40 L38 10 Q 24 2 10 10 Z" fill="#F8C93E" />
      <path d="M10 10 Q 24 2 38 10 L 36.5 16 Q 24 9 11.5 16 Z" fill="#E8A61A" />
      <g stroke="#D98F14" strokeWidth="2" opacity="0.6">
        <path d="M14 22 L 34 22" />
        <path d="M13 29 L 35 29" />
        <path d="M12 35 L 36 35" />
      </g>
    </FruitSvg>
  )
}

export function BerriesCluster(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <circle cx="14" cy="28" r="9" fill="#5B2A86" />
      <circle cx="30" cy="24" r="10" fill="#B14AC4" />
      <circle cx="24" cy="37" r="8" fill="#E0455A" />
      <circle cx="11" cy="25" r="2.4" fill="#ffffff" opacity="0.5" />
      <circle cx="27" cy="20.5" r="2.6" fill="#ffffff" opacity="0.5" />
      <circle cx="21.5" cy="34.5" r="2" fill="#ffffff" opacity="0.5" />
      <path d="M30 12 q 2 -6 7 -7" stroke="#4C9A3F" strokeWidth="3" fill="none" strokeLinecap="round" />
    </FruitSvg>
  )
}

export function CoconutHalf(props: FruitProps) {
  return (
    <FruitSvg {...props}>
      <path d="M4 22 A 20 20 0 0 0 44 22 Z" fill="#6B4226" />
      <path d="M8 22 A 16 16 0 0 0 40 22 Z" fill="#FFF8EC" />
      <ellipse cx="24" cy="22" rx="20" ry="5.5" fill="#8A5A33" />
      <ellipse cx="24" cy="22" rx="16" ry="4" fill="#FFF8EC" />
    </FruitSvg>
  )
}

const FRUIT_COMPONENTS: Record<Exclude<GarnishKind, 'none'>, (p: FruitProps) => ReactElement> = {
  lime: LimeSlice,
  orange: OrangeSlice,
  cherry: Cherry,
  strawberry: Strawberry,
  peach: Peach,
  pineapple: PineappleWedge,
  berries: BerriesCluster,
  coconut: CoconutHalf,
}

interface GarnishProps {
  kind: GarnishKind
  /** Anchor point on the parent SVG (DrinkCup viewBox is 220x270). */
  x: number
  y: number
  scale?: number
}

/** Places a fruit on the rim of a `DrinkCup`. */
export function Garnish({ kind, x, y, scale = 1 }: GarnishProps) {
  if (kind === 'none') return null
  const Component = FRUIT_COMPONENTS[kind]
  const size = 46 * scale
  return (
    <svg
      x={x - size / 2}
      y={y - size * 0.78}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      transform={`rotate(14 ${x} ${y})`}
      aria-hidden="true"
      focusable="false"
    >
      <Component />
    </svg>
  )
}
