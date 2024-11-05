import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import eng_languages from "../helpers/languages_english.json"
import de_languages from "../helpers/languages_deutsch.json"
import categories_translations from "../helpers/categories_translations.json"

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

  const getLangName = (langCode) => {
    const selectedLang = languageOptions?.filter((langData) => langData.value === langCode)
    if (selectedLang.length > 0) {
      return selectedLang[0].label
    }
    return undefined
  }

  const getTranslatedCategory = (categoryName) => {
    let translatedCategory = categoryName
    if (i18n.language === "de") {
      translatedCategory = categories_translations.filter(
        (category) => category.enName.toLowerCase() === categoryName.toLowerCase()
      )
      return translatedCategory[0].deName
    }
    return translatedCategory
  }

  return { getLangName, getTranslatedCategory, languageOptions }
}

export default useLanguage
