import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"
import useAccountCall from "../hooks/useAccountCall"
import { ImSpinner9 } from "react-icons/im"
import { useSelector } from "react-redux"
import { getLoginRedirectLink } from "./GoogleAuthSuccess"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"

const GooglePassword = () => {
  const { t } = useTranslation()
  const { updateUser } = useAccountCall()
  const { loading, currentUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const clientIdParam = queryParams.get("clientId")
    if (clientIdParam !== currentUser._id) {
      navigate("/")
    }
  }, [location.search, currentUser])

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t(translations.yup.required.password))
      .min(8, t(translations.yup.minLength.characters8)),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t(translations.yup.password.match))
      .required(t(translations.yup.required.confirmPassword)),
  })
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await updateUser({
        oldPassword: "",
        password: values.password,
      })
      const redirectLink = getLoginRedirectLink(currentUser)

      setTimeout(() => {
        navigate(redirectLink)
      }, 0)
    },
  })
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="rounded-[8px] px-5 md:px-0">
        <div className="flex flex-col justify-center items-center gap-5">
          <img
            src={`${import.meta.env.VITE_AWS_URL}logo.webp`}
            alt="Volunteerium Logo"
            className="h-[30px] w-fit sm:h-[40px]"
          />
          <h1 className="text-center dark:text-white mb-[1rem] text-[2rem] md:text-[1.6rem] font-bold">
            {t(translations.googlePassword.header)}
          </h1>
        </div>
        <p className="text-center dark:text-white mb-[1rem] text-[1.2rem] md:text-[1rem] max-w-[700px] lg:max-w-[800px]">
          {t(translations.googlePassword.description)}
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-[20px] max-w-[500px] lg:max-w-[600px] mx-auto">
            <div className="flex flex-col gap-5">
              {/* New Password Field */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mt-[15px] text-[1.3rem] md:text-[1rem]">
                {/* Label */}
                <p className="dark:text-white min-w-[120px]">{t(translations.pswModal.newPsw)}</p>

                {/* Input and Eye Icon */}
                <div className="w-full sm:w-[300px]">
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="*********"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`h-[36px] w-full border ${
                        formik.errors.password
                          ? "border-danger focus:ring-2 focus:ring-danger"
                          : "border-gray-1 focus:ring-2  focus:ring-primary-green"
                      } focus:ring-2 focus:ring-primary-green text-dark-gray-1 p-2 rounded-md focus:outline-none`}
                    />
                    <span
                      className="absolute right-2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>

                  {/* Error Message */}
                  {formik.errors.password && (
                    <p className="mt-1 text-danger dark:text-primary-green text-[1rem] md:text-[0.9rem]">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mt-[15px] text-[1.3rem] md:text-[1rem]">
                {/* Label */}
                <p className="dark:text-white min-w-[120px]">
                  {t(translations.pswModal.confirmPsw)}
                </p>

                {/* Input and Eye Icon */}
                <div className="w-full sm:w-[300px]">
                  <div className="relative flex items-center">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="*********"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`h-[36px] w-full border ${
                        formik.errors.confirmPassword
                          ? "border-danger focus:ring-2 focus:ring-danger"
                          : "border-gray-1 focus:ring-2  focus:ring-primary-green"
                      } focus:ring-2 text-dark-gray-1 p-2 rounded-md focus:outline-none`}
                    />
                    <span
                      className="absolute right-2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>

                  {/* Error Message */}
                  {formik.errors.confirmPassword && (
                    <p className="mt-1 text-danger dark:text-primary-green text-[1rem] md:text-[0.9rem]">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-[50px]">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex justify-center text-[1.3rem] md:text-[1.0rem] items-center ${loading ? "bg-light-green" : "bg-primary-green hover:bg-dark-green"} px-2 py-1 rounded-md text-white w-[250px] h-[45px]`}
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin" />
                  ) : (
                    t(translations.googlePassword.saveContinue)
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default GooglePassword
