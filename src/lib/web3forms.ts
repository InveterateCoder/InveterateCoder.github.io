export interface ContactPayload {
  name: string
  email: string
  message: string
  /** Honeypot — must stay empty for real humans. */
  botcheck?: string
}

export interface SubmitResult {
  success: boolean
  message: string
}

/**
 * Submit the contact form directly to the Web3Forms API — no backend needed,
 * which is exactly what a static GitHub Pages site requires. The access key is
 * a public client key (safe to ship); spam is handled by the honeypot + Web3Forms.
 */
export async function submitContact(
  accessKey: string,
  payload: ContactPayload,
): Promise<SubmitResult> {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'New message from your portfolio',
        from_name: payload.name,
        name: payload.name,
        email: payload.email,
        message: payload.message,
        botcheck: payload.botcheck ?? '',
      }),
    })
    const data = (await res.json()) as { success?: boolean; message?: string }
    return { success: Boolean(data.success), message: data.message ?? '' }
  } catch {
    return { success: false, message: 'Network error — please email me directly.' }
  }
}
