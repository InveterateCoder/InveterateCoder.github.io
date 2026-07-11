import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'motion/react'
import { BookOpen, Sparkles } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Render *emphasised* spans (the book title). */
function emph(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i} className="font-medium text-cyan not-italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

/** Count up to `to` when scrolled into view (respects reduced motion). */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce || !inView) return
    let raf = 0
    const start = performance.now()
    const duration = 1400
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, reduce])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function BookCard({
  book,
  arrow,
}: {
  book: { note: string; title: string; author: string }
  arrow: string
}) {
  return (
    <div className="relative mx-auto w-full max-w-xs" style={{ perspective: 900 }}>
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan/30 via-violet/20 to-magenta/20 opacity-60 blur-3xl" />
      <motion.div
        className="relative aspect-[3/4] overflow-hidden rounded-l-sm rounded-r-xl border border-white/12 bg-gradient-to-br from-[#0e1424] to-[#161a2e] shadow-glow"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ rotateY: -8, rotateX: 5 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-cyan/50 to-violet/50" />
        <div className="flex h-full flex-col justify-between p-6 pl-9">
          <div>
            <BookOpen size={28} className="text-cyan" />
            <p className="mt-6 font-mono text-[11px] tracking-widest text-faint uppercase">
              {book.note}
            </p>
          </div>
          <div>
            <h3 className="text-xl leading-snug font-bold text-ink">{book.title}</h3>
            <p className="mt-2 text-sm text-muted">{book.author}</p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan">
            <Sparkles size={13} /> {arrow}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
      </motion.div>
    </div>
  )
}

export function SelfTaught() {
  const { selfTaught: st } = useContent()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glyphY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -90])

  return (
    <Section id="self-taught" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/10 blur-[130px]" />
        <motion.div
          style={{ y: glyphY }}
          className="absolute -top-16 right-0 leading-none font-bold text-white/[0.03] select-none"
        >
          <span className="text-[20rem] sm:text-[26rem]">”</span>
        </motion.div>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <span className="eyebrow flex items-center gap-2">
              <span className="h-px w-6 bg-cyan/50" />
              {st.eyebrow}
            </span>
            <h2 className="mt-3 text-6xl font-bold tracking-tight sm:text-7xl">
              <span className="text-gradient animate-gradient">{st.title}</span>
            </h2>
            <p className="mt-4 text-xl text-balance text-ink/90">{st.lead}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-5 space-y-4 text-muted">
            {st.story.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {emph(p)}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-x-10 gap-y-6">
            {st.stats.map((s) => (
              <div key={s.label}>
                <div className="text-gradient text-4xl font-bold sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-faint">{s.label}</div>
              </div>
            ))}
            <div>
              <div className="text-gradient text-4xl font-bold sm:text-5xl">∞</div>
              <div className="mt-1 text-xs text-faint">{st.stillLearning}</div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <BookCard book={st.book} arrow={st.arrow} />
        </Reveal>
      </div>
    </Section>
  )
}
