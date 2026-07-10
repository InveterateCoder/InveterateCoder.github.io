import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type GlowCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Add a hover lift + neon border. */
  interactive?: boolean
}

export function GlowCard({ className, interactive = true, children, ...rest }: GlowCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/8 bg-surface/60 p-6 backdrop-blur-md transition-all duration-500',
        interactive && 'hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
