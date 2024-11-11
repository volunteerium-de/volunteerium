import { useRef } from "react"
import { useEffect } from "react"
import ParticipantRequestList from "./ParticipantRequestList"
import { FaX } from "react-icons/fa6"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const ParticipantRequestsModal = ({ onClose, event, refetch }) => {
  const modalRef = useRef(null)
  const participantsAwaitingApproval = event.eventParticipantIds.filter(
    (participant) => participant.isApproved === false
  )
  const approvedParticipants = event.eventParticipantIds.filter(
    (participant) => participant.isApproved === true
  )

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(modalRef.current && !modalRef.current.contains(e.target))
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [modalRef])

  const { t } = useTranslation()

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          ref={modalRef}
          className="bg-white dark:bg-dark-gray-3 p-4 rounded-lg max-w-[30rem] w-full space-y-4"
        >
          <div className="flex justify-end" onClick={onClose}>
            <FaX className="text-dark-gray-3" />
          </div>

          <ParticipantRequestList
            title={t(translations.eventManagement.joinRequests)}
            event={event}
            participants={participantsAwaitingApproval}
            refetch={refetch}
          />

          {/* Participats */}
          <ParticipantRequestList
            title={t(translations.eventManagement.participants)}
            event={event}
            participants={approvedParticipants}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  )
}

export default ParticipantRequestsModal
