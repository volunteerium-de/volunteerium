import React from "react"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"

const ContactTable = ({ data, loading }) => {
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
        <div>Contacts Table</div>
      )}
    </>
  )
}

export default ContactTable
