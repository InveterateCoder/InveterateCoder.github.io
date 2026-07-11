import { ArrowUp } from 'lucide-react'
import { useContent } from '@/hooks/useContent'
import { Container } from './Container'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const c = useContent()
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/8 py-12">
      <Container className="flex flex-col items-center gap-6 text-center">
        <SocialLinks links={c.socials} />

        <p className="max-w-md text-sm text-muted">{c.footer.built}</p>

        <div className="flex flex-col items-center gap-2 text-xs text-faint">
          <span className="font-mono">
            © {year} {c.name}
          </span>
          <a
            href="#top"
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-cyan"
          >
            <ArrowUp size={13} /> {c.footer.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  )
}
