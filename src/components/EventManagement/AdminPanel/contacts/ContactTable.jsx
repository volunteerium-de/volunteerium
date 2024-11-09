import React from "react"
import { useTranslation } from "react-i18next"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { translations } from "../../../../locales/translations"

const ContactTable = ({ data, loading }) => {
  const {t} = useTranslation()
  const navigate = useNavigate()

  const handleNavigateSingleContact = (contactId) => {
    navigate(`?tab=contacts&identifier=${contactId}`)
  }

  console.log(data)

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div>{t(translations.adminPanel.contacts.contactTable.header)}</div>
      )}
    </>
  )
}

export default ContactTable
