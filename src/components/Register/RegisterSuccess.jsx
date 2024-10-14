import EmailVerify from "../../assets/EmailVerification.png"
import Header from "../Header/Header"

const RegisterSuccess = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-[1440px] mx-auto font-poppins">
        <div className="flex flex-col md:flex-row items-center justify-between rounded-lg mx-auto w-full">
          {/* Left Side (Image) */}
          <div className="flex flex-col justify-center items-center w-[45%] sm:md:h-[85vh]  mt-6 md:bg-light-green mx-2 md:mx-4 lg:mx-8 overflow-hidden rounded-lg md:border">
            <img
              src={EmailVerify}
              alt="Email Verification"
              className="w-[200px] md:w-[400px] h-auto object-contain"
            />
          </div>

          {/* Rİght Side - Text */}
          <div className="max-w-full w-[760px] text-center flex flex-col justify-center p-8">
            <h1 className="text-black text-[1.25rem]  lg:text-[1.75rem] font-semibold">
              Verify Your Email Address
            </h1>
            <p className="text-dark-gray-1 text-[1rem] mt-4">
              We’ve sent a confirmation email to your email. <br />
              Please check your inbox and click the link to verify your email address. <br /> <br />
            </p>
            <p className="text-dark-green text-[1rem] mt-6">
              Didn’t receive the email? Be sure to check your spam folder or resend the email.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterSuccess
