import { Link, useNavigate } from "react-router-dom"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"
import { ErrorMessage, Form, Formik } from "formik"
import * as Yup from "yup"
import { CiCircleCheck } from "react-icons/ci"

// Validation schema
export const updateUserDetailsSchema = Yup.object().shape({
  gender: Yup.string().oneOf(["Male", "Female", "n/a"]).required("Please choose a gender"),
  ageRange: Yup.string().oneOf(["16-25", "26-35", "35+"]).required("Please choose an age range"),
  interests: Yup.array().max(3, "Select up to 3 interests only"),
})

export const CustomDropdown = ({ label, options, name, value, setFieldValue }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null) //
  const handleSelect = (option) => {
    setFieldValue(name, option)
    setIsOpen(false)
  }

  // Handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false) // Close the dropdown if clicked outside
      }
    }
    // Add the event listener
    document.addEventListener("mousedown", handleClickOutside)
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="relative w-4/5 mx-auto mb-4" ref={dropdownRef}>
      <label className="block text-gray-2 font-medium mb-2 text-center">{label}</label>

      <div
        className={`bg-white dark:bg-black border ${isOpen ? "border-primary-green" : "border-gray-300"} font-medium ps-5 dark:text-white p-2 rounded-md cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || `Choose ${label}`}
      </div>
      {isOpen && (
        <ul className="absolute left-0 right-0 dark:text-gray-1  bg-white dark:bg-black border border-primary-green rounded-md mt-2 z-10 max-h-40 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 ${value === option ? "bg-white text-primary-green" : "hover:bg-light-green hover:text-gray-900"}`}
              onClick={() => handleSelect(option)}
            >
             {option !== "Choose Age Range" && option !== "Choose Gender"  && (
              <CiCircleCheck
                className={`text-[1.25rem] ${value === option ? "text-primary-green " : "text-gray-1"}`}
              />
             )}
              {option}
            </li>
          ))}
        </ul>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="min-h-[1.5rem] text-[0.875rem] text-red-500 text-center"
      />
    </div>
  )
}

const SetupIndividual = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  // Toggle between steps
  const handleNext = (isValid, dirty) => {
    if (isValid && dirty) {
      setStep(2)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="bg-white max-w-4xl w-full px-6 py-12 rounded-lg shadow-md dark:bg-black">
        <Formik
          initialValues={{
            ageRange: "",
            gender: "",
            interests: [],
          }}
          validationSchema={updateUserDetailsSchema}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ isValid, dirty, values, setFieldValue, handleSubmit }) => (
            <Form>
              {/* Progress indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-4 p-2">
                  <Link
                    to="#"
                    className={`w-7 h-7 rounded-full border ${
                      step === 1
                        ? "font-semibold text-white border-2 bg-primary-green dark:text-black dark:bg-white dark:border-primary-green"
                        : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green"
                    } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
                    onClick={() => setStep(1)}
                  >
                    1
                  </Link>
                  <div className="flex items-center">
                    <HiDotsHorizontal className="text-gray-2 text-xl" />
                  </div>
                  <Link
                    to="#"
                    className={`w-7 h-7 rounded-full border ${
                      step === 2 && isValid && dirty
                        ? "font-semibold text-white border-2 bg-primary-green dark:text-black dark:bg-white dark:border-primary-green"
                        : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green cursor-not-allowed"
                    } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
                    onClick={() => {
                      if (isValid && dirty) {
                        setStep(2)
                      }
                    }}
                    disabled={!isValid || !dirty}
                  >
                    2
                  </Link>
                  <div className="flex items-center">
                    <HiDotsHorizontal className="text-gray-2 text-xl" />
                  </div>
                  <div className="w-7 h-7 rounded-full border bg-primary-green text-white flex items-center justify-center">
                    <FaCheck />
                  </div>
                </div>
              </div>

              {/* Step 1: Age and Gender */}
              {step === 1 && (
                <>
                  <h2 className="text-[1.75rem] dark:text-white font-bold text-center mb-4">
                    Share Your Age and Gender
                  </h2>
                  <p className="text-dark-gray-1 dark:text-white text-center mb-8">
                    Providing this information is optional but may be useful for certain events
                  </p>

                  <div className="w-1/2 mx-auto">
                    <CustomDropdown
                      label="Age"
                      options={["Choose Age Range", "16-25", "26-35", "35+"]}
                      name="ageRange"
                      value={values.ageRange}
                      setFieldValue={setFieldValue}
                    />
                    
                    
                  </div>
                  <div className="w-1/2 mx-auto">
                    <CustomDropdown
                      label="Gender"
                      options={["Choose Gender", "Male", "Female", "Prefer not to say"]}
                      name="gender"
                      value={values.gender}
                      setFieldValue={setFieldValue}
                    />
                     
                    
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => handleNext(isValid, dirty)}
                      disabled={!dirty || !isValid}
                      className={`w-auto px-14 py-2 rounded-md transition-colors ${
                        !dirty || !isValid
                          ? "bg-gray-1 cursor-not-allowed"
                          : "bg-primary-green text-white hover:bg-dark-green"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Interests */}
              {step === 2 && (
                <>
                  <div className="flex flex-col items-center text-center mb-10">
                    <h2 className="text-[1.75rem] dark:text-white font-bold mb-2">
                      Choose Your Interests
                    </h2>
      <p className="text-dark-gray-1 w-4/5 dark:text-white mb-2 sm:block md:hidden">
        Explore volunteer opportunities and make a meaningful impact
      </p>
      <p className="text-dark-gray-1 w-4/5 dark:text-white mb-2 hidden md:block">
        Explore volunteer opportunities by selecting the areas that interest you. <br />
        Make a meaningful impact in the fields you care about most!
      </p>
                  </div>

                  <div className="px:2 md:px-0 flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                    {[
                      "Environment",
                      "Elderly Care",
                      "Social Projects",
                      "Human Rights",
                      "Health",
                      "Employment",
                      "Education",
                      "Disability",
                      "Music",
                      "Academic",
                      "Social Solidarity",
                      "Cultural Activities",
                      "Sports & Recreation",
                      "Computers & IT",
                      "Housing & Facilities",
                    ].map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        className={`w-1/3 sm:w-1/2  md:w-auto px-1 md:px-4 py-2 border rounded-md cursor-pointer ${values.interests.includes(interest) ? "bg-light-green text-dark-gray-1 border-1 border-primary-green" : "100 text-gray-2"}`}
                        onClick={() => {
                          const newValue = interest
                          setFieldValue(
                            "interests",
                            values.interests.includes(newValue)
                              ? values.interests.filter((id) => id !== newValue)
                              : [...values.interests, newValue]
                          )
                        }}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center text-center items-center">
                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit(isValid, dirty) // Verileri kaydet
                        navigate("/") // Anasayfaya yönlendirme
                      }}
                      disabled={!dirty || !isValid}
                      className="mt-4 block w-1/4 py-2 text-dark-gray-1 border border-gray-1 text-center  rounded-md transition-colors"
                    >
                      Skip for now
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit(isValid, dirty) // Verileri kaydet
                        navigate("/") // Anasayfaya yönlendirme
                      }}
                      disabled={!dirty || !isValid}
                      className="mt-4 block w-1/5 py-2 text-center bg-primary-green text-white rounded-md transition-colors"
                    >
                      Finish
                    </button>
                  </div>


                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SetupIndividual
