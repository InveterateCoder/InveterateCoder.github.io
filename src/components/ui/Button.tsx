import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md'

interface ButtonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** Client-side route (react-router). Takes precedence over href. */
  to?: string
  href?: string
  external?: boolean
  download?: boolean | string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  'aria-label'?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 will-change-transform disabled:pointer-events-none disabled:opacity-50'

const sizeCls: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
}

const variantCls: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-cyan to-violet font-semibold text-void shadow-glow hover:-translate-y-0.5 hover:brightness-110',
  outline:
    'border border-white/12 bg-surface/50 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan',
  ghost: 'text-muted hover:text-ink',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  to,
  href,
  external,
  download,
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const cls = cn(base, sizeCls[size], variantCls[variant], className)

  if (to !== undefined) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        aria-label={ariaLabel}
        download={download}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={cls} onClick={onClick} type={type} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
