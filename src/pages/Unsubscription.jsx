import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import toastNotify from "../utils/toastNotify"
import { axiosWithPublic } from "../hooks/useAxios"

const Unsubscription = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [subscriptionId, setSubscriptionId] = useState("")
  const [isUnsubscribed, setIsUnsubscribed] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const emailParam = queryParams.get("email")
    const identifierParam = queryParams.get("identifier")

    if (emailParam && identifierParam) {
      setEmail(emailParam)
      setSubscriptionId(identifierParam)
    } else {
      navigate("/")
    }
  }, [location])

  const handleUnsubscribe = async () => {
    if (subscriptionId) {
      try {
        const { data } = await axiosWithPublic.delete(`subscriptions/${subscriptionId}`)
        setMessage(data.message)
        setIsUnsubscribed(true)
      } catch (error) {
        toastNotify("error", error?.response?.data?.message)
      }
    } else {
      toastNotify("error", "Failed to unsubscribe. Please try again later.")
    }
  }

  const handleGoHome = () => {
    navigate("/")
  }

  return (
    <div className="max-w-xl mx-10 sm:mx-auto p-6 mt-10 rounded-lg shadow-lg text-center">
      {!isUnsubscribed ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <img
            src={`${import.meta.env.VITE_AWS_URL}logo.webp`}
            alt="Volunterium Logo"
            className="h-[30px] w-fit sm:h-[40px]"
          />
          <h2 className="text-2xl font-semibold text-danger mb-6">
            We&apos;re sorry to see you go!
          </h2>
          <p className="text-md text-dark-gray-3 dark:text-white mb-4">
            By unsubscribing, you will no longer receive updates about our events or volunteer
            opportunities. If you’re sure you want to unsubscribe, click the button below.
          </p>
          <div>
            <span className="text-dark-gray-1 dark:text-gray-2">{email}</span>
          </div>
          <button
            onClick={handleUnsubscribe}
            className="w-[200px] py-2 mt-6 bg-danger text-white font-semibold rounded-lg hover:bg-dark-danger transition duration-300"
          >
            Unsubscribe
          </button>
          <p className="text-sm text-center text-dark-gray-1 dark:text-gray-3 mt-4">
            If you didn’t request this, you can ignore this email.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <img
            src={`${import.meta.env.VITE_AWS_URL}logo.webp`}
            alt="Volunterium Logo"
            className="h-[30px] w-fit sm:h-[40px]"
          />
          <p className="text-md text-dark-gray-3 dark:text-white my-4">{message}</p>
          <button
            onClick={handleGoHome}
            className="w-[200px] py-2 mt-6 bg-primary-green text-white font-semibold rounded-lg hover:bg-dark-green transition duration-300"
          >
            Home
          </button>
        </div>
      )}
    </div>
  )
}

export default Unsubscription
