import React from "react"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"

const FeedbacksTable = ({ data, loading }) => {
  const navigate = useNavigate()

  const handleNavigateSingleFeedback = (feedbackId) => {
    navigate(`?tab=feedbacks&identifier=${feedbackId}`)
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div>Feedbacks Table</div>
      )}
    </>
  )
}

export default FeedbacksTable
