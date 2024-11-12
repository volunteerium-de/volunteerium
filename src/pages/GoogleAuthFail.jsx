import React from "react"
import googleAuthFailDesktop from "../assets/google-fail-desktop.png"
import googleAuthFailMobile from "../assets/google-fail-mobile.png"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { translations } from "../locales/translations"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

const GoogleAuthFail = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [countdown, setCountdown] = useState(10)
  const [message, setMessage] = useState("")

  // Extract message from query params if available

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const messageParam = queryParams.get("message")
    if (messageParam) {
      // Remove quotation marks from the message
      const cleanedMessage = messageParam.replace(/"/g, "")
      setMessage(cleanedMessage)
    }
  }, [location.search])

  // Redirect to homepage after 5 seconds
  useEffect(() => {
    if (countdown === 0) {
      navigate("/")
    }

    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown(countdown - 1)
      }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  return (
    <div className="h-screen w-screen grid place-content-center place-items-center">
      <div className="w-[90%] md:w-[80%] xl:w-[70%] max-w-[1200px] mx-auto">
        {/* Different success images based on windows with */}
        <picture>
          <source media="(max-width: 400px)" srcSet={googleAuthFailMobile} />
          <img src={googleAuthFailDesktop} alt="google-auth-success" />
        </picture>
      </div>
      <div className="text-center mt-[4rem] space-y-2">
        <h1 className="text-danger font-semibold text-lg lg:text-xl">
          {t(translations.googleAuthFall.h1)}
        </h1>
        <h2 className="text-dark-gray-1 dark:text-gray-1 text-md lg:text-lg font-semibold">
          {message || t(translations.googleAuthFall.h2)}
        </h2>
        <p className="text-dark-gray-1 dark:text-gray-1 text-md lg:text-lg">
          <span>
            {t(translations.googleAuthFall.p1)} {countdown} {t(translations.googleAuthFall.p2)}
          </span>
        </p>
      </div>
    </div>
  )
}

export default GoogleAuthFail
