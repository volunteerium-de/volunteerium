import { BiCalendar } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"
import { GrLanguage } from "react-icons/gr"
import { FaPeopleLine } from "react-icons/fa6"
import { formatDateWithTime } from "../../helpers/formatDate"
import AttendantsAvatars from "./AttendantsAvatars"
import EventFeedback from "./EventFeedback"
import { useState } from "react"
import useLanguageOptions from "../../hooks/useLanguages"
import { translations } from "../../locales/translations"
import { useTranslation } from "react-i18next"
import EventParticipationButtons from "./EventParticipationButtons"
import { useSelector } from "react-redux"
import useChatCall from "../../hooks/useChatCall"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"

const EventOverview = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const { singleEvent } = useSelector((state) => state.event)
  const { t } = useTranslation()
  const { createConversation } = useChatCall()
  const { conversations } = useSelector((state) => state.chat)
  const { currentUser: user } = useSelector((state) => state.auth)
  const { getLangName } = useLanguageOptions()
  const navigate = useNavigate()

  const { startDate, addressId, isOnline, maxParticipant, languages, eventParticipantIds } =
    singleEvent

  const toggleFeedbackModal = () => {
    setIsFeedbackOpen((prevState) => !prevState)
  }

  const totalParticipants = eventParticipantIds.filter(
    (participant) => participant.isApproved === true
  ).length

  const handleSendMessage = async () => {
    let conversationId
    const existingConversation = conversations.find(
      (conversation) =>
        conversation?.eventId?._id === singleEvent?._id && conversation?.createdBy._id === user._id
    )
    if (existingConversation) {
      conversationId = existingConversation?._id
    } else {
      conversationId = await createConversation(singleEvent?._id, singleEvent.createdBy._id)
    }
    setTimeout(() => {
      navigate(`/event-management?tab=messages&conversation=${conversationId}`)
    }, 1000)
  }

  const isEventOwner = useMemo(() => user?._id === singleEvent?.createdBy?._id, [user, singleEvent])
  const isIndividual = useMemo(() => user?.userType === "individual", [user])
  const canSendMessage = useMemo(
    () => (isEventOwner && !isIndividual) || isIndividual,
    [isEventOwner, isIndividual]
  )

  return (
    <div className="flex flex-col text-gray-2 space-y-4 border md:border-r md:border-b md:border-t-0 md:border-l-0 border-light-gray-3 rounded p-4 lg:px-0 lg:py-2 gap-y-7">
      <div className="font-medium text-[0.9rem] space-y-1">
        <div className="flex items-center space-x-2">
          <BiCalendar className="text-[1.25rem]" />
          <span>{formatDateWithTime(startDate)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaLocationDot className="text-[1.25rem]" />
          <span>{isOnline ? "Online" : `${addressId?.city}, ${addressId?.country}`}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaPeopleLine className="text-[1.25rem]" />
          <span>
            Max. {maxParticipant} {t(translations.eventDetails.people)}
          </span>
        </div>
        {languages.length > 0 && (
          <div className="flex items-center space-x-2">
            <GrLanguage className="text-[1.25rem]" />
            {languages?.map((language, index) => (
              <span key={index}>
                {getLangName(language)}
                {index < languages?.length - 1 && <span>,</span>}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Attendants */}
      <AttendantsAvatars
        participants={eventParticipantIds}
        totalParticipants={totalParticipants}
        maxParticipant={maxParticipant}
        avatarCount={6}
        gap={5}
        showAll={false}
      />
      {/* Buttons */}
      <div className="flex justify-center xl:justify-end space-x-4 lg:px-2">
        {canSendMessage && (
          <button
            onClick={handleSendMessage}
            className="border border-gray-1 hover:bg-light-gray lg:px-2 py-1 font-medium text-center w-[8rem] h-8 rounded-lg text-xs md:text-[10px] lg:text-[12px]"
          >
            {t(translations.eventDetails.sendMessageButton)}
          </button>
        )}
        <EventParticipationButtons event={singleEvent} toggleFeedbackModal={toggleFeedbackModal} />
      </div>
      {isFeedbackOpen && (
        <EventFeedback
          eventName={singleEvent.title}
          eventId={singleEvent._id}
          onClose={toggleFeedbackModal}
        />
      )}
    </div>
  )
}

export default EventOverview
