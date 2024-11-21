import React, { useRef, useState, useEffect } from "react"
import EventCardVertical from "../ui/Cards/EventCardVertical"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import useEventCall from "../../hooks/useEventCall"
import { ImSpinner9 } from "react-icons/im"

const OnlineOpportinuties = () => {
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
        "events/?filter[isActive]=true&filter[isDone]=false&filter[isOnline]=true&sort[startDate]=asc"
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
    <div className="px-4  mx-auto mt-4 shadow-lg">
      {/* Latest Card Container */}
      <div className="max-w-[1370px] mx-auto font-poppins dark:text-white dark:black rounded-lg">
        
        <div className="flex justify-between flex-wrap mb-[5px]">
          <h2 className="text-[1.5rem] font-semibold text-dark-gray-1 dark:text-white py-3">
            {t(translations.onlineOpp.title)}
          </h2>
        </div>

        <div className="relative rounded-lg">
          {/* Arrow Left */}
          <button
            className={`absolute top-[calc(60%-25px)] left-[0] ${isLeftDisabled ? "hidden" : "block"} hidden lg:block`}
            onClick={handleScrollLeft}
            disabled={isLeftDisabled}
          >
            <IoIosArrowDropleftCircle className="w-[2.2rem] h-[2.2rem] p-1 text-primary-green hover:text-dark-green dark:hover:text-dark-gray-1 transition-colors duration-300 " />
          </button>
          {/* Arrow Right */}
          <button
            className={`absolute top-[calc(60%-25px)] right-[0px] ${isRightDisabled ? "hidden" : "block"} hidden lg:block`}
            onClick={handleScrollRight}
            disabled={isRightDisabled}
          >
            <IoIosArrowDroprightCircle className="w-[2.2rem] h-[2.2rem] p-1 text-primary-green hover:text-dark-green dark:hover:text-dark-gray-1 transition-colors duration-300 " />
          </button>
          {/* Event Component */}
          <div
            id="opportunities"
            ref={sliderRef}
            className="flex gap-x-4 overflow-x-auto xl:mx-8 scrollbar-hide items-start scroll-smooth"
          >
            {/* Map through event data */}
            <div className="flex flex-row flex-grow gap-6 p-2 pb-8 min-h-[200px] rounded-md">
              {loading ? (
                <div className="flex items-center gap-2">
                  <ImSpinner9 className="animate-spin text-primary-green" />
                  <span>{t(translations.onlineOpp.loadingEvents)}</span>
                </div>
              ) : eventData.length > 0 ? (
                eventData.map((event, _id) => <EventCardVertical key={event._id} event={event} />)
              ) : (
                <p>{t(translations.onlineOpp.noEvents)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnlineOpportinuties
