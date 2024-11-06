import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useEffect, useRef } from "react"
import SelectInput from "../ui/Selects/SelectInput" // Ensure the path is correct
import { useSelector } from "react-redux"
import useEventCall from "../../hooks/useEventCall"

// Validation schema
const validationSchema = Yup.object({
  reportType: Yup.string().required("Please select a reason"),
  content: Yup.string().max(300, "Description must be 300 characters or less"),
})

const ReportEvent = ({ eventTitle, eventId, onClose }) => {
  const { currentUser } = useSelector((state) => state.auth)
  const { sendEventReport } = useEventCall()

  const options = [
    { value: "spam", label: "Spam" },
    { value: "offensive", label: "Offensive" },
    { value: "harmful", label: "Harmful" },
    { value: "inappropriate", label: "Inappropriate" },
    { value: "misleading", label: "Misleading" },
    { value: "harassment", label: "Harassment" },
    { value: "fraud", label: "Fraud" },
    { value: "violence", label: "Violence" },
    { value: "discrimination", label: "Discrimination" },
    { value: "other", label: "Other" },
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
      <div ref={modalRef} className="bg-white p-8 rounded-lg w-4/5 max-w-lg mx-auto shadow-lg ">
        <h2 className="text-[1.25rem] text-center text-dark-gray-3 font-semibold mb-4">
          Report Event
        </h2>
        <h3 className="text-dark-gray-3 font-semibold p-2 text-center">
          {eventTitle.toUpperCase()}
        </h3>
        <p className="text-dark-gray-1 mb-4 text-justify">
          If you have encountered any issues with this event, please let us know. Your report will
          help us maintain a safe and respectful environment for everyone.
        </p>

        <Formik
          initialValues={{ reportType: "", content: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            sendEventReport({ ...values, eventId, reportedBy: currentUser ? currentUser?._id : "" })
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
                placeholder="Choose your report reason"
              />
              {errors.reportType && touched.reportType && (
                <div className="text-red-500 text-sm">{errors.reportType}</div>
              )}

              {/* Describe Issue Text Area */}
              <label className="block text-dark-gray-2 mb-2">Describe Issue (Optional):</label>
              <Field
                as="textarea"
                name="content"
                maxLength={300}
                className="w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green placeholder-dark-gray-1 resize-none"
                rows="4"
                placeholder="Please provide a detailed description of the issue."
              />
              <p className="text-gray-2 font-medium text-xs text-right mb-4">
                <Field name="content">{({ field }) => `${field.value.length}/300`}</Field>
              </p>

              {/* Submit and Close Buttons */}
              <button
                type="submit"
                className="w-full bg-primary-green text-white py-2 rounded-md font-semibold mb-2"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-gray-300 text-gray-800 py-2 rounded-md font-semibold"
              >
                CANCEL
              </button>
            </Form>
          )}
        </Formik>
              {/* Submit and Close Buttons */}
              <button
                type="submit"
                className="w-full bg-primary-green text-white py-2 rounded-md font-semibold mb-2"
              >
                SUBMIT
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-gray-300 text-gray-800 py-2 rounded-md font-semibold"
              >
                CANCEL
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ReportEvent
