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
  gap,
}) => {
  const { t } = useTranslation()

  const approvedParticipants = useMemo(() => {
    return participants ? participants.filter((participant) => participant.isApproved === true) : []
  }, [participants])

  // Limit the displayed participants to avatarCount
  const visibleParticipants = useMemo(() => {
    return approvedParticipants.slice(0, avatarCount)
  }, [approvedParticipants, avatarCount])

  const remainingCount = participants ? approvedParticipants.length - visibleParticipants.length : 0
  // console.log(visibleParticipants)

  const navigate = useNavigate()
  const handleAvatarClick = (userId) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <div>
      <h3 className="text-dark-gray-2 dark:text-white text-[1rem] font-semibold">
        {t(translations.eventDetails.attendants)} ({totalParticipants}/{maxParticipant})
      </h3>
      <div className={`avatars flex flex-wrap gap-${gap} py-2`}>
        {/* Display the first 6 avatars */}

        {visibleParticipants.length > 0 ? (
          visibleParticipants.map(({ userId }, index) => (
            <div key={index} onClick={() => handleAvatarClick(userId._id)}>
              <UserAvatar user={userId} size="h-6 w-6" backgroundActive={true} />
            </div>
          ))
        ) : (
          <p>{t(translations.eventDetails.noAttendants)}</p>
        )}

        {/* Show the +N circle if there are hidden participants */}
        {remainingCount > 0 && (
          <div className="flex items-center justify-center w-10 h-10  rounded-full bg-gray-200 text-primary-green font-semibold p-1.5">
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendantsAvatars
