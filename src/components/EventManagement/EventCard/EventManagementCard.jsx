import { FaRegCalendarAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { formatDateWithTime } from "../../../helpers/formatDate"
import { useTranslation } from "react-i18next"
import { MdOutlineLocationOn } from "react-icons/md"
import defaultEventPhoto from "../../../assets/default-event-photo-.jpg"
import { HiOutlineUserGroup } from "react-icons/hi"
import { UserAvatar } from "../../ui/Avatar/userAvatar"
import MoreOptionsMenu from "./MoreOptionMenu"
import { translations } from "../../../locales/translations"
import useLanguage from "../../../hooks/useLanguages"
import { useSelector } from "react-redux"

const EventManagementCard = ({
  eventId: event,
  isOrganized = false,
  openModal,
  refetch,
  onAddEvent,
  setEditEvent,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getTranslatedCategory } = useLanguage()
  const { currentUser: user } = useSelector((state) => state.auth)

  const handleAvatarClick = (userId) => {
    navigate(`/profile/${userId}`)
  }

  const participantsAwaitingApproval = event.eventParticipantIds.filter(
    (participant) => participant.isApproved === false
  )
  const approvedParticipants = event.eventParticipantIds.filter(
    (participant) => participant.isApproved === true
  )
  const isCurrentUserApproved = event?.eventParticipantIds.find(
    (participant) => participant.userId._id === user._id
  )?.isApproved

  return (
    <div>
      <div
        key={event?._id}
        className="w-full flex rounded-md text-dark-gray-1 sm:gap-6 bg-light-gray-2 dark:bg-dark-gray-2 h-[165px] sm:h-[210px] md:h-[200px]"
      >
        {/* Image */}
        <div className="w-[25%]">
          <img
            src={event?.eventPhoto || defaultEventPhoto}
            alt={event?.title}
            className="w-full h-full object-cover rounded-l-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/events/${event?._id}`)}
          />
        </div>

        {/* Info */}
        <div className="flex flex-wrap w-[75%] p-2 ml-2 sm:ml-0 ">
          <div className="flex flex-col gap-3 w-[45vw] lg:w-full py-3 text-[0.9375rem]">
            {/* Title */}
            <div className="flex w-full justify-between">
              <h2
                onClick={() => navigate(`/events/${event?._id}`)}
                className="text-[1rem] font-semibold pr-3 break-words text-dark-gray-1 dark:text-white cursor-pointer"
              >
                {event?.title}

                {!event?.isDone && !isOrganized && isCurrentUserApproved === false && (
                  <span className="text-yellow-500 text-[0.8rem] p-2 mb-12">(Pending)</span>
                )}
              </h2>
              {!event?.isDone && (
                <MoreOptionsMenu
                  isOrganized={isOrganized}
                  eventId={event._id}
                  event={event}
                  refetch={refetch}
                  onAddEvent={onAddEvent}
                  setEditEvent={setEditEvent}
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              {/* Date */}
              <div className="flex gap-2 items-center text-[0.66rem] sm:text-[0.9rem] font-medium text-gray-2 dark:text-white">
                <FaRegCalendarAlt className="text-[1rem] mb-[0.1rem] text-primary-green dark:text-light-gray" />
                {formatDateWithTime(event?.startDate)}
              </div>

              {/* Join Request and Attendants */}
              {!event?.isDone && isOrganized && (
                <div>
                  <div className="flex flex-wrap sm:items-center gap-4 mt-5">
                    <div className="text-dark-gray-1 font-semibold text-[1rem] dark:text-white">
                      {t(translations.eventManagement.attendants)}
                    </div>
                    <button
                      onClick={() => openModal(event)}
                      className="flex items-center gap-1 px-3 text-[0.7rem] rounded-lg text-primary-green border-[0.8px] dark:border-light-gray-3 border-primary-green hover:bg-light-green transition w-auto"
                    >
                      <span className="py-1 font-medium dark:text-light-gray-3">
                        {" "}
                        {t(translations.eventManagement.joinRequests)}
                      </span>
                      <span
                        className={`${
                          participantsAwaitingApproval.length <= 0
                            ? "bg-primary-green"
                            : "bg-purple-400"
                        } text-white text-[0.7rem] rounded-full h-5 w-5 flex items-center justify-center`}
                      >
                        {participantsAwaitingApproval.length}
                      </span>
                    </button>
                  </div>

                  <div className="avatars flex flex-wrap gap-1 py-2">
                    {approvedParticipants.length > 0 ? (
                      <>
                        {approvedParticipants.slice(0, 4).map(({ userId }, index) => (
                          <div key={index} onClick={() => handleAvatarClick(userId._id)}>
                            <UserAvatar
                              user={userId}
                              size="h-5 w-5 cursor-pointer"
                              backgroundActive={true}
                            />
                          </div>
                        ))}
                        {approvedParticipants.length > 4 && (
                          <span className="text-primary-green font-semibold bg-light-green rounded-full h-5 w-5 text-[0.8rem] p-2 flex items-center justify-center">
                            <span className="text-[0.7rem]">+</span>
                            {approvedParticipants.length - 4}
                          </span>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-2 text-[0.8rem] dark:text-white">
                        {t(translations.eventManagement.noAttendants)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Location and Participants Count */}
              {!isOrganized && (
                <>
                  <div className="flex gap-2">
                    <MdOutlineLocationOn className="text-[1.1rem] text-primary-green dark:text-light-gray" />
                    <div className="flex gap-1 text-[0.66rem] sm:text-[0.9rem] font-medium text-gray-2 dark:text-white ">
                      {event.isOnline
                        ? "Online"
                        : `${event.addressId?.city}, ${event.addressId?.country}`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <HiOutlineUserGroup className="text-[1.1rem] text-primary-green dark:text-light-gray" />
                    <div className="flex gap-1 text-[0.66rem] sm:text-[0.9rem] font-medium text-gray-2 dark:text-white ">
                      {approvedParticipants.length ?? 0}
                      <p>
                        {t(translations.eventManagement.volunteer)}{" "}
                        {event.isDone
                          ? t(translations.eventManagement.joined)
                          : t(translations.eventManagement.joining)}
                      </p>{" "}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {event?.interestIds?.map((interest) => (
                      <span
                        key={interest._id}
                        className="flex flex-wrap text-[0.6rem] border border-primary-green text-primary-green px-2 py-1 rounded-2xl font-bold dark:text-light-green dark:border-2"
                      >
                        {(getTranslatedCategory(interest.name) || interest.name).toUpperCase()}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventManagementCard
