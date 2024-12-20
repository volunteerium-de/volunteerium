// AddEvent.jsx
import { useState } from "react"
import { Form, Formik } from "formik"
import StepOne from "./AddNewEvent/StepOne"
import StepTwo from "./AddNewEvent/StepTwo"
import { AddEventSchema } from "../../validators/NewEventValidator"
import useEventCall from "../../hooks/useEventCall"
import { useSelector } from "react-redux"
import toastNotify from "../../utils/toastNotify"
import { translations } from "../../locales/translations"
import { t } from "i18next"

const AddEvent = ({ onClose, eventData, eventToEdit }) => {
  const { currentUser: user } = useSelector((state) => state.auth)
  const [step, setStep] = useState(1)
  const { postEvent, editEvent } = useEventCall()
  const [loading, setLoading] = useState(false)

  const initialValues = {
    isActive: eventData?.isActive ?? true,
    title: eventData?.title || "",
    eventPhoto: eventData?.eventPhoto ? eventData.eventPhoto : null,
    date: eventData?.startDate ? new Date(eventData.startDate).toISOString().split("T")[0] : "",
    fromTime: eventData?.startDate
      ? new Date(eventData.startDate).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "",
    toTime: eventData?.endDate
      ? new Date(eventData.endDate).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "",
    isOnline: eventData?.isOnline ?? true,
    streetName: eventData?.addressId?.streetName || "",
    streetNumber: eventData?.addressId?.streetNumber || "",
    zipCode: eventData?.addressId?.zipCode || "",
    city: eventData?.addressId?.city || "",
    country: eventData?.addressId?.country || "",
    maxParticipant: eventData?.maxParticipant || 1,
    interestIds: eventData?.interestIds.map((category) => category._id) || [],
    languages: eventData?.languages || [],
    description: eventData?.description || "",
    isContactPersonAdded: eventData?.isContactPersonAdded || false,
    contactName: eventData?.contactName || "",
    contactEmail: eventData?.contactEmail || "",
    contactPhone: eventData?.contactPhone || "",
  }

  const handleSubmit = async (values) => {
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
    console.log(values.date)
    console.log(values.fromTime)
    console.log(values.toTime)
    const startDate = new Date(`${date}T${fromTime}:00`)
    const endDate = new Date(`${date}T${toTime}:00`)
    console.log(startDate)
    console.log(endDate)
    const body = {
      createdBy: user._id,
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
      ...(eventData && eventData.addressId && { addressId: eventData.addressId }),
      ...(payload?.s?.length > 0 && {
        languages: payload.languages,
      }),
      ...(isContantPersonAdded && { contactName, contactEmail, contactPhone }),
      ...(eventPhoto && { eventPhoto }),
    }

    try {
      if (eventToEdit === null) {
        setLoading(true)
        await postEvent(body)
        setLoading(false)
      } else {
        setLoading(true)
        await editEvent(eventData._id, body)
        setLoading(false)
      }
      onClose()
    } catch (error) {
      toastNotify("error", t(translations.toastify.error))
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-light-gray mt-3 dark:bg-dark-gray-3 rounded-lg shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={() => AddEventSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isValid, errors, touched }) => (
          <Form>
            {/* Step One || Step Two */}
            {step === 1 && (
              <StepOne
                setStep={setStep}
                setFieldValue={setFieldValue}
                values={values}
                onClose={onClose}
                step={step}
                eventData={eventData}
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
                loading={loading}
                errors={errors}
                touched={touched}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddEvent
