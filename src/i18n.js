import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translation files
import enTranslation from "./locales/en/en.json"
import deTranslation from "./locales/de/de.json"

// Configure i18next
i18n
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next) // Bind react-i18next to react
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      de: {
        translation: deTranslation,
      },
    },
    fallbackLng: "en", // Use English as the default language
    supportedLngs: ["en", "de"],
    detection: {
      order: ["cookie", "queryString", "localStorage", "navigator"],
      caches: ["cookie"], // Store the user language in cookies
    },
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  })

export default i18n
