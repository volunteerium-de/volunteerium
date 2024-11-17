import useEventCall from "../../../hooks/useEventCall"
import { UserAvatar } from "../../ui/Avatar/userAvatar"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const ParticipantRequestItem = ({ user, event, refetch }) => {
  const { approveParticipant, rejectParticipant, deleteEventParticipation } = useEventCall()
  const { t } = useTranslation()

  const handleAccept = async () => {
    await approveParticipant(user.userId._id, event._id)
    await refetch()
  }

  const handleReject = async () => {
    await rejectParticipant(user.userId._id, event._id)
    await refetch()
  }

  const handleRemove = async () => {
    await deleteEventParticipation(user._id)
    await refetch()
  }

  return (
    <div className="flex items-center w-full justify-between bg-light-gray-2 dark:bg-dark-gray-2 rounded-md py-2 px-2">
      <div className="flex items-center gap-3 justify-center">
        <UserAvatar user={user.userId} size="h-10 w-10" backgroundActive={true} />

        <span className="flex text-primary-green font-medium">{user.userId.fullName}</span>
      </div>
      <div className="flex space-x-2">
        {!user.isApproved && (
          <>
            {/* Reject */}
            <button
              className="bg-transparent hover:text-white hover:border-white hover:bg-danger dark:text-dark-gray-1 border-gray-2 px-2 py-0.5 border rounded-md text-sm"
              onClick={handleReject}
            >
              {t(translations.eventManagement.rejectButton)}
            </button>

            {/* Accept */}
            <button
              className="bg-primary-green hover:bg-dark-green text-white text-sm px-2 py-0.5 rounded-md"
              onClick={handleAccept}
            >
              {t(translations.eventManagement.acceptButton)}
            </button>
          </>
        )}

        {user.isApproved && (
          <>
            {/* Reject */}
            <button
              className="bg-transparent hover:text-white hover:border-white hover:bg-danger dark:text-dark-gray-1 px-2 py-0.5 border  border-gray-2  rounded-md text-sm"
              onClick={handleRemove}
            >
              {t(translations.eventManagement.removeButton)}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ParticipantRequestItem
