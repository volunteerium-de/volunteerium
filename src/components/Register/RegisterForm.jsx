import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"
import useAuthCall from "../../hooks/useAuthCall"
import { translations } from "../../locales/translations"
import { useTranslation } from "react-i18next"
import { useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { ImSpinner9 } from "react-icons/im"
import { useSelector } from "react-redux"

const RegisterForm = () => {
  const { t } = useTranslation()

  const validationSchema = Yup.object({
    userType: Yup.string().required(t(translations.registerForm.yup1)),
    fullName: Yup.string()
      .min(3, t(translations.yup.minLength.characters3))
      .max(30, t(translations.yup.maxLength.characters30))
      .required(t(translations.yup.required.fullName)),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t(translations.yup.invalid.email))
      .required(t(translations.yup.required.email)),
    password: Yup.string()
      .min(8, t(translations.yup.minLength.characters8))
      .max(30, t(translations.yup.maxLength.characters30))
      .matches(/\d+/, t(translations.yup.password.containsDigit))
      .matches(/[a-z]/, t(translations.yup.password.containsLowercase))
      .matches(/[A-Z]/, t(translations.yup.password.containsUppercase))
      .matches(/[@$?!%&*]+/, t(translations.yup.password.containsSpecialCharacter))
      .required(t(translations.yup.required.password)),
  })

  const [userType, setUserType] = useState("individual")
  const [showPassword, setShowPassword] = useState(false)
  const { onRecaptchaVerify, authWithGoogle } = useAuthCall()
  const recaptchaRef = useRef(null)
  const formValuesRef = useRef({})
  const { loading } = useSelector((state) => state.auth)

  // Handle radio button changes
  const handleRadioChange = (e, setFieldValue) => {
    const value = e.target.value
    setUserType(value)
    setFieldValue("userType", value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = (values, { setSubmitting }) => {
    formValuesRef.current = values // Save form values
    recaptchaRef.current.execute() // trigger reCAPTCHA
    setSubmitting(false)
  }

  return (
    <>
      <Formik
        initialValues={{
          userType,
          fullName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="md:space-y-3">
            {/* Radio buttons */}
            <div className="mb-6 flex flex-row justify-between xl:justify-start space-x-4 lg:space-x-10">
              <div
                className={`flex items-center rounded-lg p-3 w-[50%] md:w-[49%] xl:w-[40%] h-[42px] md:h-[48px] 
              ${values.userType === "individual" ? "bg-light-green font-medium text-primary-green border border-primary-green" : "border border-gray-1 dark:border-white text-gray-2 dark:text-white"}`}
              >
                <Field
                  type="radio"
                  id="individual"
                  name="userType"
                  value="individual"
                  onChange={(e) => handleRadioChange(e, setFieldValue)}
                  className="accent-primary-green"
                />
                <label
                  htmlFor="individual"
                  className="text-[0.9rem] md:text-[0.75rem] lg:text-[1rem] cursor-pointer w-full p-2"
                >
                  {t(translations.registerForm.radioIndv)}
                </label>
              </div>

              <div
                className={`flex items-center border rounded-lg p-3 w-[55%] xl:w-[40%] h-[42px] md:h-[48px] 
              ${values.userType === "organization" ? "bg-light-green text-primary-green font-medium border-primary-green" : "border-gray-1 dark:border-white text-gray-2 dark:text-white"}`}
              >
                <Field
                  type="radio"
                  id="organization"
                  name="userType"
                  value="organization"
                  onChange={(e) => handleRadioChange(e, setFieldValue)}
                  className="accent-primary-green"
                />
                <label
                  htmlFor="organization"
                  className="text-[0.9rem] md:text-[0.75rem] lg:text-[1rem] cursor-pointer w-full p-2"
                >
                  {t(translations.registerForm.radioOrg)}
                </label>
              </div>
            </div>

            {/* Full Name/Organization */}
            <div>
              <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem]">
                {values.userType === "individual"
                  ? t(translations.registerForm.fullname)
                  : t(translations.registerForm.orgname)}
              </p>
              <Field
                type="text"
                name="fullName"
                placeholder={
                  values.userType === "individual"
                    ? t(translations.registerForm.fullnamePH)
                    : t(translations.registerForm.orgnamePH)
                }
                className={`w-full border dark:border-white rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-gray-2 dark:bg-black dark:text-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
                ${touched.fullName && errors.fullName ? "border-red" : "border-gray-1"}`}
              />
              <div className="h-[20px]">
                {touched.fullName && errors.fullName && (
                  <p className="text-red-500 text-[0.875rem]">{errors.fullName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem]">
                {t(translations.registerForm.email)}
              </p>
              <Field
                type="email"
                name="email"
                placeholder={t(translations.registerForm.emailPH)}
                className={`w-full border dark:border-white rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-gray-2 dark:bg-black dark:text-white  p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
                ${touched.email && errors.email ? "border-red" : "border-gray-1"}`}
              />
              <div className="h-[20px]">
                {touched.email && errors.email && (
                  <p className="text-red-500 text-[0.875rem]">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <p className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem]">
                {t(translations.registerForm.password)}
              </p>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={t(translations.registerForm.passwordPH)}
                  className={`w-full border dark:border-white rounded-lg text-[1rem]placeholder-gray-2 dark:placeholder-gray-2 dark:bg-black dark:text-white  p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
                  ${touched.password && errors.password ? "border-red" : "border-gray-1"}`}
                />
                <div className="absolute inset-y-0 text-primary-green right-3 pr-3 flex items-center text-2xl cursor-pointer">
                  {showPassword ? (
                    <MdVisibilityOff onClick={togglePasswordVisibility} />
                  ) : (
                    <MdVisibility onClick={togglePasswordVisibility} />
                  )}
                </div>
              </div>
              <div className="h-[20px]">
                {touched.password && errors.password && (
                  <p className="text-red-500 text-[0.875rem]">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col items-center">
              <button
                type="submit"
                className={`w-full bg-primary-green hover:bg-dark-green text-white text-[1rem] py-3 mt-3 rounded-lg focus:outline-none flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ImSpinner9 className="animate-spin mr-2" />
                    {t(translations.registerForm.loading)}
                  </>
                ) : (
                  t(translations.registerForm.submit)
                )}
              </button>
              {/* Invisible reCAPTCHA Comp. */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
                size="invisible"
                onChange={(token, resetForm) => {
                  onRecaptchaVerify(token, formValuesRef.current, "register")
                  resetForm()
                }} // Called after successful verification
              />

              <div className="text-center mt-4">
                <span className="text-gray-2 dark:text-white">
                  {t(translations.registerForm.haveAccount)}
                </span>
                <Link to="/login" className="ml-1 text-primary-green font-semibold underline">
                  {t(translations.registerForm.login)}
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div>
        {userType === "individual" && (
          <div className="flex flex-col items-center">
            <div className="flex items-center my-4">
              <div className="flex-1 border-t w-[300px] border-gray-2 dark:border-white"></div>
              <p className="text-gray-2 dark:text-white text-[0.875rem] text-center mx-5">
                {t(translations.registerForm.or)}
              </p>
              <div className="flex-1 border-t border-gray-2 dark:border-white"></div>
            </div>

            <button
              onClick={authWithGoogle}
              className="flex items-center justify-center w-[60%] md:w-auto text-gray-2 hover:text-black text-sm md:text-base py-3 px-4 rounded-lg border border-gray-1 dark:border-white hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <FcGoogle className="text-xl dark:text-white md:text-2xl mr-2" />
              {t(translations.registerForm.contGoogle)}
            </button>
          </div>
        )}
        {/* Terms and Conditions */}
        <p className="text-[0.75rem] mt-5 text-gray-2 dark:text-white text-center">
          {t(translations.registerForm.pTerms)}{" "}
          <Link
            to="/terms-of-service"
            className="text-primary-green dark:text-white underline font-semibold"
          >
            {t(translations.registerForm.terms)}
          </Link>{" "}
          <br />
          {t(translations.registerForm.pPrivacy)}{" "}
          <Link
            to="/privacy-policy"
            className="text-primary-green dark:text-white underline font-semibold"
          >
            {t(translations.registerForm.privacy)}
          </Link>
        </p>
      </div>
    </>
  )
}

export default RegisterForm
