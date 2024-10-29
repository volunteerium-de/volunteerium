import React from "react"

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

  return (
    <div>
      <h3 className="text-dark-gray-1 text-[1rem] font-semibold">
        Attendants ({totalParticipants}/{maxParticipant})
      </h3>
      <div className={`avatars flex flex-wrap gap-${gap} py-2`}>
        {/* Display the first 6 avatars */}
        {visibleParticipants ? (
          visibleParticipants.map(({ userId }, index) => (
            <img
              key={index}
              src={userId?.userDetailsId?.avatar}
              alt="user avatar"
              className="participant-avatar w-10 h-10 rounded-full object-cover"
            />
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
