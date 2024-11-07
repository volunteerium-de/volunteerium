import React from "react"
import Panel from "../../../ui/Panels/Panel"
import FeedbacksTable from "./FeedbacksTable"

const FeedbacksPanel = () => {
  return (
    <Panel title="Event Feedbacks" fetchUrl="event-feedbacks" TableComponent={FeedbacksTable} />
  )
}

export default FeedbacksPanel
