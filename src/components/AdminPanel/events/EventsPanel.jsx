import React from "react"
import EventsTable from "./EventsTable"
import Panel from "../../ui/Panels/Panel"
import { t } from "i18next"
import { translations } from "../../../locales/translations"
import { useTranslation } from "react-i18next"

const EventsPanel = () => {
  const { t } = useTranslation()

  return (
    <Panel
      title={t(translations.adminPanel.events.eventsPanel.title)}
      fetchUrl="events"
      TableComponent={EventsTable}
    />
  )
}

export default EventsPanel
