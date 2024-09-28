// import React from 'react'
import { BiUpload } from "react-icons/bi"
import { Link } from "react-router-dom"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

export const updateUserDetailsSchema = Yup.object().shape({
  organizationLogo: Yup.string().trim().required("Logo is required"),
  organizationDesc: Yup.string().max(1000).trim().required("Description is required"),
  organizationUrl: Yup.string().url("Invalid URL format.").optional(),
  streetName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z]+$/, "Must contain just letters")
    .required("Street name is required")
    .min(3, "Street name must contain min 3 character"),
  streetNumber: Yup.string()
    .required("Street nr is required")
    .trim()
    .matches(/^[0-9]+$/, "Must contain just digits")
    .min(1, "Min 1 character")
    .max(8, "Max 8 character"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .trim()
    .matches(/^[0-9]+$/, "Must contain just numbers")
    .min(1, "Min 1 character")
    .max(8, "Max 8 character"),
  city: Yup.string()
    .trim()
    .required("City is required")
    .matches(/^[a-zA-Z]+$/, "Must contain just letters")
    .min(3, "City must contain min 3 character"),
  country: Yup.string()
    .trim()
    .required("Country is required")
    .matches(/^[a-zA-Z]+$/, "Must contain just letters")
    .min(3, "Country must contain min 3 character"),
})

