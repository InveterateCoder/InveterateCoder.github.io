import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Monospace ordinal, e.g. "01". */
  index?: string
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'mb-12 flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="eyebrow flex items-center gap-2">
        {index && <span className="text-violet">{index}</span>}
        <span className="h-px w-6 bg-cyan/50" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-pretty text-muted">{subtitle}</p>}
    </Reveal>
  )
}
