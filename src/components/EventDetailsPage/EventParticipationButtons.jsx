import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { translations } from "../../locales/translations"
import useEventCall from "../../hooks/useEventCall"
import { useState } from "react"
import { ImSpinner9 } from "react-icons/im"

const EventParticipationButtons = ({ toggleFeedbackModal }) => {
  const { t } = useTranslation()
  const { singleEvent, participationLoading } = useSelector((state) => state.event)
  const { currentUser: user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const { joinEvent } = useEventCall()

  const participant =
    singleEvent?.eventParticipantIds.filter(
      (participant) => participant?.userId?._id === user?._id
    )[0] || null

  // console.log(participant)
  // console.log(singleEvent)

  // {
  //   "_id": "671b9bde48dff9789d35f540",
  //   "createdBy": {
  //       "_id": "6705950807d97dbaa93f1548",
  //       "userType": "individual",
  //       "fullName": "Omer Faruk Capur",
  //       "email": "omerrfarukcapur@gmail.com",
  //       "userDetailsId": {
  //           "_id": "6705950807d97dbaa93f154a",
  //           "isFullNameDisplay": true,
  //           "avatar": "https://volunteerium.s3.amazonaws.com/1728549100230-avatar_photo_capur.JPG"
  //       }
  //   },
  //   "title": "Prague Disaster Relief Volunteer Day",
  //   "description": "Join us for the Prague Disaster Relief Volunteer Day to support our community affected by recent natural disasters. This event is an opportunity to help those in need through various activities such as debris cleanup, food distribution, and emotional support.\n\nVolunteers will gather for a brief orientation to discuss tasks and safety measures. Refreshments will be provided, and every volunteer will receive a certificate of appreciation.\n\nLet’s unite to restore hope and resilience in Prague!",
  //   "addressId": {
  //       "_id": "671b9bdd48dff9789d35f53e",
  //       "city": "Prague",
  //       "country": "Czech Republic",
  //       "zipCode": "110 00",
  //       "state": "",
  //       "streetName": "Václavské náměstí",
  //       "streetNumber": "1",
  //       "iframeSrc": "https://www.openstreetmap.org/export/embed.html?bbox=14.4241277%2C50.0844133%2C14.4241277%2C50.0844133&layer=mapnik",
  //       "latitude": 50.0844133,
  //       "longitude": 14.4241277,
  //       "createdAt": "2024-10-25T13:23:41.594Z",
  //       "updatedAt": "2024-10-25T14:26:01.061Z",
  //       "__v": 0
  //   },
  //   "interestIds": [
  //       {
  //           "_id": "670a1f6d891c0e240c90c476",
  //           "name": "Disaster Relief"
  //       }
  //   ],
  //   "startDate": "2025-02-12T08:00:00.000Z",
  //   "endDate": "2025-02-12T14:00:00.000Z",
  //   "languages": [],
  //   "documentIds": [],
  //   "isOnline": false,
  //   "isRepeat": false,
  //   "isActive": true,
  //   "isDone": false,
  //   "maxParticipant": 20,
  //   "eventParticipantIds": [
  //       {
  //           "_id": "6724f5de700f88d84c9e5971",
  //           "userId": {
  //               "_id": "6718e812cbbdea709fdd434e",
  //               "fullName": "Abdulkadir Tartilaci",
  //               "email": "tartilaci@gmail.com",
  //               "userDetailsId": {
  //                   "_id": "6718e812cbbdea709fdd4350",
  //                   "isFullNameDisplay": true,
  //                   "avatar": "https://volunteerium.s3.amazonaws.com/1729757655177-avatar_logo7.png"
  //               }
  //           },
  //           "eventId": "671b9bde48dff9789d35f540",
  //           "isPending": true,
  //           "isApproved": false,
  //           "joinStatus": "pending",
  //           "createdAt": "2024-11-01T15:38:06.287Z",
  //           "updatedAt": "2024-11-01T15:38:06.287Z",
  //           "__v": 0
  //       }
  //   ],
  //   "eventFeedbackIds": [],
  //   "createdAt": "2024-10-25T13:23:43.002Z",
  //   "updatedAt": "2024-11-01T15:38:06.347Z",
  //   "__v": 0
  // }

  // {
  //   "_id": "6724f5de700f88d84c9e5971",
  //   "userId": {
  //       "_id": "6718e812cbbdea709fdd434e",
  //       "fullName": "Abdulkadir Tartilaci",
  //       "email": "tartilaci@gmail.com",
  //       "userDetailsId": {
  //           "_id": "6718e812cbbdea709fdd4350",
  //           "isFullNameDisplay": true,
  //           "avatar": "https://volunteerium.s3.amazonaws.com/1729757655177-avatar_logo7.png"
  //       }
  //   },
  //   "eventId": "671b9bde48dff9789d35f540",
  //   "isPending": true,
  //   "isApproved": false,
  //   "joinStatus": "pending",
  //   "createdAt": "2024-11-01T15:38:06.287Z",
  //   "updatedAt": "2024-11-01T15:38:06.287Z",
  //   "__v": 0
  // }

  const isEventDone = new Date() > new Date(singleEvent?.startDate)
  const isMaxParticipantsReached =
    singleEvent?.eventParticipantIds.filter((participant) => participant?.isApproved === true)
      .length >= singleEvent?.maxParticipant
  const isPending = participant?.isPending
  const isApproved = participant?.isApproved
  const isFeedbackGiven = singleEvent?.eventFeedbackIds.some(
    (feedback) => feedback?.userId === user?._id
  )
  const isRejected = !isApproved && !isPending
  const isAdmin = user?._id === import.meta.env.VITE_ADMIN_ID
  const isEventOwner = user?._id === singleEvent?.createdBy?._id
  const isIndividual = user?.userType === "individual"
  const canManageEvent = isEventOwner || isAdmin

  const buttonConfig = useMemo(() => {
    if (canManageEvent) {
      return {
        text: t(translations.eventDetails.manageButton),
        action: () =>
          navigate(
            `/event-management/?tab=${isAdmin ? "events" : "organized-events"}&identifier=${singleEvent?._id}`
          ),
        className: "bg-purple-400 hover:bg-purple-400/60",
      }
    }

    if (!participant && !isEventDone && isIndividual && !isEventOwner) {
      return {
        text: t(translations.eventDetails.joinButton),
        action: () => joinEvent(singleEvent?._id),
        className: "bg-primary-green hover:bg-primary-green/60",
      }
    }

    if (!participant && isIndividual) {
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

    if (participant && isIndividual && !isEventOwner) {
      if (isPending) {
        return {
          text: t(translations.eventDetails.pendingButton),
          action: () =>
            navigate(`/event-management/?tab=attended-events&identifier=${singleEvent?._id}`),
          className: "bg-warning hover:bg-warning/60",
        }
      }
      if (!isEventDone && isApproved && !isPending) {
        return {
          text: t(translations.eventDetails.approvedButton),
          action: () =>
            navigate(`/event-management/?tab=attended-events&identifier=${singleEvent?._id}`),
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
      if (isEventDone && isApproved && isFeedbackGiven) {
        return { text: t(translations.eventDetails.completedButton), className: "bg-gray-2" }
      }
    }

    return {
      text: "",
      action: () => {},
      className: "hidden",
    }
  }, [
    singleEvent,
    participant,
    isIndividual,
    isEventOwner,
    isPending,
    isApproved,
    isRejected,
    isEventDone,
    isFeedbackGiven,
    isMaxParticipantsReached,
    toggleFeedbackModal,
    isAdmin,
    canManageEvent,
    joinEvent,
    navigate,
    t,
  ])

  return (
    <>
      {singleEvent && (
        <button
          className={`${buttonConfig.className || ""} text-white font-semibold px-2 py-1 text-center min-w-[100px] max-w-full h-8 grid place-content-center rounded-lg text-xs md:text-sm`}
          onClick={buttonConfig.action}
          // disabled={isMaxParticipantsReached || isEventDone || (participant && isRejected)}
          aria-label={buttonConfig.text}
        >
          {participationLoading ? (
            <ImSpinner9 className="animate-spin" />
          ) : (
            <span>{buttonConfig.text}</span>
          )}
        </button>
      )}
    </>
  )
}

export default EventParticipationButtons
