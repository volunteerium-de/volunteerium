// src/components/Feedback/FeedbackForm.jsx

import React from "react"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Can be maximum 30 characters")
    .required("Name is a required field"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Email is a required field"),
  subject: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(50, "Can be maximum 50 characters")
    .required("Message subject is required"),
  feedback: Yup.string()
    .min(10, "Must be at least 10 characters")
    .max(1000, "Can be maximum 1000 characters")
    .required("Message is a required field"),
})

const FeedbackForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        subject: "",
        feedback: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values)
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4 dark:bg-gray-900">
          {/* Name Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
              Name
            </p>
            <Field
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`w-full border dark:border-gray-700 dark:bg-gray-800 rounded-lg text-[0.875rem] lg:text-[1rem] p-2 lg:p-3 h-[40px] md:h-[42px] focus:outline-none focus:border-primary-green dark:text-white 
                ${touched.name && errors.name ? "border-red dark:border-red-500" : "border-gray-1"}`}
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.name && errors.name && (
                <p className="text-red-500 dark:text-red-400 text-[0.875rem]">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
              Email Address
            </p>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email address"
              className={`w-full border dark:border-gray-700 dark:bg-gray-800 rounded-lg text-[0.875rem] lg:text-[1rem] p-2 lg:p-3 h-[40px] md:h-[42px] focus:outline-none focus:border-primary-green dark:text-white 
                ${touched.email && errors.email ? "border-red dark:border-red-500" : "border-gray-1"}`}
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.email && errors.email && (
                <p className="text-red-500 dark:text-red-400 text-[0.875rem]">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Feedback Subject Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
              Message Subject
            </p>
            <Field
              type="text"
              name="subject"
              placeholder="Message Subject Here"
              className={`w-full border dark:border-gray-700 dark:bg-gray-800 rounded-lg text-[0.875rem] lg:text-[1rem] p-2 lg:p-3 h-[40px] md:h-[42px] focus:outline-none focus:border-primary-green dark:text-white 
                ${touched.subject && errors.subject ? "border-red dark:border-red-500" : "border-gray-1"}`}
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.subject && errors.subject && (
                <p className="text-red-500 dark:text-red-400 text-[0.875rem]">{errors.subject}</p>
              )}
            </div>
          </div>

          {/* Feedback Field */}
          <div>
            <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]">
              Message
            </p>
            <Field
              as="textarea"
              name="feedback"
              placeholder="Enter your message..."
              className={`w-full border dark:border-gray-700 dark:bg-gray-800 rounded-lg text-[0.875rem] lg:text-[1rem] p-2 lg:p-3 h-[90px] md:h-[200px] xl:h-[110px]  focus:outline-none focus:border-primary-green dark:text-white 
                ${touched.feedback && errors.feedback ? "border-red dark:border-red-500" : "border-gray-1"}`}
              maxLength="1000"
            />
            {/* Error Message */}
            <div className="h-[20px]">
              {touched.feedback && errors.feedback && (
                <p className="text-red-500 dark:text-red-400 text-[0.875rem]">{errors.feedback}</p>
              )}
            </div>
            <p className="text-[0.75rem] text-gray-400 dark:text-gray-500 text-right">
              Max 1000 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-primary-green text-white text-[0.9rem] lg:text-[1rem] py-2 lg:py-3 rounded-lg focus:outline-none dark:bg-dark-green"
            >
              Share Your Feedback
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FeedbackForm
