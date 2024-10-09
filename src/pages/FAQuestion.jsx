import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Header from "../components/Header/Header"
// FAQ Data
const faqData = [
  {
    question: "How can I volunteer?",
    answer:
      "Volunteering is easy! Just sign up on our website, explore the available opportunities, and pick the one that suits you best.",
  },
  {
    question: "Can I register as both a volunteer and a requester?",
    answer:
      "Absolutely! Once you've created your account, you can sign up for volunteer roles and also create events to request help from volunteers.",
  },
  {
    question: "Do I need any special skills or qualifications?",
    answer:
      "Not at all! Many volunteer opportunities just require your time and enthusiasm. However, if a specific skill is needed, it will be listed in the event details.",
  },
  {
    question: "In what areas can I volunteer?",
    answer:
      "There are plenty of ways to get involved! From event planning to community outreach, there's something for everyone.",
  },
  {
    question: "What are the benefits of volunteering?",
    answer:
      "Volunteering gives you a chance to make a difference, gain valuable experience, meet new people, and contribute to your community. Plus, it looks great on your resume!",
  },
  {
    question: "Can I cancel my attendance for an event later?",
    answer:
      "Of course! If your plans change, you can easily cancel your registration through your account dashboard.",
  },
]

const FAQuestion = () => {
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
            Frequently Asked Questions
          </h1>
          <p className="text-lg font-medium font-poppins text-dark-gray-1 dark:text-gray-2">
            Find answers to commonly asked questions about Volunteerium
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
                  {/* Oklar için boyut arttırıldı */}
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
                {/* İçerik Konteyneri */}
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
