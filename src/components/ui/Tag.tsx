import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TagProps {
  children: ReactNode
  className?: string
  accent?: boolean
  mono?: boolean
}

export function Tag({ children, className, accent, mono = true }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs',
        mono && 'font-mono',
        accent ? 'border-cyan/40 bg-cyan/5 text-cyan' : 'border-white/10 text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
