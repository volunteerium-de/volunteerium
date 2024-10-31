import { IoCalendar, IoHome, IoLocation, IoPeople } from "react-icons/io5"
import eventImage from "../../../assets/example-event-img.png"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { MdLanguage } from "react-icons/md"
import { getLangName } from "./EventCardHorizontal"
import useEventCall from "../../../hooks/useEventCall"


const EventCardVertical = ({event}) => {
  console.log("event in EventCard", event)
  const { currentUser: user } = useSelector((state) => state.auth)

  const startDate = new Date(event.startDate).toLocaleDateString()

  return (
      <div
      key={event._id}
      className="flex flex-col justify-between rounded max-w-[200px] sm:max-w-[330px] shadow-[0_1px_1px_rgba(0,0,0,.25)] overflow-x-hidden shrink-0 mb-2 dark:bg-dark-gray-3"
    >
      {/* Event Image */}
      <div>
        <img
          src={event.eventPhoto || eventImage}
          alt="event"
          className="rounded-t-sm object-cover w-full h-[200px]"
        />
      </div>
      {/* Event Content */}
      <div className="p-2 mb-2 h-full">
        <h2 className="text-dark-gray-1 dark:text-white font-bold text-[0.9375rem] ">
          {event.title}
        </h2>
        <p className="text-dark-gray-1 dark:text-light-gray-2 text-[0.75rem] mb-[10px]">
          {event.description.split(" ").slice(0, 10).join(" ")}
          {event.description.split(" ").length > 10 ? "..." : ""}
        </p>
        {/* Details */}
        <div>
          {/* User */}
          <div className="flex gap-x-3 items-center mb-[7px] py-1">
            <IoHome className="text-primary-green" />
            <p className="text-gray-2 dark:text-light-gray-2 font-semibold text-sm">
              {event.createdBy?.fullName}
            </p>
          </div>
          {/* Event Details */}
          <div>
            <div className="flex gap-x-[8px] items-center mb-[1px]">
              <IoCalendar className="text-primary-green" />
              <p className="text-gray-2 dark:text-light-gray-2 text-sm p-1">{startDate}</p>
            </div>

            {event.addressId && (
              <div className="flex gap-x-[8px] items-center mb-[1px]">
                <IoLocation className="text-primary-green" />
                <p className="text-gray-2 dark:text-light-gray-2 text-sm p-0.5">
                  {event.isOnline
                    ? "Online"
                    : `${event.addressId?.city}, ${event.addressId?.country}`}
                </p>
              </div>
            )}

            <div className="flex gap-x-[8px] items-center  mb-[1px]">
              <IoPeople className="text-primary-green" />
              <p className="text-gray-2 dark:text-light-gray-2 text-sm p-1">
                Max. {event.maxParticipant} People
              </p>
            </div>

              {/* Event Languages */}
              {event.languages.length > 0 && 
                <div className="flex gap-x-[8px] items-center  mb-[10px]">
                <MdLanguage className="text-primary-green" />
                <p className="text-gray-2 dark:text-light-gray-2 text-sm p-1">
                  {event.languages.map((langCode) => getLangName(langCode)).join(", ")}
                </p>
              </div>}
              

            {/* Category Area */}
            <div className="flex flex-row flex-wrap gap-2  ">
              {event.interestIds?.map((interest, index) => (
                <div
                  key={index}
                  className="border border-primary-green dark:border-gray-1 px-2 py-1 rounded-full w-fit h-6"
                >
                  <p className="font-semibold tracking-wide text-[0.6rem] sm:text-[0.6rem] text-primary-green text-center dark:text-gray-1">
                  {interest.name.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Event Button */}
      <div className="flex flex-row p-2 justify-end">
        {user ? (
          <button className="font-medium text-white text-[0.9rem] text-center bg-primary-green px-3 py-1 rounded">
            Join
          </button>
        ) : null}
      </div>
    </div>
  )
};

export default EventCardVertical