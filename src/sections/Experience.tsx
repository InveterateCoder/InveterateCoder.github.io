import { Award, FileText } from 'lucide-react'
import { experience, recognitions } from '@/data/experience'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { cleanList, isTodo } from '@/lib/content'

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Eleven years, shipping software"
        subtitle="From .NET desktop apps to modern Node/NestJS backends in production. The short version — the full résumé is one click away."
      />

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ol className="relative border-l border-white/10 pl-7 sm:pl-9">
          {experience.map((e) => (
            <li key={`${e.company}-${e.start}`} className="relative pb-10 last:pb-0">
              <span className="absolute top-1.5 left-[-7px] h-3.5 w-3.5 rounded-full bg-gradient-to-br from-cyan to-violet ring-4 ring-void" />
              <Reveal>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-cyan">
                    {e.start} — {e.end}
                  </span>
                  {e.current && <Tag accent>Current</Tag>}
                </div>
                <h3 className="mt-1.5 text-lg font-semibold text-ink">
                  {e.role}
                  {!isTodo(e.company) && <span className="font-normal text-muted"> · {e.company}</span>}
                </h3>
                {!isTodo(e.location) && <p className="text-sm text-muted">{e.location}</p>}
                <p className="mt-2 text-sm text-muted/90">{e.summary}</p>
                {e.highlights && (
                  <ul className="mt-2 space-y-1">
                    {e.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {cleanList(e.stack).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {cleanList(e.stack).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-6">
          <Reveal className="rounded-2xl border border-white/8 bg-surface/60 p-6 backdrop-blur-md">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-ink">
              <Award size={18} className="text-cyan" />
              Recognition
            </h3>
            <ul className="space-y-3">
              {recognitions.map((r) => (
                <li key={r.title}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-sm text-muted transition-colors hover:text-cyan"
                  >
                    <FileText size={15} className="mt-0.5 shrink-0 text-faint group-hover:text-cyan" />
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3 rounded-2xl border border-cyan/20 bg-gradient-to-br from-cyan/5 to-violet/5 p-6">
            <p className="text-sm text-muted">
              Want the whole picture? The full résumé opens in a clean, printable view — save it as
              PDF from there.
            </p>
            <Button to="/resume" variant="outline" size="sm" className="self-start">
              <FileText size={15} />
              View &amp; download résumé
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
