import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FileText, Menu, X } from 'lucide-react'
import { site } from '@/data/site'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ids = useMemo(() => site.nav.map((n) => n.id), [])
  const active = useScrollSpy(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const openBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const prevOpen = useRef(false)

  // While the mobile menu is open: Escape closes it, focus moves into it, and
  // it auto-closes if the viewport grows past the `md` breakpoint (otherwise
  // the body would stay scroll-locked with no visible control to unlock it).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    closeBtnRef.current?.focus()

    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    if (mq.matches) setOpen(false)
    mq.addEventListener('change', onChange)

    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  // Restore focus to the trigger when the menu closes.
  useEffect(() => {
    if (prevOpen.current && !open) openBtnRef.current?.focus()
    prevOpen.current = open
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-300 sm:px-5',
          scrolled
            ? 'glass-strong border border-white/10 py-2 shadow-lg shadow-black/40'
            : 'border border-transparent py-2.5',
        )}
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
          <img
            src="/me_small.jpg"
            alt=""
            className="h-8 w-8 rounded-full object-cover ring-1 ring-cyan/40"
          />
          <span className="font-mono text-sm font-semibold tracking-tight">
            arthur<span className="text-cyan">.g</span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 md:flex">
          {site.nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm transition-colors',
                active === n.id ? 'text-cyan' : 'text-muted hover:text-ink',
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/resume" variant="outline" size="sm" className="hidden sm:inline-flex">
            <FileText size={15} />
            Résumé
          </Button>
          <button
            ref={openBtnRef}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass-strong fixed inset-0 z-50 flex flex-col p-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-end">
              <button
                ref={closeBtnRef}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {site.nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-lg text-ink transition-colors hover:bg-white/5 hover:text-cyan"
                >
                  {n.label}
                </a>
              ))}
              <Button to="/resume" variant="outline" className="mt-4 self-start" onClick={() => setOpen(false)}>
                <FileText size={16} />
                Résumé
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
