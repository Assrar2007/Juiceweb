import type { FormKind, SubmitResult } from '../types'

/**
 * Single submission adapter for every form on the site.
 *
 * There is no backend wired up, so every submission resolves as a "demo":
 * the UI must say plainly that nothing was actually sent. To connect a real
 * backend later, replace the body of this function (or swap in a fetch call
 * per `kind`) and return `{ status: 'sent' }` on success.
 */
export async function submitForm(
  kind: FormKind,
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  // Simulate a short network round-trip so loading states are visible.
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[fizzora demo] submitForm(${kind})`, payload)
  }

  const messages: Record<FormKind, string> = {
    event:
      'Demo received — this inquiry was NOT actually sent. Connect a backend in lib/submitForm.ts to make it real.',
    newsletter:
      'Demo subscription — no email was collected or sent. Connect a backend in lib/submitForm.ts to make it real.',
    club: 'Demo signup — no account was created. Membership lives only in this browser.',
  }

  return { status: 'demo', message: messages[kind] }
}
