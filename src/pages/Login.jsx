import { IoIosArrowBack } from "react-icons/io"
import signUpImg from "../assets/login-img.png"
import logo from "../assets/logo.png"
import LoginForm from "../components/Login/LoginForm"
import Header from "../components/Header/Header"

const Login = () => {
  return (
    <div>
      {/* Header component */}
      <Header />

      <div className="flex flex-col max-w-full w-[1440px] mx-auto font-poppins dark:bg-black">
        {/* Main Div */}
        <div className="flex flex-col md:flex-row pt-8 max-w-[1440px] justify-center items-center h-full">
          {/* Left side */}
          <div className="hidden md:block  max-w-full md:max-w-[608px] mx-2 md:mx-4 lg:mx-8 mb-8 w-full bg-primary-green overflow-hidden rounded-lg h-[calc(100vh-150px)]">
            <div
              className="flex-grow h-full w-full bg-cover bg-center backdrop-blur-xl relative"
              style={{
                backgroundImage: `url(${signUpImg})`,
                backgroundBlendMode: "overlay",
              }}
            >
              <div className="h-full w-full flex flex-col justify-center px-5 md:px-0 bg-primary-green bg-opacity-60">
                <div className="absolute top-0 left-0 w-full h-full bg-primary-green opacity-[0.4]" />
                <div className="relative text-left ps-6 lg:px-8">
                  <p className="text-white text-[2rem] lg:text-[3rem] leading-8 font-semibold">
                    Reconnect with <br />
                    <span className="text-[3rem] lg:text-[4.125rem] md:leading-none">
                      Community
                    </span>
                  </p>

                  <p className="text-white mt-4 text-[1rem] lg:text-[1.125rem] font-normal">
                    Welcome back to something <b>bigger</b>.<br />
                    <span className="text-[0.8rem] lg:text-[1rem]">
                      Login to continue making <b> a difference</b>.<br />
                      <br />
                    </span>
                    <b> We’re glad to have you with us!</b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-grow flex flex-col justify-center my-auto p-4 md:px-8">
            {/* ArrowBack Icon and Logo for Mobile Design */}
            <div className="md:hidden flex flex-col items-center mb-6">
              <IoIosArrowBack className="text-black text-3xl cursor-pointer self-start" />
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>

            <div className="flex-grow">
              <h1 className="text-black dark:text-white text-[1.75rem] text-center md:text-center md:text-[2rem] font-semibold mb-6">
                Sign In
              </h1>

              {/* RegisterForm Component */}
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
