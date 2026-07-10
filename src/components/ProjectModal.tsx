import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Download, ExternalLink, X } from 'lucide-react'
import type { Project, ProjectLink } from '@/data/types'
import { GithubIcon, YoutubeIcon } from '@/components/ui/icons'
import { Tag } from '@/components/ui/Tag'

function linkMeta(link: ProjectLink) {
  switch (link.kind) {
    case 'repo':
      return { icon: <GithubIcon size={14} />, label: 'Code' }
    case 'youtube':
      return { icon: <YoutubeIcon size={14} />, label: 'Video' }
    case 'live':
      return { icon: <ExternalLink size={14} />, label: 'Live' }
    case 'download':
      return { icon: <Download size={14} />, label: 'Download' }
    case 'store':
      return { icon: <ExternalLink size={14} />, label: link.label ?? 'Store' }
  }
}

export function ProjectLinks({ links }: { links: readonly ProjectLink[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l, i) => {
        const { icon, label } = linkMeta(l)
        if (l.dead) {
          return (
            <span
              key={i}
              title="This demo host is offline"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/8 px-3 py-1.5 text-xs text-faint"
            >
              {icon}
              {label} <span className="opacity-60">(offline)</span>
            </span>
          )
        }
        return (
          <a
            key={i}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-xs text-ink transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            {icon}
            {label}
          </a>
        )
      })}
    </div>
  )
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    prevFocus.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const root = dialogRef.current
      if (!root) return
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prevFocus.current?.focus?.()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/12 bg-surface shadow-glow"
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-void/60 text-ink backdrop-blur transition-colors hover:text-cyan"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full overflow-hidden bg-void">
              <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-ink">{project.name}</h3>
                <Tag>{project.year}</Tag>
              </div>
              <p className="mt-2 text-muted">{project.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.langs.map((l) => (
                  <Tag key={l} accent>
                    {l}
                  </Tag>
                ))}
                {project.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="mt-5">
                <ProjectLinks links={project.links} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
