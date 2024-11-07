import React from "react"
import { ImSpinner9 } from "react-icons/im"
import AttendantsAvatars from "../../../EventDetailsPage/AttendantsAvatars"
import "../../../../styles/global.css"
import { useNavigate } from "react-router-dom"

const EventsTable = ({ data, loading }) => {
  const navigate = useNavigate()

  const handleNavigateSingleEvent = (eventId) => {
    navigate(`?tab=events&identifier=${eventId}`)
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-start mt-24">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table min-w-full bg-white dark:bg-dark-gray-2">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-gray-600 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">Event ID</th>
                <th className="th p-3 text-center">Status</th>
                <th className="th p-3 text-center">Completion</th>
                <th className="th p-3 text-left">Event Title</th>
                <th className="th p-3 text-left">Event Creator</th>
                <th className="th p-3 text-center">Attendants</th>
                <th className="th p-3 text-center">Created At</th>
              </tr>
            </thead>
            <tbody className="tbody text-gray-600 dark:text-gray-200 text-sm font-light">
              {data.map((event) => (
                <tr
                  key={event?._id}
                  onClick={() => handleNavigateSingleEvent(event?._id)}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td
                    className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                    data-label="Event ID"
                  >
                    {event?._id}
                  </td>
                  <td
                    className={`td text-center whitespace-nowrap ${event?.isActive ? "text-primary-green" : "text-danger"}`}
                    data-label="Event Status"
                  >
                    {event?.isActive ? "Active" : "Suspended"}
                  </td>
                  <td
                    className={`td text-center whitespace-nowrap ${event?.isDone ? "text-primary-green" : "text-warning"}`}
                    data-label="Completion Status"
                  >
                    {event?.isDone ? "Completed" : "Waiting"}
                  </td>
                  <td
                    className="td text-left whitespace-nowrap overflow-ellipsis overflow-hidden"
                    data-label="Event Title"
                  >
                    {event?.title}
                  </td>
                  <td
                    className="td text-left 2xl:w-[100px] whitespace-nowrap"
                    data-label="Event Creator"
                  >
                    {event?.createdBy?.fullName || event?.createdBy?.organizationName}
                  </td>
                  <td
                    className="td text-center max-w-[150px] whitespace-nowrap flex justify-between items-center overflow-x-scroll scrollbar-hide"
                    data-label="Attendants"
                  >
                    <AttendantsAvatars
                      participants={event?.eventParticipantIds}
                      totalParticipants={event?.eventParticipantIds.length}
                      maxParticipant={event?.maxParticipant}
                      avatarCount={4}
                      gap={1}
                      showAll={true}
                    />
                  </td>
                  <td className="td text-center whitespace-nowrap" data-label="Created At">
                    {new Date(event?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No events found</div>
      )}
    </>
  )
}

export default EventsTable
