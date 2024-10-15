// src/components/ResetPassword/ResetPasswordForm.jsx

import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { IoIosArrowBack } from "react-icons/io"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/logo.png"
import useAxios from "../../../hooks/useAxios"
import toastNotify from "../../../utils/toastNotify"

const ResetPasswordForm = ({ identifier, email }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const axiosWithPublic = useAxios()

  const resetNewPassword = async (newPassword) => {
    if (email && identifier) {
      try {
        const { data } = await axiosWithPublic.post(`auth/reset/${identifier}`, {
          email,
          password: newPassword,
        })
        // console.log(data)
        toastNotify("success", data.message)
        navigate("/login")
      } catch (error) {
        toastNotify("error", error.response?.data?.message)
      }
    } else {
      toastNotify("error", "Reset password failed. Please try again!")
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  // Form validation using Formik and Yup
  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: Yup.object({
      // Password validation rules
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .max(16, "Password cannot be longer than 16 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one digit")
        .matches(
          /[\W_]/,
          "Password must contain at least one special character (e.g., @, #, $, etc.)"
        )
        .required("New Password is a required field"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is a required field"),
    }),
    onSubmit: (values) => {
      // console.log(values)
      resetNewPassword(values.newPassword)
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-start space-y-6 p-6 w-full max-w-[44.18rem] bg-white dark:bg-black rounded-lg relative"
    >
      {/* Mobile & Desktop - Back Arrow and "Back to Login" */}
      <div
        className="flex items-center space-x-1 cursor-pointer justify-start absolute md:relative top-[-1.25rem] left-[0.06rem]"
        onClick={() => navigate("/login")}
      >
        <IoIosArrowBack className="text-2xl text-black dark:text-white" />
        <span className="text-lg font-semibold text-black dark:text-white">Back to login</span>
      </div>

      {/* Mobile View - Centered Logo */}
      <div className="md:hidden w-full flex justify-center mb-6 mt-[5rem]">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
      </div>

      {/* Title and Description */}
      <div className="w-full">
        <h1 className="text-left text-[1.5rem] md:text-[2rem] font-semibold text-black dark:text-white leading-tight mb-4">
          Reset your password
        </h1>
        <p className="text-left w-full text-[1rem] md:text-[1.125rem] font-normal text-dark-gray-1 dark:text-white leading-snug">
          Your previous password has been reset. Please set a new password to regain access to your
          account.
        </p>
      </div>

      {/* New Password Field */}
      <div className="w-full">
        <p className="text-gray-2 text-[1rem] md:text-[0.875rem] lg:text-[1rem] font-medium mb-1 dark:text-white">
          New Password
        </p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            placeholder="Enter your new password"
            className={`w-full border dark:border-white rounded-lg text-[1rem] placeholder-dark-gray-1 dark:placeholder-white p-3 h-[2.625rem] md:h-[3rem] focus:outline-none focus:border-primary-green 
              ${formik.touched.newPassword && formik.errors.newPassword ? "border-red" : "border-gray-1"}`}
          />
          <div className="absolute inset-y-0 text-primary-green dark:text-light-green right-3 pr-3 flex items-center text-2xl cursor-pointer">
            {showPassword ? (
              <MdVisibilityOff onClick={togglePasswordVisibility} />
            ) : (
              <MdVisibility onClick={togglePasswordVisibility} />
            )}
          </div>
        </div>
        <div className="h-[1.25rem]">
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-[0.875rem]">{formik.errors.newPassword}</p>
          )}
        </div>
      </div>

      {/* Confirm New Password Field */}
      <div className="w-full">
        <p className="text-gray-2 text-[1rem] md:text-[0.875rem] lg:text-[1rem] font-medium mb-1 dark:text-white">
          Confirm New Password
        </p>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="Confirm your new password"
            className={`w-full border dark:border-white rounded-lg text-[1rem] placeholder-dark-gray-1 dark:placeholder-white p-3 h-[2.625rem] md:h-[3rem] focus:outline-none focus:border-primary-green 
              ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red" : "border-gray-1"}`}
          />
          <div className="absolute inset-y-0 text-primary-green dark:text-light-green right-3 pr-3 flex items-center text-2xl cursor-pointer">
            {showConfirmPassword ? (
              <MdVisibilityOff onClick={toggleConfirmPasswordVisibility} />
            ) : (
              <MdVisibility onClick={toggleConfirmPasswordVisibility} />
            )}
          </div>
        </div>
        <div className="h-[1.25rem]">
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-[0.875rem]">{formik.errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <button
        type="submit"
        className="bg-primary-green text-white w-full max-w-[44.18rem] h-[2.8125rem] rounded-lg hover:bg-dark-green transition duration-300 text-center"
      >
        Reset
      </button>
    </form>
  )
}

export default ResetPasswordForm
