import { useId } from 'react'
import type { DrinkArtSpec, GarnishKind } from '../../types'
import { Garnish } from './Fruit'

interface DrinkCupProps {
  art: DrinkArtSpec
  className?: string
  /** Hide the drop shadow (e.g. when floating on its own art). */
  shadow?: boolean
}

/**
 * Fizzora's reusable drink illustration: transparent cup, layered soda,
 * ice, optional cream/cold-foam cap, straw, garnish and condensation.
 * Every drink on the site is rendered from a `DrinkArtSpec`, so each one
 * is distinct, offline-safe and licence-free.
 */
export function DrinkCup({ art, className, shadow = true }: DrinkCupProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const clipId = `cup-clip-${uid}`
  const layers = art.layers

  // Vertical band for each liquid layer (bottom -> top).
  const liquidTop = 78
  const liquidBottom = 234
  const bandH = (liquidBottom - liquidTop) / layers.length

  return (
    <svg
      viewBox="0 0 220 270"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {shadow && (
        <ellipse cx="110" cy="252" rx="64" ry="12" fill="#191719" opacity="0.14" />
      )}

      <defs>
        <clipPath id={clipId}>
          {/* Inside of the cup */}
          <path d="M44 48 L62 224 Q64 236 78 236 L142 236 Q156 236 158 224 L176 48 Z" />
        </clipPath>
      </defs>

      {/* Straw behind the glass, sticking out the top */}
      <g transform="rotate(9 110 130)">
        <rect x="126" y="6" width="13" height="150" rx="6.5" fill={art.straw} />
        <rect x="126" y="6" width="13" height="150" rx="6.5" fill="#ffffff" opacity="0.14" />
      </g>

      {/* Glass body */}
      <path
        d="M40 44 L59 226 Q61.5 240 77 240 L143 240 Q158.5 240 161 226 L180 44 Z"
        fill="#ffffff"
        opacity="0.55"
      />

      {/* Liquid layers */}
      <g clipPath={`url(#${clipId})`}>
        {layers.map((color, i) => {
          // layers[0] is the bottom-most layer
          const fromBottom = layers.length - 1 - i
          const y = liquidTop + fromBottom * bandH
          return (
            <g key={i}>
              <rect x="40" y={y} width="140" height={bandH + 2} fill={color} />
              {/* soft wave on each boundary */}
              {i < layers.length - 1 && (
                <path
                  d={`M40 ${y} Q 75 ${y - 5} 110 ${y} T 180 ${y} L 180 ${y + 4} Q 145 ${y + 9} 110 ${y + 4} T 40 ${y + 4} Z`}
                  fill={color}
                  opacity="0.9"
                />
              )}
            </g>
          )
        })}

        {/* Rising bubbles inside the drink */}
        {[
          [70, 200, 4],
          [92, 160, 3],
          [118, 188, 5],
          [138, 140, 3.5],
          [84, 112, 3],
          [128, 100, 4],
          [104, 220, 3],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#ffffff" opacity="0.5" />
        ))}

        {/* Ice cubes */}
        <g opacity="0.85">
          <rect x="66" y="86" width="34" height="30" rx="8" fill="#ffffff" opacity="0.55" transform="rotate(-10 83 101)" />
          <rect x="112" y="82" width="38" height="32" rx="9" fill="#ffffff" opacity="0.48" transform="rotate(8 131 98)" />
          <rect x="90" y="104" width="30" height="27" rx="8" fill="#ffffff" opacity="0.4" transform="rotate(-4 105 117)" />
        </g>
      </g>

      {/* Glass outline + shine */}
      <path
        d="M40 44 L59 226 Q61.5 240 77 240 L143 240 Q158.5 240 161 226 L180 44"
        fill="none"
        stroke="#191719"
        strokeOpacity="0.35"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M58 62 L70 210" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" opacity="0.5" />

      {/* Rim */}
      <ellipse cx="110" cy="44" rx="70" ry="10" fill="#ffffff" opacity="0.75" />
      <ellipse cx="110" cy="44" rx="70" ry="10" fill="none" stroke="#191719" strokeOpacity="0.35" strokeWidth="4" />

      {/* Foam / cream cap */}
      {art.foam && (
        <g>
          <path
            d="M46 44
               Q 52 24 72 30
               Q 78 12 98 20
               Q 108 4 124 18
               Q 142 8 150 26
               Q 168 24 172 44 Z"
            fill={art.foam}
          />
          <path
            d="M46 44 Q 52 24 72 30 Q 78 12 98 20 Q 108 4 124 18 Q 142 8 150 26 Q 168 24 172 44 Z"
            fill="none"
            stroke="#191719"
            strokeOpacity="0.22"
            strokeWidth="3.5"
          />
          {/* drips over the rim */}
          <path d="M60 46 Q 62 62 68 64 Q 73 62 71 48 Z" fill={art.foam} />
          <path d="M150 46 Q 154 66 160 66 Q 165 63 161 47 Z" fill={art.foam} />
        </g>
      )}

      {/* Condensation */}
      <g fill="#ffffff" opacity="0.65">
        <circle cx="70" cy="150" r="3.4" />
        <circle cx="152" cy="180" r="2.6" />
        <circle cx="80" cy="200" r="2.2" />
        <circle cx="146" cy="120" r="2.8" />
        <path d="M156 140 q 2 12 -1 18" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* Garnish on the rim */}
      <Garnish kind={art.garnish as GarnishKind} x={168} y={40} />
    </svg>
  )
}
