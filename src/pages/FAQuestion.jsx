import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FAQuestion = () => {
  // State to track which question is opened
  const [openQuestion, setOpenQuestion] = useState(null);

  // Toggle question open/close state
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-poppins text-dark-gray-3 mb-1">Frequently Asked Questions</h1>
        <p className="text-lg font-medium font-poppins text-dark-gray-1">
          Find answers to commonly asked questions about Volunteerium
        </p>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl h-full px-6 py-1 space-y-4">
        {/* FAQ Questions */}
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`shadow-md rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
              openQuestion === index ? "bg-light-green text-white" : "bg-light-gray"
            }`}
          >
            {/* Question */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h2 className="text-lg font-semibold font-poppins text-dark-gray-3">{item.question}</h2>
              <div className="w-10 h-10 text-gray-2">
                {/* Oklar için boyut arttırıldı */}
                {openQuestion === index ? <IoIosArrowUp size={28} /> : <IoIosArrowDown size={28} />}
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
              <div className="w-7/10 mx-auto">
                {/* Divider Line */}
                <div className="flex flex-col items-start mt-1 w-full max-w-xl h-px bg-dark-gray-2 opacity-20 my-4" />

                {/* Answer Text */}
                <p className="w-full max-w-xl text-dark-gray-3 text-base font-light font-poppins">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQ Data
const faqData = [
  {
    question: "How can I volunteer?",
    answer: "You can volunteer by signing up on our website and choosing from the available volunteer opportunities.",
  },
  {
    question: "Can I register on the site as both a volunteer and a requester?",
    answer: "After creating an account on the site, you can apply for volunteer postings and also create an event to announce that you are looking for volunteers.",
  },
  {
    question: "What are the areas where I can volunteer to help?",
    answer: "You can volunteer in various areas such as event organization, community support, and more.",
  },
  {
    question: "Can event organizers contact me directly?",
    answer: "Yes, event organizers can reach out to you via the contact information provided in your profile.",
  },
  {
    question: "Can I cancel an event I want to attend later?",
    answer: "Yes, you can cancel your registration for an event through your account dashboard.",
  },
];

export default FAQuestion;
