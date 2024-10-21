// import React from 'react'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const VerificationSuccess = () => {
  const { currentUser: user } = useSelector((state) => state.auth)

  const getUserTypeLink = () => {
    if (!user.userDetailsId.isProfileSetup) {
      if (user.userType === "individual") {
        return `/account-setup/individual?clientId=${user._id}`
      } else if (user.userType === "organization") {
        return `/account-setup/organization?clientId=${user._id}`
      } else {
        return "/" // If userType is not specified or there is an error, we can redirect to the home page.
      }
    } else {
      return "/" // if user already set up his profile details, then redirect to home page
    }
  }

  return (
    <div className="h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="text-center max-w-xl mx-auto px-8 py-8 rounded-lg">
        <h1 className="text-[1.75rem] font-bold  dark:text-white mb-6">
          Hey {user.fullName.split(" ")[0] || user.organizationName}, you&apos;re verified! 🎉
        </h1>
        <p className="text-primary-green font-semibold mb-4">
          We&apos;re thrilled to have you with us!
        </p>
        <p className="hidden md:block text-dark-gray-1 dark:text-white mb-6">
          By joining our community, you&apos;re already{" "}
          <span className="text-primary-green font-semibold">making a difference</span>.
        </p>
        <p className="text-dark-gray-1 dark:text-white mb-8">
          Before we start, we&apos;d like to know a bit more about you.
        </p>
        <Link
          to={getUserTypeLink()}
          className="px-14 py-2 bg-primary-green text-white rounded-md hover:bg-dark-green transition-colors"
        >
          Let&apos;s Start!
        </Link>
      </div>
    </div>
  )
}
export default VerificationSuccess
