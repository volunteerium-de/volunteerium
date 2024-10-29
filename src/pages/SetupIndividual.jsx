import { Link, useNavigate } from "react-router-dom"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { useState } from "react"
import { ErrorMessage, Form, Field, Formik } from "formik"
import { UserDetailSchema } from "../validators/UserDetailValidator"
import * as Yup from "yup"
import useAccountCall from "../hooks/useAccountCall"
import { useSelector } from "react-redux"
import toastNotify from "../utils/toastNotify"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import useAuthCall from "../hooks/useAuthCall"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"
translations

// Validation schema
const IndividualSchema = Yup.object({
  gender: UserDetailSchema.fields.gender,
  ageRange: UserDetailSchema.fields.ageRange,
  interests: UserDetailSchema.fields.interests,
})

const SetupIndividual = () => {
  const {t} = useTranslation()
  const { currentUser: user } = useSelector((state) => state.auth)
  // console.log(user)
  const { updateUser } = useAccountCall()
  const { logout } = useAuthCall()
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNext = (isValid) => {
    if (isValid) {
      setStep(2)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const clientIdParam = queryParams.get("clientId")

    // console.log(clientIdParam)

    if (!clientIdParam || clientIdParam !== user._id) {
      logout(false)
    }

    if (
      user.userType === "individual" &&
      !user.userDetailsId.isProfileSetup &&
      clientIdParam === user._id
    ) {
      toastNotify("success", "Please set up your profile details to proceed")
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="bg-white max-w-4xl w-full px-6 py-12 rounded-lg dark:bg-black">
        <Formik
          initialValues={{
            ageRange: "",
            gender: "",
            interests: [],
          }}
          validationSchema={IndividualSchema}
          onSubmit={(values) => {
            console.log(values)
            updateUser({ ...values, isProfileSetup: true }, user.userDetailsId._id)
          }}
        >
          {({ isValid, values, setFieldValue, handleSubmit, touched, errors }) => (
            <Form>
              {/* Progress indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-4 p-1">
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
                      step === 2 && isValid
                        ? "font-semibold text-white border-2 bg-primary-green dark:text-black dark:bg-white dark:border-primary-green"
                        : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green "
                    } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
                    onClick={(e) => {
                      // If ageRange or gender is not filled in, block the click
                      if (!(isValid && values.ageRange && values.gender)) {
                        e.preventDefault()
                      } else {
                        handleNext(isValid)
                      }
                    }}
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

                  <div className="w-3/5 md:w-2/5 mx-auto">
                    <label className=" block text-gray-2 text-sm font-medium mb-1 text-start">
                      Age Range*
                    </label>

                    <Field
                      as="select"
                      name="ageRange"
                      className={`w-full bg-white dark:bg-black border ${
                        touched.ageRange && errors.ageRange
                          ? "border-danger"
                          : values.ageRange
                            ? "border-primary-green"
                            : "border-gray-1"
                      } font-medium ps-2 dark:text-white p-1 rounded-md cursor-pointer`}
                    >
                      <option value="">Choose Age Range</option>
                      <option value="16-25">16-25</option>
                      <option value="26-35">26-35</option>
                      <option value="35+">35+</option>
                    </Field>
                    <div className="min-h-[1.5rem]">
                      <ErrorMessage
                        name="ageRange"
                        component="div"
                        className=" text-danger text-sm"
                      />
                    </div>
                  </div>

                  <div className="w-3/5 md:w-2/5 mx-auto mb-4">
                    <label className="block text-gray-2 text-sm font-medium mb-1 text-start">
                      Gender*
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      className={`w-full bg-white dark:bg-black border ${
                        touched.gender && errors.gender
                          ? "border-danger"
                          : values.gender
                            ? "border-primary-green"
                            : "border-gray-1"
                      } font-medium ps-2 dark:text-white p-1  rounded-md cursor-pointer`}
                    >
                      <option value="">Choose Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="n/a">Prefer not to say</option>
                    </Field>
                    <div className="min-h-[1.5rem]">
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className=" text-danger text-sm"
                      />
                    </div>{" "}
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => handleNext(isValid)}
                      className="w-auto px-14 py-2 rounded-md transition-colors bg-primary-green text-white hover:bg-dark-green"
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
                      Explore volunteer opportunities by selecting the areas that interest you.{" "}
                      <br />
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
                        className={`w-1/3 sm:w-1/2  md:w-auto px-1 md:px-4 py-2 border rounded-md cursor-pointer ${
                          values.interests.includes(interest)
                            ? "bg-light-green text-dark-gray-1 border-1 border-primary-green"
                            : "100 text-gray-2"
                        }`}
                        onClick={() => {
                          const newValue = interest
                          setFieldValue(
                            "interests",
                            values.interests.includes(newValue)
                              ? values.interests.filter((id) => id !== newValue)
                              : [...values.interests, newValue]
                          )
                        }}
                        disabled={
                          !values.interests.includes(interest) && values.interests.length >= 3
                        }
                      >
                        {interest}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center text-center items-center">
                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit(isValid)
                        navigate("/")
                      }}
                      disabled={!isValid}
                      className="mt-4 block w-1/4 py-2 text-dark-gray-1 border border-gray-1 text-center  rounded-md transition-colors"
                    >
                      Skip for now
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit(isValid)
                        navigate("/")
                      }}
                      disabled={!isValid}
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
