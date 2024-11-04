import React from "react"
import EventCardHorizontal from "../ui/Cards/EventCardHorizontal"

const EventCardList = ({ events }) => {
  return (
    <div className="">
      {/* Map through event data */}
      <div className="flex flex-col gap-1 min-h-[200px] ">
        {events?.length > 0 ? (
          events.map((event) => <EventCardHorizontal key={event._id} event={event} />)
        ) : (
          <p>No events found that match your filters.</p>
        )}
      </div>
    </div>
  )
}

export default EventCardList
