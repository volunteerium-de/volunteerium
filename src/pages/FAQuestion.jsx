import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Header from "../components/Header/Header"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"
translations
// FAQ Data

const FAQuestion = () => {
  const { t } = useTranslation()

  const faqData = [
    {
      question: t(translations.faqPage.q1),
      answer: t(translations.faqPage.a1),
    },
    {
      question: t(translations.faqPage.q2),
      answer: t(translations.faqPage.a2),
    },
    {
      question: t(translations.faqPage.q3),
      answer: t(translations.faqPage.a3),
    },
    {
      question: t(translations.faqPage.q4),
      answer: t(translations.faqPage.a4),
    },
    {
      question: t(translations.faqPage.q5),
      answer: t(translations.faqPage.a5),
    },
    {
      question: t(translations.faqPage.q6),
      answer: t(translations.faqPage.a6),
    },
  ]

  // State to track which question is opened
  const [openQuestion, setOpenQuestion] = useState(null)

  // Toggle question open/close state
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  return (
    <>
      <Header />
      <div className="w-full h-5/6 flex flex-col items-center px-4 py-10">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-poppins text-dark-green dark:text-white mb-1">
            {t(translations.faqPage.h1)}
          </h1>
          <p className="text-lg font-medium font-poppins text-dark-gray-1 dark:text-gray-2">
            {t(translations.faqPage.p1)}
          </p>
        </div>

        {/* FAQ Section */}
        <div className="w-full max-w-5xl h-full px-6 py-1 space-y-4">
          {/* FAQ Questions */}
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`shadow-md rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
                openQuestion === index ? "bg-light-green text-white" : "bg-light-gray-3"
              }`}
            >
              {/* Question */}
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <h2 className="text-lg font-semibold font-poppins text-dark-gray-3">
                  {item.question}
                </h2>
                <div className="w-10 h-10 text-gray-2">
                  {openQuestion === index ? (
                    <IoIosArrowUp size={28} />
                  ) : (
                    <IoIosArrowDown size={28} />
                  )}
                </div>
              </div>

              {/* Answer Section */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openQuestion === index ? "max-h-[400px] p-4" : "max-h-0 p-0"
                }`}
                style={{ overflow: "hidden" }}
              >
                {/* Content Container */}
                <div className="w-full">
                  {/* Divider Line */}
                  <div className="flex flex-col items-start w-full h-px bg-dark-gray-2 opacity-20" />

                  {/* Answer Text */}
                  <p className="w-full text-dark-gray-3 text-base font-normal font-poppins mt-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default FAQuestion
