import React from "react"
import { UserAvatar } from "../ui/Avatar/userAvatar"
import { useNavigate } from "react-router-dom"

const AttendantsAvatars = ({
  participants,
  totalParticipants,
  maxParticipant,
  avatarCount,
  gap,
}) => {
  // Limit the displayed participants to 6
  const visibleParticipants = participants
    ? participants.length > 0
      ? participants.slice(0, avatarCount)
      : 0
    : 0
  const remainingCount = participants ? participants.length - visibleParticipants.length : 0
  console.log(visibleParticipants)

  const navigate = useNavigate()
  const handleAvatarClick = (userId) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <div>
      <h3 className="text-dark-gray-1 text-[1rem] font-semibold">
        Attendants ({totalParticipants}/{maxParticipant})
      </h3>
      <div className={`avatars flex flex-wrap gap-${gap} py-2`}>
        {/* Display the first 6 avatars */}

        {visibleParticipants ? (
          visibleParticipants.map(({ userId }, index) => (
            <div key={index} onClick={() => handleAvatarClick(userId._id)}>
              {console.log("adsad", userId)}
              <UserAvatar user={userId} size="h-6 w-6" backgroundActive={true} />
            </div>
          ))
        ) : (
          <p>No attendants yet</p>
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
