import type { ReactElement } from 'react'
import type { SnackArtKind } from '../../types'

/**
 * Original stylised snack illustrations — one per snack card.
 * No branded packaging is depicted anywhere.
 */

function CandyArt() {
  return (
    <g>
      {/* wrapped hard candies */}
      <g transform="translate(28 66) rotate(-14)">
        <path d="M-16 10 L-28 2 L-26 20 Z" fill="#F46BCE" />
        <path d="M56 10 L68 2 L66 20 Z" fill="#F46BCE" />
        <rect x="-14" y="0" width="68" height="22" rx="11" fill="#FF8FD8" />
        <circle cx="8" cy="11" r="4" fill="#FFF7E8" opacity="0.8" />
        <circle cx="32" cy="11" r="4" fill="#A78BFA" />
      </g>
      <g transform="translate(96 96) rotate(9)">
        <path d="M-16 10 L-28 2 L-26 20 Z" fill="#8FE06A" />
        <path d="M56 10 L68 2 L66 20 Z" fill="#8FE06A" />
        <rect x="-14" y="0" width="68" height="22" rx="11" fill="#C7F464" />
        <circle cx="12" cy="11" r="4" fill="#191719" opacity="0.7" />
        <circle cx="34" cy="11" r="4" fill="#FFF7E8" opacity="0.9" />
      </g>
      <g transform="translate(58 34) rotate(22)">
        <path d="M-13 8 L-23 2 L-21 16 Z" fill="#F5E642" />
        <path d="M45 8 L55 2 L53 16 Z" fill="#F5E642" />
        <rect x="-11" y="0" width="54" height="18" rx="9" fill="#FFD93D" />
        <circle cx="16" cy="9" r="3.4" fill="#F46BCE" />
      </g>
      <circle cx="150" cy="42" r="5" fill="#A78BFA" />
      <circle cx="26" cy="36" r="4" fill="#F46BCE" />
    </g>
  )
}

function ChipsArt() {
  return (
    <g>
      {/* open bag */}
      <path d="M46 52 L110 52 L104 132 Q 78 140 52 132 Z" fill="#F5E642" />
      <path d="M46 52 L110 52 L108 74 L48 74 Z" fill="#E8C81A" />
      <path d="M46 52 L52 40 L60 52 L68 40 L76 52 L84 40 L92 52 L100 40 L106 52" fill="none" stroke="#E8C81A" strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="78" cy="98" rx="20" ry="14" fill="#191719" opacity="0.85" />
      <text x="78" y="103" textAnchor="middle" fontSize="14" fill="#F5E642" fontWeight="700" fontFamily="sans-serif">!</text>
      {/* chips popping out */}
      <g>
        <path d="M58 44 Q 52 26 66 24 Q 74 34 66 46 Z" fill="#FFC96B" />
        <path d="M78 40 Q 78 18 94 22 Q 98 34 86 44 Z" fill="#FFB13D" />
        <path d="M96 46 Q 104 28 116 36 Q 114 48 102 52 Z" fill="#FFC96B" />
      </g>
      <circle cx="30" cy="76" r="5" fill="#F46BCE" />
      <circle cx="128" cy="64" r="4" fill="#A78BFA" />
    </g>
  )
}

function MangoArt() {
  return (
    <g>
      {/* dried mango pieces */}
      <path d="M30 92 Q 36 70 58 74 Q 66 92 50 104 Q 34 106 30 92 Z" fill="#FFB13D" />
      <path d="M64 84 Q 74 62 96 70 Q 100 90 84 98 Q 68 100 64 84 Z" fill="#FF9E2C" />
      <path d="M96 96 Q 108 80 128 90 Q 130 108 112 112 Q 98 110 96 96 Z" fill="#FFC96B" />
      <path d="M52 52 Q 62 34 82 42 Q 86 60 68 66 Q 54 64 52 52 Z" fill="#FFB13D" />
      {/* chili-lime dust */}
      <g fill="#E0455A">
        <circle cx="44" cy="64" r="3" />
        <circle cx="92" cy="56" r="2.6" />
        <circle cx="120" cy="76" r="3" />
      </g>
      <g fill="#C7F464">
        <circle cx="60" cy="116" r="3.4" />
        <circle cx="104" cy="44" r="2.8" />
        <circle cx="30" cy="70" r="2.4" />
      </g>
      <path d="M118 40 q 10 -8 20 -4" stroke="#8CC63F" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  )
}

