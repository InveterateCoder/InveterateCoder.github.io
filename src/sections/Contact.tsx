import { useState, type FormEvent } from 'react'
import { Check, Mail, MapPin, Phone, Send } from 'lucide-react'
import { site } from '@/data/site'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { submitContact } from '@/lib/web3forms'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputCls =
  'w-full rounded-xl border border-white/10 bg-void/50 px-4 py-3 text-sm text-ink placeholder:text-faint outline-none transition-colors focus:border-cyan/60'

export function Contact() {
  const configured = !site.web3formsKey.includes('TODO')
  const locationSet = !site.location.includes('TODO')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!configured) return
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    setError('')
    const res = await submitContact(site.web3formsKey, {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      botcheck: String(data.get('botcheck') ?? ''),
    })
    if (res.success) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
      setError(res.message || 'Something went wrong — please email me directly.')
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        index="07"
        eyebrow="Contact"
        title="Let's talk"
        subtitle="Hiring for Go or backend? Building something interesting? I'd love to hear about it."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="flex flex-col gap-6">
          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-muted transition-colors hover:text-cyan"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cyan">
                <Mail size={16} />
              </span>
              {site.email}
            </a>
            {locationSet && (
              <div className="flex items-center gap-3 text-muted">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cyan">
                  <MapPin size={16} />
                </span>
                {site.location}
              </div>
            )}
            {site.phone && (
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 text-muted transition-colors hover:text-cyan"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cyan">
                  <Phone size={16} />
                </span>
                {site.phone}
              </a>
            )}
          </div>
          <SocialLinks links={site.socials} />
        </Reveal>

        <Reveal delay={0.1}>
          {status === 'success' ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-lime/30 bg-lime/5 p-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime/15 text-lime">
                <Check size={24} />
              </span>
              <h3 className="text-lg font-semibold text-ink">Message sent!</h3>
              <p className="text-sm text-muted">Thanks for reaching out — I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-surface/60 p-6 backdrop-blur-md"
            >
              {/* Web3Forms honeypot — hidden from humans, catches bots. */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Your name" className={inputCls} />
                <input name="email" type="email" required placeholder="Email" className={inputCls} />
              </div>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className={inputCls}
              />

              {!configured && (
                <p className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-xs text-amber-200/80">
                  The contact form isn&apos;t wired up yet — email me directly in the meantime.
                </p>
              )}
              {status === 'error' && <p className="text-sm text-magenta">{error}</p>}

              {configured ? (
                <Button type="submit" disabled={status === 'sending'} className="self-start">
                  {status === 'sending' ? (
                    'Sending…'
                  ) : (
                    <>
                      Send message
                      <Send size={15} />
                    </>
                  )}
                </Button>
              ) : (
                <Button href={`mailto:${site.email}`} className="self-start">
                  Email me
                  <Mail size={15} />
                </Button>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  )
}
