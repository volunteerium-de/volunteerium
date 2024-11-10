import React from "react"
import Panel from "../../ui/Panels/Panel"
import ReportsTable from "./ReportsTable"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const ReportsPanel = () => {
  const {t} = useTranslation()
  return <Panel title= {t(translations.adminPanel.reports.reportsPanel.title)} fetchUrl="event-reports" TableComponent={ReportsTable} />
}

export default ReportsPanel
