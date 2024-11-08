import React, { useState, useRef, useEffect } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import useEventCall from "../../hooks/useEventCall"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"

const EventFeedback = ({ eventName, eventId, onClose }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [error, setError] = useState("")
  const { sendEventFeedback } = useEventCall()

  const { t } = useTranslation()

  // Handle star click
  const handleStarClick = (value) => {
    setRating((prevRating) => (prevRating === value ? 0 : value))
    setError("") // Reset error when a rating is selected
  }

  // Reference for the modal container
  const modalRef = useRef(null)

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose() // Close the modal if click is outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      setError("Please provide a rating to submit feedback.")
      return
    }
    sendEventFeedback({ rating, feedback, eventId, userId: currentUser._id })
    onClose() // Close the modal after feedback submission
  }

  return (
    <div className="fixed -inset-5 flex items-center justify-center bg-black bg-opacity-50 ">
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-gray-3 p-8 rounded-lg w-4/5 max-w-lg mx-auto shadow-lg "
      >
        <h2 className="text-[1.25rem] text-center text-dark-gray-3 dark:text-white font-semibold mb-4">
          {t(translations.eventDetails.feedback.h2)}
        </h2>
        <p className="text-dark-gray-1 dark:text-white mb-4 text-center">
          {t(translations.eventDetails.report.p1)}
          <span className="text-dark-gray-3 dark:text-white font-semibold"> {eventName}</span>{" "}
          {t(translations.eventDetails.report.p2)}
        </p>

        {/* Star Rating */}

        <div className="flex justify-center mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="cursor-pointer text-[3rem]" // Increase size of stars
              onClick={() => handleStarClick(star)} // Handle star click to set rating
              onMouseEnter={() => setHoverRating(star)} // Set hover rating
              onMouseLeave={() => setHoverRating(0)} // Reset hover rating on mouse leave
              style={{
                color: star <= (hoverRating || rating) ? "#69957B" : "#C1C2C4", // Change color based on hover or selected rating
                transition: "color 0.2s", // Smooth transition for color
              }}
            >
              {star <= (hoverRating || rating) ? <AiFillStar /> : <AiOutlineStar />}
            </span>
          ))}
        </div>

        {error && <p className="text-danger text-center mb-4">{error}</p>}

        {/* Text Area for feedback */}
        <label className="block text-dark-gray-2 dark:text-white text-left mb-2 mt-4">
          Feedback (Optional):
        </label>
        <textarea
          className="w-full  p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green mb-4 placeholder-dark-gray-1 resize-none"
          placeholder={t(translations.eventDetails.feedback.placeholder)}
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Share Feedback Button */}
        <button
          type="submit"
          className="w-full bg-primary-green text-white py-2 rounded-md font-semibold mb-2"
          onClick={handleFeedbackSubmit}
        >
          {t(translations.eventDetails.feedback.submit)}
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-300 text-dark-gray-2 py-2 rounded-md font-semibold"
        >
          {t(translations.eventDetails.feedback.cancel)}
        </button>
      </div>
    </div>
  )
}

export default EventFeedback
