import React from "react"
import { IoCalendar, IoHome, IoLocation, IoPeople } from "react-icons/io5"
import eventImage from "../../../assets/example-event-img.png"
import { RxDividerVertical } from "react-icons/rx"

const EventCardHorizontal = ({ event }) => {
  const startDate = new Date(event.startDate).toLocaleDateString()
  const endDate = new Date(event.endDate).toLocaleDateString()

  // useEffect(() => {
  //   console.log("Event updated:", event) // Her güncellemede konsola yaz
  // }, [event])

  return (
    <div className="rounded-3 shadow-[0_1px_1px_rgba(0,0,0,.25)] mb-2 flex justify-center items-center gap-5 ">
      {/* Event Image */}
      <div>
        <img
          src={event.eventPhoto || eventImage}
          alt="event"
          className="rounded-t-md object-cover max-w-[155px] h-[150px] "
        />
      </div>
      {/* Event Content */}
      <div className="p-2 flex flex-col justify-between w-full gap-1">
        <h2 className="text-black font-semibold text-[1rem]">{event.title}</h2>
        <p className="text-dark-gray-1 text-[0.8125rem] mb-[10px]">
          {event.description.split(" ").slice(0, 20).join(" ")}
          {event.description.split(" ").length > 20 ? "..." : ""}
        </p>
        {/* Event Details */}
        <div>
          {/* Organizer Information */}
          {event.createdBy && event.createdBy.userDetailsId && (
            <div className="flex gap-x-1 items-center mb-[7px] py-1">
              <img
                src={event.createdBy.userDetailsId.avatar}
                alt="organizer-avatar"
                className="w-6 h-6 rounded-full"
              />
              <p className="text-gray-2 text-[0.7rem]">{event.createdBy.fullName}</p>
            </div>
          )}

          <div>
            {/* Event Dates */}
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <IoCalendar className="text-primary-green" />
                <p className="text-gray-2 text-[0.7rem] p-1">
                  {startDate} - {endDate}
                </p>
                <RxDividerVertical className="text-gray-2" />
              </div>

              {/* Event Location */}
              {event.addressId && (
                <div className="flex items-center">
                  <IoLocation className="text-primary-green" />
                  <p className="text-gray-2 text-[0.7rem] p-0.5">
                    {event.addressId.city}, {event.addressId.country}
                  </p>
                  <RxDividerVertical className="text-gray-2" />
                </div>
              )}

              {/* Max Participants */}
              <div className="flex items-center">
                <IoPeople className="text-primary-green" />
                <p className="text-gray-2 text-[0.7rem] p-1">Max. {event.maxParticipant} People</p>
              </div>

              {/* Event Languages */}
              {/* <div className="mt-2">
                <p className="text-gray-2 text-[0.7rem]">Languages: {event.languages.join(", ")}</p>
              </div> */}
            </div>
            {/* Category Area */}
            <div className="flex flex-row flex-wrap gap-2 mt-2  ">
              {event.interestIds?.map((interest) => (
                <div
                  key={interest._id}
                  className="border border-primary-green px-2 py-1 rounded-full w-fit h-5"
                >
                  <p className="font-extrabold text-[0.5rem]  text-primary-green text-center dark:text-primary-green">
                    {interest.name.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Event Button */}
      <div className="mx-auto">
        <button className="font-medium text-white text-[0.7rem] text-center bg-primary-green px-4 py-1 mb-1 mr-2 rounded">
          Join
        </button>
      </div>
    </div>
  )
}

export default EventCardHorizontal
