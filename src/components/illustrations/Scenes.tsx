/**
 * Original scene illustrations: the Fizz Lab shop front for "Our story"
 * and supporting decorative pieces. All drawn in code.
 */

export function ShopScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="Illustration of the Fizzora soda bar: a striped awning, a counter with three colorful dirty sodas, and drifting bubbles." focusable="false">
      {/* backdrop */}
      <rect x="0" y="0" width="560" height="420" rx="36" fill="#F46BCE" />
      <circle cx="470" cy="80" r="60" fill="#F5E642" opacity="0.9" />
      <circle cx="90" cy="330" r="44" fill="#A78BFA" opacity="0.85" />

      {/* shop wall */}
      <rect x="60" y="120" width="440" height="240" rx="22" fill="#FFF7E8" />

      {/* awning */}
      <path d="M40 128 L520 128 L488 68 L72 68 Z" fill="#191719" />
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d={`M${72 + i * 52} 128 L${72 + i * 52 + 52} 128 L${72 + i * 52 + 40} 92 L${72 + i * 52 + 12} 92 Z`}
            fill={i % 2 === 0 ? '#F5E642' : '#FFF7E8'}
          />
        ))}
      </g>
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d={`M${72 + i * 52} 128 q 26 22 52 0 Z`}
            fill={i % 2 === 0 ? '#F5E642' : '#FFF7E8'}
          />
        ))}
      </g>

      {/* sign */}
      <rect x="200" y="150" width="160" height="44" rx="22" fill="#191719" />
      <text x="280" y="179" textAnchor="middle" fontSize="24" fill="#F5E642" fontFamily="Anton, sans-serif" letterSpacing="2">
        FIZZORA
      </text>

      {/* counter */}
      <rect x="84" y="280" width="392" height="80" rx="16" fill="#A78BFA" />
      <rect x="84" y="280" width="392" height="18" rx="9" fill="#C7F464" />

      {/* three cups on the counter */}
      <g transform="translate(150 208) scale(0.42)">
        <path d="M20 30 L34 150 Q 36 162 48 162 L92 162 Q 104 162 106 150 L120 30 Z" fill="#ffffff" opacity="0.75" />
        <path d="M26 44 L36 148 L104 148 L114 44 Z" fill="#E0455A" />
        <path d="M26 44 L30 86 L110 86 L114 44 Z" fill="#FFB18C" />
        <rect x="78" y="-14" width="10" height="70" rx="5" fill="#191719" transform="rotate(10 83 20)" />
        <ellipse cx="70" cy="30" rx="52" ry="8" fill="#ffffff" opacity="0.8" />
      </g>
      <g transform="translate(252 196) scale(0.46)">
        <path d="M20 30 L34 150 Q 36 162 48 162 L92 162 Q 104 162 106 150 L120 30 Z" fill="#ffffff" opacity="0.75" />
        <path d="M26 44 L36 148 L104 148 L114 44 Z" fill="#2D9BE8" />
        <path d="M26 44 L30 86 L110 86 L114 44 Z" fill="#C7F464" />
        <path d="M22 30 Q 34 6 58 14 Q 70 -2 88 10 Q 108 4 116 30 Z" fill="#FFFDF4" />
        <ellipse cx="70" cy="30" rx="52" ry="8" fill="#ffffff" opacity="0.8" />
      </g>
      <g transform="translate(352 208) scale(0.42)">
        <path d="M20 30 L34 150 Q 36 162 48 162 L92 162 Q 104 162 106 150 L120 30 Z" fill="#ffffff" opacity="0.75" />
        <path d="M26 44 L36 148 L104 148 L114 44 Z" fill="#F07818" />
        <path d="M26 44 L30 86 L110 86 L114 44 Z" fill="#FFC96B" />
        <rect x="78" y="-14" width="10" height="70" rx="5" fill="#A78BFA" transform="rotate(10 83 20)" />
        <ellipse cx="70" cy="30" rx="52" ry="8" fill="#ffffff" opacity="0.8" />
      </g>

      {/* bubbles */}
      <g fill="#FFF7E8" opacity="0.9">
        <circle cx="120" cy="70" r="6" />
        <circle cx="452" cy="190" r="7" />
        <circle cx="104" cy="220" r="5" />
        <circle cx="488" cy="300" r="6" />
        <circle cx="280" cy="396" r="5" />
      </g>
    </svg>
  )
}

/** Organic blob used behind cups and tiles. */
export function Blob({ color, className }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <path
        d="M46.5,-64.3C60.2,-54.9,71.1,-41.3,76.7,-25.7C82.3,-10.1,82.6,7.5,77.1,22.5C71.6,37.5,60.4,49.9,46.7,58.9C33,67.9,16.5,73.5,0.3,73.1C-15.9,72.7,-31.8,66.3,-44.7,56.3C-57.6,46.3,-67.5,32.7,-72.2,17.2C-76.9,1.7,-76.4,-15.7,-69.6,-29.9C-62.8,-44.1,-49.7,-55.1,-35.6,-63.7C-21.5,-72.3,-6.4,-78.5,4.1,-84.2C14.6,-89.9,32.8,-73.7,46.5,-64.3Z"
        transform="translate(100 100)"
        fill={color}
      />
    </svg>
  )
}
