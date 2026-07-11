import { useTranslation } from 'react-i18next'
import { getContent, type Content, type Lang } from '@/content'

/**
 * Returns the content for the current language. Subscribes (via useTranslation)
 * so components re-render when the visitor switches language.
 */
export function useContent(): Content {
  const { i18n } = useTranslation()
  const resolved = i18n.resolvedLanguage ?? i18n.language ?? 'en'
  const lang: Lang = resolved.startsWith('ru') ? 'ru' : 'en'
  return getContent(lang)
}
