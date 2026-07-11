import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, MapPin, Phone, Printer } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { cleanList, isTodo } from '@/lib/content'

export function Resume() {
  const c = useContent()
  const locationSet = !isTodo(c.location)
  const socials = c.socials.filter((s) => !s.href.includes('TODO') && s.icon !== 'mail')

  return (
    <div className="min-h-screen bg-void">
      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-void/85 px-5 py-3 backdrop-blur">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan"
        >
          <ArrowLeft size={16} /> {c.resume.back}
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-void"
          >
            <Printer size={15} /> {c.resume.savePdf}
          </button>
        </div>
      </div>

      <article className="resume mx-auto max-w-3xl px-6 py-10">
        <header className="border-b border-white/10 pb-5">
          <h1 className="text-3xl font-bold text-ink">{c.name}</h1>
          <p className="accent mt-1 font-medium text-cyan">
            {c.role} · {c.resume.roleSuffix}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 hover:text-cyan">
              <Mail size={13} /> {c.email}
            </a>
            {locationSet && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} /> {c.location}
              </span>
            )}
            {c.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone size={13} /> {c.phone}
              </span>
            )}
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-cyan">
                {s.label}
              </a>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">{c.tagline}</p>
        </header>

        <section className="mt-6">
          <h2 className="accent mb-3 text-xs font-semibold tracking-widest text-cyan uppercase">
            {c.resume.experienceTitle}
          </h2>
          <div className="space-y-4">
            {c.experience.items.map((e) => (
              <div key={e.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-ink">
                    {e.role}
                    {!isTodo(e.company) && (
                      <span className="font-normal text-muted"> · {e.company}</span>
                    )}
                  </h3>
                  <span className="font-mono text-xs text-faint">{e.dateRange}</span>
                </div>
                {!isTodo(e.location) && <p className="text-xs text-faint">{e.location}</p>}
                <p className="mt-1 text-sm text-muted">{e.summary}</p>
                {e.highlights.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted">
                    {e.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
                {cleanList(e.stack).length > 0 && (
                  <p className="mt-1 font-mono text-xs text-faint">{cleanList(e.stack).join(' · ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="accent mb-3 text-xs font-semibold tracking-widest text-cyan uppercase">
            {c.resume.skillsTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.skills.groups.map((g) => (
              <div key={g.title}>
                <h3 className="text-sm font-semibold text-ink">{g.title}</h3>
                <p className="text-sm text-muted">{g.skills.map((s) => s.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="accent mb-3 text-xs font-semibold tracking-widest text-cyan uppercase">
            {c.resume.recognitionTitle}
          </h2>
          <ul className="list-disc space-y-0.5 pl-5 text-sm text-muted">
            {c.experience.recognitions.map((r) => (
              <li key={r.title}>{r.title}</li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
