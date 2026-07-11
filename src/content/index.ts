import { en } from './en'
import { ru } from './ru'

/** The content shape is inferred from the English source of truth. */
export type Content = typeof en
export type Lang = 'en' | 'ru'

export const dictionaries: Record<Lang, Content> = { en, ru }

export function getContent(lang: Lang): Content {
  return dictionaries[lang] ?? en
}
