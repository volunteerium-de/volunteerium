import { GoReport } from "react-icons/go"
import Header from "../components/Header/Header"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { translations } from "../locales/translations"
import { useTranslation } from "react-i18next"
import useLanguageOptions from "../hooks/useLanguages"
import defaultEventPhoto from "../assets/default-event-photo-.jpg"
import useEventCall from "../hooks/useEventCall"
import ReportEvent from "../components/EventDetailsPage/ReportEvent"
import EventOverview from "../components/EventDetailsPage/EventOverview"
import { UserAvatar } from "../components/ui/Avatar/userAvatar"
import { IoIosArrowBack } from "react-icons/io"
import { formatName } from "../helpers/formatName"

const EventDetails = () => {
  const { singleEvent, loading } = useSelector((state) => state.event)
  const { currentUser } = useSelector((state) => state.auth)
  const { getSingleEvent } = useEventCall()
  const { eventId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { getTranslatedCategory } = useLanguageOptions()
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)

  const toggleReportModal = () => {
    setIsReportModalOpen(!isReportModalOpen)
  }

  useEffect(() => {
    if (!singleEvent || singleEvent._id !== eventId) {
      const fetchSingleEvent = async () => {
        await getSingleEvent(eventId)
      }
      fetchSingleEvent()
    }
  }, [eventId, singleEvent])

  const {
    eventPhoto,
    isOnline,
    title,
    createdBy,
    interestIds,
    description,
    addressId,
    eventParticipantIds,
  } = singleEvent || {}

  const userType = createdBy?.userType
  const isFullNameDisplay = createdBy?.userDetailsId?.isFullNameDisplay

  return (
    <div>
      <Header />
      {loading ? (
        <div className="h-screen flex flex-col justify-center items-center max-width-[1800px] mx-auto">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-primary-green border-opacity-50 dark:border-light-green"></div>
          <p className="text-xl mt-4 font-semibold text-primary-green dark:text-light-gray">
            {t(translations.profile.loading)}
          </p>
        </div>
      ) : (
        singleEvent?._id && (
          <>
            <div
              onClick={() => navigate(-1)}
              className="absolute px-4 sm:hidden py-5 sm:py-0 flex gap-1 items-center text-[1.2rem] text-primary-green hover:text-dark-green dark:text-light-gray cursor-pointer"
            >
              <IoIosArrowBack />
              <span>{t(translations.eventDetails.backButton)}</span>
            </div>
            <div className="w-full max-w-[1800px] mt-10 mx-auto flex flex-col justify-center px-4 md:px-10 py-4 sm:py-0 sm:pb-5">
              {/* Event Photo */}
              <div className="w-full mb-6 md:mb-10">
                <img
                  src={eventPhoto || defaultEventPhoto}
                  alt="event photo"
                  className="w-full max-h-[30vh] md:max-h-[40vh] object-cover object-center rounded-md shadow-md"
                />
              </div>

              {/* Main Content Section */}
              <div className="flex flex-col md:flex-row gap-8 font-poppins">
                {/* Left Side - General Info and Map */}
                <div className="lg:w-8/12 md:border-r md:border-b md:border-light-gray-3 rounded my-1 px-2">
                  <h2 className="text-[1.75rem] md:text-[1.75rem] text-dark-gray-2 dark:text-white font-semibold mb-1">
                    {title}
                  </h2>
                  <Link
                    to={`/profile/${singleEvent?.createdBy?._id}`}
                    className="flex items-center gap-2 mb-4"
                  >
                    <UserAvatar
                      user={singleEvent?.createdBy}
                      size="h-8 w-8"
                      backgroundActive={true}
                    />
                    <p className="text-primary-green">
                      {userType === "individual"
                        ? formatName(singleEvent?.createdBy?.fullName, isFullNameDisplay)
                        : singleEvent?.createdBy?.organizationName}
                    </p>
                  </Link>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {interestIds?.map((interest) => (
                      <span
                        key={interest._id}
                        className="flex items-center justify-center font-extrabold text-primary-green text-[0.625rem] border border-primary-green rounded-full py-0.5 px-3 mt-1 mb-8"
                      >
                        {getTranslatedCategory(interest.name).toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <p className="text-[1rem] whitespace-pre-line md:text-dark-gray-3 dark:text-gray-2 mb-12 pr-3">
                    {description}
                  </p>
                  {/* RightSide-Join Operations */}
                  <div className="  block md:hidden ">
                    <EventOverview />
                  </div>
                  {/* Event Location */}
                  {!isOnline && addressId?.iframeSrc && (
                    <div className="overflow-hidden w-[100%]  h-64 order-3 mt-4 mb-2 md:mt-0">
                      <h3 className="font-semibold text-dark-gray-2 dark:text-white py-2">
                        {t(translations.eventDetails.locationLabel)}
                      </h3>
                      {eventParticipantIds.length > 0 &&
                        eventParticipantIds.some(
                          (participant) =>
                            participant?.userId._id === currentUser?._id &&
                            participant?.isApproved === true &&
                            participant?.isPending === false
                        ) && (
                          <p className="text-dark-gray-1 dark:text-light-gray-2 py-2">
                            {`${addressId?.streetName} ${addressId?.streetNumber} ${addressId?.zipCode}, ${addressId?.city} ${addressId?.country}`}
                          </p>
                        )}

                      <iframe
                        src={addressId?.iframeSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title={t(translations.eventDetails.locationLabel)}
                      ></iframe>
                    </div>
                  )}

                  {/* Report Button */}
                  <div className="flex md:hidden items-center justify-center text-gray-2 text-[0.75rem] md:text-[0.875rem] mt-3">
                    <GoReport />
                    <span
                      className="ml-1 cursor-pointer"
                      onClick={() => setIsReportModalOpen(true)}
                    >
                      {t(translations.eventDetails.reportEventButton)}
                    </span>
                  </div>
                </div>

                {/* Right Side - Date, Location, Language Toggle, Attendants List, and Buttons */}
                <div className="hidden md:block lg:w-4/12 ">
                  <EventOverview />
                  {/* Report Button */}
                  <div className="sm:flex items-center justify-center text-gray-2 text-[0.75rem] md:text-[0.875rem] mt-3">
                    <GoReport />
                    <span
                      className="ml-1 cursor-pointer"
                      onClick={() => setIsReportModalOpen(true)}
                    >
                      {t(translations.eventDetails.reportEventButton)}
                    </span>
                  </div>
                </div>
              </div>
              {isReportModalOpen && (
                <ReportEvent
                  eventTitle={title}
                  eventId={singleEvent._id}
                  onClose={toggleReportModal}
                />
              )}
            </div>
          </>
        )
      )}
    </div>
  )
}

export default EventDetails
