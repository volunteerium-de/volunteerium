import { FaRegCalendarAlt, FaCalendarTimes } from "react-icons/fa"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { formatDateWithTime } from "../../../helpers/formatDate"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { UserAvatar } from "../Avatar/userAvatar"
import useLanguageOptions from "../../../hooks/useLanguages.js"
import { formatName } from "../../../helpers/formatName.js"

const defaultEventPhoto = `${import.meta.env.VITE_AWS_URL}default-event-photo.webp`

const ProfileCard = ({ events, loading, eventType }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getTranslatedCategory } = useLanguageOptions()

  return (
    <div className="py-4">
      {!loading && (!events || events.length === 0) && (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <FaCalendarTimes className="text-6xl text-primary-green mb-4" />
          <p className="text-xl font-bold text-dark-gray-1 dark:text-white">
            {t(translations.profileCard.p1)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t(translations.profileCard.p2)}
          </p>
        </div>
      )}

      <div className="space-y-4">
        {events?.map(
          ({
            _id,
            title,
            createdBy,
            startDate,
            maxParticipant,
            eventPhoto,
            eventParticipantIds,
            interestIds,
          }) => {
            const approvedCount = eventParticipantIds.filter(({ isApproved }) => isApproved).length

            return (
              <div
                key={_id}
                className="group flex rounded-md shadow-md text-dark-gray-1 sm:gap-4 bg-light-gray-2 dark:bg-dark-gray-2"
              >
                {/* Image */}
                <div className="w-full sm:w-1/2 lg:w-2/5">
                  <img
                    src={eventPhoto || defaultEventPhoto}
                    alt={title}
                    className="w-full h-full lg:h-[190px] object-cover rounded-l-lg overflow-hidden"
                  />
                </div>

                {/* Info */}
                <div className="flex w-full sm:w-1/2 lg:w-3/5 my-2">
                  <div className="flex flex-col gap-2 justify-between w-[45vw] lg:w-full py-2 ml-4 sm:ml-0 text-[0.9375rem]">
                    <h2 className="text-base font-semibold text-dark-gray-1 dark:text-white">
                      {title}
                    </h2>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-sm sm:text-[1rem] text-gray-2 dark:text-white">
                        <UserAvatar user={createdBy} size="w-[1.4rem] h-[1.4rem] rounded-full" />
                        {formatName(
                          createdBy?.fullName || createdBy?.organizationName,
                          createdBy?.userDetailsId?.isFullNameDisplay
                        )}
                      </div>
                      <div className="flex gap-2 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                        <FaRegCalendarAlt className="mt-0.5 ml-0.5 text-[1.1rem] text-primary-green dark:text-light-gray" />
                        {formatDateWithTime(startDate)}
                      </div>
                      <div className="flex gap-2 ml-0.5 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                        <HiOutlineUserGroup className="text-[1.1rem] text-primary-green dark:text-light-gray" />
                        <span>
                          {`${eventType === "Attended Events" ? eventParticipantIds.length : approvedCount}/${maxParticipant}`}
                        </span>
                        <p> {t(translations.profileCard.joined)}</p>
                      </div>
                    </div>
                    {/* Interest */}
                    <div className="flex flex-wrap gap-2">
                      {interestIds?.map(({ _id, name }) => (
                        <span
                          key={_id}
                          className="flex flex-wrap text-[0.6875rem] border border-primary-green text-primary-green px-2 py-1 rounded-2xl font-bold dark:text-light-green dark:border-2"
                        >
                          {getTranslatedCategory(name)?.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center xl:border-l border-primary-green opacity-0 md:mr-3 group-hover:opacity-80 transition-opacity duration-300 dark:border-light-gray-3">
                  <MdKeyboardArrowRight
                    onClick={() => navigate(`/events/${_id}`)}
                    className=" text-[2rem] xl:text-[2.7rem] xl:ml-4 text-primary-green dark:text-light-gray-2 cursor-pointer"
                  />
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default ProfileCard
