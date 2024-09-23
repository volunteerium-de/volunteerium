import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useState, useEffect, useRef } from "react"
import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is a required field"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters!")
    .max(30, "Can be maximum 30 characters!")
    .matches(/\d+/, "Must contain at least one digit!")
    .matches(/[a-z]/, "Must contain at least one lowercase letter!")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter!")
    .matches(/[@$?!%&*]+/, "Must contain at least one special character (@$!%*?&)!")
    .required("Password is a required field"),
})

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const passwordTimeoutRef = useRef(null)

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
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form className="md:space-y-3">
          {/* Email */}
          <div>
            <p className="text-gray-2 text-[0.875rem] md:text-[1rem]">Email</p>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email address"
              className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
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
            <p className="text-gray-2 text-[0.875rem] md:text-[1rem]">Password</p>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 dark:placeholder-white p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
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
                <p className="text-red-500 text-[0.875rem]">{errors.password}</p>
              )}
              <Link to='/forgot-password'>
              <p className="text-sm justify-end text-dark-green dark:text-white underline cursor-pointer">
                Forgot your password?
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
              Login
            </button>

            <div className="text-center mt-6">
              <span className="text-gray-2">Do not have an account yet?</span>
              <Link to="/register" className="ml-1 text-primary-green font-semibold underline">
                Sign Up
              </Link>
            </div>

            {/* or and dividers */}
            <div className="flex items-center my-5">
              <div className="flex-1 border-t w-[300px] border-gray-2 dark:border-white"></div>
              <p className="text-gray-2 dark:text-white text-[0.875rem] text-center mx-5">or</p>
              <div className="flex-1 border-t border-gray-2 dark:border-white"></div>
            </div>

            <button className="flex items-center justify-center w-[60%] md:w-auto text-gray-2 dark:text-white text-sm md:text-base py-3 px-4 rounded-lg border border-gray-1 dark:border-white hover:bg-gray-100 transition-all duration-300 ease-in-out">
              <FcGoogle className="text-xl md:text-2xl mr-2" />
              Continue with Google
            </button>

          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
