import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import eng_languages from "../helpers/languages_english.json"
import de_languages from "../helpers/languages_deutsch.json"
import { useSelector } from "react-redux"
import useEventCall from "./useEventCall"

const useLanguage = () => {
  const { i18n } = useTranslation()
  const [languageOptions, setLanguageOptions] = useState([])
  const { categories } = useSelector((state) => state.search)
  const { getEventCategories } = useEventCall()

  useEffect(() => {
    const currentLanguage = i18n.language
    const options =
      currentLanguage === "en"
        ? eng_languages.map((lang) => ({ value: lang.code, label: lang.name }))
        : de_languages.map((lang) => ({ value: lang.code, label: lang.name }))

    setLanguageOptions(options)
  }, [i18n.language])

  useEffect(() => {
    if (categories.length === 0) {
      getEventCategories()
    }
  }, [categories])

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
      translatedCategory = categories.filter(
        (category) => category?.name?.toLowerCase() === categoryName?.toLowerCase()
      )
      return translatedCategory[0]?.nameDE || translatedCategory[0]?.name
    }
    return translatedCategory
  }

  return { getLangName, getTranslatedCategory, languageOptions }
}

export default useLanguage
