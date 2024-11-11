import React from "react"
import UsersTable from "./UsersTable"
import Panel from "../../ui/Panels/Panel"

const UsersPanel = () => {
  return <Panel title="Users" fetchUrl="users" TableComponent={UsersTable} />
}

export default UsersPanel