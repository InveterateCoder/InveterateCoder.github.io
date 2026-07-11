import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { ContactKind } from '@/data/types'
import { contacts, site } from '@/data/site'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { TelegramIcon, WhatsappIcon } from '@/components/ui/icons'
import { isTodo } from '@/lib/content'

function ContactGlyph({ kind }: { kind: ContactKind }) {
  switch (kind) {
    case 'email':
      return <Mail size={18} />
    case 'phone':
      return <Phone size={18} />
    case 'telegram':
      return <TelegramIcon size={18} />
    case 'whatsapp':
      return <WhatsappIcon size={18} />
    case 'max':
      return <MessageCircle size={18} />
  }
}

export function Contact() {
  const locationSet = !isTodo(site.location)

  return (
    <Section id="contact">
      <SectionHeading
        index="07"
        eyebrow="Contact"
        title="Let's talk"
        subtitle="I'd love to try myself in a Go role — but I'm equally at home in Node.js, and I won't turn down anything genuinely interesting. With my team (Claude & Codex), I pick up new ground fast."
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col gap-6">
          <p className="text-lg text-muted">
            Pick whatever&apos;s easiest — I&apos;m quick to reply on Telegram and WhatsApp.
          </p>
          {locationSet && (
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cyan">
                <MapPin size={16} />
              </span>
              {site.location}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-3 sm:grid-cols-2">
            {contacts.map((c) => {
              const isHttp = c.href.startsWith('http')
              return (
                <a
                  key={c.kind}
                  href={c.href}
                  {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-surface/50 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-surface/70"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan transition-colors group-hover:border-cyan/60">
                    <ContactGlyph kind={c.kind} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{c.label}</span>
                    {c.hint && <span className="block truncate text-xs text-faint">{c.hint}</span>}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto shrink-0 text-faint opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