const Setuporganization = () => {
  const [step, setStep] = useState(1)
  const [logoPreview, setLogoPreview] = useState(null) // For logo preview
  const navigate = useNavigate();

  // Toggle between steps
  const handleNext = () => {
    setStep(step === 1 ? 2 : 1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="bg-white max-w-4xl w-full px-6 py-12 rounded-lg shadow-md dark:bg-black">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 p-2">
            <Link
              to="#"
              className={`w-8 h-8 rounded-full border ${step === 1
                ? "font-semibold  text-white border-2 bg-primary-green  dark:text-black dark:bg-white dark:border-primary-green "
                : " text-gray-2 border-gray-1 dark:text-white dark:border-primary-green"
              } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
              onClick={() => setStep(1)}
            >
              1
            </Link>

            {/* Dots between steps */}
            <div className="flex items-center">
              <HiDotsHorizontal className="text-gray-2  text-2xl" />
            </div>

            {/* Step 2 */}
            <Link
              to="#"
              className={`w-8 h-8 rounded-full border ${step === 2
                ? "font-semibold  text-white border-2 bg-primary-green  dark:text-black dark:bg-white dark:border-primary-green "
                : " text-gray-2 border-gray-1 dark:text-white dark:border-primary-green"
              } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
              onClick={(e) => {
                if (document.getElementById("organizationDesc").value === "" || !logoPreview) {
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
              <HiDotsHorizontal className="text-gray-2 text-2xl" />
            </div>

            {/* Step 3 (Check Icon) */}
            <div className="w-8 h-8 rounded-full border bg-primary-green text-white flex items-center justify-center">
              <FaCheck />
            </div>
          </div>
        </div>

        {step === 1 ? (
          <>
            {/* Step 1 Form */}
            <h2 className="text-[1.75rem] dark:text-white font-bold text-center mb-4">
              Share Your Organization Details
            </h2>
            <p className="text-dark-gray-1 dark:text-white text-center mb-8">
              This information is necessary for us to understand your organization and provide you
              with better services
            </p>

            <Formik
              initialValues={{
                organizationDesc: "",
                organizationLogo: null,
                organizationUrl: "",
                streetName: "",
                streetNumber: "",
                zipCode: "",
                city: "",
                country: "",
              }}
              validationSchema={updateUserDetailsSchema}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              {({ setFieldValue, values }) => (
                <Form>
                  <div className="mb-2 mx-auto w-2/3">
                    <label
                      htmlFor="organizationDesc"
                      className="block text-gray-2 font-medium mb-1"
                    >
                      Organization Description
                    </label>
                    <Field
                      type="text"
                      id="organizationDesc"
                      name="organizationDesc"
                      placeholder="Enter organization description"
                      className="w-full px-4 py-2 dark:text-white dark:bg-black border border-gray-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-green"
                    />
                    <div className="min-h-[1.5rem] text-[0.875rem]">
                      <ErrorMessage
                        name="organizationDesc"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="mx-auto w-2/3">
                    <label
                      htmlFor="organizationLogo"
                      className="block text-gray-2 font-medium mb-1"
                    >
                      Organization Logo
                    </label>
                    <div
                      className="flex w-full mx-auto items-center cursor-pointer border border-gray-2 rounded-md px-4 py-2"
                      onClick={() => document.getElementById("logoInput").click()}
                    >
                      <input
                        type="file"
                        id="logoInput"
                        name="organizationLogo"
                        className="hidden"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0]
                          setFieldValue("organizationLogo", file)

                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setLogoPreview(reader.result)
                            }
                            reader.readAsDataURL(file)
                          } else {
                            setLogoPreview(null)
                          }
                        }}
                      />
                      <span className="text-gray-2 dark:text-white">Upload organization logo</span>
                      <button className="ml-auto">
                        <BiUpload className="text-2xl text-dark-gray-2 dark:text-white" />
                      </button>
                    </div>
                    <div className="min-h-[1.5rem] text-[0.875rem]">
                      <ErrorMessage
                        name="organizationLogo"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    {logoPreview && (
                      <div className="mb-4 flex  w-2/3 ">
                        <span className="mr-4 my-auto text-gray-2 font-medium">Preview:</span>
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="max-w-full w-1/4 h-auto"
                        />
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={() => {
                        if (values.organizationDesc && values.organizationLogo) {
                          handleNext()
                        }
                      }}
                      className="w-auto px-14 py-2 bg-primary-green hover:bg-dark-green text-white rounded-md transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            {/* Step 2 Form */}
            <h2 className="text-[1.75rem] dark:text-white font-bold text-center mb-2">
              Complete Your Organization Profile
            </h2>
            <p className="text-dark-gray-1 dark:text-white text-center mb-2">
              These additional details are required to create a comprehensive profile of your
              organization and offer customized services
            </p>

            <Formik
              validationSchema={updateUserDetailsSchema}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                resetForm()
                setSubmitting(false)
                navigate('/')
                console.log("Form values submitted: ", values)
              }}
            >

              {({ isValid }) => (
                <Form>
                  <div className="flex flex-col">
                    
                  <div className="w-full">
                      <label
                        htmlFor="organizationUrl"
                        className="block text-gray-2 font-medium mb-1"
                      >
                        Website URL
                      </label>
                      <Field
                        type="url"
                        id="organizationUrl"
                        name="organizationUrl"
                        placeholder="https://"
                        className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                      />
                      <div className="min-h-[1.5rem] text-[0.875rem]">
                        <ErrorMessage
                          name="organizationUrl"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-2/4">
                        <label
                          htmlFor="streetName"
                          className="block text-gray-2 font-medium mb-1"
                        >
                          Street Name*
                        </label>
                        <Field
                          type="text"
                          id="streetName"
                          name="streetName"
                          placeholder="Enter street name"
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-[0.875rem]">
                          <ErrorMessage
                            name="streetName"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>

                      <div className="w-1/4">
                        <label
                          htmlFor="streetNumber"
                          className="block text-gray-2 font-medium mb-1"
                        >
                          Street Nr.*
                        </label>
                        <Field
                          type="text"
                          id="streetNumber"
                          name="streetNumber"
                          placeholder="Nr"
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-[0.875rem]">
                          <ErrorMessage
                            name="streetNumber"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>

                      <div className="w-1/4">
                        <label
                          htmlFor="zipCode"
                          className="block text-gray-2 font-medium mb-1"
                        >
                          Zip Code*
                        </label>
                        <Field
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          placeholder="Enter zip code"
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-[0.875rem]">
                          <ErrorMessage
                            name="zipCode"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>


                    </div>
                   
                   
                    <div className="flex items-center space-x-2">
                    

                      <div className="w-1/2">
                        <label
                          htmlFor="city"
                          className="block text-gray-2 font-medium mb-1"
                        >
                          City*
                        </label>
                        <Field
                          type="text"
                          id="city"
                          name="city"
                          placeholder="Enter city"
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-[0.875rem]">
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div className="w-1/2">
                      <label
                        htmlFor="country"
                        className="block text-gray-2 font-medium mb-1"
                      >
                        Country*
                      </label>
                      <Field
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Enter country"
                        className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                      />
                      <div className="min-h-[1.5rem] text-[0.875rem]">
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    </div>

                    

                    
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`w-auto px-14 py-2 ${!isValid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary-green hover:bg-dark-green"
                        } text-white rounded-md transition-colors`}
                    >
                      Finish
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  )
}

export default Setuporganization
