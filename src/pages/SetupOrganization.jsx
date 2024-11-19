import { BiUpload } from "react-icons/bi"
import { Link } from "react-router-dom"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import toastNotify from "../utils/toastNotify"
import { useSelector } from "react-redux"
import useAccountCall from "../hooks/useAccountCall"
import { useLocation } from "react-router-dom"
import useAuthCall from "../hooks/useAuthCall"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"



const SetupOrganization = () => {
  const {t} = useTranslation()

  const OrganizationSchema = Yup.object({
    organizationLogo: Yup.mixed().required(t(translations.yup.required.logo)),
    organizationDesc: Yup.string()
      .required(t(translations.yup.required.description))
      .min(10, t(translations.yup.minLength.characters10)),
    organizationUrl: Yup.string()
      .url(t(translations.yup.invalid.url))
      .required(t(translations.yup.required.organizationURL)),
    streetName: Yup.string().required(t(translations.yup.required.streetName))
    .matches(/^[\p{L}0-9\s.'/-]+$/u,  t(translations.yup.invalid.invalidFormat)),
    streetNumber: Yup.string().required(t(translations.yup.required.streetNumber))
    .trim()
    .matches(/^[\p{L}0-9\s.'/-]+$/u, t(translations.yup.invalid.invalidFormat)),
    zipCode: Yup.string()
    .trim()
    .matches(/^[\p{L}0-9\s.'/-]+$/u, t(translations.yup.invalid.invalidFormat))
    .min(1, t(translations.yup.minLength.characters1))
    .max(15, t(translations.yup.maxLength.characters15))
    .required(t(translations.yup.required.zipCode)),
    city: Yup.string().required(t(translations.yup.required.city))
    .min(3, t(translations.yup.minLength.characters3))
    .matches(/^[\p{L}\s.'/-]+$/u, t(translations.yup.invalid.invalidFormat)),
    country: Yup.string().required(t(translations.yup.required.country))
    .trim()
    .matches(/^[\p{L}\s.'/-]+$/u, t(translations.yup.invalid.invalidFormat))
    .min(3, t(translations.yup.minLength.characters3))
  })

  const { currentUser: user } = useSelector((state) => state.auth)
  const [step, setStep] = useState(1)
  const { updateUserDetails } = useAccountCall()
  const { logout } = useAuthCall()
  const [fileName, setFileName] = useState("")
  const [logoPreview, setLogoPreview] = useState(null) // For logo preview
  const navigate = useNavigate()
  const location = useLocation()

  // Toggle between steps
  const handleNext = () => {
    setStep(step === 1 ? 2 : 1)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const clientIdParam = queryParams.get("clientId")

    if (!clientIdParam || clientIdParam !== user._id) {
      logout(false)
    }

    if (
      user.userType === "organization" &&
      !user.userDetailsId.isProfileSetup &&
      clientIdParam == user._id
    ) {
      toastNotify("info", t(translations.toastify.setupProfile))
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="bg-white max-w-4xl w-full px-6 py-12 rounded-lg dark:bg-black">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 p-2">
            <Link
              to="#"
              className={`w-8 h-8 rounded-full border ${
                step === 1
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
              className={`w-8 h-8 rounded-full border ${
                step === 2
                  ? "font-semibold  text-white border-2 bg-primary-green  dark:text-black dark:bg-white dark:border-primary-green "
                  : " text-gray-2 border-gray-1 dark:text-white dark:border-primary-green"
              } flex items-center justify-center hover:bg-light-green hover:text-gray-2 transition-colors`}
              onClick={(e) => {
                if (!document.getElementById("organizationDesc").value || !logoPreview) {
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

        <Formik
          initialValues={{
            organizationDesc: "",
            organizationLogo: null,
            organizationUrl: "",
            streetName: "",
            streetNumber: "",
            zipCode: "",
            city: "",
            state: "",
            country: "",
          }}
          validationSchema={OrganizationSchema}
          onSubmit={(values) => {
            updateUserDetails({ ...values, isProfileSetup: true }, user.userDetailsId._id)
            navigate("/")
          }}
          validateDidMount={false}
        >
          {({ setFieldValue, values, isValid }) => (
            <Form>
              {step === 1 ? (
                <>
                  {/* Step 1 Form */}
                  <h2 className="text-[1.75rem] dark:text-white font-bold text-center mb-4">
                    {t(translations.setupOrg.details)}
                  </h2>
                  <p className="text-dark-gray-1 dark:text-white text-center mb-8">
                    {t(translations.setupOrg.p)}
                  </p>

                  <div className="mb-2 mx-auto w-2/3">
                    <label
                      htmlFor="organizationDesc"
                      className="block text-gray-2 font-medium mb-1"
                    >
                      {t(translations.setupOrg.orgDesc)}
                    </label>
                    <Field
                      type="text"
                      id="organizationDesc"
                      name="organizationDesc"
                      placeholder={t(translations.setupOrg.orgDescPH)}
                      className="w-full px-4 py-2 dark:text-white dark:bg-black border border-gray-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-green"
                    />
                    <div className="min-h-[1.5rem] text-sm">
                      <ErrorMessage
                        name="organizationDesc"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="mx-auto w-2/3">
                    <label
                      htmlFor="organizationLogo"
                      className="block text-gray-2 font-medium mb-1"
                    >
                      {t(translations.setupOrg.orgLogo)}
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
                            setFileName(file.name)
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setLogoPreview(reader.result)
                            }
                            reader.readAsDataURL(file)
                          } else {
                            setLogoPreview(null)
                            setFileName("")
                          }
                        }}
                      />
                      <span className="text-gray-2 dark:text-white">
                        {fileName || "Upload organization logo"}
                      </span>
                      <button className="ml-auto">
                        <BiUpload className="text-2xl text-dark-gray-2 dark:text-white" />
                      </button>
                    </div>
                    <div className="min-h-[1.5rem] text-sm">
                      <ErrorMessage
                        name="organizationLogo"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* {logoPreview && (
                      <div className="mb-4 flex  w-2/3 ">
                        <span className="mr-4 my-auto text-gray-2 font-medium">Preview:</span>
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="max-w-full w-1/4 h-auto"
                        />
                      </div>
                    )} */}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={() => {
                        if (values.organizationDesc && values.organizationLogo) {
                          handleNext()
                        }
                      }}
                      className="w-auto px-14 py-2 bg-primary-green hover:bg-primary-green/60 text-white rounded-md transition-colors"
                    >
                      {t(translations.setupOrg.nextButton)}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2 Form */}
                  <h2 className="text-[1.75rem] dark:text-white font-bold text-center mb-2">
                    {t(translations.setupOrg.completeh2)}
                  </h2>
                  <p className="text-dark-gray-1 dark:text-white text-center mb-2">
                    {t(translations.setupOrg.completeP)}
                  </p>

                  <div className="flex flex-col">
                    <div className="w-full">
                      <label
                        htmlFor="organizationUrl"
                        className="block text-gray-2 font-medium mb-1"
                      >
                        {t(translations.setupOrg.websiteURL)}
                      </label>
                      <Field
                        type="url"
                        id="organizationUrl"
                        name="organizationUrl"
                        placeholder="https://"
                        className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                      />
                      <div className="min-h-[1.5rem] text-sm">
                        <ErrorMessage
                          name="organizationUrl"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-2/4">
                        <label htmlFor="streetName" className="block text-gray-2 font-medium mb-1">
                          {t(translations.setupOrg.streetName)}
                        </label>
                        <Field
                          type="text"
                          id="streetName"
                          name="streetName"
                          placeholder={t(translations.setupOrg.streetNamePH)}
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-sm">
                          <ErrorMessage name="streetName" component="div" className="text-danger" />
                        </div>
                      </div>

                      <div className="w-1/4">
                        <label
                          htmlFor="streetNumber"
                          className="block text-gray-2 font-medium mb-1"
                        >
                          {t(translations.setupOrg.streetNr)}
                        </label>
                        <Field
                          type="text"
                          id="streetNumber"
                          name="streetNumber"
                          placeholder="Nr"
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-sm">
                          <ErrorMessage
                            name="streetNumber"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>

                      <div className="w-1/4">
                        <label htmlFor="zipCode" className="block text-gray-2 font-medium mb-1">
                          {t(translations.setupOrg.zipCode)}
                        </label>
                        <Field
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          placeholder={t(translations.setupOrg.zipCodePH)}
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-sm">
                          <ErrorMessage name="zipCode" component="div" className="text-danger" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-2/4">
                        <label htmlFor="city" className="block text-gray-2 font-medium mb-1">
                          {t(translations.setupOrg.city)}
                        </label>
                        <Field
                          type="text"
                          id="city"
                          name="city"
                          placeholder={t(translations.setupOrg.cityPH)}
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-sm">
                          <ErrorMessage name="city" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="w-1/4">
                        <label htmlFor="state" className="block text-gray-2 font-medium mb-1">
                          {t(translations.setupOrg.state)}
                        </label>
                        <Field
                          type="text"
                          id="state"
                          name="state"
                          placeholder={t(translations.setupOrg.statePH)}
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-sm">
                          <ErrorMessage name="state" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="w-1/4">
                        <label htmlFor="country" className="block text-gray-2 font-medium mb-1">
                          {t(translations.setupOrg.country)}
                        </label>
                        <Field
                          type="text"
                          id="country"
                          name="country"
                          placeholder={t(translations.setupOrg.countryPH)}
                          className="w-full px-4 py-2 border border-gray-2 rounded-md dark:bg-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-green"
                        />
                        <div className="min-h-[1.5rem] text-sm">
                          <ErrorMessage name="country" component="div" className="text-danger" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`w-auto px-14 py-2 ${
                        !isValid
                          ? "bg-gray-400 hover:bg-gray-400/60 cursor-not-allowed"
                          : "bg-primary-green hover:bg-primary-green/60"
                      } text-white rounded-md transition-colors`}
                    >
                      {t(translations.setupOrg.finish)}
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SetupOrganization