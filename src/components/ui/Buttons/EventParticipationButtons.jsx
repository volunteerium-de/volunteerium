import React from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"

const EventParticipationButtons = ({ event, toggleFeedbackModal = () => {} }) => {
  const { t } = useTranslation()
  const { currentUser: user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

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
  //   "createdAt": "2024-10-24T09:14:58.867Z",
  //   "updatedAt": "2024-10-24T09:17:07.424Z",
  //   "__v": 0
  // }

  // hidden if:
  // - user is already joined to the event (in homepage "/")
  // - user.userType is "organization" or "admin" (in homepage "/" , in events page "/events" and in single event page "/events/:eventId")

  // Kullanıcının etkinlikteki durumunu belirleyin
  const participant = event.eventParticipantIds.find(
    (participant) => participant?.userId?._id === user?._id
  )

  // Durumları tanımlayın
  const isEventDone = new Date() > new Date(event.startDate)
  const isMaxParticipantsReached = event.eventParticipantIds.length >= event?.maxParticipant
  const isPending = participant?.isPending
  const isApproved = participant?.isApproved
  const isJoined = participant?.joinStatus === "joined"
  const isNotJoined = participant?.joinStatus === "notJoined"
  const isFeedbackGiven = event.eventFeedbackIds.some((feedback) => feedback?.userId === user?._id)
  const isRejected = !isApproved && !isPending

  const isAdmin = user?._id === import.meta.env.VITE_ADMIN_ID
  const isEventOwner = user?._id === event?.createdBy?._id
  const isOrganization = user?.userType === "organization"
  const isIndividual = user?.userType === "individual"
  const canManageEvent = isEventOwner || isAdmin

  const buttonConfig = useMemo(() => {
    if (canManageEvent) {
      return {
        text: t(translations.eventDetails.manageButton),
        action: () =>
          navigate(
            `event-management/?tab=${isAdmin ? "events" : "organized-events"}&identifier=${event?._id}`
          ),
        className: "bg-purple-400 hover:bg-purple-400/60",
      }
    }

    if (!participant && !isEventDone && user?.userType === "individual") {
      return {
        text: t(translations.eventDetails.joinButton),
        action: () => {},
        className: "bg-primary-green hover:bg-primary-green/60",
      }
    }

    if (!participant) {
      if (isEventDone) {
        return { text: t(translations.eventDetails.completedButton), className: "bg-gray-2" }
      }
      if (isMaxParticipantsReached) {
        return {
          text: t(translations.eventDetails.maxReacedButton),
          action: () => {},
          className: "bg-gray-2",
        }
      }
    }

    if (participant) {
      if (isPending) {
        return {
          text: t(translations.eventDetails.pendingButton),
          action: () => navigate(`event-management/?tab=attended-events&identifier=${event?._id}`),
          className: "bg-warning hover:bg-warning/60",
        }
      }
      if (!isEventDone && isApproved) {
        return {
          text: t(translations.eventDetails.approvedButton),
          action: () => navigate(`event-management/?tab=attended-events&identifier=${event?._id}`),
          className: "bg-yellow-500 hover:bg-yellow-500/60",
        }
      }
      if (!isEventDone && isRejected) {
        return {
          text: t(translations.eventDetails.rejectedButton),
          action: () => {},
          className: "bg-danger",
        }
      }
      if (isEventDone && isApproved && !isFeedbackGiven) {
        return {
          text: t(translations.eventDetails.shareFeedbackButton),
          action: toggleFeedbackModal,
          className: "bg-blue-400",
        }
      }
    }

    return {
      text: "",
      action: () => {},
      className: "hidden",
    }
  }, [
    user,
    canManageEvent,
    participant,
    isEventDone,
    isMaxParticipantsReached,
    isPending,
    isApproved,
    isAdmin,
    isRejected,
    isFeedbackGiven,
    t,
    event,
    navigate,
    toggleFeedbackModal,
  ])
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
        className={`${buttonConfig.className || ""} ${!canManageEvent && user.userType === "organization" ? "hidden" : ""} text-white font-semibold px-2 py-1 text-center min-w-[100px] max-w-full h-8 grid place-content-center rounded-lg text-xs md:text-sm`}
        onClick={buttonConfig.action}
        disabled={isMaxParticipantsReached || isEventDone || isRejected}
        aria-label={buttonConfig.text}
      >
        {buttonConfig.text}
      </button>
    </>
  )
}

export default EventParticipationButtons
