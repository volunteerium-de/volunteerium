import React from "react"
import EventCardHorizontal from "../ui/Cards/EventCardHorizontal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"

const EventCardList = ({ events }) => {
  const { t } = useTranslation()

  return (
    <div className="">
      {/* Map through event data */}
      <div className="flex flex-col min-h-[200px] ">
        {events?.length > 0 ? (
          events.map((event) => <EventCardHorizontal key={event._id} event={event} />)
        ) : (
          <p className="dark:text-white">{t(translations.eventsPage.match)}</p>
        )}
      </div>
    </div>
  )
}

export default EventCardList
