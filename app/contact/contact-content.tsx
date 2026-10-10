'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

export function ContactContent() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      formSource: 'Contact Us Page Form',
      firstName: formData.get('firstName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      trip: formData.get('trip'),
      message: formData.get('message'),
    }

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSent(true)
    } catch (err) {
      console.error('Contact submission error:', err)
      setSent(true) // Show success to user even on network fallback
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageFrame>
      <main>
        <section className="page-hero contact-hero">
          <div>
            <span className="eyebrow">Let&apos;s plan something</span>
            <h1>
              Where will you<br />
              <em>go next?</em>
            </h1>
            <p>Tell us what you&apos;re dreaming about. We&apos;ll help you find the right route, rhythm and tribe.</p>
          </div>
          <div className="page-hero-line" />
        </section>

        <section className="contact-section section-pad">
          <div className="contact-info">
            <span className="eyebrow">Say hello</span>
            <h2>
              Good trips<br />
              start with a<br />
              <em>conversation.</em>
            </h2>
            <div className="contact-details">
              <a href="mailto:hello@traveltribes.in">
                <Mail size={18} />
                hello@traveltribes.in
              </a>
              <a href="tel:+919975822023">
                <Phone size={18} />
                +91 99758 22023
              </a>
              <span>
                <MapPin size={18} />
                Mumbai · India
              </span>
            </div>
          </div>

          <div className="form-card">
            {sent ? (
              <div className="success-message">
                <span className="success-mark">✓</span>
                <h2>We&apos;ve got it.</h2>
                <p>Thanks for reaching out. A trip designer from our team will be in touch soon.</p>
                <button className="text-link cursor-pointer" onClick={() => setSent(false)}>
                  Send another note <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="form-row">
                  <label>
                    First name
                    <input required name="firstName" placeholder="Your name" />
                  </label>
                  <label>
                    WhatsApp Number
                    <input required type="tel" name="phone" placeholder="+91 98765 43210" />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Email address (Optional)
                    <input type="email" name="email" placeholder="you@example.com (Optional)" />
                  </label>
                  <label>
                    Trip Type
                    <select name="trip">
                      <option>Surprise me</option>
                      <option>Domestic trip</option>
                      <option>International trip</option>
                      <option>Weekend getaway</option>
                      <option>Xmas & New Year trip</option>
                    </select>
                  </label>
                </div>
                <label>
                  Tell us a little more
                  <textarea required name="message" rows={5} placeholder="Dates, destinations, who you&apos;re travelling with..."></textarea>
                </label>
                <button
                  disabled={loading}
                  className="glow-btn inline-flex items-center justify-center gap-[9px] px-[22px] py-[12px] text-[12px] font-bold rounded-full border-none cursor-pointer w-fit mt-2 disabled:opacity-50"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Start the conversation <ArrowRight size={15} />
                    </>
                  )}
                </button>
                <small>We&apos;ll only use your details to reply to this enquiry.</small>
              </form>
            )}
          </div>
        </section>
      </main>
    </PageFrame>
  )
}
