import type { PointerEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { Award, ExternalLink, Moon } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Credential {
  kind: string
  label: string
  image: string
  href: string
}

function CredentialCard({
  item,
  teamLead,
  view,
}: {
  item: Credential
  teamLead: string
  view: string
}) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 150, damping: 18, mass: 0.5 }
  const rotX = useSpring(useTransform(py, [0, 1], [9, -9]), spring)
  const rotY = useSpring(useTransform(px, [0, 1], [-11, 11]), spring)
  const glareX = useTransform(px, [0, 1], ['0%', '100%'])
  const glareY = useTransform(py, [0, 1], ['0%', '100%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28), transparent 55%)`

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      style={reduce ? undefined : { perspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="relative"
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        <div className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-cyan/30 via-violet/25 to-magenta/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />

        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-surface shadow-glow">
          <div className="relative aspect-[5/7] w-full overflow-hidden bg-void">
            <img
              src={item.image}
              alt={`${item.kind} — ${item.label}`}
              className="h-full w-full object-cover object-top"
            />
            {!reduce && (
              <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-void via-void/70 to-transparent" />

            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-cyan/40 bg-void/70 px-2.5 py-1 font-mono text-[11px] text-cyan backdrop-blur">
              <Award size={12} /> {teamLead}
            </span>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div>
                <div className="font-mono text-[11px] tracking-widest text-cyan uppercase">
                  {item.kind}
                </div>
                <div className="mt-0.5 font-semibold text-ink">{item.label}</div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/15 bg-void/60 px-3 py-1.5 text-xs text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {view} <ExternalLink size={13} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  )
}

export function Awards() {
  const { awards } = useContent()

  return (
    <Section id="awards">
      <SectionHeading
        index="04"
        eyebrow={awards.eyebrow}
        title={awards.title}
        subtitle={awards.subtitle}
      />

      <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
        {awards.items.map((it) => (
          <Reveal key={it.href}>
            <CredentialCard item={it} teamLead={awards.teamLead} view={awards.view} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-surface/40 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-violet" />
            <span className="eyebrow text-violet!">{awards.reflectionTitle}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted">{awards.reflection}</p>
        </div>
      </Reveal>
    </Section>
  )
}
