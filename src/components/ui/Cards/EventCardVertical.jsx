import { IoCalendar, IoHome, IoLocation, IoPeople } from "react-icons/io5"
import eventImage from "../../../assets/example-event-img.png"

const EventCardVertical = ({ event }) => {
  return (
    <div className="relative rounded-3 max-w-[200px] sm:max-w-[340px] shadow-[0_1px_1px_rgba(0,0,0,.25)] overflow-x-hidden shrink-0 mb-2">
      {/* Event Image */}
      <div>
        <img
          src={event.image || eventImage}
          alt="event"
          className="rounded-t-md object-cover w-full "
        />
      </div>
      {/* Event Content */}
      <div className="p-2 mb-2">
        <h2 className="text-dark-gray-1 font-bold text-[0.9375rem] ">{event.title}</h2>
        <p className="text-dark-gray-1 text-[0.75rem] mb-[10px]">{event.description}</p>
        {/* Details */}
        <div>
          {/* User */}
          <div className="flex gap-x-3 items-center mb-[7px] py-1">
            <IoHome className="text-primary-green" />
            <p className="text-gray-2 font-semibold text-sm">{event.organizer}</p>
          </div>
          {/* Event Details */}
          <div>
            <div className="flex gap-x-[8px] items-center mb-[1px]">
              <IoCalendar className="text-primary-green" />
              <p className="text-gray-2 text-sm p-1">{event.date}</p>
            </div>
            <div className="flex gap-x-[8px] items-center mb-[1px]">
              <IoLocation className="text-primary-green" />
              <p className="text-gray-2 text-sm p-0.5">{event.location}</p>
            </div>
            <div className="flex gap-x-[8px] items-center  mb-[10px]">
              <IoPeople className="text-primary-green" />
              <p className="text-gray-2 text-sm p-1">Max. {event.maxPeople} People</p>
            </div>
            {/* Category Area */}
            <div className="flex flex-row flex-wrap gap-2  ">
              {event.category?.map((category, index) => (
                <div
                  key={index}
                  className="border border-primary-green px-2 py-1 rounded-full w-fit h-6"
                >
                  <p className="font-extrabold text-[0.6rem] sm:text-[0.7rem] text-primary-green text-center dark:text-primary-green">
                    {category.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Event Button */}
      <div className="flex flex-row p-2 justify-end">
        <button className="font-medium text-white text-[0.9rem] text-center bg-primary-green px-3 py-1 rounded">
          Join
        </button>
      </div>
    </div>
  )
}

export default EventCardVertical
