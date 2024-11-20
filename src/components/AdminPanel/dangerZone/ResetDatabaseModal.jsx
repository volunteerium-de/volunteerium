import React, { useState, useEffect, useRef } from "react"
import toastNotify from "../../../utils/toastNotify"
import { useSelector } from "react-redux"
import useAdminCall from "../../../hooks/useAdminCall"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const ResetDatabaseModal = ({ isOpen, setIsOpen, resetToken, setResetToken }) => {
  const { t } = useTranslation()
  const { currentUser: user } = useSelector((state) => state.auth)
  const { resetDatabase } = useAdminCall()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes = 120 seconds
  const inputRefs = useRef([])

  useEffect(() => {
    setTimeLeft(120)
    setCode(["", "", "", "", "", ""]) // Reset the entered code
  }, [])

  // Start countdown when the modal is open
  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      // When time runs out, show message and reset fields
      toastNotify("error", "Your session has expired. Please try again.")
      setIsOpen(false) // Close the modal
      setResetToken("") // Reset the token
      setCode(["", "", "", "", "", ""]) // Reset the entered code
    }
  }, [timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move to next input automatically
      if (value && index < 5) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleFocus = (index) => {
    inputRefs.current[index].select()
  }

  // Handle Reset Database action
  const handleResetDatabase = async () => {
    if (resetToken && code.every((digit) => digit !== "")) {
      await resetDatabase(user.email, resetToken, code.join(""))
      setIsOpen(false) // Close the modal after successful request
      setResetToken("") // Reset the token after success
    } else {
      toastNotify("error", t(translations.adminPanel.dangerZone.invalidCode))
    }
  }

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return isOpen && resetToken ? (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOverlayClick} // Close modal when clicking outside
    >
      <div
        className="bg-light-gray border border-light-gray relative dark:bg-gray-2 dark:border-dark-gray-3 p-6 rounded-lg w-full max-w-lg mx-5"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside modal
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-2xl hover:opacity-50 absolute right-4 top-2"
        >
          &times;
        </button>
        <h2 className="text-[1.125rem] font-semibold text-danger mb-10 mt-5">
          {t(translations.adminPanel.dangerZone.resetDatabaseConfirm)}
        </h2>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={code[index]}
              onChange={(e) => handleInputChange(e, index)}
              onFocus={() => handleFocus(index)}
              className={`w-12 h-12 text-center text-xl rounded focus:outline-none border border-dark-gray-2 ${code[index] ? "border-primary-green" : "border-gray-300"}`}
            />
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-danger text-xl">{formatTime(timeLeft)}</span>
        </div>
        <button
          onClick={handleResetDatabase}
          disabled={code.some((digit) => digit === "")}
          className={`mt-6 w-full py-3 bg-danger text-white rounded-lg hover:bg-dark-danger ${code.some((digit) => digit === "") && "opacity-50 cursor-not-allowed"}`}
        >
          {t(translations.adminPanel.dangerZone.confirmReset)}
        </button>
      </div>
    </div>
  ) : null
}

export default ResetDatabaseModal
