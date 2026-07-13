import { Sparkles } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Journey() {
  const { journey } = useContent()

  return (
    <Section id="path">
      <SectionHeading eyebrow={journey.eyebrow} title={journey.title} subtitle={journey.subtitle} />

      <ol className="relative mx-auto max-w-3xl">
        {journey.steps.map((step, i) => (
          <li
            key={`${step.tag}-${i}`}
            className="relative border-l border-white/10 pb-10 pl-8 last:border-transparent last:pb-0 sm:pl-10"
          >
            <span className="absolute top-1 left-0 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet ring-4 ring-void">
              <span className="h-1.5 w-1.5 rounded-full bg-void/70" />
            </span>
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-violet">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-gradient text-lg font-bold tracking-tight">{step.tag}</span>
              </div>
              <h3 className="mt-1 font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={0.1} className="mx-auto mt-8 max-w-3xl">
        <div className="rounded-2xl border border-white/8 bg-surface/40 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-violet" />
            <span className="eyebrow text-violet!">{journey.mentionsTitle}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">{journey.mentions}</p>
        </div>
      </Reveal>
    </Section>
  )
}
