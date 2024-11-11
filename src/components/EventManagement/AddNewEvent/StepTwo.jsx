// StepTwo.jsx
import { Field, ErrorMessage } from "formik"
import { FaCheck } from "react-icons/fa"
import { HiDotsHorizontal } from "react-icons/hi"
import { Link } from "react-router-dom"
import LanguageSelect from "../../ui/Selects/LanguageSelect"
import SelectInput from "../../ui/Selects/SelectInput"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import useEventCall from "../../../hooks/useEventCall"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations/"

const StepTwo = ({ setStep, values, step, isValid, setFieldValue }) => {
  const { t } = useTranslation()

  const { getEventCategories } = useEventCall()
  const { currentUser: user } = useSelector((state) => state.auth)
  const [addContactPerson, setAddContactPerson] = useState(values?.isContactPersonAdded ?? false)

  useEffect(() => {
    getEventCategories()
  }, [])

  const handleContactPersonChange = (value) => {
    setAddContactPerson(value)
    setFieldValue("isContactPersonAdded", value)
  }

  const { categories } = useSelector((state) => state.search || {})

  const maxParticipantsOptions = Array.from({ length: 20 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }))

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
                ? "font-semibold text-white border-2 bg-primary-green dark:text-black dark:bg-white dark:border-primary-green"
                : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green"
            } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
            onClick={() => setStep(1)}
          >
            1
          </Link>

          {/* Dots between steps */}
          <div className="flex items-center">
            <HiDotsHorizontal className="text- text-xl text-primary-green" />
          </div>

          {/* Step 2 */}
          <Link
            to="#"
            className={`w-7 h-7 rounded-full border ${
              step === 2 && values.title
                ? "font-semibold text-white border-2 bg-primary-green dark:bg-primary-green dark:border-primary-green"
                : "text-gray-2 border-gray-1 dark:text-white dark:border-primary-green "
            } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
            onClick={(e) => {
              if (!isValid) {
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

          {/* Step 3 */}
          <div className="w-7 h-7 rounded-full border bg-primary-green text-white flex items-center justify-center">
            <FaCheck />
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <label className="block text-dark-gray-2 dark:text-white mb-2">
            {t(translations.eventMng.category)}
          </label>
          <SelectInput
            name="interestIds"
            options={categories?.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
            placeholder={t(translations.eventMng.choose)}
            isMultiple={true}
          />
          <ErrorMessage name="interestIds" component="div" className="text-danger" />
        </div>

        <div className="mb-4">
          <label className="block text-dark-gray-2 dark:text-white mb-2">
            {t(translations.eventMng.participants)}
          </label>
          <SelectInput
            name="maxParticipant"
            options={maxParticipantsOptions}
            placeholder={t(translations.eventMng.max)}
          />
          <ErrorMessage name="maxParticipant" component="div" className="text-danger" />
        </div>

        <LanguageSelect />

        {/* Description */}
        <div className="mb-4">
          {t(translations.eventMng.desc)}
          <label className="block text-dark-gray-2 mb-2 dark:text-white"></label>
          <Field
            as="textarea"
            name="description"
            className="w-full min-h-64 p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
            required
          />
          <ErrorMessage name="description" component="div" className="text-danger" />
        </div>

        {/* Contact Person */}
        {user.userType === "organization"}
        {true && (
          <div className="mb-4">
            <label className="block text-dark-gray-2 mb-2 dark:text-white">
              {t(translations.eventMng.addContact)}
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                name="isContactPersonAdded"
                onClick={() => {
                  handleContactPersonChange(true)
                }}
                className={`py-2 min-w-24 rounded border ${
                  addContactPerson
                    ? "bg-primary-green text-white dark:bg-light-green dark:text-black"
                    : "border-gray-1 dark:text-white"
                }`}
              >
                {t(translations.eventMng.yes)}
              </button>
              <button
                type="button"
                name="isContactPersonAdded"
                onClick={() => {
                  handleContactPersonChange(false)
                }}
                className={`py-2 min-w-24 rounded border ${
                  !addContactPerson
                    ? "bg-primary-green text-white dark:bg-light-green dark:text-black"
                    : "border-gray-1 dark:text-white"
                }`}
              >
                {t(translations.eventMng.no)}
              </button>
            </div>
          </div>
        )}
        {addContactPerson && (
          <div className="mb-4">
            {/* Contact Name Field */}
            <div className="mb-4">
              <label className="block text-dark-gray-2 mb-2 dark:text-white">
                {t(translations.eventMng.name)}
              </label>
              <Field
                type="text"
                name="contactName"
                className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                required
              />
              <ErrorMessage name="contactName" component="div" className="text-danger" />
            </div>

            {/* Contact Email and Phone Fields */}
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="mb-4 flex-1">
                <label className="block text-dark-gray-2 mb-2 dark:text-white">
                  {t(translations.eventMng.email)}
                </label>
                <Field
                  type="email"
                  name="contactEmail"
                  className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  required
                />
                <ErrorMessage name="contactEmail" component="div" className="text-danger" />
              </div>

              <div className="mb-4 flex-1">
                <label className="block text-dark-gray-2 mb-2 dark:text-white">
                  {t(translations.eventMng.phone)}
                </label>
                <Field
                  type="tel"
                  name="contactPhone"
                  className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  required
                />
                <ErrorMessage name="contactPhone" component="div" className="text-danger" />
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end mt-8">
          <button type="button" className="py-2 px-4 text-primary-green" onClick={() => setStep(1)}>
            {t(translations.eventMng.back)}
          </button>
          <button
            type="submit"
            className={`py-2 px-4 bg-primary-green text-white rounded hover:bg-light-green ${
              isValid ? "" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            {t(translations.eventMng.submit)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepTwo
