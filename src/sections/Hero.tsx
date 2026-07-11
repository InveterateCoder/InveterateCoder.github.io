import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, FileText, Sparkles } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Container } from '@/components/layout/Container'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { Button } from '@/components/ui/Button'
import { TiltPhoto } from '@/components/TiltPhoto'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Hero() {
  const c = useContent()
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0])
  const h = c.hero.headline

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16"
    >
      <Container>
        <motion.div
          style={{ y, opacity }}
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-surface/50 px-3 py-1 font-mono text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              {c.hero.badge}
            </span>

            <h1 className="text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {h.greetPrefix}
              <span className="text-gradient animate-gradient">{h.name}</span>.
              <br />
              {h.buildPrefix}
              <span className="text-gradient animate-gradient">{h.buildWord}</span>.
            </h1>

            <p className="max-w-xl text-lg text-muted">{c.tagline}</p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="#work">
                {c.hero.cta.work}
                <ArrowUpRight size={16} />
              </Button>
              <Button to="/resume" variant="outline">
                <FileText size={16} />
                {c.hero.cta.resume}
              </Button>
              <Button href="#ai" variant="ghost">
                <Sparkles size={16} />
                {c.hero.cta.howIBuild}
              </Button>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <SocialLinks links={c.socials} />
              <span className="h-px flex-1 bg-white/10" />
              <span className="hidden font-mono text-xs text-faint sm:inline">{c.hero.meta}</span>
            </div>
          </div>

          <TiltPhoto className="mx-auto w-full max-w-sm" />
        </motion.div>
      </Container>
    </section>
  )
}
