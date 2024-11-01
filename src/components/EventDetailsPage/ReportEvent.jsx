import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const ReportEvent = ({ eventTitle, onClose, isOpen }) => {
  const [selectedReason, setSelectedReason] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [description, setDescription] = useState("")
  const maxChars = 300

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason)
    setIsDropdownOpen(false)
  }
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md w-full max-w-md mx-auto shadow-lg text-center">
        <h2 className=" text-xl font-semibold mb-4 text-dark-gray-3 ">Report Event</h2>
        <h3>{eventTitle.toUpperCase()}</h3>
        <p className="text-dark-gray-1 mb-4 text-justify">
          If you have encountered any issues with this event, please let us know. Your report will
          help us maintain a safe and respectful environment for everyone.
        </p>

        {/* Dropdown for Choosing Report Reason */}

        <div className="relative mb-4 w-2/3 mx-auto group">
          <div
            className={`border p-2 flex items-center justify-between cursor-pointer text-gray-2 rounded-lg ${
              isDropdownOpen ? "border-primary-green" : "border-gray-2"
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedReason || "Choose Report Reason "}
            {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          {isDropdownOpen && (
            <div className="absolute w-full bg-white border border-light-gray-2 mt-1 rounded-md shadow-md z-10">
              {["Spam", "Offensive", "Harmful"].map((reason) => (
                <div
                  key={reason}
                  onClick={() => handleReasonSelect(reason)}
                  className="p-2 hover:bg-light-green hover:text-black cursor-pointer text-left"
                >
                  {reason}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Describe Issue Text Area */}
        <label className="block text-gray-2 text-left mb-1">Describe issue (optional):</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, maxChars))}
          maxLength={maxChars}
          className="w-full border border-gray-2 rounded-md p-2 resize-none mb-2"
          rows="4"
          placeholder="Please provide a detailed description of the issue. "
        ></textarea>
        <p className="text-gray-2 font-medium text-xs text-right mb-4">
          {description.length}/{maxChars}
        </p>

        {/* Submit and Close Buttons */}
        <button
          onClick={() => alert("Report submitted")}
          className="w-full bg-primary-green text-white py-2 rounded-md font-semibold mb-2"
        >
          SUBMIT
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-md font-semibold"
        >
          CANCEL
        </button>
      </div>
    </div>
  )
}

export default ReportEvent
