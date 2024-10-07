import React, { useRef, useState, useEffect } from "react"
import EventCardVertical from "../ui/Cards/EventCardVertical"
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io"

const UpcomingOpportunities = () => {
  const sliderRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isLeftDisabled, setIsLeftDisabled] = useState(true)
  const [isRightDisabled, setIsRightDisabled] = useState(false)

  // Example event data (this would normally come from an API or data source)
  const eventData = [
    {
      title: "Community Park Tree Planting Day 1",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: ["Environment", "Sustainability"],
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day 2",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: ["Environment", "Sustainability"],
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day 3",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: ["Environment"],
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day 4",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: ["Environment"],
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day 5 ",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: ["Environment", "Sustainability"],
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day 6",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: ["Environment"],
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day 7",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: ["Environment", "Sustainability"],
      link: "#",
    },
  ]

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

  return (
    <div>
      {/* Latest Card Container */}
      <div className="max-w-[1720px] mx-auto w-[95%] px-[20px] pb-[15px] font-poppins dark:text-white dark:bg-dark-gray-3">
        {/* Header */}
        <div className="flex justify-between flex-wrap mb-[5px]">
          <h2 className="text-[1.5rem] font-semibold text-dark-gray-1 leading-[2.4166]">
            Upcoming Events
          </h2>
          <a
            href="#"
            className="text-primary-green font-medium pt-[10px] text-[0.9375rem] self-center leading-[1.66] ml-auto"
          >
            Discover More
          </a>
        </div>

        <div className="relative">
          {/* Arrow Left */}
          <button
            className={`absolute top-[calc(60%-25px)] left-[-25px] ${isLeftDisabled ? "hidden" : "block"}`}
            onClick={handleScrollLeft}
            disabled={isLeftDisabled}
          >
            <IoIosArrowDropleftCircle className="w-[2.2rem] h-[2.2rem] p-1 text-primary-green hover:text-dark-green dark:hover:text-white transition-colors duration-300 " />
          </button>
          {/* Arrow Right */}
          <button
            className={`absolute top-[calc(60%-25px)] right-[-25px] ${isRightDisabled ? "hidden" : "block"}`}
            onClick={handleScrollRight}
            disabled={isRightDisabled}
          >
            <IoIosArrowDroprightCircle className="w-[2.2rem] h-[2.2rem] p-1 text-primary-green hover:text-dark-green dark:hover:text-white transition-colors duration-300 " />
          </button>
          {/* Event Component */}
          <div
            id="opportunities"
            ref={sliderRef}
            className="flex gap-x-[40px] overflow-x-hidden items-start scroll-smooth"
          >
            {/* Map through event data */}
            <div className="flex flex-row flex-grow gap-6 p-2 min-h-[200px]">
              {eventData.map((event, id) => (
                <EventCardVertical key={id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingOpportunities
