// src/components/Feedback/FeedbackForm.jsx

import React from "react"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { axiosWithPublic } from "../../hooks/useAxios"
import toastNotify from "../../utils/toastNotify"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"

const ContactUsForm = () => {
  const { t } = useTranslation()
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t(translations.yup.minLength.characters3))
      .max(30, t(translations.yup.maxLength.characters30))
      .required(t(translations.yup.required.name)),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t(translations.yup.invalid.email))
      .required(t(translations.yup.required.email)),
    subject: Yup.string()
      .min(3, t(translations.yup.minLength.characters3))
      .max(50, t(translations.yup.maxLength.characters30))
      .required(t(translations.yup.required.subject)),
    message: Yup.string()
      .min(10, t(translations.yup.minLength.characters10))
      .max(1000, t(translations.yup.maxLength.characters1000))
      .required(t(translations.yup.required.message)),
  })
  const handleSubmit = async (values) => {
    try {
      const { data } = await axiosWithPublic.post("/contacts", values)
      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error.response?.data?.message)
    }
  }
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        subject: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values)
        handleSubmit(values)
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form className="md:space-y-3 dark:bg-black">
          {/* Name Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem]">
              {t(translations.contactUsForm.name)}
            </p>
            <Field
              type="text"
              name="name"
              placeholder={t(translations.contactUsForm.namePH)}
              className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-gray-2 dark:bg-black dark:text-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
                ${touched.name && errors.name ? "border-danger dark:border-danger" : "border-gray-1"}`}
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.name && errors.name && (
                <p className="text-danger dark:text-danger text-[0.875rem]">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem]">
              {t(translations.contactUsForm.email)}
            </p>
            <Field
              type="email"
              name="email"
              placeholder={t(translations.contactUsForm.emailPH)}
              className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-gray-2 dark:bg-black dark:text-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
                ${touched.email && errors.email ? "border-danger dark:border-danger" : "border-gray-1"}`}
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.email && errors.email && (
                <p className="text-danger dark:text-danger text-[0.875rem]">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Message Subject Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem]">
              {t(translations.contactUsForm.subject)}
            </p>
            <Field
              type="text"
              name="subject"
              placeholder={t(translations.contactUsForm.subjectPH)}
              className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-gray-2 dark:bg-black dark:text-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
                ${touched.subject && errors.subject ? "border-danger dark:border-danger" : "border-gray-1"}`}
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.subject && errors.subject && (
                <p className="text-danger dark:text-danger text-[0.875rem]">{errors.subject}</p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
              {t(translations.contactUsForm.message)}
            </p>
            <Field
              as="textarea"
              name="message"
              placeholder={t(translations.contactUsForm.messagePH)}
              className={`w-full border dark:border-gray-2 dark:bg-gray-3 rounded-lg text-[0.875rem] lg:text-[1rem] p-2 lg:p-3 h-[90px] md:h-[300px] lg:h-[100px] xl:h-[110px]  focus:outline-none focus:border-primary-green dark:text-white dark:bg-black resize-none scrollbar
                ${touched.message && errors.message ? "border-danger dark:border-danger" : "border-gray-1"}`}
              maxLength="1000"
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.message && errors.message && (
                <p className="text-danger dark:text-danger text-[0.875rem]">{errors.message}</p>
              )}
            </div>
            <p className="text-[0.75rem] text-gray-2 dark:text-light-gray-1 text-right">
              {t(translations.contactUsForm.messageMaxLength)}
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-primary-green hover:bg-dark-green text-white text-[1rem] py-3 mt-3 rounded-lg focus:outline-none  flex justify-center items-center"
            >
              {t(translations.contactUsForm.submit)}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ContactUsForm
