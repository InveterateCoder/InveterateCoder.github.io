import { motion } from 'motion/react'
import type { Skill } from '@/data/types'
import { skillGroups } from '@/data/skills'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { Reveal } from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

function SkillBar({ skill }: { skill: Skill }) {
  const reduce = useReducedMotion()
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className={cn('text-sm', skill.highlight ? 'font-semibold text-cyan' : 'text-ink')}>
          {skill.name}
        </span>
        <span className="font-mono text-[11px] text-faint">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          className={cn(
            'h-full rounded-full',
            skill.highlight
              ? 'bg-gradient-to-r from-cyan to-lime'
              : 'bg-gradient-to-r from-cyan to-violet',
          )}
          initial={{ width: reduce ? `${skill.level}%` : 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      {skill.note && <p className="mt-1 text-[11px] text-faint">{skill.note}</p>}
    </div>
  )
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        eyebrow="Skills"
        title="The toolbox"
        subtitle="Deep in the TypeScript/Node backend world, comfortable on Linux, and pointing the next chapter at Go."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06}>
            <GlowCard className="h-full">
              <h3 className="eyebrow mb-5">{group.title}</h3>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
