import React from "react"
import Panel from "../../ui/Panels/Panel"
import InterestsTable from "./InterestsTable"

const InterestsPanel = () => {
  return <Panel title="Interests" fetchUrl="interests" TableComponent={InterestsTable} />
}

export default InterestsPanel
