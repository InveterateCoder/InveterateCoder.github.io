import { ArrowUp } from 'lucide-react'
import { site } from '@/data/site'
import { Container } from './Container'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/8 py-12">
      <Container className="flex flex-col items-center gap-6 text-center">
        <SocialLinks links={site.socials} />

        <p className="max-w-md text-sm text-muted">
          Built from scratch with React, Three.js &amp; a lot of coffee-free evenings.
        </p>

        <div className="flex flex-col items-center gap-2 text-xs text-faint">
          <span className="font-mono">
            © {year} {site.name}
          </span>
          <a
            href="#top"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-cyan"
          >
            <ArrowUp size={13} /> Back to top
          </a>
        </div>
      </Container>
    </footer>
  )
}
