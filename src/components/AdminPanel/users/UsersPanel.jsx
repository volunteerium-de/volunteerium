import React from "react"
import UsersTable from "./UsersTable"
import Panel from "../../ui/Panels/Panel"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const UsersPanel = () => {
  const {t} = useTranslation()
  return <Panel title= {t(translations.adminPanel.users.usersPanel.title)} fetchUrl="users" TableComponent={UsersTable} />
}

export default UsersPanel
