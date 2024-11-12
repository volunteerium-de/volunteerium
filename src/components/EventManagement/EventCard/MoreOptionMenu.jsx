import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FaEllipsis, FaX } from "react-icons/fa6"
import useEventCall from "../../../hooks/useEventCall"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const MoreOptionsMenu = ({ isOrganized, eventId, refetch, event }) => {
  const { t } = useTranslation()

  const [menuVisible, setMenuVisible] = useState(false)
  const { currentUser: user } = useSelector((state) => state.auth)
  const { deleteEvent, deleteEventParticipation } = useEventCall()
  const toggleMenu = () => setMenuVisible(!menuVisible)

  const handleDelete = async () => {
    await deleteEvent(eventId)
    await refetch()
  }

  const handleLeaveEvent = async () => {
    const eventParticipantId = event.eventParticipantIds.find(
      (participant) => participant.userId._id === user._id
    )._id
    console.log(eventParticipantId)
    await deleteEventParticipation(eventParticipantId)
    await refetch()
  }

  return (
    <div className="relative">
      <div className="gap-3 hidden sm:flex">
        {isOrganized && (
          <>
            <button className="flex md:text-[0.8rem] text-[0.6rem] px-3 sm:py-1 py-2 items-center rounded-lg border border-primary-green text-primary-green dark:text-light-green dark:border-light-greens hover:text-white hover:bg-primary-green hover:border-white">
              <FaEdit className="mr-1" />
              {t(translations.eventManagement.editButton)}
            </button>

            <button
              onClick={handleDelete}
              className="flex md:text-[0.8rem] text-[0.6rem] px-1 sm:py-1 py-2 items-center border  border-danger dark:text-red-100 dark:border-red-100 rounded-lg text-danger hover:text-white hover:bg-danger hover:border-white"
            >
              <FaX className="mr-1 text-[0.6rem]" />
              {t(translations.eventManagement.deleteButton)}
            </button>
          </>
        )}
        {!isOrganized && (
          <button
            onClick={handleLeaveEvent}
            className="flex md:text-[0.8rem] text-[0.6rem] px-1 sm:py-1 py-2 items-center border dark:text-red-100 dark:border-red-100 border-danger rounded-lg text-danger hover:text-white hover:bg-danger hover:border-white"
          >
            <FaX className="mr-1 text-[0.6rem]" />
            {t(translations.eventManagement.leaveEventButton)}
          </button>
        )}
      </div>
      <button onClick={toggleMenu} className="sm:hidden flex items-center text-primary-green">
        <FaEllipsis className="text-[1.25rem]" />
      </button>
      {menuVisible && (
        <div className="absolute -right-4 mt-1 w-40 bg-white dark:bg-dark-gray-3 border rounded-lg shadow-lg z-10">
          {/* Edit Button */}
          <div className="flex gap-2">
            <button className="w-full text-left px-3 py-2 text-primary-green border-b border-gray-200 hover:bg-gray-100 flex items-center justify-start">
              <FaEdit className="mr-2 text-lg" />
              <p>{t(translations.eventManagement.editButton)}</p>
            </button>
          </div>

          {/* Cancel Button */}
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="w-full text-left px-3 py-2 text-danger dark:text-red-600 dark:border-red-600 hover:bg-gray-100 flex items-center justify-start"
            >
              <FaX className="mr-2 text-lg" />
              <p>{t(translations.eventManagement.deleteButton)}</p>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoreOptionsMenu
