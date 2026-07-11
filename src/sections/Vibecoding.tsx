import { Bot, Sparkles } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'

export function Vibecoding() {
  const { vibecoding: v } = useContent()

  return (
    <Section id="ai">
      <SectionHeading index="05" eyebrow={v.eyebrow} title={v.title} />

      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        <Reveal className="space-y-5">
          <p className="text-2xl leading-snug font-medium text-pretty text-ink">{v.lead}</p>
          {v.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-white/8 bg-surface/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan">
              <Bot size={18} />
              <span className="eyebrow">{v.toolsLabel}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {v.tools.map((t) => (
                <Tag key={t} accent>
                  <Sparkles size={12} className="mr-1.5" />
                  {t}
                </Tag>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">{v.note}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
