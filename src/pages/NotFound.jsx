import React from "react"
import { Link } from "react-router-dom"
import notFoundImage from "/src/assets/not-found.png" // Not Found image
import Header from "../components/Header/Header"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"
translations

const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Header />
      <div className="w-full h-[60vh] dark:bg-black flex flex-col items-center justify-start ">
        {/* Header Placeholder */}
        <div className="w-full" style={{ height: "8.73vh" }}>
          {/* Header section would go here */}
        </div>

        {/* 404 Not Found Image */}
        <div
          className="flex flex-col items-center justify-center relative"
          style={{ height: "58.2vh" }}
        >
          <img
            src={notFoundImage}
            alt={t(translations.notFound.imgAlt)}
            className="
            w-[100vw] 
            max-w-[1000px] 
            max-h-[58.2vh]
            h-auto 
            object-contain 
            md:w-[50vw] 
            lg:w-[70vw] 
            xl:w-[80vw] 
            2xl:w-[90vw]"
          />
          {/* Page Not Found Text */}
          <p
            className="absolute text-[#69957B] dark:text-white font-medium text-[1.25rem] poppins"
            style={{ top: "85%", transform: "translateY(-50%)", textAlign: "center" }}
          >
            {t(translations.notFound.p)}
          </p>
        </div>

        {/* Back to Homepage Button */}
        <div
          className="w-full flex justify-center mt-[1rem] md:mt-[2rem] xl:mt-[3rem]"
          style={{ height: "4.85vh" }}
        >
          <Link
            to="/"
            className="bg-primary-green py-2 text-white w-72 rounded-lg  hover:bg-dark-green transition duration-300 flex items-center justify-center "
          >
            {t(translations.notFound.link)}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
