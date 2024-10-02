import { useState } from "react"
import { events } from "../../../helpers/data"
import { FaRegCalendarAlt } from "react-icons/fa"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../helpers/formatDate"

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState("Attended Events")
  const navigate = useNavigate()

  return (
    <div className="py-4">
      <div className="flex gap-10 font-semibold text-xl my-4">
        <div
          className={`text-[0.9375rem] cursor-pointer border-b-2 ${
            activeTab === "Attended Events"
              ? "text-primary-green border-primary-green"
              : "border-transparent dark:text-white"
          }`}
          onClick={() => setActiveTab("Attended Events")}
        >
          Attended Events
        </div>
        <div
          className={`text-[0.9375rem] cursor-pointer border-b-2 ${
            activeTab === "Organized Events"
              ? "text-primary-green border-primary-green"
              : "border-transparent dark:text-white"
          }`}
          onClick={() => setActiveTab("Organized Events")}
        >
          Organized Events
        </div>
      </div>
      {/* Attended Events */}
      {activeTab === "Attended Events" ? (
        <div className="space-y-4 w-full">
          {events.slice(0, 4).map((event) => (
            <div
              key={event._id}
              className="group flex rounded-md shadow-md text-dark-gray-1 sm:gap-4 cursor-pointer dark:bg-dark-gray-1 overflow-hidden
            "
            >
              {/* Image */}
              <div>
                {event.documentIds.length > 0 && (
                  <img
                    src={event.documentIds[0].fileUrl}
                    alt={event.title}
                    className="w-[55vw] sm:w-[45vw] md:w-[40vw] lg:w-[35vw] h-[170px] sm:h-full xl:h-[210px] object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex w-full">
                <div className="flex flex-col gap-2 justify-between w-[45vw] sm:w-[26vw] lg:w-full py-2 ml-4 sm:ml-0 text-[0.9375rem]">
                  <h2 className="text-base md:text-xl font-semibold text-dark-gray-1 dark:text-white">
                    {event.title}
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 text-sm sm:text-[1rem] text-gray-2 dark:text-white">
                      <img
                        src={
                          event.createdBy?.userType === "individual"
                            ? event.createdBy?.userDetailsId?.avatar
                            : event.createdBy?.userDetailsId?.organizationLogo
                        }
                        alt="Organizator Avatar"
                        className="w-[1.1rem] h-[1.1rem]"
                      />

                      {event.createdBy.fullName
                        ? event.createdBy.fullName
                        : event.createdBy.organizationName}
                    </div>
                    <div className="flex gap-2 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                      <FaRegCalendarAlt className="mt-0.5 text-[1.1rem] text-gray-2 dark:text-white" />
                      {formatDate(event?.startDate)} - {formatDate(event?.endDate)}
                    </div>

                    <div className="flex gap-2 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                      <HiOutlineUserGroup className="text-[1.1rem] text-gray-2 dark:text-white" />
                      {event.eventParticipantIds.length}/{event.maxParticipant}
                      <p>people joined</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.interestIds.map((interest) => (
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
                onClick={() => navigate("/page-not-created-yet")}
                className="flex items-center border-l-2 opacity-0 lg:mr-4 group-hover:opacity-100 transition-opacity duration-300"
              >
                <MdKeyboardArrowRight className="text-[2.5rem] lg:ml-4 text-gray-2 dark:text-gray-1" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {/* Organized Events */}
          {events.slice(4, 9).map((event) => (
            <div
              key={event._id}
              className="group flex rounded-md shadow-md text-dark-gray-1 sm:gap-4 cursor-pointer dark:bg-dark-gray-1 overflow-hidden
            "
            >
              {/* Image */}
              <div>
                {event.documentIds.length > 0 && (
                  <img
                    src={event.documentIds[0].fileUrl}
                    alt={event.title}
                    className="w-[55vw] sm:w-[45vw] md:w-[40vw] lg:w-[35vw] h-[170px] sm:h-full xl:h-[210px] object-cover"
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex w-full">
                <div className="flex flex-col gap-2 justify-between w-[45vw] sm:w-[26vw] lg:w-full py-2 ml-4 sm:ml-0 text-[0.9375rem]">
                  <h2 className="text-base md:text-xl font-semibold text-dark-gray-1 dark:text-white">
                    {event.title}
                  </h2>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 text-sm sm:text-[1rem] text-gray-2 dark:text-white">
                      <img
                        src={
                          event.createdBy?.userType === "individual"
                            ? event.createdBy?.userDetailsId?.avatar
                            : event.createdBy?.userDetailsId?.organizationLogo
                        }
                        alt="Organizator Avatar"
                        className="w-[1.1rem] h-[1.1rem]"
                      />

                      {event.createdBy.fullName
                        ? event.createdBy.fullName
                        : event.createdBy.organizationName}
                    </div>
                    <div className="flex gap-2 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                      <FaRegCalendarAlt className="mt-0.5 text-[1.1rem] text-gray-2 dark:text-white" />
                      {formatDate(event?.startDate)} - {formatDate(event?.endDate)}
                    </div>

                    <div className="flex gap-2 text-sm sm:text-[0.9375rem] text-gray-2 dark:text-white">
                      <HiOutlineUserGroup className="text-[1.1rem] text-gray-2 dark:text-white" />
                      {event.eventParticipantIds.length}/{event.maxParticipant}
                      <p>people joined</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.interestIds.map((interest) => (
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
                onClick={() => navigate("/page-not-created-yet")}
                className="flex items-center border-l-2 opacity-0 lg:mr-4 group-hover:opacity-100 transition-opacity duration-300"
              >
                <MdKeyboardArrowRight className="text-[2.5rem] lg:ml-4 text-gray-2 dark:text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProfileCard
