import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { Sparkles } from 'lucide-react'
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
  book: { note: string; title: string; author: string; image: string }
  arrow: string
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

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
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
    <figure
      className="group mx-auto w-full max-w-xs"
      style={reduce ? undefined : { perspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="relative"
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan/30 via-violet/25 to-magenta/25 opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

        <div className="relative overflow-hidden rounded-lg border border-white/12 bg-void shadow-glow">
          <img
            src={book.image}
            alt={`Book cover — ${book.title} by ${book.author}`}
            className="block aspect-[243/350] w-full object-cover"
          />
          {!reduce && (
            <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
          )}
        </div>
      </motion.div>

      <figcaption className="mt-4 flex items-center justify-center gap-1.5 font-mono text-xs text-muted">
        <Sparkles size={13} className="text-cyan" /> {arrow}
      </figcaption>
    </figure>
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
