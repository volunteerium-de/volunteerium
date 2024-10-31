import React from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { useSelector } from "react-redux"

const EventParticipationButtons = ({ event, toggleFeedbackModal }) => {
  const { t } = useTranslation()
  const { currentUser: user } = useSelector((state) => state.auth)

  // console.log(event.eventParticipantIds)
  // {
  //   "joinStatus": "pending",
  //   "_id": "671a1012930472fa12a8698a",
  //   "userId": {
  //       "_id": "6705950807d97dbaa93f1548",
  //       "fullName": "Omer Faruk Capur",
  //       "email": "omerrfarukcapur@gmail.com",
  //       "userDetailsId": {
  //           "_id": "6705950807d97dbaa93f154a",
  //           "isFullNameDisplay": true,
  //           "avatar": "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG"
  //       }
  //   },
  //   "eventId": "6717b233ace2ba475d675632",
  //   "isPending": false,
  //   "isApproved": true,
  //   "hasJoined": false,
  //   "createdAt": "2024-10-24T09:14:58.867Z",
  //   "updatedAt": "2024-10-24T09:17:07.424Z",
  //   "__v": 0
  // }

  // Kullanıcının etkinlikteki durumunu belirleyin
  const participant = event.eventParticipantIds.find(
    (participant) => participant.userId._id === user._id
  )

  // Durumları tanımlayın
  const isEventDone = new Date() > new Date(event.startDate)
  const isMaxParticipantsReached = event.eventParticipantIds.length >= event.maxParticipant
  const isPending = participant?.isPending
  const isApproved = participant?.isApproved
  const isJoined = participant?.joinStatus === "joined"
  const isNotJoined = participant?.joinStatus === "notJoined"
  const isFeedbackGiven = event.eventFeedbackIds.some((feedback) => feedback.userId === user._id)
  const isRejected = !isApproved && !isPending && isNotJoined

  let buttonText
  let buttonAction = () => {}
  let buttonClass = "bg-primary-green"

  switch (true) {
    case isEventDone:
      buttonText = t(translations.eventDetails.completedButton)
      buttonClass = "bg-gray-400"
      break
    case isMaxParticipantsReached:
      buttonText = t(translations.eventDetails.rejectedButton)
      buttonClass = "bg-red-400"
      break
    case isPending:
      buttonText = t(translations.eventDetails.pendingButton)
      buttonAction = () => console.log("Cancel Request")
      break
    case isApproved:
      buttonText = t(translations.eventDetails.approvedButton)
      buttonAction = () => console.log("Cancel Request")
      break
    case isRejected:
      buttonText = t(translations.eventDetails.rejectedButton)
      break
    case isFeedbackGiven:
      buttonText = t(translations.eventDetails.shareFeedbackButton)
      buttonAction = toggleFeedbackModal
      break
    case isNotJoined:
      buttonText = t(translations.eventDetails.joinButton)
      buttonAction = () => console.log("Join Event")
      break
    default:
      buttonText = t(translations.eventDetails.joinButton)
      break
  }

  // Default: Join
  // isEventDone => Completed
  // isMaxParticipantsReached => Capacity Reached
  // isPending => Pending... => if clicked, Cancel Request
  // isApproved => Approved => if clicked, Cancel Request
  // isRejected => Rejected => No more join requests
  // isFeedback => After event, show feedback button
  // isFeedbackGiven => No button

  return (
    <>
      <button
        className={`${buttonClass} hover:bg-opacity-60 text-white font-semibold px-2 py-1 text-center min-w-[100px] max-w-full h-8 grid place-content-center rounded-lg text-xs md:text-sm`}
        onClick={buttonAction}
        disabled={isMaxParticipantsReached || isEventDone || isRejected}
      >
        {buttonText}
      </button>
    </>
  )
}

export default EventParticipationButtons
