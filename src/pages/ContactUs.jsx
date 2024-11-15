// src/pages/ContactUs.jsx

import React, { useEffect } from "react"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import feedbackImg from "../assets/login-img.png"
import ContactUsForm from "../components/ContactUs/ContactUsForm"
import logo from "../assets/logo.png"
import Header from "../components/Header/Header"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"
translations

const ContactUs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {/* Header Component */}
      <Header />
      <div className="flex flex-col max-w-full w-[1440px] mx-auto font-poppins dark:bg-black ">
        {/* Main Container Wrapping the Image and Form Areas */}
        <div className="flex flex-col md:flex-row pt-8 max-w-[1440px] justify-center items-center h-full ">
          {/* Left Side Image Container */}
          <div className="hidden md:block  max-w-full md:max-w-[608px] mx-2 md:mx-4 lg:mx-8 mb-8 w-full bg-primary-green overflow-hidden rounded-lg h-[780px] ">
            <div
              className="flex-grow h-full w-full bg-cover bg-center backdrop-blur-xl relative"
              style={{
                backgroundImage: `url(${feedbackImg})`,
                backgroundBlendMode: "overlay",
              }}
            >
              <div className="h-full w-full flex flex-col justify-center px-5 md:px-0 bg-primary-green bg-opacity-60">
                <div className="absolute top-0 left-0 w-full h-full bg-primary-green opacity-[0.4]" />
                <div className="relative text-left ps-6 lg:px-8">
                  <p className="text-white text-[1.5rem] lg:text-[3rem] leading-8 font-semibold">
                    {t(translations.contactUs.p1)} <br />
                    <span className="text-[2.5rem] lg:text-[4.125rem] md:leading-none">
                      {t(translations.contactUs.p2)}
                    </span>
                  </p>
                  <p className="text-white mt-4 text-[1rem] lg:text-[1.125rem] font-normal">
                    {t(translations.contactUs.p3)}
                    <b>{t(translations.contactUs.p4)}</b>.<br />
                    <span className="text-[0.8rem] lg:text-[1rem]">
                      {t(translations.contactUs.p5)} <b>{t(translations.contactUs.p6)}</b>{" "}
                      {t(translations.contactUs.p7)} <b>{t(translations.contactUs.p8)}</b>.
                    </span>
                    <br />
                    <br />
                    <b>{t(translations.contactUs.p9)}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form Container */}
          <div className="flex-grow flex flex-col justify-center my-auto p-4 md:px-8 w-2/3 ">
            {/* ArrowBack Icon and Logo for Mobile Design */}
            <div className="md:hidden flex flex-col items-center mb-6">
              <IoIosArrowBack
                className="text-black dark:text-white text-3xl cursor-pointer self-start"
                onClick={() => navigate(-1)}
              />
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>

            {/* Form Title */}
            <div className="flex-grow">
              <h1 className="text-black dark:text-white lg:text-[2rem] text-center md:text-center text-[1.5rem] font-semibold mb-6">
                {t(translations.contactUs.h1)}
              </h1>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
