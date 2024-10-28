import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useState, useEffect, useRef } from "react"
import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"
import useAuthCall from "../../hooks/useAuthCall"
import { translations } from "../../locales/translations"
import { useTranslation } from "react-i18next"

const LoginForm = () => {

  const { t } = useTranslation()

const validationSchema = Yup.object({
  email: Yup.string().email(t(translations.loginForm.yup1)).required(t(translations.loginForm.yup2)),
  password: Yup.string()
    .min(6, t(translations.loginForm.yup3))
    .max(30, t(translations.loginForm.yup4))
    .matches(/\d+/, t(translations.loginForm.yup5))
    .matches(/[a-z]/, t(translations.loginForm.yup6))
    .matches(/[A-Z]/, t(translations.loginForm.yup7))
    .matches(/[@$?!%&*]+/, t(translations.loginForm.yup8))
    .required(t(translations.loginForm.yup9)),
})


  const [showPassword, setShowPassword] = useState(false)
  const passwordTimeoutRef = useRef(null)
  const { login, authWithGoogle } = useAuthCall()

  useEffect(() => {
    return () => {
      clearTimeout(passwordTimeoutRef.current)
    }
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
    clearTimeout(passwordTimeoutRef.current)
    passwordTimeoutRef.current = setTimeout(() => setShowPassword(false), 5000)
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values)
        login(values)
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form className="md:space-y-3">
          {/* Email */}
          <div>
            <p className="text-gray-2 text-[0.875rem] md:text-[1rem]">
            {t(translations.loginForm.email)}</p>
            <Field
              type="email"
              name="email"
              placeholder= {t(translations.loginForm.emailPH)}
              className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-white dark:bg-black dark:text-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
                ${touched.email && errors.email ? "border-red" : "border-gray-1"}`}
            />
            <div className="h-[20px]">
              {touched.email && errors.email && (
                <p className="text-danger text-[0.875rem]">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <p className="text-gray-2 text-[0.875rem] md:text-[1rem]">{t(translations.loginForm.password)}</p>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder= {t(translations.loginForm.passwordPH)}
                className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-white dark:bg-black dark:text-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
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

            <div className="flex justify-between items-center mt-1">
              {touched.password && errors.password && (
                <p className="text-danger text-[0.875rem]">{errors.password}</p>
              )}
              <Link to="/password">
                <p className="text-sm justify-end text-dark-green dark:text-white underline cursor-pointer">
                {t(translations.loginForm.forgot)}
                </p>
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full bg-primary-green text-white text-[1rem] py-3 mt-3 rounded-lg  focus:outline-none"
            >
              {t(translations.loginForm.login)}
            </button>

            <div className="text-center mt-6">
              <span className="text-gray-2">{t(translations.loginForm.haveAccount)}</span>
              <Link to="/register" className="ml-1 text-primary-green font-semibold underline">
              {t(translations.loginForm.signUp)}
              </Link>
            </div>

            {/* or and dividers */}
            <div className="flex items-center my-5">
              <div className="flex-1 border-t w-[300px] border-gray-2 dark:border-white"></div>
              <p className="text-gray-2 dark:text-white text-[0.875rem] text-center mx-5">{t(translations.loginForm.or)}</p>
              <div className="flex-1 border-t border-gray-2 dark:border-white"></div>
            </div>

            <button
              onClick={authWithGoogle}
              className="flex items-center justify-center w-[60%] md:w-auto text-gray-2 dark:text-white text-sm md:text-base py-3 px-4 rounded-lg border border-gray-1 dark:border-white hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <FcGoogle className="text-xl md:text-2xl mr-2" />
              {t(translations.loginForm.contGoogle)}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
