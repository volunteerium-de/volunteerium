import React from "react"
import { useState } from "react"
import { ImSpinner9 } from "react-icons/im"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import useAdminCall from "../../../../hooks/useAdminCall"

const SingleContactPanel = ({ contactId, setIdentifier }) => {
  const navigate = useNavigate()
  const [contactData, setContactData] = useState([])
  const [loading, setLoading] = useState(false)
  const { fetchSingleData } = useAdminCall()

  const handleNavigateBack = () => {
    setIdentifier(null)
    navigate(`/admin-panel?tab=feedback-contacts`)
  }

  return (
    <div className="relative">
      <button
        onClick={handleNavigateBack}
        className="absolute -top-8 left-0 md:-left-5 flex items-center gap-1 text-primary-green dark:text-white"
      >
        <IoIosArrowBack className="w-5 h-5" />
        <span>Back</span>
      </button>
      <div>
        {loading ? (
          <div className="my-4 flex h-max justify-center items-start pt-24">
            <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green dark:text-white" />
          </div>
        ) : (
          <div className="my-8 md:my-4 space-y-2 h-max">
            <div className="flex justify-between items-center p-4 bg-white dark:bg-dark-gray-1 rounded-lg ">
              ContactId - {contactId}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SingleContactPanel
