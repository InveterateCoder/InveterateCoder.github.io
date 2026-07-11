import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { ContactKind } from '@/data/types'
import { useContent } from '@/hooks/useContent'
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
  const { contact, location } = useContent()
  const locationSet = !isTodo(location)

  return (
    <Section id="contact">
      <SectionHeading
        index="08"
        eyebrow={contact.eyebrow}
        title={contact.title}
        subtitle={contact.subtitle}
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col gap-6">
          <p className="text-lg text-muted">{contact.intro}</p>
          {locationSet && (
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cyan">
                <MapPin size={16} />
              </span>
              {location}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-3 sm:grid-cols-2">
            {contact.methods.map((m) => {
              const isHttp = m.href.startsWith('http')
              return (
                <a
                  key={m.kind}
                  href={m.href}
                  {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-surface/50 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-surface/70"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-cyan transition-colors group-hover:border-cyan/60">
                    <ContactGlyph kind={m.kind} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{m.label}</span>
                    {m.hint && <span className="block truncate text-xs text-faint">{m.hint}</span>}
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
