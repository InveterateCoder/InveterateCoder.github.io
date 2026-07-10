import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, FileText, Sparkles } from 'lucide-react'
import { site } from '@/data/site'
import { Container } from '@/components/layout/Container'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { Button } from '@/components/ui/Button'
import { TiltPhoto } from '@/components/TiltPhoto'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0])

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
              Open to Go roles
            </span>

            <h1 className="text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
              I&apos;m <span className="text-gradient animate-gradient">Arthur</span>.
              <br />I build <span className="text-gradient animate-gradient">backends</span>.
            </h1>

            <p className="max-w-xl text-lg text-muted">{site.tagline}</p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="#work">
                See my work
                <ArrowUpRight size={16} />
              </Button>
              <Button to="/resume" variant="outline">
                <FileText size={16} />
                Résumé
              </Button>
              <Button href="#ai" variant="ghost">
                <Sparkles size={16} />
                How I build
              </Button>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <SocialLinks links={site.socials} />
              <span className="h-px flex-1 bg-white/10" />
              <span className="hidden font-mono text-xs text-faint sm:inline">
                11 yrs · NestJS · Postgres · Go
              </span>
            </div>
          </div>

          <TiltPhoto className="mx-auto w-full max-w-sm" />
        </motion.div>
      </Container>
    </section>
  )
}
