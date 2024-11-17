import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { translations } from "../../locales/translations"
import useEventCall from "../../hooks/useEventCall"
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


  const isEventDone = new Date() > new Date(singleEvent?.startDate)
  const isMaxParticipantsReached =
    singleEvent?.eventParticipantIds.filter((participant) => participant?.isApproved === true)
      .length >= singleEvent?.maxParticipant
  const isPending = participant?.isPending
  const isApproved = participant?.isApproved
  const isFeedbackGiven = singleEvent?.eventFeedbackIds.some(
    (feedback) => feedback?.userId?._id === user?._id
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
            `/${isAdmin ? "admin-panel" : "event-management"}/?tab=${isAdmin ? "events" : "organized-events"}&identifier=${singleEvent?._id}`
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
          className={`${buttonConfig.className || ""} text-white font-semibold px-2 py-1 text-center min-w-[100px] max-w-full h-8 grid place-content-center rounded-lg text-xs md:text-[10px] lg:text-[12px]`}
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
