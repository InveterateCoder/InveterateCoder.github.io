import { Compass } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

interface SkillItem {
  name: string
  level: number
  note?: string
  highlight?: boolean
}

/** Threshold that splits "daily drivers" from "in the toolkit" — felt as
 *  visual weight, never shown as a number. */
const CORE = 80
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const CHIP_BASE =
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-mono transition-colors duration-300'

function SkillChip({ skill, focusSr }: { skill: SkillItem; focusSr: string }) {
  const describedBy = skill.note ? `note-${slug(skill.name)}` : undefined

  // Focus axis (Go / Linux): the loudest chip — a shimmering gradient ring.
  if (skill.highlight) {
    return (
      <span
        aria-describedby={describedBy}
        className="inline-block rounded-full bg-gradient-to-r from-cyan to-violet bg-[length:200%_auto] p-px align-middle shadow-glow motion-safe:animate-gradient"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 font-mono text-sm font-medium text-ink">
          <Compass size={13} className="text-cyan" aria-hidden />
          {skill.name}
          {skill.note && (
            <span aria-hidden className="text-cyan">
              *
            </span>
          )}
          <span className="sr-only"> — {focusSr}</span>
        </span>
      </span>
    )
  }

  // Proficiency axis: daily driver (brighter, dotted) vs quieter toolkit chip.
  const daily = skill.level >= CORE
  return (
    <span
      aria-describedby={describedBy}
      className={cn(
        CHIP_BASE,
        daily
          ? 'border-white/15 bg-white/[0.04] font-medium text-ink hover:border-white/30'
          : 'border-white/10 text-muted hover:border-white/20 hover:text-ink',
      )}
    >
      {daily && <span aria-hidden className="h-1 w-1 rounded-full bg-cyan/70" />}
      {skill.name}
    </span>
  )
}

export function Skills() {
  const { skills } = useContent()

  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        eyebrow={skills.eyebrow}
        title={skills.title}
        subtitle={skills.subtitle}
      />

      {/* Legend — the key that replaces percentages. */}
      <Reveal className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-faint">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
          {skills.legend.core}
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full border border-white/30" />
          {skills.legend.supporting}
        </span>
        <span className="inline-flex items-center gap-2">
          <Compass size={13} className="text-cyan" aria-hidden />
          {skills.legend.focus}
        </span>
      </Reveal>

      <div className="divide-y divide-white/10">
        {skills.groups.map((group, gi) => {
          const notes = group.skills.filter((s) => s.note)
          return (
            <Reveal key={group.title} delay={gi * 0.05}>
              <div className="grid gap-4 py-7 lg:grid-cols-[200px_1fr] lg:gap-10">
                {/* Left rail: ordinal + category, editorial-index style */}
                <div className="flex items-baseline gap-3 lg:flex-col lg:items-start lg:gap-1">
                  <span className="font-mono text-xs text-violet">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{group.title}</h3>
                </div>

                {/* Right column: chip cluster (author order preserved) + footnotes */}
                <div>
                  <ul role="list" className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <li key={skill.name}>
                        <SkillChip skill={skill} focusSr={skills.focusSr} />
                      </li>
                    ))}
                  </ul>

                  {notes.map((skill) => (
                    <p
                      key={skill.name}
                      id={`note-${slug(skill.name)}`}
                      className="mt-3 flex items-start gap-1.5 text-xs text-cyan/80"
                    >
                      <span aria-hidden>*</span>
                      {skill.note}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Flag the direction; the #go section tells the story. */}
      <Reveal className="mt-10 flex justify-end">
        <a
          href="#go"
          className="font-mono text-sm text-cyan transition-colors hover:text-magenta"
        >
          {skills.focusLink} &rarr;
        </a>
      </Reveal>
    </Section>
  )
}
