// src/components/Password/Forgot/ForgotPasswordForm.jsx

import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import toastNotify from "../../../utils/toastNotify"
import { axiosWithPublic } from "../../../hooks/useAxios"
import { translations } from "../../../locales/translations"
import { ImSpinner9 } from "react-icons/im"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const ForgotPasswordForm = ({ setIssue, setIdentifier, setEmail }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const loading = useSelector((state) => state.auth.loading)

  const forgotPassword = async (email) => {
    try {
      const { data } = await axiosWithPublic.post("auth/forgot-password", { email })

      setIdentifier(data.resetToken)
      setIssue("verify-reset-token")
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error.response?.data?.message)
    }
  }

  // Form validation using Formik and Yup
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t(translations.yup.invalid.email))
        .required(t(translations.yup.required.email)),
    }),
    onSubmit: (values) => {
      setEmail(values.email)
      forgotPassword(values.email)
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-start space-y-6 w-full max-w-[44.1875rem] bg-white dark:bg-black rounded-lg relative"
    >
      {/* Mobile View - Back Arrow and Back to Login */}
      <div className="md:hidden flex flex-row items-center mb-6" onClick={() => navigate("/login")}>
        <IoIosArrowBack className="text-black dark:text-white text-3xl cursor-pointer self-start" />
        <span className="text-lg font-semibold text-black dark:text-white">
          {t(translations.password.forgotPassForm.backToLogin)}
        </span>
      </div>

      {/* Mobile View - Logo Centered */}
      <div className="md:hidden w-full flex justify-center mb-6 mt-[5rem]">
        <img
          src={logo}
          alt={t(translations.password.forgotPassForm.logoAlt)}
          className="h-16 w-auto"
        />
      </div>

      {/* Title and Description */}
      <div className="flex-grow">
        <h1 className="text-black dark:text-white text-[1.75rem] text-center md:text-center md:text-[2rem] font-semibold mb-6">
          {t(translations.password.forgotPassForm.forgotPassword)}
        </h1>
        <p className="text-left w-full text-[1rem] md:text-[1.125rem] font-normal text-gray-2 dark:text-white leading-snug">
          {t(translations.password.forgotPassForm.forgotDesc)}
        </p>
      </div>

      {/* Email Field */}
      <div className="flex flex-col relative w-full pb-4">
        <label
          htmlFor="email"
          className="text-gray-2 dark:text-white text-[0.875rem] md:text-[1rem]"
        >
          {t(translations.password.forgotPassForm.email)}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-gray-2 dark:bg-black dark:text-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green"
          placeholder={t(translations.password.forgotPassForm.emailPH)}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-danger absolute -bottom-2 text-sm">{formik.errors.email}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-primary-green hover:bg-dark-green text-white text-[1rem] py-3 mt-3 rounded-lg focus:outline-none  flex justify-center items-center ${
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
                  t(translations.password.forgotPassForm.submit)
                )}
      </button>

      {/* Sign Up Link */}
      <p className="mt-4 text-center text-sm dark:text-white w-full">
        {t(translations.password.forgotPassForm.dontHave)}{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-primary-green cursor-pointer underline"
        >
          {t(translations.password.forgotPassForm.signUp)}
        </span>
      </p>
    </form>
  )
}

export default ForgotPasswordForm
