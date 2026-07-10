import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
  /** Set false to render full-bleed content without the centered container. */
  contained?: boolean
}

export function Section({ id, className, children, contained = true }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-24 sm:py-32', className)}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  )
}
