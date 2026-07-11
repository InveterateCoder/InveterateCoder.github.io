import { FileText } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { cleanList, isTodo } from '@/lib/content'

export function Experience() {
  const { experience: exp } = useContent()

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow={exp.eyebrow}
        title={exp.title}
        subtitle={exp.subtitle}
      />

      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <ol className="relative">
          {exp.items.map((e) => (
            <li
              key={e.id}
              className="relative border-l border-white/10 pb-10 pl-7 last:pb-0 sm:pl-9"
            >
              <span className="absolute top-1.5 left-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan to-violet ring-4 ring-void" />
              <Reveal>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-cyan">{e.dateRange}</span>
                  {e.current && <Tag accent>{exp.currentBadge}</Tag>}
                </div>
                <h3 className="mt-1.5 text-lg font-semibold text-ink">
                  {e.role}
                  {!isTodo(e.company) && (
                    <span className="font-normal text-muted"> · {e.company}</span>
                  )}
                </h3>
                {!isTodo(e.location) && <p className="text-sm text-muted">{e.location}</p>}
                <p className="mt-2 text-sm text-muted/90">{e.summary}</p>
                {e.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {e.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                        {hl}
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
          <Reveal className="flex flex-col gap-3 rounded-2xl border border-cyan/20 bg-gradient-to-br from-cyan/5 to-violet/5 p-6">
            <p className="text-sm text-muted">{exp.ctaText}</p>
            <Button to="/resume" variant="outline" size="sm" className="self-start">
              <FileText size={15} />
              {exp.ctaButton}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
