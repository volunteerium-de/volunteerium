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

const EventOverview = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const { singleEvent } = useSelector((state) => state.event)
  const { t } = useTranslation()
  const { getLangName } = useLanguageOptions()

  const { startDate, addressId, isOnline, maxParticipant, languages, eventParticipantIds } =
    singleEvent

  const toggleFeedbackModal = () => {
    setIsFeedbackOpen(!isFeedbackOpen)
  }

  const totalParticipants = eventParticipantIds.filter(
    (participant) => participant.isApproved === true
  ).length

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
      />
      {/* Buttons */}
      <div className="flex justify-center xl:justify-end  p-2 space-x-4">
        <button className="border border-gray-1 hover:bg-light-gray px-2 py-1 font-medium text-center w-[10rem] h-8 rounded-lg text-xs md:text-sm">
          {t(translations.eventDetails.sendMessageButton)}
        </button>
        <div>
          <EventParticipationButtons
            event={singleEvent}
            toggleFeedbackModal={toggleFeedbackModal}
          />

          {isFeedbackOpen && <EventFeedback onClose={toggleFeedbackModal} />}
        </div>
      </div>
    </div>
  )
}

export default EventOverview
