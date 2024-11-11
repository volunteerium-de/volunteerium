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
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table min-w-full bg-white dark:bg-dark-gray-1">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-dark-gray-1 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">Event Title</th>
                <th className="th p-3 text-left">Name</th>
                <th className="th p-3 text-left">Email</th>
                <th className="th p-3 text-center">Rating</th>
                <th className="th p-3 text-center">Created At</th>
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
                    data-label="Event ID"
                  >
                    {feedback?.eventId.title || "N/A"}
                  </td>

                  <td
                    className="td text-left 2xl:w-[100px] whitespace-nowrap overflow-ellipsis overflow-hidden"
                    data-label="User ID"
                  >
                    <div className="flex flex-row gap-1 items-center">
                      <span>{feedback?.userId?.fullName}</span>
                    </div>
                  </td>
                  <td className={"td text-left 2xl:w-[150px] whitespace-nowrap"} data-label="Email">
                    {feedback?.userId.email}
                  </td>
                  <td
                    className={"td text-center 2xl:w-[150px] whitespace-nowrap"}
                    data-label="Rating"
                  >
                    {feedback?.rating}
                  </td>
                  <td className="td text-center whitespace-nowrap" data-label="Created At">
                    {new Date(feedback?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No feedbacks found</div>
      )}
    </>
  )
}

export default FeedbacksTable