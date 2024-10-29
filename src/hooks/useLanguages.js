import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import eng_languages from "../helpers/languages_english.json"
import de_languages from "../helpers/languages_deutsch.json"

const useLanguage = () => {
  const { i18n } = useTranslation()
  const [languageOptions, setLanguageOptions] = useState([])

  useEffect(() => {
    const currentLanguage = i18n.language
    const options =
      currentLanguage === "en"
        ? eng_languages.map((lang) => ({ value: lang.code, label: lang.name }))
        : de_languages.map((lang) => ({ value: lang.code, label: lang.name }))

    setLanguageOptions(options)
  }, [i18n.language])

  return languageOptions
}

export default useLanguage
