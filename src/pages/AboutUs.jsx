import React from "react"
import backgroundImage from "../assets/about-us-hero.jpg"
import eventsImage from "../assets/about-events.png"
import handshakeImage from "../assets/hand-image.jpg"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"

const AboutUs = () => {
  const { t } = useTranslation()
  return (
    <div>
      <Header />
      <div className="h-auto">
        <main className="font-Poppins mb-5">
          {/* About Hero Area */}
          <section>
            <div className="relative">
              {/* Blur Effect on Background */}
              <div
                className="bg-center bg-cover w-full min-h-[368px] block mx-auto relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                {/* Apply Blur to the Background */}
                <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-[8px] z-[1]" />

                {/* About Us Text Area */}
                <div className="min-h-[368px] mx-auto flex flex-col justify-center gap-10 relative z-[2]">
                  <h1 className="text-[2.25rem] text-white text-center">
                    {t(translations.aboutUs.aboutUs)}
                  </h1>
                  <p className="max-w-[830px] text-[1.5rem] text-white text-center mx-auto">
                    {t(translations.aboutUs.p1)}
                  </p>
                </div>
              </div>

              {/* Who We Are Area */}
              <div className="h-auto w-full mx-auto rounded-lg my-[40px] flex flex-col sm:flex-row items-center justify-center gap-5">
                {/* Left Side Text Section */}
                <div className="max-w-[363px] sm:max-w-[463px] w-full h-auto bg-dark-green text-center text-white rounded-lg p-5 md:transform md:translate-x-[50px] sm:transform sm:translate-x-0">
                  <h2 className="text-[1.25rem] leading-[1.35] font-bold mb-10">
                    {t(translations.aboutUs.h2)}
                  </h2>
                  <p className="text-[1rem] font-medium mb-10">{t(translations.aboutUs.p2)}</p>
                </div>
                {/* Right Side Image Section */}

                <div className="max-w-[262px] sm:max-w-[562px] h-auto w-full">
                  <img
                    src={eventsImage}
                    alt={t(translations.aboutUs.eventAlt)}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Area */}
          <section>
            <div className="w-full min-h-[482px] mx-auto flex flex-col justify-center gap-10 bg-dark-green py-5">
              <h2 className="text-[2.25rem] leading-[0.75] text-center text-white">
                {t(translations.aboutUs.howItWorks)}
              </h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                {/* First Card */}
                <div className="sm:max-w-[408px] max-w-[308px] w-full h-[241px] bg-white rounded-lg p-[30px] text-center">
                  <h1 className="text-[1.5rem] leading-[1.125] font-medium">
                    <span className="text-primary-green">{t(translations.aboutUs.explore)} </span>
                    {t(translations.aboutUs.opportunities)}
                  </h1>
                  <p className="text-[1rem] leading-[1.6875] text-gray-2 mt-4">
                    {t(translations.aboutUs.p3)}
                  </p>
                </div>

                {/* Second Card */}

                <div className="sm:max-w-[408px] max-w-[308px] w-full h-[241px] bg-white rounded-lg p-[30px] text-center">
                  <h1 className="text-[1.5rem] leading-[1.125] font-medium">
                    <span className="text-primary-green">{t(translations.aboutUs.join)}</span>{" "}
                    {t(translations.aboutUs.toVolunteer)}
                  </h1>
                  <p className="text-[1rem] leading-[1.6875] text-gray-2 mt-4">
                    {t(translations.aboutUs.p4)}
                  </p>
                </div>

                {/* Third Card */}

                <div className="sm:max-w-[408px] max-w-[308px] w-full h-[241px] bg-white rounded-lg p-[30px] text-center">
                  <h1 className="text-[1.5rem] leading-[1.125] font-medium">
                    <span className="text-primary-green">{t(translations.aboutUs.make)}</span>{" "}
                    {t(translations.aboutUs.aDifference)}
                  </h1>
                  <p className="text-[1rem] leading-[1.6875] text-gray-2 mt-4">
                    {t(translations.aboutUs.p5)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Community Area */}
          <section>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full min-h-[450px] mx-auto gap-10 my-5">
              <div>
                <img
                  src={handshakeImage}
                  alt={t(translations.aboutUs.handsAlt)}
                  className="max-w-[400px] max-h-[400px] sm:max-w-[500px] sm:max-h-[500px] rounded-lg"
                />
              </div>
              <div className="text-dark-green max-w-[509px] text-center mb-5">
                <h1 className="text-[3rem] font-semibold">
                  <p>{t(translations.aboutUs.join)} </p>{" "}
                  <span className="text-[4.125rem]">{t(translations.aboutUs.volunteerium)}</span>
                  <span> {t(translations.aboutUs.today)}</span>
                </h1>
                <p className="text-[1.25rem]">
                  {t(translations.aboutUs.p6)}
                  <span className="font-bold">{t(translations.aboutUs.p7)}</span>
                  {t(translations.aboutUs.p8)}
                  <span className="font-bold">{t(translations.aboutUs.p9)}</span>
                </p>
              </div>
            </div>
          </section>

          {/* Number of Volunteers Area */}
          <section>
            <div className="w-full h-auto mx-auto flex flex-col gap-[10px] sm:flex-row justify-around items-center bg-dark-green p-5 py-10">
              {/* Volunteers Card */}
              <div className="max-w-[283px] h-[142px] w-full bg-white rounded-3xl text-center p-5">
                <p className="font-medium text-[2.125rem] leading-[0.7941] mt-2">
                  {t(translations.aboutUs.volCardP1)}
                </p>
                <p className="text-[2rem] leading-[0.8437] mt-5">
                  {t(translations.aboutUs.volCardP2)}
                </p>
              </div>

              {/* Organizations Card */}
              <div className="max-w-[283px] h-[142px] w-full bg-white rounded-3xl text-center p-5">
                <p className="font-medium text-[2.125rem] leading-[0.7941] mt-2">
                  {t(translations.aboutUs.orgCardP1)}
                </p>
                <p className="text-[2rem] leading-[0.8437] mt-5">
                  {t(translations.aboutUs.orgCardP2)}
                </p>
              </div>

              {/* Events Card */}
              <div className="max-w-[283px] h-[142px] w-full bg-white rounded-3xl text-center p-5">
                <p className="font-medium text-[2.125rem] leading-[0.7941] mt-2">
                  {t(translations.aboutUs.eventCardP1)}
                </p>
                <p className="text-[2rem] leading-[0.8437] mt-5">
                  {t(translations.aboutUs.eventCardP2)}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
