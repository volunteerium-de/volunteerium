import React from "react"
import Panel from "../../../ui/Panels/Panel"
import ReportsTable from "./ReportsTable"

const ReportsPanel = () => {
  return <Panel title="Reports" fetchUrl="event-reports" TableComponent={ReportsTable} />
}

export default ReportsPanel
