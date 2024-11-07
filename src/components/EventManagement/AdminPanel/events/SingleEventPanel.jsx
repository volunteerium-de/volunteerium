import React from "react"
import { useEffect } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useEventCall from "../../../../hooks/useEventCall"
import { ImSpinner9 } from "react-icons/im"
import { MdOutlineSettings } from "react-icons/md"
import { formatDateWithTime } from "../../../../helpers/formatDate"
import useLanguage from "../../../../hooks/useLanguages"
import { UserAvatar } from "../../../ui/Avatar/userAvatar"
import defaultPhoto from "../../../../assets/default-event-photo-.jpg"
import { Link } from "react-router-dom"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useState } from "react"
import { useRef } from "react"
import DeleteModal from "../../../ui/Modals/DeleteModal"

const SingleEventPanel = ({ eventId, setIdentifier }) => {
  const navigate = useNavigate()
  const { singleEvent, loading } = useSelector((state) => state.event)
  const { getSingleEvent, editEvent, deleteEvent } = useEventCall()
  const { getLangName } = useLanguage()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isDeleteEventModalOpen, setIsDeleteEventModalOpen] = useState(false)
  const modalRef = useRef(null)
  const settingsButtonRef = useRef(null)

  useEffect(() => {
    getSingleEvent(eventId)
  }, [eventId])

  const handleNavigateBack = () => {
    setIdentifier(null)
    navigate(`/admin-panel?tab=events`)
  }

  const closeDeleteEventModal = () => {
    setIsDeleteEventModalOpen(false)
  }

  const openDeleteEventModal = () => {
    setIsDeleteEventModalOpen(true)
  }

  const handleSettingsButtonClick = () => {
    setIsSettingsModalOpen((prevState) => !prevState)
  }

  const handleOutsideClick = (e) => {
    // Check if the click is outside the settings button and modal
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      settingsButtonRef.current &&
      !settingsButtonRef.current.contains(e.target)
    ) {
      setIsSettingsModalOpen(false)
    }
  }

  const handleDeleteEvent = () => {
    deleteEvent(singleEvent._id)
    navigate(`/admin-panel?tab=events`)
    setIsSettingsModalOpen(false)
  }

  const handleSuspendEvent = () => {
    if (singleEvent?.isActive) {
      editEvent(singleEvent._id, { isActive: false })
    } else {
      editEvent(singleEvent._id, { isActive: true })
    }
    setIsSettingsModalOpen(false)
  }

  useEffect(() => {
    // Event listener for outside click
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  return (
    <div className="relative ">
      <button
        onClick={handleNavigateBack}
        className="absolute -top-8 left-0 md:-left-5 flex items-center gap-1 text-primary-green dark:text-white"
      >
        <IoIosArrowBack className="w-5 h-5" />
        <span>Back</span>
      </button>
      <div>
        {loading ? (
          <div className="my-4 flex h-max justify-center items-start pt-24">
            <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green dark:text-white" />
          </div>
        ) : (
          <div className="my-8 md:my-4 space-y-2 h-max">
            <div className="flex justify-between items-center p-4 bg-white dark:bg-dark-gray-1 rounded-lg ">
              <div className="text-sm sm:text-[1.125rem] flex gap-1 md:gap-2 items-center text-dark-gray-1 me-3">
                <span className="text-primary-green dark:text-white font-semibold w-[55px] sm:w-fit">
                  Event ID:
                </span>
                <span className="w-[100px] md:w-auto overflow-x-scroll scrollbar-hide">
                  {eventId}
                </span>
                <span>
                  <FaExternalLinkAlt
                    onClick={() => navigate(`/events/${singleEvent?._id}`)}
                    className="hover:text-gray-1 cursor-pointer"
                  />
                </span>
              </div>
              <div className="flex gap-1 md:gap-2 items-center">
                {singleEvent?.isActive ? (
                  <span className="text-primary-green dark:bg-white text-md sm:text-xl border border-primary-green dark:border-white px-1 sm:px-2 py-1">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-warning dark:bg-white text-md sm:text-xl border border-warning px-1 sm:px-2 py-1">
                    SUSPENDED
                  </span>
                )}
                <button ref={settingsButtonRef} onClick={handleSettingsButtonClick}>
                  <MdOutlineSettings className="w-5 h-5 sm:w-8 sm:h-8 text-dark-gray-1 dark:text-white hover:text-dark-gray-1" />
                </button>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-2 h-full">
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <h1 className="text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  Event Details
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2">
                  <li className="flex gap-1 rounded-md overflow-hidden mt-2">
                    <img
                      src={singleEvent?.eventPhoto || defaultPhoto}
                      alt="Event-Photo"
                      className="object-cover"
                    />
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Event Name:</span>
                    <span>{singleEvent?.title}</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="font-semibold">Event Description:</span>
                    <span>{singleEvent?.description}</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="font-semibold">Event Creator:</span>
                    <Link
                      to={`?tab=users&identifier=${singleEvent?.createdBy?._id}`}
                      className="flex gap-1 hover:underline"
                    >
                      <UserAvatar
                        user={singleEvent?.createdBy}
                        size="h-6 w-6"
                        backgroundActive={true}
                      />
                      <span>
                        {singleEvent?.createdBy?.fullName ||
                          singleEvent?.createdBy?.organizationName}
                      </span>
                    </Link>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Start Date:</span>
                    <span>{formatDateWithTime(singleEvent?.startDate)}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">End Date:</span>
                    <span>{formatDateWithTime(singleEvent?.endDate)}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Contact Name:</span>
                    <span>{singleEvent?.contactName}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Contact Email: </span>
                    <span>{singleEvent?.contactEmail}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Contact Phone:</span>
                    <span>{singleEvent?.contactPhone}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Languages:</span>
                    <span>
                      {singleEvent?.languages.length > 0 &&
                        singleEvent.languages
                          .map((language) => getLangName(language))
                          .filter(Boolean)
                          .join(", ")}
                    </span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Interests</span>
                    <span>
                      {singleEvent?.interestIds.length > 0 &&
                        singleEvent?.interestIds.map((interest) => interest.name).join(" , ")}
                    </span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Online Event:</span>
                    <span>{singleEvent?.isOnline ? "Yes" : "No"}</span>
                  </li>
                  <li className="flex gap-1 flex-col">
                    <span className="font-semibold">Event Location:</span>
                    <span>
                      {!singleEvent?.isOnline &&
                        `${singleEvent?.addressId?.streetName} ${singleEvent?.addressId?.streetNumber} ${singleEvent?.addressId?.zipCode}, ${singleEvent?.addressId?.city} ${singleEvent?.addressId?.state} ${singleEvent?.addressId?.country}`}
                    </span>
                  </li>
                  <li className="flex gap-1 flex-col">
                    <span className="font-semibold">Documents: </span>
                    <span>
                      {singleEvent?.documentIds.length > 0 &&
                        singleEvent?.documentIds.map((document) => {
                          return (
                            <div
                              key={document._id}
                              className="p-1 text-dark-gray-1 rounded cursor-pointer flex flex-col gap-1 items-start"
                            >
                              <span
                                onClick={() => window.open(`${document.fileUrl}`, "_blank")}
                                className="text-sm font-medium flex gap-1 items-center hover:text-gray-1"
                              >
                                - {document.title} <FaExternalLinkAlt />
                              </span>
                              <span className="text-xs text-gray-500">
                                Document Id: {document._id}
                              </span>
                            </div>
                          )
                        })}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <div className="flex justify-between text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  <h1>Event Participants</h1>
                  <p className="px-2 text-lg">
                    (
                    {
                      singleEvent?.eventParticipantIds.filter(
                        (participant) => participant.isApproved === true
                      ).length
                    }
                    /{singleEvent?.maxParticipant})
                  </p>
                </div>
                <div className="h-auto mt-5">
                  {singleEvent?.eventParticipantIds.length > 0 ? (
                    <div className="min-w-full bg-white dark:bg-dark-gray-1">
                      {/* Header Row */}
                      <div className="w-full border-b text-gray-600 dark:text-light-gray uppercase text-xs leading-normal flex">
                        <div className="py-3 text-left flex-[2]">Participant ID</div>
                        <div className="py-3 text-left flex-[2]">User</div>
                        <div className="py-3 text-center flex-[1]">Status</div>
                        <div className="py-3 text-center flex-[1]">Join Date</div>
                      </div>

                      {/* Data Rows */}
                      <div className="text-gray-600 dark:text-gray-200 text-sm font-light w-full">
                        {singleEvent?.eventParticipantIds.map((participant) => (
                          <ul
                            key={participant._id}
                            className="border-b border-gray-200 dark:border-gray-600 flex gap-2"
                          >
                            {/* Participant ID */}
                            <li
                              className="text-left flex-[2] whitespace-nowrap overflow-x-scroll scrollbar-hide py-3"
                              data-label="Participant ID"
                            >
                              {participant._id}
                            </li>
                            {/* User */}
                            <li
                              onClick={() =>
                                navigate(
                                  `/admin-panel?tab=users&identifier=${participant.userId._id}`
                                )
                              }
                              className="text-center flex-[2] whitespace-nowrap overflow-x-scroll scrollbar-hide py-3"
                              data-label="User"
                            >
                              <div className="flex gap-1 items-center w-full cursor-pointer">
                                <UserAvatar
                                  user={participant.userId}
                                  size="h-6 w-6"
                                  backgroundActive={true}
                                />
                                <span className="text-xs text-left overflow-x-scroll scrollbar-hide whitespace-nowrap flex-1">
                                  {participant.userId.fullName}
                                </span>
                              </div>
                            </li>
                            {/* Status */}
                            <li
                              className={`text-center flex-[1] py-3 ${
                                participant.isPending
                                  ? "text-warning"
                                  : participant.isApproved && !participant.isPending
                                    ? "text-primary-green"
                                    : !participant.isApproved && !participant.isPending
                                      ? "text-danger"
                                      : participant.hasJoined === "joined"
                                        ? "text-primary-green"
                                        : "text-danger"
                              }`}
                              data-label="Participant Status"
                            >
                              {participant.isPending
                                ? "Pending"
                                : participant.isApproved && !participant.isPending
                                  ? "Approved"
                                  : !participant.isApproved && !participant.isPending
                                    ? "Rejected"
                                    : participant.hasJoined === "joined"
                                      ? "Joined"
                                      : "Not Joined"}
                            </li>
                            {/* Join Date */}
                            <li
                              className="text-center flex-[1] py-3 overflow-x-scroll scrollbar-hide"
                              data-label="Join Date"
                            >
                              {new Date(participant.createdAt).toLocaleDateString()}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-600 dark:text-light-gray">No Participant yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isSettingsModalOpen && (
        <div className="absolute z-50 top-14 right-8 border border-gray-1 dark:border-gray-1 overflow-hidden rounded-lg">
          <div ref={modalRef} className="bg-white dark:bg-gray-1 shadow-lg w-[120px] md:w-[200px]">
            <div className="flex flex-col justify-between">
              <button
                onClick={openDeleteEventModal}
                className="text-danger hover:text-danger/50 border-b dark:border-gray-2 hover:bg-light-gray-2 w-full py-2"
              >
                Delete Event
              </button>
              <button
                onClick={handleSuspendEvent}
                className="text-warning hover:text-warning/50 border-b dark:border-gray-2 hover:bg-light-gray-2 w-full py-2"
              >
                {singleEvent?.isActive ? "Suspend Event" : "Unsuspend Event"}
              </button>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className=" text-primary-green hover:text-primary-green/50 hover:bg-light-gray-2 w-full py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      {isDeleteEventModalOpen && (
        <DeleteModal
          onClose={closeDeleteEventModal}
          onDelete={handleDeleteEvent}
          title={`Delete Event`}
          description={`Are you sure you want to delete this event?`}
        />
      )}
    </div>
  )
}

export default SingleEventPanel
