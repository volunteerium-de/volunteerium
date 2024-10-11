import { FaRegCalendarAlt, FaCalendarTimes } from "react-icons/fa"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../helpers/formatDate"
import eventPhoto from "../../../assets/about-events.png"

const defaultImage = eventPhoto

const ProfileCard = ({ events, loading, eventType, setEventType, setCurrentPage }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="py-4 ">
        <div className="flex gap-10 font-semibold text-xl my-4">
          <div
            className={`text-[0.9375rem] cursor-pointer border-b-2 ${
              eventType === "Attended Events"
                ? "text-primary-green border-primary-green"
                : "border-transparent dark:text-white"
            }`}
            disabled={eventType === "Organized Events" ? true : false}
            onClick={() => {
              setEventType("Attended Events")
              setCurrentPage(1)
            }}
          >
            Attended Events
          </div>
          <div
            className={`text-[0.9375rem] cursor-pointer border-b-2 ${
              eventType === "Organized Events"
                ? "text-primary-green border-primary-green"
                : "border-transparent dark:text-white"
            }`}
            // disabled={eventType == "Attended Events" ? true : false}
            onClick={() => {
              setEventType("Organized Events")
              setCurrentPage(1)
            }}
          >
            Organized Events
          </div>
        </div>
        {!loading && (!events || events.length === 0) && (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <FaCalendarTimes className="text-6xl text-primary-green mb-4" />
            <p className="text-xl font-bold text-dark-gray-1 dark:text-white">No events found</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              It seems there are no events at the moment.
            </p>
          </div>
        )}
        <div className="space-y-4">
          {events?.map((event) => (
            <div
              key={event._id}
              className="group flex rounded-md shadow-md text-dark-gray-1 sm:gap-4 bg-light-gray-2 dark:bg-dark-gray-2"
            >
              {/* Image */}
              <div className="w-full sm:w-1/2">
                <img
                  src={event?.eventPhoto || defaultImage}
                  alt={event.title}
                  className="w-full h-full sm:h-full xl:h-[210px] object-cover rounded-l-lg overflow-hidden"
                />
              </div>

              {/* Info */}
              <div className="flex w-1/2 my-2">
                <div className="flex flex-col gap-2 justify-between w-[45vw] sm:w-[26vw] lg:w-full py-2 ml-4 sm:ml-0 text-[0.9375rem]">
                  <h2 className="text-base md:text-xl font-semibold text-dark-gray-1 dark:text-white">
                    {event.title}
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 ml-0.5 text-sm sm:text-[1rem] text-gray-2 dark:text-white">
                      <img
                        src={
                          event.createdBy.userType === "individual"
                            ? event.createdBy?.userDetailsId?.avatar
                            : event.createdBy?.userDetailsId?.organizationLogo
                        }
                        alt="Organizator Avatar"
                        className="w-[1.1rem] h-[1.1rem] rounded-full"
                      />

                      {event.createdBy?.fullName
                        ? event.createdBy.fullName
                        : event.createdBy?.organizationName}
                    </div>
                    <div className="flex gap-2 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                      <FaRegCalendarAlt className="mt-0.5 ml-0.5 text-[1.1rem] text-primary-green dark:text-light-gray" />
                      {formatDate(event?.startDate)} - {formatDate(event?.endDate)}
                    </div>

                    <div className="flex gap-2 ml-0.5 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                      <HiOutlineUserGroup className="text-[1.1rem] text-primary-green dark:text-light-gray" />
                      {event.eventParticipantIds.length}/{event.maxParticipant}
                      <p>people joined</p>
                    </div>
                  </div>
                  {/* // Interest */}
                  <div className="flex flex-wrap gap-2">
                    {event?.interestIds?.map((interest) => (
                      <span
                        key={interest._id}
                        className="flex flex-wrap text-[0.6875rem] border border-primary-green text-primary-green px-2 py-1 rounded-2xl font-bold dark:text-light-green dark:border-2"
                      >
                        {interest.name.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                onClick={() => navigate(`/events/${event._id}`)}
                className="flex items-center border-l-2 border-primary-green opacity-0 md:mr-3 xl:mr-8 group-hover:opacity-80 transition-opacity duration-300 cursor-pointer dark:border-light-gray-3"
              >
                <MdKeyboardArrowRight className="text-[3rem] lg:ml-4 text-primary-green dark:text-light-gray-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfileCard
