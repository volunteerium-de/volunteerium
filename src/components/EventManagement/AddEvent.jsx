// AddEvent.jsx
import { useState } from "react"
import { Form, Formik } from "formik"
import StepOne from "./AddNewEvent/StepOne"
import StepTwo from "./AddNewEvent/StepTwo"
import { AddEventSchema } from "../../validators/NewEventValidator"
import useEventCall from "../../hooks/useEventCall"
import { useSelector } from "react-redux"

const AddEvent = ({ onClose }) => {
  const { currentUser: user } = useSelector((state) => state.auth)

  const [step, setStep] = useState(1)
  const { postEvent } = useEventCall()

  const initialValues = {
    isActive: true,
    title: "",
    eventPhoto: null,
    date: "",
    fromTime: "",
    toTime: "",
    isOnline: true,
    streetName: "",
    streetNumber: "",
    zipCode: "",
    city: "",
    country: "",
    maxParticipant: 1,
    interestIds: [],
    languages: [],
    description: "",
    isContactPersonAdded: false,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  }
  const handleSubmit = async (values) => {
    console.log("Event Data Submitted:", values)
    const {
      date,
      fromTime,
      toTime,
      isContantPersonAdded,
      streetName,
      streetNumber,
      zipCode,
      city,
      country,
      eventPhoto,
      contactName,
      contactEmail,
      contactPhone,
      ...payload
    } = values

    const startDate = new Date(`${date}T${fromTime}:00`)
    const endDate = new Date(`${date}T${toTime}:00`)

    const body = {
      createdBy: user._id,
      eventParticipantIds: [user._id],
      ...payload,
      startDate,
      endDate,
      ...(!payload.isOnline && {
        streetName,
        streetNumber,
        zipCode,
        city,
        country,
      }),
      ...(payload?.s?.length > 0 && {
        languages: payload.languages,
      }),
      ...(isContantPersonAdded && { contactName, contactEmail, contactPhone }),
      ...(eventPhoto && { eventPhoto }),
    }
    console.log(body)
    try {
      await postEvent(body)
      onClose()
    } catch (error) {
      toast.error("An error occurred while posting the event. Please try again.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-light-gray  dark:bg-dark-gray-3 rounded-lg shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={AddEventSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isValid }) => (
          <Form>
            {/* Step One || Step Two */}
            {step === 1 && (
              <StepOne
                setStep={setStep}
                setFieldValue={setFieldValue}
                values={values}
                onClose={onClose}
                step={step}
              />
            )}
            {step === 2 && (
              <StepTwo
                onClose={onClose}
                setStep={setStep}
                setFieldValue={setFieldValue}
                values={values}
                step={step}
                isValid={isValid}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddEvent
