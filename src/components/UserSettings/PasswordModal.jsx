import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import useAccountCall from "../../hooks/useAccountCall"
import { ImSpinner9 } from "react-icons/im"
import { useSelector } from "react-redux"

const PasswordModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const { updateUser } = useAccountCall()
  const { loading } = useSelector((state) => state.auth)

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t(translations.pswModal.yup1)),
    password: Yup.string()
      .required(t(translations.pswModal.yup2))
      .min(8, t(translations.pswModal.yup3)),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t(translations.pswModal.yup4))
      .required(t(translations.pswModal.yup5)),
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
      <div className="max-w-full sm:w-[600px] w-[350px] sm:h-[400px] h-[450px] font-Poppins p-[50px] text-black rounded-[8px] bg-white dark:bg-dark-gray-3 dark:text-white shadow-2xl">
        <h1 className="text-center mb-[20px] font-bold">{t(translations.pswModal.changePsw)}</h1>
        <hr className="border-gray-1" />
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-[20px]">
            <div className="flex flex-col gap-3">
              {/* Current Password Field */}
              <div className="relative flex flex-col sm:flex-row justify-between items-center gap-[3px] mt-[10px]">
                <p className="text-[0.80rem]">{t(translations.pswModal.currPsw)}</p>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="*********"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[36px] md:w-[300px] border ${
                    formik.touched.oldPassword && formik.errors.oldPassword
                      ? "border-danger"
                      : "border-gray-1"
                  } focus:ring-2 focus:ring-primary-green text-dark-gray-1 p-2 border border-gray-1 rounded h-[100px] focus:outline-none `}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                  <p className="absolute right-[20%] sm:right-0 -bottom-5 text-danger dark:text-primary-green text-xs sm:text-right text-center">
                    {formik.errors.oldPassword}
                  </p>
                ) : null}
              </div>

              {/* New Password Field */}
              <div className="relative flex flex-col sm:flex-row text-center md:text-left  justify-between items-center gap-[3px] mt-[15px]">
                <p className="text-[0.80rem]">{t(translations.pswModal.newPsw)}</p>
                <input
                  type="password"
                  name="password"
                  placeholder="*********"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[36px] md:w-[300px] border ${
                    formik.touched.password && formik.errors.password
                      ? "border-danger"
                      : "border-gray-1"
                  } focus:ring-2 focus:ring-primary-green text-dark-gray-1 p-2 border border-gray-1 rounded h-[100px] focus:outline-none`}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="absolute right-[20%] sm:right-0 -bottom-5 text-danger dark:text-primary-green text-xs sm:text-right text-center">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              {/* Confirm Password Field */}
              <div className="relative flex flex-col sm:flex-row text-center md:text-left justify-between items-center gap-[3px] mt-[15px]">
                <p className="text-[0.80rem]">{t(translations.pswModal.confirmPsw)}</p>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="*********"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`h-[36px] md:w-[300px] border ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? "border-danger"
                      : "border-gray-1"
                  } focus:ring-2 focus:ring-primary-green text-dark-gray-1 p-2 border border-gray-1 rounded h-[100px] focus:outline-none`}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <p className="absolute right-[20%] sm:right-0 -bottom-5 text-danger dark:text-primary-green text-xs sm:text-right text-center">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
              <div className="flex justify-center gap-3 mt-[50px]">
                <button type="button" className="text-primary-green " onClick={onClose}>
                  {t(translations.pswModal.cancel)}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex justify-center items-center ${loading ? "bg-primary-green/60" : "bg-primary-green"} px-2 py-1 rounded-md text-white w-[150px] h-[32px]`}
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
