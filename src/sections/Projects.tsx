import { lazy, Suspense, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { Hand } from 'lucide-react'
import type { Project } from '@/data/types'
import { useContent } from '@/hooks/useContent'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GalleryFallback } from '@/components/GalleryFallback'
import { ProjectModal } from '@/components/ProjectModal'
import { useWebGL } from '@/hooks/useWebGL'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Keep the WebGL bundle (three/fiber/drei) out of the initial critical path.
const ProjectGallery = lazy(() => import('@/three/ProjectGallery'))

function GalleryLoader({ label }: { label: string }) {
  return (
    <div className="flex h-[58vh] min-h-[400px] w-full items-center justify-center">
      <span className="animate-pulse-glow font-mono text-sm text-muted">{label}</span>
    </div>
  )
}

export function Projects() {
  const { projects: pj } = useContent()
  const items = pj.items
  const [selected, setSelected] = useState<Project | null>(null)
  const webgl = useWebGL()
  const reduce = useReducedMotion()
  const use3D = webgl && !reduce
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '200px' })

  return (
    <Section id="work">
      <SectionHeading index="04" eyebrow={pj.eyebrow} title={pj.title} subtitle={pj.subtitle} />

      <div ref={ref}>
        {use3D ? (
          inView ? (
            <Suspense fallback={<GalleryLoader label={pj.loading} />}>
              <ProjectGallery items={items} onSelect={setSelected} />
            </Suspense>
          ) : (
            <GalleryLoader label={pj.loading} />
          )
        ) : (
          <GalleryFallback items={items} onSelect={setSelected} />
        )}
      </div>

      {use3D && (
        <>
          <p className="mt-5 flex items-center justify-center gap-2 font-mono text-xs text-faint">
            <Hand size={14} /> {pj.dragHint}
          </p>
          {/* Keyboard / screen-reader equivalent for the pointer-only 3D canvas. */}
          <ul className="sr-only">
            {items.map((p) => (
              <li key={p.slug}>
                <button type="button" onClick={() => setSelected(p)}>
                  {p.name}
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
