import React, { useRef, useState, useEffect } from "react"
import EventCardVertical from "../ui/Cards/EventCardVertical"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import useEventCall from "../../hooks/useEventCall"
import { ImSpinner9 } from "react-icons/im"

const UpcomingOpportunities = () => {
  const { t } = useTranslation()
  const sliderRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true)
  const [isRightDisabled, setIsRightDisabled] = useState(false)
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)
  const { getEvents } = useEventCall()

  // Function to handle scroll left
  const handleScrollLeft = () => {
    if (sliderRef.current) {
      const newPosition = Math.max(0, scrollPosition - 325)
      sliderRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
      setScrollPosition(newPosition)
    }
  }

  // Function to handle scroll right
  const handleScrollRight = () => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.scrollWidth
      const containerWidth = sliderRef.current.clientWidth
      const maxScrollPosition = sliderWidth - containerWidth
      const newPosition = Math.min(maxScrollPosition, scrollPosition + 325)
      sliderRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
      setScrollPosition(newPosition)
    }
  }

  useEffect(() => {
    const checkButtonStates = () => {
      if (sliderRef.current) {
        const sliderWidth = sliderRef.current.scrollWidth
        const containerWidth = sliderRef.current.clientWidth
        const maxScrollPosition = sliderWidth - containerWidth
        setIsLeftDisabled(scrollPosition <= 0)
        setIsRightDisabled(scrollPosition >= maxScrollPosition)
      }
    }

    checkButtonStates()
  }, [scrollPosition, eventData.length])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await getEvents(
        "events/?filter[isActive]=true&filter[isDone]=false&sort[startDate]=asc&limit=10"
      )
      setEventData(response.data)
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="pt-5">
      {/* Latest Card Container */}
      <div className="max-w-[1840px] mx-auto w-[80%] sm:w-[90%] pb-8 font-poppins dark:text-white dark:black rounded-lg">
        {/* Header */}
        <div className="flex justify-between flex-wrap mb-[5px]">
          <h2 className="text-[1.5rem] font-semibold text-dark-gray-1 dark:text-white py-3">
            {t(translations.upcomingOpp.title)}
          </h2>
          <Link
            to="/events"
            className="text-primary-green font-medium pt-[10px] text-[0.9375rem] self-center leading-[1.66] ml-auto"
          >
            {t(translations.upcomingOpp.discover)}
          </Link>
        </div>

        <div className="relative rounded-lg">
          {/* Arrow Left */}
          <button
            className={`absolute top-[calc(60%-25px)] left-[-40px] ${isLeftDisabled ? "hidden" : "block"}`}
            onClick={handleScrollLeft}
            disabled={isLeftDisabled}
          >
            <IoIosArrowDropleftCircle className="w-[2.2rem] h-[2.2rem] p-1 text-primary-green hover:text-dark-green dark:hover:text-dark-gray-1 transition-colors duration-300 " />
          </button>
          {/* Arrow Right */}
          <button
            className={`absolute top-[calc(60%-25px)] right-[-40px] ${isRightDisabled ? "hidden" : "block"}`}
            onClick={handleScrollRight}
            disabled={isRightDisabled}
          >
            <IoIosArrowDroprightCircle className="w-[2.2rem] h-[2.2rem] p-1 text-primary-green hover:text-dark-green dark:hover:text-dark-gray-1 transition-colors duration-300 " />
          </button>
          {/* Event Component */}
          <div
            id="opportunities"
            ref={sliderRef}
            className="flex gap-x-4 overflow-x-hidden items-start scroll-smooth px-2"
          >
            {/* Map through event data */}
            <div className="flex flex-row flex-grow gap-6 p-2 min-h-[200px] rounded-md">
              {loading ? (
                <div className="flex items-center gap-2">
                  <ImSpinner9 className="animate-spin text-primary-green" />
                  <span>{t(translations.upcomingOpp.loadingEvents)}</span>
                </div>
              ) : eventData.length > 0 ? (
                eventData.map((event, _id) => <EventCardVertical key={event._id} event={event} />)
              ) : (
                <p>{t(translations.upcomingOpp.noEvents)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingOpportunities
