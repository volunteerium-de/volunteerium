import React, { useState } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

const EventFeedback = ({ eventName, onClose }) => {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  // Handle star click
  const handleStarClick = (value) => {
    setRating(value)
  }

  // Handle feedback submission
  const handleSubmit = () => {
    console.log(`Rating: ${rating}, Feedback: ${feedback}`)
    // Add logic for submitting feedback here
    onClose() // Close modal after submitting feedback
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Thank you for participating!</h2>
        <p className="mb-6">
          Please share your experience about <strong>{eventName}</strong> to help us improve.
        </p>

        {/* Star Rating */}
        <div className="flex mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="cursor-pointer" onClick={() => handleStarClick(star)}>
              {star <= rating ? <AiFillStar className="text-yellow-500" /> : <AiOutlineStar />}
            </span>
          ))}
        </div>

        {/* Text Area for feedback */}
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-6"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Share Feedback Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          onClick={handleSubmit}
        >
          Share Your Feedback
        </button>

        {/* Close Button */}
        <button className="mt-4 text-red-500 underline" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default EventFeedback
