import React from "react"
import Panel from "../../ui/Panels/Panel"
import SubscriptionsTable from "./SubscriptionsTable"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const SubscriptionsPanel = () => {
  const { t } = useTranslation()

  return (
    <Panel
      title={t(translations.adminPanel.subscriptions.subscriptionsPanel.title)}
      fetchUrl="subscriptions"
      TableComponent={SubscriptionsTable}
    />
  )
}

export default SubscriptionsPanel
