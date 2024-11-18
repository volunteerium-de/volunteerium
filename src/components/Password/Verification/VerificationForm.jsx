// src/components/Verification/VerificationForm.jsx

import React, { useState, useEffect, useRef } from "react"
import { IoIosArrowBack } from "react-icons/io"
import logo from "../../../assets/logo.png"
import { useNavigate } from "react-router-dom"
import { axiosWithPublic } from "../../../hooks/useAxios"
import toastNotify from "../../../utils/toastNotify"
import { translations } from "../../../locales/translations"
import { useTranslation } from "react-i18next"

const VerificationForm = ({ setIssue, identifier, setIdentifier, email }) => {
  const { t } = useTranslation()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(90) // 01:30 seconds (90 seconds)
  const [timerMessage, setTimerMessage] = useState(
    t(translations.password.verificationForm.didntRecive)
  ) // Message changes when time runs out
  const inputRefs = useRef([]) // References for code input boxes
  const navigate = useNavigate()

  const resendForgotPassword = async () => {
    if (email) {
      try {
        const { data } = await axiosWithPublic.post("auth/forgot-password", { email })

        setIdentifier(data.resetToken)
        setTimeLeft(90)
        toastNotify("success", data.message)
      } catch (error) {
        toastNotify("error", error.response?.data?.message)
      }
    } else {
      toastNotify("error", "Please provide an email address.")
    }
  }

  const verifyResetToken = async () => {
    if (email && identifier && code) {
      try {
        const { data } = await axiosWithPublic.post("auth/verify-reset", {
          email,
          resetToken: identifier,
          resetCode: code.join(""),
        })

        setIdentifier(data.resetToken)
        setIssue("set-new-password")
        toastNotify("success", data.message)
      } catch (error) {
        toastNotify("error", error.response?.data?.message)
      }
    } else {
      toastNotify("error", "Verification failed. Please try again!")
    }
  }

  // Start countdown and change message when time runs out
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setTimerMessage(t(translations.password.verificationForm.timerMsg))
    }
  }, [timeLeft])

  // Format time into minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Automatically move to the next input box when a code digit is entered
  const handleInputChange = (e, index) => {
    const { value } = e.target
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move to the next input box automatically after entering a digit
      if (value && index < 5) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  // Handle input focus
  const handleFocus = (index) => {
    inputRefs.current[index].select()
  }

  // Enable submit button only if all input boxes are filled
  const isCodeComplete = code.every((digit) => digit !== "")

  const handleSubmit = (e) => {
    e.preventDefault()
    verifyResetToken()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start space-y-6 p-6 w-full max-w-[44.1875rem] bg-white dark:bg-black rounded-lg relative"
    >
      {/* Mobile View - Back Arrow and "Back to Login" (Below Header) */}
      <div className="md:hidden flex flex-row items-center mb-6" onClick={() => navigate("/login")}>
        <IoIosArrowBack className="text-black dark:text-white text-3xl cursor-pointer self-start" />{" "}
        <span className="text-lg font-semibold text-black dark:text-white">
          {t(translations.password.verificationForm.backToLogin)}
        </span>{" "}
      </div>

      {/* Mobile View - Centered Logo */}
      <div className="md:hidden w-full flex justify-center mb-6 mt-[5rem]">
        <img
          src={logo}
          alt={t(translations.password.verificationForm.logoAlt)}
          className="h-16 w-auto"
        />
      </div>

      {/* Title and Description */}
      <div className="flex-grow w-full">
        <h1 className="text-black dark:text-white text-[1.75rem] text-center md:text-center md:text-[2rem] font-semibold mb-6">
          {t(translations.password.verificationForm.verification)}
        </h1>
        <p className="text-center w-full text-[1rem] md:text-[1.125rem] font-normal text-gray-2 dark:text-white leading-snug">
          {t(translations.password.verificationForm.verifyDesc)}
        </p>
      </div>

      {/* Code Input Fields */}
      <div className="flex justify-center gap-[0.75rem] md:gap-[1.25rem] w-full px-4 py-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={code[index]}
            onChange={(e) => handleInputChange(e, index)}
            onFocus={() => handleFocus(index)}
            className={`w-[1.875rem] h-[1.875rem] md:w-[2.75rem] md:h-[2.875rem] border text-center text-xl rounded focus:outline-none transition-colors duration-200
            ${code[index] ? "border-primary-green text-dark-gray-1" : "border-gray-2"}
            hover:border-primary-green`}
          />
        ))}
      </div>

      {/* Countdown Timer */}
      <div className="text-center mb-4 w-full">
        <span className="text-danger text-[1.125rem] font-semibold">{formatTime(timeLeft)}</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full max-w-[44.18rem] h-[2.8125rem] rounded-lg transition duration-300
        ${isCodeComplete ? "bg-primary-green hover:bg-primary-green/60 text-white cursor-pointer" : "bg-primary-green cursor-not-allowed"}`}
        disabled={!isCodeComplete}
      >
        {t(translations.password.verificationForm.verify)}
      </button>

      {/* Resend Code Option */}
      <p className="mt-4 text-center text-sm dark:text-white w-full">
        {timerMessage}{" "}
        <span
          onClick={() => resendForgotPassword()}
          className="text-primary-green cursor-pointer underline"
        >
          {t(translations.password.verificationForm.resend)}
        </span>
      </p>
    </form>
  )
}

export default VerificationForm
