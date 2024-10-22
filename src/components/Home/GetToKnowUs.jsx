import React from "react"
import sectionPhoto from "../../assets/get-to-know-us.png"
import { translations } from "../../locales/translations";
import { useTranslation } from "react-i18next";
const GetToKnowUs = () => {

  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto p-6 my-10 bg-dark-green font-poppins">
      {/* Section Title */}
      <h2 className="text-center text-[2rem] sm:text-[3.5rem] font-semibold text-white mb-6">
      {t(translations.getToKnowUs.h2)}

      </h2>
      {/* Content Container */}
      <div className=" flex flex-wrap justify-center mx-auto gap-12 ">
        {/* Left side - Paragraph */}
        <div className="min-[600px]:basis-[500px] min-[600px]:shrink-0">
          <p className="text-center min-[1100px]:text-right text-white text-[1rem] leading-relaxed ">
          {t(translations.getToKnowUs.description1)}
            <br />
            <br />
            {t(translations.getToKnowUs.description2)}
            <br />
            <br />
            {t(translations.getToKnowUs.description3)}
          </p>
        </div>
        {/* Right side - Image */}
        <img
          src={sectionPhoto}
          alt= {t(translations.getToKnowUs.imageAlt)}
          className="object-cover rounded-lg shadow-lg "
        />
      </div>
    </section>
  )
}
export default GetToKnowUs
