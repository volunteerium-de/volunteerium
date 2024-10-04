// import React from 'react'
import { useState } from "react"
import { GoXCircle } from "react-icons/go"
import { Link } from "react-router-dom"

const VerificationFailed = () => {
  const [errorMessage, setErrorMessage] = useState("")

  // Simulating the error type. This data should come from the API.
  const errorType = "expired" // Possible values: 'not_found', 'something_wrong', 'expired'

  // Determine the error message based on the error type.
  const getErrorMessage = () => {
    switch (errorType) {
      case "not_found":
        return "Account not found"
      case "something_wrong":
        return "Something went wrong"
      case "expired":
        return "Verification link expired"
      default:
        return "Unknown error"
    }
  }

  // Set the dynamic error message when the component loads.
  useState(() => {
    setErrorMessage(getErrorMessage())
  }, [errorType])

  return (
    <div className="h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="text-center max-w-xl mx-auto px-8 py-8 rounded-lg">
        <div className="mb-6">
          <GoXCircle className="w-32 h-32 text-danger mx-auto" />
        </div>
        <h1 className="text-[1.75rem] font-bold text-primary-red mb-4 dark:text-white">
          Verification Failed!
        </h1>
        <p className="px-10 text-dark-gray-1 dark:text-white mb-2 font-semibold">
          Unfortunately, we couldn&apos;t verify your account. The reason for this failure is:
        </p>
        <p className="text-primary-red font-semibold mb-6 text-danger">{errorMessage}</p>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center items-center">
          <Link
            to="/"
            className="px-6 py-2 bg-dark-green w-1/3 text-white rounded-md hover:bg-primary-green transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/request-verification"
            className="px-6 py-2 bg-dark-green text-white rounded-md hover:bg-primary-green transition-colors"
          >
            Request Verification Link
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerificationFailed
