import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
] as const

export function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? i18n.language ?? 'en').startsWith('ru') ? 'ru' : 'en'

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-surface/50 p-0.5 font-mono text-xs',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => void i18n.changeLanguage(l.code)}
          aria-pressed={current === l.code}
          className={cn(
            'rounded-full px-2.5 py-1 transition-colors',
            current === l.code ? 'bg-cyan/15 text-cyan' : 'text-muted hover:text-ink',
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
