import type { ReactNode } from 'react'
import { GraduationCap, Heart, Leaf, Target } from 'lucide-react'
import { aboutBlocks, intro } from '@/data/about'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { Reveal } from '@/components/ui/Reveal'

/** Render *emphasised* spans (used sparingly in the bio copy). */
function emph(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i} className="text-cyan/90 not-italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

const blockIcon: Record<string, ReactNode> = {
  'self-taught': <GraduationCap size={18} />,
  faith: <Heart size={18} />,
  lifestyle: <Leaf size={18} />,
  goals: <Target size={18} />,
}

export function About() {
  const goals = aboutBlocks.find((b) => b.id === 'goals')
  const cards = aboutBlocks.filter((b) => b.id !== 'goals')

  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="A little about me"
        subtitle="I'd rather be honest and specific than polished and generic — so here's the real version."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <Reveal className="space-y-4 text-lg text-muted">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {goals && (
            <GlowCard interactive={false} className="mt-6 border-cyan/20 bg-surface/40">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-ink">
                <span className="text-cyan">{blockIcon[goals.id]}</span>
                {goals.title}
              </h3>
              <ul className="space-y-2">
                {goals.body.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-base text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan to-violet" />
                    {g}
                  </li>
                ))}
              </ul>
            </GlowCard>
          )}
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((block, i) => (
            <Reveal key={block.id} delay={i * 0.08}>
              <GlowCard className="h-full">
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-ink">
                  <span className="text-cyan">{blockIcon[block.id]}</span>
                  {block.title}
                </h3>
                <div className="space-y-3 text-sm leading-relaxed text-muted">
                  {block.body.map((p, j) => (
                    <p key={j}>{emph(p)}</p>
                  ))}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
