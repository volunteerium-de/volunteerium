import React from "react"
import Panel from "../../ui/Panels/Panel"
import InterestsTable from "./InterestsTable"
import { translations } from "../../../locales/translations"
import { useTranslation } from "react-i18next"

const InterestsPanel = () => {
  const { t } = useTranslation()

  return (
    <Panel
      title={t(translations.adminPanel.interests.interestsPanel.title)}
      fetchUrl="interests"
      TableComponent={InterestsTable}
    />
  )
}

export default InterestsPanel
