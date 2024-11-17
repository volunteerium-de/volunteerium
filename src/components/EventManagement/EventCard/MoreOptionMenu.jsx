import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FaEllipsis, FaX } from "react-icons/fa6"
import useEventCall from "../../../hooks/useEventCall"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import DeleteModal from "../../ui/Modals/DeleteModal"

const MoreOptionsMenu = ({ isOrganized, eventId, refetch, event, onAddEvent, setEditEvent }) => {
  const { t } = useTranslation()

  const [menuVisible, setMenuVisible] = useState(false)
  const { currentUser: user } = useSelector((state) => state.auth)
  const { deleteEvent, deleteEventParticipation } = useEventCall()
  const toggleMenu = () => setMenuVisible(!menuVisible)
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false)
  const [isLeaveEventModalOpen, setIsLeaveEventModalOpen] = useState(false)

  const handleDelete = async () => {
    await deleteEvent(eventId)
    setIsDeleteEventModalOpen(false)
    closeDeleteEventModal()
    await refetch()
  }

  const handleLeaveEvent = async () => {
    const eventParticipantId = event.eventParticipantIds.find(
      (participant) => participant.userId._id === user._id
    )._id
    await deleteEventParticipation(eventParticipantId)
    await refetch()
  }

  const closeDeleteEventModal = () => {
    setIsDeleteEventModalOpen(false)
  }

  const handleDeleteButtonClick = () => {
    setIsDeleteEventModalOpen((isDeleteEventModalOpen) => !isDeleteEventModalOpen)
  }

  const closeLeaveEventModal = () => {
    setIsLeaveEventModalOpen(false)
  }

  const handleLeaveButtonClick = () => {
    setIsLeaveEventModalOpen((isLeaveEventModalOpen) => !isLeaveEventModalOpen)
  }

  const handleEditButtonClick = () => {
    setEditEvent(event)
    onAddEvent()
  }

  return (
    <div className="relative">
      <div className="gap-3 hidden sm:flex">
        {isOrganized && (
          <>
            <button
              onClick={handleEditButtonClick}
              className="flex md:text-[0.8rem] text-[0.6rem] px-3 sm:py-1 py-2 items-center rounded-lg border border-primary-green text-primary-green dark:text-light-green dark:border-light-greens hover:text-white hover:bg-primary-green hover:border-white"
            >
              <FaEdit className="mr-1" />
              {t(translations.eventManagement.editButton)}
            </button>

            <button
              onClick={handleDeleteButtonClick}
              className="flex md:text-[0.8rem] text-[0.6rem] px-1 sm:py-1 py-2 items-center border  border-danger dark:text-red-100 dark:border-red-100 rounded-lg text-danger hover:text-white hover:bg-danger hover:border-white"
            >
              <FaX className="mr-1 text-[0.6rem]" />
              {t(translations.eventManagement.deleteButton)}
            </button>
          </>
        )}
        {!isOrganized && (
          <button
            onClick={handleLeaveButtonClick}
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
          {isOrganized && (
            <>
              {/* Edit Button */}
              <div className="flex gap-2">
                <button className="w-full text-left px-3 py-2 text-primary-green border-b border-gray-200 hover:bg-gray-100 flex items-center justify-start">
                  <FaEdit className="mr-2 text-lg" />
                  <p>{t(translations.eventManagement.editButton)}</p>
                </button>
              </div>

              {/* Cancel/Delete Button */}
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteButtonClick}
                  className="w-full text-left px-3 py-2 text-danger dark:text-red-600 dark:border-red-600 hover:bg-gray-100 flex items-center justify-start"
                >
                  <FaX className="mr-2 text-lg" />
                  <p>{t(translations.eventManagement.deleteButton)}</p>
                </button>
              </div>
            </>
          )}
          {!isOrganized && (
            <>
              {/* Leave Event Button */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleLeaveButtonClick}
                  className="w-full text-left px-3 py-2 text-danger dark:text-red-600 dark:border-red-600 hover:bg-gray-100 flex items-center justify-start"
                >
                  <FaX className="mr-2 text-[.8rem]" />
                  <p>{t(translations.eventManagement.leaveEventButton)}</p>
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {/* Delete Modal */}
      {isDeleteEventModalOpen && (
        <DeleteModal
          onClose={closeDeleteEventModal}
          onDelete={handleDelete}
          title={t(translations.delModal.delButton)}
          description={t(translations.delModal.deleteEventDesc)}
        />
      )}

      {/* Delete Modal */}
      {isLeaveEventModalOpen && (
        <DeleteModal
          onClose={closeLeaveEventModal}
          onDelete={handleLeaveEvent}
          title={t(translations.delModal.delButton)}
          description={t(translations.delModal.leaveEventDesc)}
          buttonName={t(translations.delModal.leaveButton)}
        />
      )}
    </div>
  )
}

export default MoreOptionsMenu
