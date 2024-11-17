import React from "react"
import Panel from "../../ui/Panels/Panel"
import FeedbacksTable from "./FeedbacksTable"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const FeedbacksPanel = () => {
  const { t } = useTranslation()

  return (
    <Panel
      title={t(translations.adminPanel.feedbacks.feedbacksPanel.title)}
      fetchUrl="event-feedbacks"
      TableComponent={FeedbacksTable}
    />
  )
}

export default FeedbacksPanel
