import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { useState, useEffect, useRef } from "react"
import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"

const validationSchema = Yup.object({
  userType: Yup.string().required("User type is required"),
  fullName: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(30, "Can be maximum 30 characters")
    .required("Name is a required field"),
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

const RegisterForm = () => {

  const [userType, setUserType] = useState('individual');

  const [showPassword, setShowPassword] = useState(false)
  const passwordTimeoutRef = useRef(null)

  // Handle radio button changes
  const handleRadioChange = (e, setFieldValue) => {
    const value = e.target.value;
    setUserType(value);
    setFieldValue('userType', value);
  };

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
        userType,
        fullName: "",
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
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="md:space-y-3">
          {/* Radio buttons */}
          <div className="mb-6 flex flex-row justify-between xl:justify-start space-x-4 lg:space-x-10">
            <div
              className={`flex items-center rounded-lg p-3 w-[50%] md:w-[49%] xl:w-[40%] h-[42px] md:h-[48px] 
              ${values.userType === "individual" ? "bg-light-green font-medium text-primary-green border border-primary-green" : "border border-gray-1 text-gray-2"}`}
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
                As an Individual
              </label>
            </div>

            <div
              className={`flex items-center border rounded-lg p-3 w-[55%] xl:w-[40%] h-[42px] md:h-[48px] 
              ${values.userType === "organisation" ? "bg-light-green text-primary-green font-medium border-primary-green" : "border-gray-1 text-gray-2"}`}
            >
              <Field
                type="radio"
                id="organisation"
                name="userType"
                value="organisation"
                onChange={(e) => handleRadioChange(e, setFieldValue)}
                className="accent-primary-green"
              />
              <label
                htmlFor="organisation"
                className="text-[0.9rem] md:text-[0.75rem] lg:text-[1rem] cursor-pointer w-full p-2"
              >
                As an Organisation
              </label>
            </div>
          </div>

          {/* Full Name/Organisation */}
          <div>
            <p className="text-gray-2 text-[0.875rem] md:text-[1rem]">
              {values.userType === "individual" ? "Full Name" : "Organisation Name"}
            </p>
            <Field
              type="text"
              name="fullName"
              placeholder={
                values.userType === "individual"
                  ? "Enter your full name"
                  : "Enter organisation name"
              }
              className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
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
            <p className="text-gray-2 text-[0.875rem] md:text-[1rem]">Email</p>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email address"
              className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
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
                className={`w-full border rounded-lg text-[1rem] placeholder-gray-2 p-3 h-[42px] md:h-[48px] focus:outline-none focus:border-primary-green 
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
              className="w-full bg-primary-green text-white text-[1rem] py-3 mt-3 rounded-lg  focus:outline-none"
            >
              Create Account
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-2">Already have an account?</span>
              <Link to="/login" className="ml-1 text-primary-green font-semibold underline">
                Login
              </Link>
            </div>


            {values.userType === "individual" && (
              <div className="flex flex-col items-center">
            <div className="flex items-center my-4">
              <div className="flex-1 border-t w-[300px] border-gray-2"></div>
              <p className="text-gray-2 text-[0.875rem] text-center mx-5">or</p>
              <div className="flex-1 border-t border-gray-2"></div>
            </div>

            <button className="flex items-center justify-center w-[60%] md:w-auto text-gray-2 text-sm md:text-base py-3 px-4 rounded-lg border border-gray-1 hover:bg-gray-100 transition-all duration-300 ease-in-out">
              <FcGoogle className="text-xl md:text-2xl mr-2" />
              Continue with Google
            </button>
            </div>
            )}


            {/* Terms and Conditions */}
            <p className="text-[0.75rem] mt-5 text-gray-2 text-center">
            By continuing, you agree to the {" "}
              <Link to="/terms" className="text-primary-green underline font-semibold">
                Terms of Service
              </Link>{" "} 
              <br />
              and acknowledge you’ve read our{" "}
              <Link to="/privacy" className="text-primary-green underline font-semibold">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
