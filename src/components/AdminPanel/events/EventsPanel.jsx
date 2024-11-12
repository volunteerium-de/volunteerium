import React from "react"
import EventsTable from "./EventsTable"
import Panel from "../../ui/Panels/Panel"

const EventsPanel = () => {
  return <Panel title="Events" fetchUrl="events" TableComponent={EventsTable} />
}

export default EventsPanel