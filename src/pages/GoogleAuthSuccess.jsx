import React from "react"
import { loginSuccess } from "../features/authSlice"
import toastNotify from "../utils/toastNotify"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import googleAuthSuccessDesktop from "../assets/google-success-desktop.png"
import googleAuthSuccessMobile from "../assets/google-success-mobile.png"
import { ImSpinner9 } from "react-icons/im"
import { useState } from "react"

const GoogleAuthSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [userData, setUserData] = useState()

  useEffect(() => {
    const getUserData = async () => {
      const queryParams = new URLSearchParams(location.search)
      const userParam = queryParams.get("user")

      const parsedData = JSON.parse(decodeURIComponent(userParam))
      if (!parsedData?.bearer?.access) {
        navigate("/auth/failure")
        return
      }

      setUserData(parsedData)
    }

    getUserData()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      AuthWithGoogleData()
    }, 2000)
  }, [userData])

  const AuthWithGoogleData = () => {
    if (userData) {
      try {
        dispatch(loginSuccess(userData))
        toastNotify("success", userData.message)
      } catch (error) {
        console.error("Failed to parse user data:", error)
        navigate("/auth/failure")
      }
    }
  }

  return (
    <div className="h-screen w-screen grid place-content-center place-items-center">
      <div className="w-[90%] md:w-[80%] xl:w-[70%] max-w-[1200px] mx-auto">
        {/* Different success images based on windows with */}
        <picture>
          <source media="(max-width: 400px)" srcSet={googleAuthSuccessMobile} />
          <img src={googleAuthSuccessDesktop} alt="google-auth-success" />
        </picture>
      </div>
      <div className="text-center mt-[4rem] space-y-2">
        <h1 className="text-primary-green font-semibold text-lg lg:text-xl">
          Successfully authenticated with Google
        </h1>
        <p className="text-dark-gray-1 dark:text-gray-1 text-md lg:text-lg flex items-center gap-1 justify-center">
          <span>Redirecting...</span>
          <ImSpinner9 className="animate-spin" />
        </p>
      </div>
    </div>
  )
}

export default GoogleAuthSuccess
