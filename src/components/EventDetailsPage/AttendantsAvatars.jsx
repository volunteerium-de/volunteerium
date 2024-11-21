import React from "react"
import { UserAvatar } from "../ui/Avatar/userAvatar"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useMemo } from "react"

const AttendantsAvatars = ({
  participants,
  totalParticipants,
  maxParticipant,
  avatarCount,
  showAll,
  gap,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Use the participants directly if showAll is true, otherwise filter for approved ones
  const filteredParticipants = useMemo(() => {
    return showAll
      ? participants
      : participants
        ? participants.filter((participant) => participant.isApproved === true)
        : []
  }, [participants, showAll])

  // Limit the displayed participants to avatarCount
  const visibleParticipants = useMemo(() => {
    return filteredParticipants.slice(0, avatarCount)
  }, [filteredParticipants, avatarCount])

  const remainingCount = filteredParticipants.length - visibleParticipants.length

  // console.log(visibleParticipants)

  const handleAvatarClick = (userId) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <div>
      {!showAll && (
        <h3 className="text-dark-gray-2 dark:text-white text-[1rem] font-semibold">
          {t(translations.eventDetails.attendants)} ({totalParticipants}/{maxParticipant})
        </h3>
      )}
      <div
        className={`avatars flex ${!showAll && "flex-wrap"} gap-${gap} ${!showAll ? "py-2" : "py-0"} `}
      >
        {/* Display the first 6 avatars */}

        {visibleParticipants.length > 0 ? (
          visibleParticipants.map(({ userId }, index) => (
            <div key={index} onClick={() => handleAvatarClick(userId._id)}>
              <UserAvatar user={userId} size="h-6 w-6 cursor-pointer" backgroundActive={true} />
            </div>
          ))
        ) : (
          <p>{t(translations.eventDetails.noAttendants)}</p>
        )}

        {/* Show the +N circle if there are hidden participants */}
        {remainingCount > 0 && (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-primary-green font-semibold p-1.5">
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendantsAvatars
