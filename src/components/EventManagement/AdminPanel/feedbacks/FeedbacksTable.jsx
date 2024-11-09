import { transform } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { translations } from "../../../../locales/translations"

const FeedbacksTable = ({ data, loading }) => {
  const {t} = useTranslation()
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
        <div>{t(translations.adminPanel.feedbacks.feedbacksTable.header)}</div>
      )}
    </>
  )
}

export default FeedbacksTable
