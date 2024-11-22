// src/pages/ResetPassword.jsx

import React from "react"
import ResetPasswordForm from "./ResetPasswordForm"

const ResetPassword = ({ identifier, email }) => {
  return (
    <div>
      {/* Main Content Area */}
      <div className="flex flex-col max-w-full w-[1440px] mx-auto font-poppins dark:bg-black">
        {/* Main Container Wrapping the Image and Form Areas */}
        <div className="flex flex-col md:flex-row pt-8 max-w-[1440px] justify-center items-center h-full">
          {/* Left Side - Image Area  */}
          <div className="hidden md:flex w-full md:max-w-[608px] mx-2 md:mx-4 lg:mx-8 mb-8 bg-primary-green overflow-hidden rounded-lg lg:h-[780px]">
            <div
              className="flex-grow h-full w-full bg-cover bg-center backdrop-blur-xl relative"
              style={{
                backgroundImage: `url(${`${import.meta.env.VITE_AWS_URL}reset-password.webp`})`,
                backgroundBlendMode: "overlay",
              }}
            >
              <div className="h-full w-full flex flex-col justify-center px-5 md:px-0  " />
              <div className="absolute top-0 left-0 w-full h-full bg-primary-green opacity-[0.4]" />
            </div>
          </div>

          {/* Right Side - Form Area */}
          <div className="flex-grow flex flex-col justify-center my-auto p-4 md:px-8 w-full">
            {/* Form Content */}

            <ResetPasswordForm identifier={identifier} email={email} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
