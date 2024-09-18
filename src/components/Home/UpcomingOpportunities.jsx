import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import React, { useRef, useState } from "react"
import EventCardVertical from "../ui/Cards/EventCardVertical"

const UpcomingOpportunities = () => {
  const sliderRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Example event data (this would normally come from an API or data source)
  const eventData = [
    {
      title: "Community Park Tree Planting Day",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: "Environment",
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: "Environment",
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: "Environment",
      link: "#",
    },
    {
      title: "Community Park Tree Planting Day",
      description:
        "Help us make Riverside greener! Join us for a day of tree planting in the community park.",
      organizer: "Matilda R.",
      date: "June 5, 2024 - 17:00",
      location: "Berlin, Germany",
      maxPeople: 15,
      category: "Environment",
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

  return (
    <div>
      {/* Latest Card Container */}
      <div className="max-w-[1440px] mx-auto w-[95%] px-[20px] pb-[15px] font-['Poppins'] dark:text-white dark:bg-dark-gray-3">
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
            className="absolute top-[calc(60%-25px)] left-[-25px] rounded-full"
            onClick={handleScrollLeft}
          >
            <FaArrowLeft className="rounded-full w-[1.875rem] h-[1.875rem] p-1 text-white bg-[#4B6D59] transition-colors duration-300 hover:text-dark-gray-3 dark:hover:text-white" />
          </button>
          {/* Arrow Right */}
          <button
            className="absolute top-[calc(60%-25px)] right-[-25px] transition-colors duration-300 hover:bg-[#6B8E69] rounded-full"
            onClick={handleScrollRight}
          >
            <FaArrowRight className="rounded-full w-[1.875rem] h-[1.875rem] p-1 text-white bg-[#4B6D59] transition-colors duration-300 hover:text-dark-gray-3 dark:hover:text-white" />
          </button>
          {/* Event Component */}
          <div
            id="opportunities"
            ref={sliderRef}
            className="flex gap-x-[40px] overflow-x-hidden items-start scroll-smooth"
          >
            {/* Map through event data */}
            {eventData.map((event, idx) => (
              <EventCardVertical key={idx} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingOpportunities
