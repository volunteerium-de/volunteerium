import { IoIosArrowBack } from "react-icons/io"
import RegisterForm from "../components/Register/RegisterForm"
import Header from "../components/Header/Header"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"

const Register = () => {
  const { t } = useTranslation()

  return (
    <div>
      <Header />
      <div className="flex flex-col max-w-full w-[1440px] mx-auto  font-poppins">
        {/* Header component */}

        {/* Main Div */}
        <div className="flex flex-col md:flex-row pt-8 max-w-[1440px]justify-center">
          {/* Left side */}
          <div className="hidden md:block max-w-full md:max-w-[608px] mx-2 md:mx-4 lg:mx-8 mb-8 w-full bg-primary-green overflow-hidden rounded-lg h-[780px] ">
            <div
              className="flex-grow h-full w-full bg-cover bg-center backdrop-blur-xl relative"
              style={{
                backgroundImage: `url(${`${import.meta.env.VITE_AWS_URL}login-img.webp`})`,
                backgroundBlendMode: "overlay",
              }}
            >
              <div className="h-full w-full flex flex-col justify-center px-5 md:px-0 bg-primary-green bg-opacity-60">
                <div className="absolute top-0 left-0 w-full h-full bg-primary-green opacity-[0.4]" />
                <div className="relative text-left ps-6 lg:px-8">
                  <p className="text-white text-[1.5rem] lg:text-[3rem] leading-8 font-semibold">
                    {t(translations.register.p1)} <br />
                    <span className="text-[2.5rem] lg:text-[4.125rem] md:leading-none">
                      {t(translations.register.p2)}
                    </span>
                  </p>
                  <p className="text-white mt-4 text-[1rem] lg:text-[1.125rem] font-normal">
                    {t(translations.register.p3)} <b> {t(translations.register.p4)}</b>.<br />
                    <span className="text-[0.8rem] lg:text-[1rem]">
                      {t(translations.register.p5)} <b> {t(translations.register.p6)}</b>.<br />
                      <br />
                    </span>
                    <b> {t(translations.register.p7)} </b>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-grow flex flex-col justify-start p-4 md:p-8 w-full">
            {/* ArrowBack Icon and Logo for Mobile Design */}
            <div className="md:hidden flex flex-col items-center mb-6">
              <IoIosArrowBack className="text-black text-3xl cursor-pointer self-start" />
              <img
                src={`${import.meta.env.VITE_AWS_URL}logo.webp`}
                alt="Logo"
                className="h-16 w-auto"
              />
            </div>

            <div className="flex-grow">
              <h1 className="text-black dark:text-white text-[1.75rem] text-center md:text-left md:text-[2rem] font-semibold mb-6">
                {t(translations.register.createAccount)}
              </h1>
              <p className="text-gray-2 dark:text-white text-[1rem] mb-2">
                {t(translations.register.creatingAs)}
              </p>

              {/* RegisterForm Component */}
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