function ChocolateArt() {
  return (
    <g>
      {/* chocolate moon rocks with pistachio */}
      <path d="M40 96 Q 34 68 62 62 Q 88 60 92 86 Q 92 108 66 110 Q 46 110 40 96 Z" fill="#5C3A28" />
      <circle cx="58" cy="82" r="5" fill="#3E2517" />
      <circle cx="76" cy="94" r="4" fill="#3E2517" />
      <path d="M96 66 Q 96 46 118 48 Q 136 52 132 72 Q 128 88 108 86 Q 96 82 96 66 Z" fill="#6B4632" />
      <circle cx="114" cy="66" r="4.4" fill="#4A2E1E" />
      {/* pistachios */}
      <g transform="translate(108 104) rotate(-16)">
        <ellipse cx="0" cy="0" rx="16" ry="11" fill="#EFE3C8" />
        <path d="M-12 -2 Q 0 -10 12 -2 Q 0 6 -12 -2 Z" fill="#8CC63F" />
      </g>
      <g transform="translate(46 44) rotate(18)">
        <ellipse cx="0" cy="0" rx="13" ry="9" fill="#EFE3C8" />
        <path d="M-9 -1.5 Q 0 -8 9 -1.5 Q 0 4.5 -9 -1.5 Z" fill="#A9D977" />
      </g>
      {/* moon */}
      <circle cx="134" cy="30" r="12" fill="#FFF7E8" />
      <circle cx="130" cy="27" r="2.6" fill="#E8D9BC" />
      <circle cx="138" cy="34" r="2" fill="#E8D9BC" />
    </g>
  )
}

function SpicyArt() {
  return (
    <g>
      {/* fiery crackers */}
      <path d="M34 106 L64 62 L88 106 Z" fill="#E86A3A" />
      <path d="M70 108 L100 66 L124 108 Z" fill="#D94F2B" />
      <path d="M52 74 L76 40 L96 74 Z" fill="#F08A3C" />
      <g fill="#FFE08A">
        <circle cx="58" cy="94" r="2.6" />
        <circle cx="94" cy="94" r="2.6" />
        <circle cx="74" cy="62" r="2.6" />
      </g>
      {/* flames */}
      <path d="M120 52 Q 116 38 126 30 Q 124 42 132 44 Q 138 34 136 26 Q 146 36 142 50 Q 138 60 128 60 Q 120 58 120 52 Z" fill="#F5A623" />
      <path d="M126 50 Q 126 42 131 38 Q 132 46 136 48 Q 136 54 130 54 Q 126 54 126 50 Z" fill="#E0455A" />
      {/* chili */}
      <path d="M30 46 Q 26 62 40 68 Q 52 70 54 60 Q 44 60 40 52 Q 38 46 34 42 Z" fill="#E0455A" />
      <path d="M33 43 q -2 -8 6 -10" stroke="#4C9A3F" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  )
}

function GummyArt() {
  return (
    <g>
      {/* gummy planets */}
      <circle cx="54" cy="62" r="24" fill="#A78BFA" />
      <circle cx="54" cy="62" r="24" fill="none" stroke="#8B6CF0" strokeWidth="4" strokeDasharray="4 9" />
      <circle cx="46" cy="54" r="6" fill="#ffffff" opacity="0.55" />
      <circle cx="110" cy="88" r="28" fill="#F46BCE" />
      <ellipse cx="110" cy="88" rx="42" ry="10" fill="none" stroke="#F5E642" strokeWidth="5" transform="rotate(-16 110 88)" />
      <circle cx="102" cy="79" r="6" fill="#ffffff" opacity="0.5" />
      <circle cx="132" cy="38" r="14" fill="#C7F464" />
      <circle cx="128" cy="34" r="3.6" fill="#ffffff" opacity="0.6" />
      {/* stars */}
      <g fill="#F5E642">
        <path d="M30 108 l 3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" />
        <path d="M146 64 l 2.4 5.4 5.4 2.4 -5.4 2.4 -2.4 5.4 -2.4 -5.4 -5.4 -2.4 5.4 -2.4 Z" />
      </g>
    </g>
  )
}

const ART: Record<SnackArtKind, () => ReactElement> = {
  candy: CandyArt,
  chips: ChipsArt,
  mango: MangoArt,
  chocolate: ChocolateArt,
  spicy: SpicyArt,
  gummy: GummyArt,
}

interface SnackArtProps {
  kind: SnackArtKind
  className?: string
  title?: string
}

export function SnackArt({ kind, className, title }: SnackArtProps) {
  const Inner = ART[kind]
  return (
    <svg viewBox="0 0 160 160" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} focusable="false">
      {title ? <title>{title}</title> : null}
      <Inner />
    </svg>
  )
}
