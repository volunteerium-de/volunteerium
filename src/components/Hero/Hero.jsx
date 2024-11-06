import { useTranslation } from "react-i18next"
import SearchBar from "./SearchBar"
import { translations } from "../../locales/translations"

const Hero = () => {
  const { t } = useTranslation()

  return (
    <div className="relative font-poppins h-[225px] sm:h-[425px]">
      <div className="relative w-full h-[225px] sm:h-[425px]">
        <img
          className="w-full h-full object-cover"
          src="/src/assets/hero-bg.jpg"
          alt="Homepage hero background image"
        />
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>
      </div>
      <div className="absolute inset-0 bottom-10 sm:bottom-28 flex items-center justify-center">
        <h2 className="relative text-white text-[1.7rem] sm:text-[2rem] transform -translate-y-16">
          {t(translations.heroSection.h2)}
          <span className="absolute font-bad-script top-6 sm:top-8 -right-0 sm:-right-5 bad-script-regular text-[2.5rem]">
            {t(translations.heroSection.span)}
          </span>
        </h2>
      </div>
      <SearchBar />
    </div>
  )
}

export default Hero
