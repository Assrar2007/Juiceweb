/** Format integer cents as a USD string. Only call at display time. */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? '-' : ''
  const abs = Math.abs(Math.round(cents))
  return `${sign}$${(abs / 100).toFixed(2)}`
}

/** Compact variant without trailing zeros for big display type ($6 vs $6.00). */
export function formatCentsCompact(cents: number): string {
  const abs = Math.abs(Math.round(cents))
  if (abs % 100 === 0) return `$${abs / 100}`
  return formatCents(cents)
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
