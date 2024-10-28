import { Field, ErrorMessage } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { HiDotsHorizontal } from "react-icons/hi"
import { Link } from "react-router-dom"
import { AddEventStep1Schema } from "../../../validators/NewEventValidator"

const getTomorrowDate = () => {
  const tomorrowDate = new Date()

  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  return tomorrowDate.toISOString().split("T")[0]
}

const StepOne = ({ setStep, values, setFieldValue, onClose, step }) => {
  console.log("ananim", values)
  const [isOnlineLocal, setIsOnlineLocal] = useState(values.isOnline ?? true)
  const [isValidForNext, setIsValidForNext] = useState(false)

  const tomorrow = getTomorrowDate()

  const handleLocationChange = (value) => {
    setIsOnlineLocal(value)
    setFieldValue("isOnline", value)
  }

  useEffect(() => {
    const validateForm = async () => {
      try {
        await AddEventStep1Schema.validate(values, {
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
            } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
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
              step === 2 && values.title // Here, change isValid to the necessary field checks
                ? "font-semibold text-white border-2 bg-primary-green dark:text-black dark:bg-white dark:border-primary-green"
                : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green "
            } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
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
          <div className="w-7 h-7 rounded-full border bg-primary-green text-white flex items-center justify-center">
            <FaCheck />
          </div>
        </div>
      </div>

      {/* Event Form */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Event Name */}
        <div className="mb-4">
          <label className="block text-dark-gray-2 dark:text-white mb-2">Event Name</label>

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
          <label className="block text-dark-gray-2 dark:text-white mb-2">Event Photo</label>
          <input
            type="file"
            onChange={(e) => setFieldValue("eventPhoto", e.currentTarget.files[0])}
            className="w-full p-2 border border-gray-1 rounded focus:outline-none  dark:bg-white focus:border-primary-green"
            required
          />
        </div>
        {/* Date & Time */}
        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-dark-gray-2 dark:text-white mb-2">Date*</label>
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
            <label className="block text-dark-gray-2 dark:text-white mb-2">From*</label>
            <Field
              type="time"
              name="fromTime"
              className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
              required
            />
            <ErrorMessage name="fromTime" component="div" className="text-danger" />
          </div>
          <div className="flex-1 mb-4 md:mb-0">
            <label className="block text-dark-gray-2 dark:text-white mb-2">To*</label>
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
        {/* Location */}
        <div className="mb-4">
          <label className="block text-dark-gray-2 dark:text-white mb-2">Location</label>
          <div className="flex space-x-4">
            <button
              type="button"
              name="isOnline"
              onClick={() => handleLocationChange(true)}
              className={`p-2 rounded border ${
                isOnlineLocal
                  ? "bg-primary-green text-white dark:bg-light-green dark:text-black"
                  : "border-gray-1 dark:text-white"
              }`}
            >
              Virtual
            </button>
            <button
              type="button"
              name="isOnline"
              onClick={() => handleLocationChange(false)}
              className={`p-2 rounded border ${
                !isOnlineLocal
                  ? "bg-primary-green text-white dark:bg-light-green dark:text-black"
                  : "border-gray-1 dark:text-white"
              }`}
            >
              Physical
            </button>
          </div>
        </div>
        {/* Physical Location Inputs */}
        {!isOnlineLocal && (
          <div className="mb-4">
            {/* Street Name and Street Number Fields */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-dark-gray-2 dark:text-white mb-2">Street Name*</label>
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
                  Street Number*
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
                <label className="block text-dark-gray-2 dark:text-white mb-2">City*</label>
                <Field
                  type="text"
                  name="city"
                  className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  required
                />
                <ErrorMessage name="city" component="div" className="text-danger" />
              </div>
              <div className="mb-4 flex-1">
                <label className="block text-dark-gray-2 dark:text-white mb-2">Zip Code*</label>
                <Field
                  type="text"
                  name="zipCode"
                  className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  required
                />
                <ErrorMessage name="zipCode" component="div" className="text-danger" />
              </div>
              <div className="mb-4 flex-1">
                <label className="block text-dark-gray-2 dark:text-white mb-2">Country*</label>
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

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-end mt-8 space-x-0 md:space-x-4">
          <button type="button" className="py-2 px-4 text-primary-green" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`py-2 px-4 bg-primary-green text-white rounded hover:bg-light-green ${
              isValidForNext ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isValidForNext}
            onClick={() => {
              if (isValidForNext) {
                setStep(2)
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepOne
