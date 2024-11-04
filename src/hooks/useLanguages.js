import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import eng_languages from "../helpers/languages_english.json"
import de_languages from "../helpers/languages_deutsch.json"
import de_categories from "../helpers/categories_deutsch.json"

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

  const getTranslatedCategory = (category) => {
    let translatedCategory = category
    if (i18n.language === "de") {
      translatedCategory = de_categories.filter((deCategory) => deCategory._id == category._id)
      return translatedCategory[0].name
    }
    return translatedCategory.name
  }

  return { getLangName, getTranslatedCategory, languageOptions }
}

export default useLanguage
