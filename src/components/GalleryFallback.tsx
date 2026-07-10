import type { Project } from '@/data/types'
import { projects } from '@/data/projects'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'

/**
 * Static, accessible grid of projects — used when WebGL is unavailable or the
 * visitor prefers reduced motion. Same click-to-open-modal behaviour as the
 * 3D gallery, so nothing is lost.
 */
export function GalleryFallback({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 0.05}>
          <button
            onClick={() => onSelect(p)}
            className="group block w-full overflow-hidden rounded-2xl border border-white/8 bg-surface/60 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow"
          >
            <div className="aspect-video overflow-hidden bg-void">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-ink">{p.name}</h3>
                <span className="font-mono text-xs text-faint">{p.year}</span>
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-muted">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.langs.map((l) => (
                  <Tag key={l} accent>
                    {l}
                  </Tag>
                ))}
              </div>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  )
}
