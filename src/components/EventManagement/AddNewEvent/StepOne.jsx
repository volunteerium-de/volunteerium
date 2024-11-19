import { Field, ErrorMessage } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { HiDotsHorizontal } from "react-icons/hi"
import { Link } from "react-router-dom"
import { AddEventStep1Schema } from "../../../validators/NewEventValidator"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations/"

const getTomorrowDate = () => {
  const tomorrowDate = new Date()

  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  return tomorrowDate.toISOString().split("T")[0]
}

const StepOne = ({ setStep, values, setFieldValue, onClose, step, eventData }) => {
  const { t } = useTranslation()
  const [isOnlineLocal, setIsOnlineLocal] = useState(values.isOnline ?? true)
  const [isValidForNext, setIsValidForNext] = useState(false)
  const [isPhotoUpdated, setisPhotoUpdated] = useState(false)

  const tomorrow = getTomorrowDate()

  const handleLocationChange = (value) => {
    setIsOnlineLocal(value)
    setFieldValue("isOnline", value)
  }

  const handleFileChange = async (e) => {
    setisPhotoUpdated(true)
    const file = e.target.files[0]
    if (file) {
      setFieldValue("eventPhoto", file)
    } else {
      setFieldValue("eventPhoto", null)
    }
  }

  useEffect(() => {
    const validateForm = async () => {
      try {
        await AddEventStep1Schema(t).validate(values, {
          abortEarly: false,
        })
        setIsValidForNext(true)
      } catch (err) {
        setIsValidForNext(false)
      }
    }

    validateForm()
  }, [values])

  return (
    <div>
      {/* Process Bar */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4 p-1">
          {/* Step 1 */}
          <Link
            to="#"
            className={`w-7 h-7 rounded-full border ${
              step === 1
                ? "font-semibold text-white border-2 bg-primary-green dark:bg-primary-green dark:border-primary-green"
                : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green"
            } flex items-center justify-center hover:bg-dark-green hover:text-white2 transition-colors`}
            onClick={() => setStep(1)}
          >
            1
          </Link>

          {/* Dots between steps */}
          <div className="flex items-center">
            <HiDotsHorizontal className="text-gray-2 text-xl" />
          </div>

          {/* Step 2 */}
          <Link
            to="#"
            className={`w-7 h-7 rounded-full border ${
              step === 2 && values.title
                ? "font-semibold text-white border-2 bg-primary-green dark:text-black dark:bg-white dark:border-primary-green"
                : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green "
            } flex items-center justify-center hover:bg-dark-green hover:text-white transition-colors`}
            onClick={(e) => {
              if (!values.title) {
                e.preventDefault()
              } else {
                setStep(2)
              }
            }}
          >
            2
          </Link>

          {/* Dots between steps */}
          <div className="flex items-center">
            <HiDotsHorizontal className="text-gray-2 text-xl" />
          </div>

          {/* Step 3 (Completion) */}
          <div className="w-7 h-7 rounded-full border bg-primary-green hover:bg-dark-green text-white flex items-center justify-center">
            <FaCheck />
          </div>
        </div>
      </div>

      {/* Event Form */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Event Name */}
        <div className="mb-4">
          <label className="block text-dark-gray-2 dark:text-white mb-2">
            {t(translations.eventMng.eventName)}
          </label>

          <Field
            type="text"
            name="title"
            className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
            required
          />
          <ErrorMessage name="title" component="div" className="text-danger" />
        </div>
        {/* Event Photo */}
        <div className="mb-4">
          <label className="block text-dark-gray-2 dark:text-white mb-2">
            {t(translations.eventMng.eventPhoto)}
          </label>
          {eventData?.eventPhoto && !isPhotoUpdated && (
            <div className="flex gap-2">
              <p className="text-gray-2">
                {eventData?.eventPhoto.split("_")[1].length > 20
                  ? eventData?.eventPhoto.split("_")[1].slice(0, 20) + "..."
                  : eventData?.eventPhoto.split("_")[1]}
              </p>{" "}
              <label
                htmlFor="eventPhoto"
                className="text-primary-green font-semibold px-3 cursor-pointer border border-primary-green rounded-lg"
              >
                Update
              </label>
            </div>
          )}
          <input
            id="eventPhoto"
            name="eventPhoto"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e)}
            className={`w-full p-2 border border-gray-1 rounded focus:outline-none dark:bg-white focus:border-primary-green  ${eventData?.eventPhoto && !isPhotoUpdated ? "hidden" : ""}`}
          />
        </div>
        {/* Date & Time */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-dark-gray-2 dark:text-white mb-2">
              {t(translations.eventMng.eventDate)}
            </label>
            <Field
              type="date"
              name="date"
              min={tomorrow}
              className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
              required
            />
            <ErrorMessage name="date" component="div" className="text-danger" />
          </div>
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-dark-gray-2 dark:text-white mb-2">
              {t(translations.eventMng.from)}
            </label>
            <Field
              type="time"
              name="fromTime"
              className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
              required
            />
            <ErrorMessage name="fromTime" component="div" className="text-danger" />
          </div>
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-dark-gray-2 dark:text-white mb-2">
              {t(translations.eventMng.to)}
            </label>
            <Field
              type="time"
              name="toTime"
              className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
              required
              disabled={!values.fromTime}
              min={values.fromTime}
            />
            <ErrorMessage name="toTime" component="div" className="text-danger" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-dark-gray-2 dark:text-white mb-2">
            {t(translations.eventMng.eventLocation)}{" "}
            {!eventData && (
              <span className="font-medium">
                {t(translations.eventMng.eventLocationNonChangable)}{" "}
              </span>
            )}
          </label>
          <>
            {/* Location */}
            <div className="flex space-x-4">
              <button
                disabled={eventData && true}
                type="button"
                name="isOnline"
                onClick={() => handleLocationChange(true)}
                className={`p-2 rounded border disabled:bg-gray ${
                  isOnlineLocal
                    ? "bg-primary-green text-white dark:bg-light-green dark:text-black "
                    : "border-gray-1 dark:text-white"
                }
                ${
                  !eventData?.isOnline
                    ? "disabled:text-gray-1 disabled:border-gray-1 disabled:cursor-not-allowed"
                    : "disabled:cursor-not-allowed"
                }`}
              >
                {t(translations.eventMng.virtual)}
              </button>
              <button
                disabled={eventData && true}
                type="button"
                name="isOnline"
                onClick={() => handleLocationChange(false)}
                className={`p-2 rounded border ${
                  !isOnlineLocal
                    ? "bg-primary-green text-white dark:bg-light-green dark:text-white"
                    : "border-gray-1 dark:text-white"
                }${
                  eventData?.isOnline
                    ? "disabled:text-gray-1 disabled:border-gray-1 dark:text-white disabled:cursor-not-allowed"
                    : "disabled:cursor-not-allowed dark:text-white"
                }`}
              >
                {t(translations.eventMng.physical)}
              </button>
            </div>

            {/* Physical Location Inputs */}
            {!isOnlineLocal && (
              <div className="mb-6">
                {/* Street Name and Street Number Fields */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 my-4">
                  <div className="flex-1">
                    <label className="block text-dark-gray-2 dark:text-white mb-2">
                      {t(translations.eventMng.strName)}
                    </label>
                    <Field
                      type="text"
                      name="streetName"
                      className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                      required
                    />
                    <ErrorMessage name="streetName" component="div" className="text-danger" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-dark-gray-2 dark:text-white mb-2">
                      {t(translations.eventMng.strNumbr)}
                    </label>
                    <Field
                      type="text"
                      name="streetNumber"
                      className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                      required
                    />
                    <ErrorMessage name="streetNumber" component="div" className="text-danger" />
                  </div>
                </div>

                {/* City, Zip Code and Country Fields */}
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <div className="mb-4 flex-1">
                    <label className="block text-dark-gray-2 dark:text-white mb-2">
                      {t(translations.eventMng.city)}
                    </label>
                    <Field
                      type="text"
                      name="city"
                      className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                      required
                    />
                    <ErrorMessage name="city" component="div" className="text-danger" />
                  </div>
                  <div className="mb-4 flex-1">
                    <label className="block text-dark-gray-2 dark:text-white mb-2">
                      {t(translations.eventMng.code)}
                    </label>
                    <Field
                      type="text"
                      name="zipCode"
                      className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                      required
                    />
                    <ErrorMessage name="zipCode" component="div" className="text-danger" />
                  </div>
                  <div className="mb-4 flex-1">
                    <label className="block text-dark-gray-2 dark:text-white mb-2">
                      {t(translations.eventMng.country)}
                    </label>
                    <Field
                      type="text"
                      name="country"
                      className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                      required
                    />
                    <ErrorMessage name="country" component="div" className="text-danger" />
                  </div>
                </div>
              </div>
            )}
          </>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-end mt-8 space-x-0 md:space-x-4">
          <button
            type="button"
            className="py-2 px-4 text-primary-green hover:text-light-green"
            onClick={onClose}
          >
            {t(translations.eventMng.cancel)}
          </button>
          <button
            type="button"
            className={`py-2 px-4 bg-primary-green text-white rounded hover:bg-primary-green/60 ${
              isValidForNext ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isValidForNext}
            onClick={() => {
              if (isValidForNext) {
                setStep(2)
              }
            }}
          >
            {t(translations.eventMng.next)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepOne
