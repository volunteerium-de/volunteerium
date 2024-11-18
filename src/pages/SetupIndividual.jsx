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
import useEventCall from "../hooks/useEventCall"
import SelectInput from "../components/ui/Selects/SelectInput"
import useLanguage from "../hooks/useLanguages"

// Validation schema
const IndividualSchema = Yup.object({
  gender: UserDetailSchema.gender,
  ageRange: UserDetailSchema.ageRange,
  interests: UserDetailSchema.interests,
})

const SetupIndividual = () => {
  const { t } = useTranslation()
  const { currentUser: user } = useSelector((state) => state.auth)
  const { updateUserDetails } = useAccountCall()
  const { logout } = useAuthCall()
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const { categories } = useSelector((state) => state.search)
  const { getEventCategories } = useEventCall()
  const { userDetailsId } = user
  const { getTranslatedCategory } = useLanguage();


  const defaultUserDetails = {
    gender: userDetailsId?.gender || "",
    ageRange: userDetailsId?.ageRange || "",
    interestIds: userDetailsId?.interestIds.map((x) => x._id) || [],
  }

  const ageRangeOptions = [
    { label: "16-25", value: "16-25" },
    { label: "26-35", value: "26-35" },
    { label: "35+", value: "35+" },
  ]

  const genderOptions = [
    { label: t(translations.setupIndv.genderLabel1), value: "male" },
    { label: t(translations.setupIndv.genderLabel2), value: "female" },
    { label: t(translations.setupIndv.genderLabel3), value: "Prefer not to say" },
  ]

  const handleNext = (isValid) => {
    if (isValid) {
      setStep(2)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const clientIdParam = queryParams.get("clientId")

    if (!clientIdParam || clientIdParam !== user._id) {
      logout(false)
    }

    if (
      user.userType === "individual" &&
      !user.userDetailsId.isProfileSetup &&
      clientIdParam === user._id
    ) {
      toastNotify("success", t(translations.toastify.setupProfile))
    }
  }, [])

  useEffect(() => {
    if (!categories.length > 0) {
      getEventCategories()
    }
  }, [categories])

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="bg-white max-w-4xl w-full px-6 py-12 rounded-lg dark:bg-black">
        <Formik
          initialValues={{
            ageRange: defaultUserDetails.ageRange,
            gender: defaultUserDetails.gender,
            interests: defaultUserDetails.interestIds,
          }}
          validationSchema={IndividualSchema}
          onSubmit={(values) => {
            const payload = {
              ...values,
              interestIds: values.interests,
              isProfileSetup: true,
            }
            if (!payload.gender) {
              delete payload.gender
            }
            if (!payload.ageRange) {
              delete payload.ageRange
            }

            updateUserDetails(payload)
            navigate("/")
          }}
        >
          {({ isValid, values, setFieldValue, handleSubmit }) => (
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
                    {t(translations.setupIndv.share)}
                  </h2>
                  <p className="text-dark-gray-1 dark:text-white text-center mb-8">
                    {t(translations.setupIndv.p1)}
                  </p>

                  <div className="w-3/5 md:w-2/5  mx-auto">
                    <div className="flex flex-col flex-wrap gap-4 mb-[5px]">
                      <div className="flex-1">
                        <p className="block text-center text-dark-gray-2 dark:text-white mb-2">
                          {t(translations.setupIndv.gender)}
                        </p>
                        <SelectInput
                          name="gender"
                          placeholder={t(translations.setupIndv.genderPH)}
                          options={genderOptions}
                          onChange={(value) => setFieldValue("gender", value)}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="block text-center text-dark-gray-2 dark:text-white mb-2">
                          {t(translations.setupIndv.ageRange)}
                        </p>
                        <SelectInput
                          name="ageRange"
                          placeholder={t(translations.setupIndv.ageRangePH)}
                          options={ageRangeOptions}
                          onChange={(value) => setFieldValue("ageRange", value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => handleNext(isValid)}
                      className={`w-auto px-14 py-2 rounded-md transition-colors ${
                        isValid && values.ageRange && values.gender
                          ? "bg-primary-green text-white hover:bg-primary-green/60"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!(isValid && values.ageRange && values.gender)}
                    >
                      {t(translations.setupIndv.next)}
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Interests */}
              {step === 2 && (
                <>
                  <div className="flex flex-col items-center text-center mb-10">
                    <h2 className="text-[1.75rem] dark:text-white font-bold mb-2">
                      {t(translations.setupIndv.choose)}
                    </h2>
                    <p className="text-dark-gray-1 w-4/5 dark:text-white mb-2 sm:block md:hidden">
                      {t(translations.setupIndv.p2)}
                    </p>
                    <p className="text-dark-gray-1 w-4/5 dark:text-white mb-2 hidden md:block">
                      {t(translations.setupIndv.p3)}. <br />
                      {t(translations.setupIndv.p4)}
                    </p>
                  </div>

                  <div className="px:2 md:px-0 flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        type="button"
                        className={`w-1/3 sm:w-1/2 md:w-auto px-1 md:px-4 py-2 border rounded-md cursor-pointer ${
                          values.interests.includes(category._id)
                            ? "bg-light-green hover:bg-light-green/60 text-dark-gray-1 border-1 border-primary-green"
                            : "100 text-gray-2"
                        }`}
                        onClick={() => {
                          if (
                            values.interests.includes(category._id) ||
                            values.interests.length < 3
                          ) {
                            setFieldValue(
                              "interests",
                              values.interests.includes(category._id)
                                ? values.interests.filter((id) => id !== category._id)
                                : [...values.interests, category._id]
                            )
                          }
                        }}
                      >
                       {getTranslatedCategory(category.name)}
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
                      {t(translations.setupIndv.skip)}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit(isValid)
                        navigate("/")
                      }}
                      disabled={!isValid}
                      className="mt-4 block w-1/5 py-2 text-center bg-primary-green hover:bg-primary-green/60 text-white rounded-md transition-colors"
                    >
                      {t(translations.setupIndv.finish)}
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
