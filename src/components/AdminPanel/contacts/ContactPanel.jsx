import React from "react"
import ContactTable from "./ContactTable"
import Panel from "../../../ui/Panels/Panel"
import { useTranslation } from "react-i18next"
import { translations } from "../../../../locales/translations"

const ContactPanel = () => {
  const {t} = useTranslation()
  return <Panel title={t(translations.adminPanel.contacts.contactPanel.title)} fetchUrl="contacts" TableComponent={ContactTable} />
}

export default ContactPanel
