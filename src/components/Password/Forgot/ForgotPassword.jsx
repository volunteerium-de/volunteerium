// src/pages/ForgotPassword.jsx

import React from "react"
import forgotPasswordImage from "../../../assets/forgot-password.png"
import ForgotPasswordForm from "./ForgotPasswordForm"

const ForgotPassword = ({ setIssue, setIdentifier, setEmail }) => {
  return (
    <div>
      {/* Main Content Area */}
      <div className="flex flex-col mx-auto font-poppins bg-white dark:bg-black min-h-screen">
        {/* Main Container Wrapping the Image and Form Areas */}
        <div className="flex flex-col w-[95%] max-w-[1200px] mx-auto">
          {/* Inner Container for Left Image and Right Form */}
          <div className="flex flex-col md:flex-row w-full justify-center items-stretch md:space-y-0 space-y-6 md:space-x-6 h-full md:min-h-[calc(100vh-11.25rem)] lg:min-h-[calc(100vh-12.5rem)]">
            {/* Left Side - Image Area */}
            <div className="hidden md:flex w-full md:max-w-[50%] lg:max-w-[50%] overflow-hidden rounded-t-lg rounded-b-lg h-[calc(95vh-7.5rem)]">
              <div
                className="flex-grow h-full w-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${forgotPasswordImage})`,
                  backgroundBlendMode: "overlay",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="h-full w-full bg-light-green bg-opacity-50 dark:bg-opacity-70 rounded-t-lg" />
              </div>
            </div>

            {/* Right Side - Form Area */}
            <div className="flex-grow flex justify-center items-center bg-white dark:bg-black rounded-lg h-full p-6 md:max-w-[70%] lg:max-w-[80%]">
              {/* Form Content */}
              <div className="flex-grow flex flex-col justify-center items-center w-full max-w">
                <ForgotPasswordForm
                  setIssue={setIssue}
                  setIdentifier={setIdentifier}
                  setEmail={setEmail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
