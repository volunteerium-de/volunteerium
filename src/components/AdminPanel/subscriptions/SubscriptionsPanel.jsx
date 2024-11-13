import React from "react"
import Panel from "../../ui/Panels/Panel"
import SubscriptionsTable from "./SubscriptionsTable"

const SubscriptionsPanel = () => {
  return (
    <Panel title="Subscriptions" fetchUrl="subscriptions" TableComponent={SubscriptionsTable} />
  )
}

export default SubscriptionsPanel
