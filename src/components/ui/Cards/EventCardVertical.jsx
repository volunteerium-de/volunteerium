import React from "react"
import { LuCalendarDays } from "react-icons/lu"
import { CiLocationOn } from "react-icons/ci"
import { IoPeopleOutline, IoHomeOutline } from "react-icons/io5"
import eventImage from "../../../assets/example-event-img.png"

const EventCardVertical = ({ event }) => {
  return (
    <div className="rounded-[8px] max-w-[325px] max-[390px]:max-w-[180px] shadow-[0_1px_1px_rgba(0,0,0,.25)] overflow-x-hidden shrink-0 mb-[10px]">
      {/* Event Image */}
      <div>
        <img
          src={event.image || eventImage}
          alt="event"
          className="rounded-t-md object-cover w-full "
        />
      </div>
      {/* Event Content */}
      <div className="p-[10px] mb-[16px]">
        <h2 className="text-dark-gray-1 font-bold text-[0.9375rem] leading-[1.4666] ">
          {event.title}
        </h2>
        <p className="text-dark-gray-1 text-[0.75rem] leading-[1.8333] mb-[10px]">
          {event.description}
        </p>
        {/* Details */}
        <div>
          {/* User */}
          <div className="flex gap-x-[7px] items-center  mb-[7px]">
            <IoHomeOutline style={{ color: "#6C707A" }} />
            <p className="text-gray-2 text-sm leading-[1.7142]">{event.organizer}</p>
          </div>
          {/* Event Details */}
          <div>
            <div className="flex gap-x-[8px] items-center mb-[1px]">
              <LuCalendarDays style={{ color: "#6C707A" }} />
              <p className="text-gray-2 text-sm leading-[1.7142]">{event.date}</p>
            </div>
            <div className="flex gap-x-[8px] items-center mb-[1px]">
              <CiLocationOn style={{ color: "#6C707A" }} />
              <p className="text-gray-2 text-sm leading-[1.7142]">{event.location}</p>
            </div>
            <div className="flex gap-x-[8px] items-center  mb-[10px]">
              <IoPeopleOutline style={{ color: "#6C707A" }} />
              <p className="text-gray-2 text-sm leading-[1.7142]">Max. {event.maxPeople} People</p>
            </div>
            <div className="max-w-[100px] rounded-[20px] outline-[#69957B] outline-1 outline">
              <p className="mulish font-extrabold text-[0.625rem] leading-[1.3] text-primary-green text-center py-[6px] dark:text-primary-green">
                {event.category.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Event Button */}
      <div className="pr-[18px] pb-[7px]">
        <a
          href={event.link}
          className="font-medium text-white text-[1rem] leading-[1.5625] text-center block py-[2.5px] bg-primary-green rounded-lg max-w-[60px] ml-auto"
        >
          Join
        </a>
      </div>
    </div>
  )
}

export default EventCardVertical
