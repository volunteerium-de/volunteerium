import { IoCalendar, IoHome, IoLocation, IoPeople } from "react-icons/io5"
import { useSelector } from "react-redux"
import { MdLanguage } from "react-icons/md"
import useLanguageOptions from "../../../hooks/useLanguages"
import { formatName } from "../../../helpers/formatName"
import { formatDate } from "../../../helpers/formatDate"
import { UserAvatar } from "../Avatar/userAvatar"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { validateLocation } from "../../../utils/functions"

const EventCardVertical = ({ event }) => {
  const { t } = useTranslation()
  const { currentUser: user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const { getLangName, getTranslatedCategory } = useLanguageOptions()

  const startDate = new Date(event.startDate).toLocaleDateString()

  const handleNavigate = () => {
    navigate(`/events/${event._id}`)
  }

  const locationText = validateLocation(event)

  return (
    <div
      key={event._id}
      className="flex flex-col justify-between rounded max-w-[250px] min-w-[250px] sm:max-w-[330px] sm:min-w-[330px] shadow-[0_1px_1px_rgba(0,0,0,.25)] overflow-x-hidden shrink-0 mb-2 dark:bg-dark-gray-3"
    >
      {/* Event Image */}
      <div>
        <img
          src={event?.eventPhoto || `${import.meta.env.VITE_AWS_URL}default-event-photo.webp`}
          alt={t(translations.eventCardVer.imgAlt)}
          className="rounded-t-sm object-cover w-full h-[180px]"
        />
      </div>
      {/* Event Content */}
      <div className="p-3 h-full">
        <div className="min-h-[100px]">
          <h2
            className="text-dark-gray-1 dark:text-white font-bold text-[0.9375rem] cursor-pointer "
            onClick={handleNavigate}
          >
            {event.title}
          </h2>
          <p className="text-dark-gray-1 dark:text-light-gray-2 text-[0.75rem] mt-2">
            {event.description.split(" ").slice(0, 10).join(" ")}
            {event.description.split(" ").length > 10 ? "..." : ""}
          </p>
        </div>

        {/* Details */}

        <div>
          {/* User */}
          <Link to={`/profile/${event.createdBy?._id}`} className="flex items-center">
            <div className="flex gap-x-3 items-center mb-[10px] ">
              <UserAvatar user={event.createdBy} size="h-6 w-6" backgroundActive={true} />
              <p className="text-primary-green">
                {event.createdBy?.userType === "individual"
                  ? formatName(
                      event.createdBy?.fullName,
                      event.createdBy?.userDetailsId?.isFullNameDisplay
                    )
                  : event.createdBy?.organizationName}
              </p>
            </div>
          </Link>

          {/* Event Details */}
          <div>
            <div className="flex gap-x-[8px] items-center mb-[1px]">
              <IoCalendar className="text-primary-green" />
              <p className="text-gray-2 dark:text-light-gray-2 text-sm p-1">
                {formatDate(event.startDate)}
              </p>
            </div>
            {/* Event Location */}

            <div className="flex gap-x-[8px] items-center mb-[1px]">
              <IoLocation className="text-primary-green" />
              <p className="text-gray-2 dark:text-light-gray-2 text-sm p-0.5">{locationText}</p>
            </div>

            <div className="flex gap-x-[8px] items-center  mb-[1px]">
              <IoPeople className="text-primary-green" />
              <p className="text-gray-2 dark:text-light-gray-2 text-sm p-1">
                Max. {event.maxParticipant} {t(translations.eventCardVer.people)}
              </p>
            </div>

            {/* Event Languages */}
            {event.languages.length > 0 && (
              <div className="flex gap-x-[8px] items-center  mb-[1px]">
                <MdLanguage className="text-primary-green" />
                <p className="text-gray-2 dark:text-light-gray-2 text-sm p-1">
                  {event.languages.map((langCode) => getLangName(langCode)).join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {/* Category Area */}
        <div className="flex flex-row flex-wrap gap-2 px-2 ">
          {event.interestIds?.map((interest, index) => (
            <div
              key={index}
              className="border border-primary-green dark:border-gray-1 px-2 py-1 rounded-full w-fit h-6"
            >
              <p className="font-semibold tracking-wide text-[0.6rem] sm:text-[0.6rem] text-primary-green text-center dark:text-gray-1">
                {getTranslatedCategory(interest.name).toUpperCase()}
              </p>
            </div>
          ))}
        </div>
        {/* Event Button */}
        <div className="flex flex-row p-2 justify-end">
          <button
            onClick={() => {
              const currentPath = window.location.pathname
              const newPath =
                currentPath.includes("/events") && !currentPath.endsWith("/events")
                  ? `/${event._id}`
                  : `/events/${event._id}`
              navigate(newPath)
            }}
            className="font-medium text-white sm:text-[0.7rem] text-[0.6rem] text-center bg-primary-green hover:bg-dark-green px-4 py-1 rounded"
          >
            {t(translations.eventCardVer.more)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCardVertical
