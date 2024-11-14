import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useEffect, useRef } from "react"
import SelectInput from "../ui/Selects/SelectInput"
import { useSelector } from "react-redux"
import useEventCall from "../../hooks/useEventCall"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
// Validation schema

const ReportEvent = ({ eventTitle, eventId, onClose }) => {
  const { t } = useTranslation()
  const { currentUser } = useSelector((state) => state.auth)
  const { sendEventReport } = useEventCall()
  
  const validationSchema = Yup.object({
    reportType: Yup.string().required(t(translations.yup.required.reason)),
    content: Yup.string().max(250, t(translations.yup.maxLength.characters250)),
  })
  const options = [
    { value: "spam", label: t(translations.eventDetails.report.option1) },
    { value: "offensive", label: t(translations.eventDetails.report.option2) },
    { value: "harmful", label: t(translations.eventDetails.report.option3) },
    { value: "inappropriate", label: t(translations.eventDetails.report.option4) },
    { value: "misleading", label: t(translations.eventDetails.report.option5) },
    { value: "harassment", label: t(translations.eventDetails.report.option6) },
    { value: "fraud", label: t(translations.eventDetails.report.option7) },
    { value: "violence", label: t(translations.eventDetails.report.option8) },
    { value: "discrimination", label: t(translations.eventDetails.report.option9) },
    { value: "other", label: t(translations.eventDetails.report.option10) },
  ]

  // Reference for the modal container
  const modalRef = useRef(null)

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose() // Close the modal if click is outside
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-dark-gray-3 p-8 rounded-lg w-4/5 max-w-lg mx-auto shadow-lg "
      >
        <h2 className="text-[1.25rem] text-center text-dark-gray-3 dark:text-white font-semibold mb-4">
          {t(translations.eventDetails.report.h2)}
        </h2>
        <h3 className="text-dark-gray-3 dark:text-white font-semibold p-2 text-center">
          {eventTitle.toUpperCase()}
        </h3>
        <p className="text-dark-gray-1 dark:text-white mb-4 text-justify">
          {t(translations.eventDetails.report.p1)}
        </p>

        <Formik
          initialValues={{ reportType: "", content: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            sendEventReport({
              ...values,
              eventId,
              reportedBy: currentUser ? currentUser?._id : "",
            })
            onClose()
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {/* SelectInput Dropdown for Choosing Report Reason */}
              <SelectInput
                name="reportType"
                options={options}
                label="Report Reason*:"
                placeholder={t(translations.eventDetails.report.placeholder1)}
              />
              {errors.reportType && touched.reportType && (
                <div className="text-red-500 text-sm">{errors.reportType}</div>
              )}

              {/* Describe Issue Text Area */}
              <label className="block text-dark-gray-2 dark:text-white mb-2">
                {t(translations.eventDetails.report.issueLabel)}
              </label>
              <Field
                as="textarea"
                name="content"
                maxLength={300}
                className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green placeholder-dark-gray-1 resize-none"
                rows="4"
                placeholder={t(translations.eventDetails.report.placeholder2)}
              />
              <p className="text-gray-2 font-medium text-xs text-right mb-4">
                <Field name="content">{({ field }) => `${field.value.length}/300`}</Field>
              </p>

              {/* Submit and Close Buttons */}
              <button
                type="submit"
                className="w-full bg-primary-green text-white py-2 rounded-md font-semibold mb-2"
              >
                {t(translations.eventDetails.report.submit)}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-gray-300 text-dark-gray-2 py-2 rounded-md font-semibold"
              >
                {t(translations.eventDetails.report.cancel)}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ReportEvent
