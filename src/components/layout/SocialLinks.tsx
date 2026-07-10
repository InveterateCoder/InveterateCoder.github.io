import { Mail } from 'lucide-react'
import type { SocialIcon, SocialLink } from '@/data/types'
import { GithubIcon, LinkedinIcon, StackOverflowIcon, XIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

function SocialGlyph({ icon, size = 18 }: { icon: SocialIcon; size?: number }) {
  switch (icon) {
    case 'github':
      return <GithubIcon size={size} />
    case 'linkedin':
      return <LinkedinIcon size={size} />
    case 'stackoverflow':
      return <StackOverflowIcon size={size} />
    case 'twitter':
      return <XIcon size={size} />
    case 'mail':
      return <Mail size={size} />
  }
}

interface SocialLinksProps {
  links: readonly SocialLink[]
  className?: string
  size?: number
}

export function SocialLinks({ links, className, size = 18 }: SocialLinksProps) {
  // Hide links whose href is still a TODO placeholder (e.g. LinkedIn).
  const valid = links.filter((l) => !l.href.includes('TODO'))
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {valid.map((l) => {
        const isHttp = l.href.startsWith('http')
        return (
          <a
            key={l.label}
            href={l.href}
            aria-label={l.label}
            title={l.label}
            {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan"
          >
            <SocialGlyph icon={l.icon} size={size} />
          </a>
        )
      })}
    </div>
  )
}
