import React from "react"
import { useTranslation } from "react-i18next"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { translations } from "../../../locales/translations"

const FeedbacksTable = ({ data, loading }) => {
  const { t } = useTranslation()
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
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table min-w-full bg-white dark:bg-dark-gray-1">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-dark-gray-1 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.feedbacks.feedbacksTable.title)}
                </th>
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.feedbacks.feedbacksTable.name)}
                </th>
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.feedbacks.feedbacksTable.email)}
                </th>
                <th className="th p-3 text-center">
                  {t(translations.adminPanel.feedbacks.feedbacksTable.rating)}
                </th>
                <th className="th p-3 text-center">
                  {t(translations.adminPanel.feedbacks.feedbacksTable.createdAt)}
                </th>
              </tr>
            </thead>
            <tbody className="tbody text-dark-gray-1 dark:text-light-gray text-sm font-light">
              {data.map((feedback) => (
                <tr
                  key={feedback?._id}
                  onClick={() => handleNavigateSingleFeedback(feedback?._id)}
                  className="border-b border-light-gray dark:border-dark-gray-1 hover:bg-gray-100 dark:hover:bg-dark-gray-2 text-sm cursor-pointer"
                >
                  <td
                    className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                    data-label={t(translations.adminPanel.feedbacks.feedbacksTable.title)}
                  >
                    {feedback?.eventId.title || "N/A"}
                  </td>

                  <td
                    className="td text-left 2xl:w-[100px] whitespace-nowrap overflow-ellipsis overflow-hidden"
                    data-label={t(translations.adminPanel.feedbacks.feedbacksTable.name)}
                  >
                    <div className="flex flex-row gap-1 items-center">
                      <span>
                        {feedback?.userId?.fullName || feedback?.userId?.organizationName}
                      </span>
                    </div>
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label={t(translations.adminPanel.feedbacks.feedbacksTable.email)}
                  >
                    {feedback?.userId?.email}
                  </td>
                  <td
                    className={"td text-center 2xl:w-[150px] whitespace-nowrap"}
                    data-label={t(translations.adminPanel.feedbacks.feedbacksTable.rating)}
                  >
                    {feedback?.rating}
                  </td>
                  <td
                    className="td text-center whitespace-nowrap"
                    data-label={t(translations.adminPanel.feedbacks.feedbacksTable.createdAt)}
                  >
                    {new Date(feedback?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 sm:p-0 mt-4 text-center sm:text-left text-dark-gray-2 dark:text-light-gray">
          {t(translations.adminPanel.feedbacks.feedbacksTable.noFeedbacks)}
        </div>
      )}
    </>
  )
}

export default FeedbacksTable
