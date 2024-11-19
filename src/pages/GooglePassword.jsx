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
import logo from "../assets/logo.png"
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
          <img src={logo} alt="Volunteerium Logo" className="h-[30px] w-fit sm:h-[40px]" />
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
              <div className="relative flex flex-col sm:flex-row text-center md:text-left  justify-between items-center gap-[3px] mt-[15px] text-[1.3rem] md:text-[1rem]">
                <p className=" dark:text-white">{t(translations.pswModal.newPsw)}</p>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="*********"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[36px] md:w-[300px] border ${
                    formik.errors.password ? "border-danger" : "border-gray-1"
                  } focus:ring-2 focus:ring-primary-green text-dark-gray-1 p-2 border border-gray-1 rounded h-[100px] focus:outline-none`}
                />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
                {formik.errors.password ? (
                  <p className="absolute right-[25%] sm:right-0 -bottom-7 text-danger dark:text-primary-green text-[1rem] md:text-[0.9rem] sm:text-right text-center">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              {/* Confirm Password Field */}
              <div className="relative flex flex-col sm:flex-row text-center md:text-left justify-between items-center gap-[3px] mt-[15px] text-[1.3rem] md:text-[1rem]">
                <p className="dark:text-white">{t(translations.pswModal.confirmPsw)}</p>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="*********"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[36px] md:w-[300px] border ${
                    formik.errors.confirmPassword ? "border-danger" : "border-gray-1"
                  } focus:ring-2 focus:ring-primary-green text-dark-gray-1 p-2 border border-gray-1 rounded h-[100px] focus:outline-none`}
                />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
                {formik.errors.confirmPassword ? (
                  <p className="absolute right-[10%] sm:right-0 -bottom-7 text-danger dark:text-primary-green text-[1rem] md:text-[0.9rem] sm:text-right text-center">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
              <div className="flex justify-center gap-3 mt-[50px]">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex justify-center text-[1.3rem] md:text-[1.0rem] items-center ${loading ? "bg-primary-green/60" : "bg-primary-green hover:bg-primary-green/60"} px-2 py-1 rounded-md text-white w-[250px] h-[45px]`}
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
