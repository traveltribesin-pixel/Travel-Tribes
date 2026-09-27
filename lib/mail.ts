import nodemailer, { type Transporter } from 'nodemailer'

interface SendMailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

let cachedTransporter: Transporter | null = null

export function getTransporter(): Transporter | null {
  const user = (process.env.SMTP_EMAIL || process.env.GMAIL_USER || '').trim()
  const pass = (process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '')

  if (!user || !pass) {
    return null
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user,
        pass,
      },
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })
  }

  return cachedTransporter
}

/**
 * Returns all configured admin emails (both ADMIN_NOTIFICATION_EMAIL and SMTP_EMAIL, supporting multiple comma-separated emails)
 */
export function getAdminEmails(): string[] {
  const emails: string[] = []

  // 1. Add emails from ADMIN_NOTIFICATION_EMAIL (comma-separated supported)
  const adminConfig = process.env.ADMIN_NOTIFICATION_EMAIL
  if (adminConfig) {
    adminConfig.split(',').forEach((e) => {
      const trimmed = e.trim()
      if (trimmed && !emails.includes(trimmed)) {
        emails.push(trimmed)
      }
    })
  }

  // 2. Also add the sender SMTP_EMAIL if not already present
  const smtpEmail = (process.env.SMTP_EMAIL || process.env.GMAIL_USER || '').trim()
  if (smtpEmail && !emails.includes(smtpEmail)) {
    emails.push(smtpEmail)
  }

  return emails
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendMailOptions) {
  try {
    const transporter = getTransporter()
    if (!transporter) {
      console.warn('⚠️ [Mail Service] SMTP_EMAIL or SMTP_PASSWORD is not configured in .env. Email skipped.')
      return { success: false, error: 'Email configuration missing in .env' }
    }

    const fromEmail = (process.env.SMTP_EMAIL || process.env.GMAIL_USER || '').trim()
    const fromName = (process.env.SMTP_FROM_NAME || 'Travel Tribes').trim()

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      replyTo: replyTo || fromEmail,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, ''),
    })

    console.log('✅ [Mail Service] Email sent successfully to:', Array.isArray(to) ? to.join(', ') : to, '| MessageId:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('❌ [Mail Service] Error sending email to:', Array.isArray(to) ? to.join(', ') : to, '| Error:', error?.message || error)
    return { success: false, error: error?.message || 'Failed to send email' }
  }
}

