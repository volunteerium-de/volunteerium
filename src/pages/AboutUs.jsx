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
      <div className="h-auto ">
        <main className="mb-5">
          {/* About Hero Area */}
          <section>
            <div className="relative">
              {/* Background Image with Blur Effect */}
              <div
                className="bg-center bg-cover w-full min-h-[200px] sm:min-h-[368px] block mx-auto relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-[8px] z-[1]" />

                {/* About Us Text */}
                <div className="min-h-[200px] sm:min-h-[368px] mx-auto flex flex-col justify-center gap-5 sm:gap-10 relative z-[2] px-5">
                  <h1 className="text-[1.75rem] sm:text-[2.25rem] text-white text-center">
                    {t(translations.aboutUs.aboutUs)}
                  </h1>
                  <p className="max-w-[830px] text-[1rem] sm:text-[1.5rem] text-white text-center mx-auto">
                    {t(translations.aboutUs.p1)}
                  </p>
                </div>
              </div>

              {/* Who We Are Section */}
              <div className="w-full mx-auto rounded-lg my-[20px] sm:my-[40px] flex flex-col sm:flex-row items-center justify-center gap-5 px-5">
                {/* Text Section */}
                <div className="w-full max-w-[300px] sm:max-w-[453px] bg-dark-green text-center text-white rounded-lg p-3 sm:transform sm:translate-x-0">
                  <h2 className="text-[1.025rem] sm:text-[1.25rem] font-bold mb-5 sm:mb-10">
                    {t(translations.aboutUs.h2)}
                  </h2>
                  <p className="text-[0.775rem] sm:text-[1rem] font-medium mb-5 sm:mb-10">
                    {t(translations.aboutUs.p2)}
                  </p>
                </div>
                {/* Image Section */}
                <div className="w-full max-w-[262px] sm:max-w-[562px]">
                  <img
                    src={eventsImage}
                    alt={t(translations.aboutUs.eventAlt)}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section>
            <div className="w-full mx-auto flex flex-col justify-center gap-5 sm:gap-10 bg-dark-green py-5 px-5">
              <h2 className="text-[1.75rem] sm:text-[2.25rem] text-center text-white">
                {t(translations.aboutUs.howItWorks)}
              </h2>
              <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
                {/* Cards */}
                {["explore", "join", "make"].map((key, index) => (
                  <div
                    key={index}
                    className="w-full max-w-[300px] min-h-[150px] sm:max-w-[408px] sm:min-h-[250px] bg-white rounded-lg p-[20px] sm:p-[30px] text-center"
                  >
                    <h1 className=" text-[1.25rem] sm:text-[1.5rem] font-medium">
                      <span className="text-primary-green">{t(translations.aboutUs[key])} </span>
                      {t(translations.aboutUs[`${key}Opportunities`])}
                    </h1>
                    <p className="text-[0.875rem] sm:text-[1rem] text-gray-2 mt-4">
                      {t(translations.aboutUs[`p${index + 3}`])}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community Section */}
          <section>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full min-h-[300px] sm:min-h-[450px] mx-auto gap-5 sm:gap-10 my-5 px-5">
              <div className="w-full max-w-[300px] sm:max-w-[400px]">
                <img
                  src={handshakeImage}
                  alt={t(translations.aboutUs.handsAlt)}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="text-dark-green w-full max-w-[509px] text-center mb-5 px-5">
                <h1 className="text-[1.75rem] sm:text-[2rem] font-semibold">
                  <p>{t(translations.aboutUs.join)}</p>
                  <span className="text-[2.5rem] sm:text-[3.125rem]">
                    {t(translations.aboutUs.volunteerium)}
                  </span>
                  <span> {t(translations.aboutUs.today)}</span>
                </h1>
                <p className="text-[1rem] sm:text-[1.25rem]">
                  {t(translations.aboutUs.p6)}
                  <span className="font-bold">{t(translations.aboutUs.p7)}</span>
                  {t(translations.aboutUs.p8)}
                  <span className="font-bold">{t(translations.aboutUs.p9)}</span>
                </p>
              </div>
            </div>
          </section>

          {/* Volunteer Stats Section */}

          <section>
            <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10 justify-center items-center bg-dark-green p-5 py-10">
              {/* Translation Keys for Each Card */}
              {[
                { titleKey: "volCardP1", subtitleKey: "volCardP2" },
                { titleKey: "orgCardP1", subtitleKey: "orgCardP2" },
                { titleKey: "eventCardP1", subtitleKey: "eventCardP2" },
              ].map((card, index) => (
                <div
                  key={index}
                  className="w-full max-w-[300px] h-[142px] bg-white rounded-3xl text-center p-5"
                >
                  {/* Card Title */}
                  <p className="font-medium text-[1.75rem] mt-2">
                    {t(translations.aboutUs[card.titleKey]) || "Default Title"}
                  </p>
                  {/* Card Subtitle */}
                  <p className="text-[1.50rem] mt-5">
                    {t(translations.aboutUs[card.subtitleKey]) || "Default Subtitle"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs
