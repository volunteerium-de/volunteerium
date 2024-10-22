import { TbWorld } from "react-icons/tb"
import { FiChevronRight } from "react-icons/fi"
import { useState } from "react"
import { useTranslation } from "react-i18next";

const LanguageMenu = () => {
  const { i18n } = useTranslation(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Toggle the language menu
  const toggleLanguageMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Select language function
  const selectLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language directly
    setIsMenuOpen(false); // Close the menu after selection
  };

  return (
    <div className="relative">
      {/* Language button */}
      <button
        className="flex items-center w-full text-left p-1 hover:text-primary-green"
        onClick={toggleLanguageMenu}
      >
        <TbWorld className="mr-2" />
        {i18n.language === "en" ? "English" : "Deutsch"}
        {isMenuOpen && <FiChevronRight className="ml-2" />}
      </button>

      {/* Dropdown menu for language selection */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-dark-gray-3 rounded-lg shadow-lg z-10">
          <button
            className="block w-full text-left p-1 hover:text-primary-green"
            onClick={() => selectLanguage("en")}
          >
            English
          </button>
          <button
            className="block w-full text-left p-1 hover:text-primary-green"
            onClick={() => selectLanguage("de")}
          >
            Deutsch
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageMenu
