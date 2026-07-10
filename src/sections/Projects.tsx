import { lazy, Suspense, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { Hand } from 'lucide-react'
import type { Project } from '@/data/types'
import { projects } from '@/data/projects'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GalleryFallback } from '@/components/GalleryFallback'
import { ProjectModal } from '@/components/ProjectModal'
import { useWebGL } from '@/hooks/useWebGL'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Keep the WebGL bundle (three/fiber/drei) out of the initial critical path.
const ProjectGallery = lazy(() => import('@/three/ProjectGallery'))

function GalleryLoader() {
  return (
    <div className="flex h-[58vh] min-h-[400px] w-full items-center justify-center">
      <span className="animate-pulse-glow font-mono text-sm text-muted">booting 3D gallery…</span>
    </div>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const webgl = useWebGL()
  const reduce = useReducedMotion()
  const use3D = webgl && !reduce
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '200px' })

  return (
    <Section id="work">
      <SectionHeading
        index="04"
        eyebrow="Where it started"
        title="The self-taught years"
        subtitle="The projects I built while teaching myself to code — from C++/Win32 and .NET to my first web apps (2014–2020). Rough around the edges, but this is where the love of it began."
      />

      <div ref={ref}>
        {use3D ? (
          inView ? (
            <Suspense fallback={<GalleryLoader />}>
              <ProjectGallery onSelect={setSelected} />
            </Suspense>
          ) : (
            <GalleryLoader />
          )
        ) : (
          <GalleryFallback onSelect={setSelected} />
        )}
      </div>

      {use3D && (
        <>
          <p className="mt-5 flex items-center justify-center gap-2 font-mono text-xs text-faint">
            <Hand size={14} /> drag to spin · click a card for details
          </p>
          {/* Keyboard / screen-reader equivalent for the pointer-only 3D canvas. */}
          <ul className="sr-only">
            {projects.map((p) => (
              <li key={p.slug}>
                <button type="button" onClick={() => setSelected(p)}>
                  View details for {p.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
