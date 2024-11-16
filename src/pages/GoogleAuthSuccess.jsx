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
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"

export const getLoginRedirectLink = (user) => {
  let redirectLink = "/"
  if (!user.userDetailsId.isProfileSetup) {
    if (user.userType === "individual") {
      redirectLink = `/account-setup/individual?clientId=${user._id}`
    } else if (user.userType === "organization") {
      redirectLink = `/account-setup/organization?clientId=${user._id}`
    }
  }

  return redirectLink
}

const GoogleAuthSuccess = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [userData, setUserData] = useState()
  const [isNewUser, setIsNewUser] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      const queryParams = new URLSearchParams(location.search)
      const userParam = queryParams.get("user")

      const newUser = queryParams.get("new")
      if (newUser === "true") {
        setIsNewUser(true)
      }

      const parsedData = JSON.parse(decodeURIComponent(userParam))
      if (!parsedData?.bearer?.access) {
        navigate("/auth/failure?provider=google")
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

        let redirectLink

        if (isNewUser) {
          redirectLink = `/auth/password?provider=google&clientId=${userData.user._id}`
        } else {
          redirectLink = getLoginRedirectLink(userData.user)
        }

        if (redirectLink === "/") {
          toastNotify("success", t(translations.googleAS.successMsg))
        }

        setTimeout(() => {
          navigate(redirectLink)
        }, 0)
      } catch (error) {
        console.error("Failed to parse user data:", error)
        navigate("/auth/failure?provider=google")
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
          {t(translations.googleAS.h1)}
        </h1>
        <p className="text-dark-gray-1 dark:text-gray-1 text-md lg:text-lg flex items-center gap-1 justify-center">
          <span>{t(translations.googleAS.p)}</span>
          <ImSpinner9 className="animate-spin" />
        </p>
      </div>
    </div>
  )
}

export default GoogleAuthSuccess
