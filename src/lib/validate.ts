const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) return 'Please tell us your name.'
  if (trimmed.length < 2) return 'Name should be at least 2 characters.'
  return null
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) return 'Please enter your email address.'
  if (!EMAIL_RE.test(trimmed)) return 'That email address does not look right.'
  return null
}

/** Returns an error string, or null when the date is today or later. */
export function validateEventDate(isoDate: string): string | null {
  if (!isoDate) return 'Please pick an event date.'
  const picked = new Date(`${isoDate}T23:59:59`)
  if (Number.isNaN(picked.getTime())) return 'Please pick a valid date.'
  const now = new Date()
  if (picked.getTime() < now.getTime()) return 'Event date cannot be in the past.'
  return null
}

export function validateGuestCount(value: string): string | null {
  if (!value.trim()) return 'How many guests are you expecting?'
  const n = Number(value)
  if (!Number.isInteger(n)) return 'Guest count must be a whole number.'
  if (n <= 0) return 'Guest count must be at least 1.'
  if (n > 10000) return 'For very large events, email us directly.'
  return null
}
