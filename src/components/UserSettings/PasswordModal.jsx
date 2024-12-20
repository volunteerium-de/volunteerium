import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import useAccountCall from "../../hooks/useAccountCall"
import { ImSpinner9 } from "react-icons/im"
import { useSelector } from "react-redux"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const PasswordModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const { updateUser } = useAccountCall()
  const { loading } = useSelector((state) => state.auth)

  // State for toggling password visibility
  const [showOldPassword, setShowOldPassword] = useState(false) // Added for old password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t(translations.yup.required.oldPassword)),
    password: Yup.string()
      .required(t(translations.yup.required.password))
      .min(8, t(translations.yup.minLength.characters8)),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t(translations.yup.password.match))
      .required(t(translations.yup.required.confirmPassword)),
  })

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Current Password:", values.oldPassword)
      console.log("New Password:", values.password)
      await updateUser({
        oldPassword: values.oldPassword,
        password: values.password,
      })
      onClose()
    },
  })

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-50 backdrop-blur-sm ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="max-w-full sm:w-[600px] w-[290px] sm:h-[400px] h-[400px] font-Poppins p-[30px] text-black rounded-[8px] bg-white dark:bg-dark-gray-3 dark:text-white shadow-2xl">
        <h1 className="text-center mb-[20px] font-semibold sm:text-[1rem] text-[0.9rem] ">
          {t(translations.pswModal.changePsw)}
        </h1>
        <hr className="border-gray-1" />
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-[20px]">
            <div className="flex flex-col gap-3">
              {/* Current Password Field */}
              <div className="relative flex flex-col sm:flex-row justify-between items-center gap-[3px] mt-[10px]">
                <p className="sm:text-[0.9rem] text-[0.8rem]">{t(translations.pswModal.currPsw)}</p>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    placeholder="*********"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`h-[36px] md:w-[300px] border ${
                      formik.touched.oldPassword && formik.errors.oldPassword
                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                        : "border-gray-1 focus:ring-2  focus:ring-primary-green"
                    } focus:ring-2 text-dark-gray-1 p-2 rounded focus:outline-none`}
                  />
                  <div
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute top-2 right-2 cursor-pointer text-dark-gray-2"
                  >
                    {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <p className="absolute left-1/2 transform -translate-x-1/2 -bottom-5 w-[200px] sm:w-auto sm:left-auto sm:right-0 sm:translate-x-0 sm:transform-none text-red-500 text-xs text-center">
                    {formik.errors.oldPassword}
                  </p>
                ) : null}
              </div>

              {/* New Password Field */}
              <div className="relative flex flex-col sm:flex-row text-center md:text-left justify-between items-center gap-[3px] mt-[15px]">
                <p className="sm:text-[0.9rem] text-[0.8rem]">{t(translations.pswModal.newPsw)}</p>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="*********"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`h-[36px] md:w-[300px] border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                        : "border-gray-1 focus:ring-2  focus:ring-primary-green"
                    } focus:ring-2  text-dark-gray-1 p-2 rounded focus:outline-none`}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2 right-2 cursor-pointer text-dark-gray-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <p className="absolute left-1/2 transform -translate-x-1/2 -bottom-5 w-[200px] sm:w-auto sm:left-auto sm:right-0 sm:translate-x-0 sm:transform-none text-red-500 text-xs text-center">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>

              {/* Confirm Password Field */}
              <div className="relative flex flex-col sm:flex-row text-center md:text-left justify-between items-center gap-[3px] mt-[15px]">
                <p className="sm:text-[0.9rem] text-[0.8rem]">
                  {t(translations.pswModal.confirmPsw)}
                </p>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="*********"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`h-[36px] md:w-[300px] border ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                        : "border-gray-1 focus:ring-2  focus:ring-primary-green"
                    } focus:ring-2 text-dark-gray-1 p-2 rounded focus:outline-none`}
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-2 right-2 cursor-pointer text-dark-gray-2"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <p className="absolute left-1/2 transform -translate-x-1/2 -bottom-5 w-[200px] sm:w-auto sm:left-auto sm:right-0 sm:translate-x-0 sm:transform-none text-red-500 text-xs text-center">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <div className="flex justify-center gap-3 mt-[40px] ">
                <button
                  type="button"
                  className="text-primary-green text-[0.8rem] sm:text-[0.9rem]"
                  onClick={onClose}
                >
                  {t(translations.pswModal.cancel)}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex justify-center items-center ${
                    loading ? "bg-light-green" : "bg-primary-green"
                  } rounded-md text-white w-[70px] h-[25px] sm:w-[100px] sm:h-[35px] sm:text-[0.9rem] text-[0.8rem] hover:bg-dark-green`}
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin" />
                  ) : (
                    t(translations.pswModal.saveChng)
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

export default PasswordModal
