import { Target } from 'lucide-react'
import { goals, intro } from '@/data/about'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { Reveal } from '@/components/ui/Reveal'

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="A little about me"
        subtitle="I'd rather be honest and specific than polished and generic — so here's the real version."
      />

      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="space-y-5 text-lg text-muted">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <GlowCard interactive={false} className="border-cyan/20 bg-surface/40">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-ink">
              <span className="text-cyan">
                <Target size={18} />
              </span>
              {goals.title}
            </h3>
            <ul className="space-y-3">
              {goals.items.map((g, i) => (
                <li key={i} className="flex items-start gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan to-violet" />
                  {g}
                </li>
              ))}
            </ul>
          </GlowCard>
        </Reveal>
      </div>
    </Section>
  )
}
