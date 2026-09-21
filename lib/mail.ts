import nodemailer from 'nodemailer'

interface SendMailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export function getTransporter() {
  const user = process.env.SMTP_EMAIL || process.env.GMAIL_USER
  const pass = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    return null
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  })
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
  const smtpEmail = process.env.SMTP_EMAIL || process.env.GMAIL_USER
  if (smtpEmail) {
    const trimmed = smtpEmail.trim()
    if (trimmed && !emails.includes(trimmed)) {
      emails.push(trimmed)
    }
  }

  return emails
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendMailOptions) {
  try {
    const transporter = getTransporter()
    if (!transporter) {
      console.warn('⚠️ [Mail Service] SMTP_EMAIL or SMTP_PASSWORD is not set in .env. Email skipped.')
      return { success: false, error: 'Email configuration missing in .env' }
    }

    const fromEmail = process.env.SMTP_EMAIL || process.env.GMAIL_USER
    const fromName = process.env.SMTP_FROM_NAME || 'Travel Tribes'

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      replyTo: replyTo || fromEmail,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, ''),
    })

    console.log('✅ [Mail Service] Email sent successfully to:', to, 'MessageId:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('❌ [Mail Service] Error sending email:', error?.message || error)
    return { success: false, error: error?.message || 'Failed to send email' }
  }
}
