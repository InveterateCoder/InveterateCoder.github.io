import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

/**
 * We don't use i18next for the actual strings (those live in the typed content
 * model); i18next only manages the *current language* — detection, persistence
 * and reactive switching. Detection checks localStorage first (a manual choice
 * the visitor made), then falls back to the browser's preferred language, and
 * caches any change back to localStorage.
 */
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'],
    load: 'languageOnly', // ru-RU / ru-BY → ru
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lang',
    },
    interpolation: { escapeValue: false },
    resources: { en: { translation: {} }, ru: { translation: {} } },
    react: { useSuspense: false },
  })

export default i18n
