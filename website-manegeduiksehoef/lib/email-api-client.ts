// Email API Client voor externe email service
// Gebruikt de mailingsmpt-strato.vercel.app API

const EMAIL_API_URL = process.env.EMAIL_API_URL || 'https://mailingsmpt-strato.vercel.app'
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || 'manege-strato-email-2026-secure-key-99xtif26dpbjjnp9x4hzrh'

export interface SendEmailOptions {
  to: string
  subject: string
  htmlBody: string
  textBody?: string
}

export async function sendEmailViaAPI(options: SendEmailOptions) {
  try {
    const response = await fetch(`${EMAIL_API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': EMAIL_API_KEY,
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        htmlBody: options.htmlBody,
        textBody: options.textBody || options.htmlBody.replace(/<[^>]*>/g, ''),
      }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Email verzenden mislukt')
    }

    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error('Email API error:', error)
    throw error instanceof Error ? error : new Error('Email verzenden mislukt')
  }
}
