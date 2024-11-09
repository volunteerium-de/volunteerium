import React from "react"
import { ImSpinner9 } from "react-icons/im"
import AttendantsAvatars from "../../../EventDetailsPage/AttendantsAvatars"
import "../../../../styles/global.css"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { translations } from "../../../../locales/translations"

const EventsTable = ({ data, loading }) => {
  const {t} = useTranslation()
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
          <table className="table min-w-full bg-white dark:bg-dark-gray-1">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-dark-gray-1 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">{t(translations.adminPanel.events.eventsTable.eventId)}</th>
                <th className="th p-3 text-center">{t(translations.adminPanel.events.eventsTable.status)}</th>
                <th className="th p-3 text-center">{t(translations.adminPanel.events.eventsTable.completion)}</th>
                <th className="th p-3 text-left">{t(translations.adminPanel.events.eventsTable.eventTitle)}</th>
                <th className="th p-3 text-left">{t(translations.adminPanel.events.eventsTable.eventCreator)}</th>
                <th className="th p-3 text-center">{t(translations.adminPanel.events.eventsTable.attendants)}</th>
                <th className="th p-3 text-center">{t(translations.adminPanel.events.eventsTable.createdAt)}</th>
              </tr>
            </thead>
            <tbody className="tbody text-gray-600 dark:text-light-gray text-sm font-light">
              {data &&
                data.length > 0 &&
                data.map((event) => (
                  <tr
                    key={event?._id}
                    onClick={() => handleNavigateSingleEvent(event?._id)}
                    className="border-b border-light-gray dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-gray-2 cursor-pointer"
                  >
                    <td
                      className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                      data-label={t(translations.adminPanel.events.eventsTable.eventIdDL)}
                    >
                      {event?._id}
                    </td>
                    <td
                      className={`td text-center whitespace-nowrap ${event?.isActive ? "text-primary-green dark:text-green-300" : "text-danger dark:text-red-300"}`}
                      data-label="Event Status"
                    >
                      {event?.isActive ? t(translations.adminPanel.active) : t(translations.adminPanel.suspended)}
                    </td>
                    <td
                      className={`td text-center whitespace-nowrap ${event?.isDone ? "text-primary-green dark:text-green-300" : "text-warning dark:text-orange-300"}`}
                      data-label="Completion Status"
                    >
                      {event?.isDone ? t(translations.adminPanel.events.eventsTable.completed) : t(translations.adminPanel.events.eventsTable.waiting)}
                    </td>
                    <td
                      className="td text-left whitespace-nowrap overflow-ellipsis overflow-hidden"
                      data-label={t(translations.adminPanel.events.eventsTable.eventTitleDL)}
                    >
                      {event?.title}
                    </td>
                    <td
                      className="td text-left 2xl:w-[100px] whitespace-nowrap"
                      data-label={t(translations.adminPanel.events.eventsTable.eventCreatorDL)}
                    >
                      {event?.createdBy?.fullName || event?.createdBy?.organizationName}
                    </td>
                    <td
                      className="td text-center max-w-[150px] whitespace-nowrap flex justify-between items-center overflow-x-scroll scrollbar-hide"
                      data-label={t(translations.adminPanel.events.eventsTable.attendantsDL)}
                    >
                      {event?.eventParticipantIds && (
                        <AttendantsAvatars
                          participants={event?.eventParticipantIds}
                          totalParticipants={event?.eventParticipantIds?.length}
                          maxParticipant={event?.maxParticipant}
                          avatarCount={4}
                          gap={1}
                          showAll={true}
                        />
                      )}
                    </td>
                    <td className="td text-center whitespace-nowrap" data-label={t(translations.adminPanel.events.eventsTable.createdAtDL)}>
                      {new Date(event?.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>{t(translations.adminPanel.events.eventsTable.noEvents)}</div>
      )}
    </>
  )
}

export default EventsTable
