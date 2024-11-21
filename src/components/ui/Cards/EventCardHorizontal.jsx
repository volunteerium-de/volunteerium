import React from "react"
import { IoCalendar, IoLocation, IoPeople } from "react-icons/io5"
import { RxDividerVertical } from "react-icons/rx"
import { MdLanguage } from "react-icons/md"
import useLanguageOptions from "../../../hooks/useLanguages"
import { formatDateWithTime } from "../../../helpers/formatDate"
import { Link } from "react-router-dom"
import { UserAvatar } from "../Avatar/userAvatar"
import { formatName } from "../../../helpers/formatName"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { validateLocation } from "../../../utils/functions"

const EventCardHorizontal = ({ event }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const startDate = new Date(event.startDate).toLocaleDateString()
  const endDate = new Date(event.endDate).toLocaleDateString()
  const { getLangName, getTranslatedCategory } = useLanguageOptions()
  const areDatesSame = startDate === endDate

  const handleNavigate = () => {
    navigate(`/events/${event._id}`)
  }

  const locationText = validateLocation(event)

  return (
    <div
      key={event._id}
      className="shadow-[0_1px_1px_rgba(0,0,0,.25)] mb-2 flex justify-center items-center gap-5 dark:bg-dark-gray-1 rounded-lg "
    >
      {/* Event Image */}
      <div className="w-full max-w-[250px] h-[235px] sm:h-[200px] flex justify-center items-center overflow-hidden rounded-l-lg ">
        <img
          src={event.eventPhoto || `${import.meta.env.VITE_AWS_URL}default-event-photo.webp`}
          alt="event"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Event Content */}
      <div className="p-2 flex flex-col justify-between w-full gap-1 ">
        <h2
          className="text-black dark:text-white font-semibold sm:text-[1rem] text-[0.9rem] mb-3 cursor-pointer"
          onClick={handleNavigate}
        >
          {event.title}
        </h2>
        <p className="text-dark-gray-1 dark:text-white sm:text-[0.8125rem] text-[0.7rem] mb-[10px]">
          {event.description.split(" ").slice(0, 10).join(" ")}
          {event.description.split(" ").length > 10 ? "..." : ""}
        </p>

        {/* Event Details */}
        <div>
          {/* Organizer Information */}
          {event.createdBy && event.createdBy.userDetailsId && (
            <Link to={`/profile/${event.createdBy?._id}`} className="flex items-center">
              <div className="flex gap-x-1 items-center mb-[7px] py-1 cursor-pointer ">
                <UserAvatar user={event.createdBy} size="w-6 h-6" backgroundActive={true} />
                <p className="text-gray-2 dark:text-white text-[0.7rem]">
                  {event.createdBy.userType === "individual"
                    ? formatName(
                        event.createdBy.fullName,
                        event.createdBy.userDetailsId.isFullNameDisplay
                      )
                    : event.createdBy.organizationName}
                </p>
              </div>
            </Link>
          )}

          <div>
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-1">
              {/* Event Dates */}
              <div className="flex items-center">
                <IoCalendar className="text-primary-green" />
                <p className="text-gray-2 dark:text-white text-[0.7rem] p-1">
                  {areDatesSame
                    ? formatDateWithTime(event.startDate)
                    : `${formatDateWithTime(event.startDate)} - ${formatDateWithTime(event.endDate)}`}
                </p>
              </div>
              {/* Event Location */}

              <div className="flex items-center">
                <IoLocation className="text-primary-green" />
                <p className="text-gray-2 dark:text-white text-[0.7rem] p-0.5">{locationText}</p>
                {!areDatesSame && <RxDividerVertical className="text-gray-2" />}
              </div>

              {/* Max Participants */}
              <div className="flex items-center">
                <IoPeople className="text-primary-green" />
                <p className="text-gray-2 dark:text-white text-[0.7rem] p-1">
                  Max. {event.maxParticipant} {t(translations.eventsPage.people)}
                </p>
              </div>

              {/* Event Languages */}
              {event.languages && event.languages.length > 0 && (
                <div className="flex items-center">
                  <MdLanguage className="text-primary-green" />
                  <p className="text-gray-2 dark:text-white text-[0.7rem] p-1">
                    {event.languages.map((langCode) => getLangName(langCode)).join(", ")}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-start justify-between mt-2">
              {/* Category Area */}
              <div className="flex flex-row flex-wrap gap-2">
                {event.interestIds?.map((interest) => (
                  <div
                    key={interest._id}
                    className="border border-primary-green dark:border-gray-1 px-2 py-1 rounded-full w-fit sm:h-6 h-5"
                  >
                    <p className="font-semibold tracking-wide text-[0.5rem] sm:text-[0.6rem] text-primary-green  text-center dark:text-gray-1">
                      {getTranslatedCategory(interest.name).toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
              {/* Event Button */}
              <div className="flex-[0.5] text-end mt-auto pb-2 pr-2">
                <button
                  className="font-medium text-white sm:text-[0.7rem] text-[0.6rem] text-center bg-primary-green hover:bg-dark-green px-4 py-1 rounded "
                  onClick={handleNavigate}
                >
                  {t(translations.eventsPage.more)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCardHorizontal
