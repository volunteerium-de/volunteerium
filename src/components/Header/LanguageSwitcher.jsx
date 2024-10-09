import { TbWorld } from "react-icons/tb"
import { FiChevronRight } from "react-icons/fi"
import { useState } from "react"

const LanguageMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState("English")

  // Toggle the language menu
  const toggleLanguageMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Select language function
  const selectLanguage = (lang) => {
    setLanguage(lang)
    setIsMenuOpen(false) // Closing the menu after selection
  }

  return (
    <div className="relative">
      {/* Language button */}
      <button
        className="flex items-center w-full text-left p-1 hover:text-primary-green"
        onClick={toggleLanguageMenu}
      >
        <TbWorld className="mr-2" />
        {language}
        {isMenuOpen && <FiChevronRight className="ml-2" />}
      </button>

      {/* Dropdown menu for language selection */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg z-10">
          <button
            className="block w-full text-left p-1 hover:text-primary-green"
            onClick={() => selectLanguage("English")}
          >
            English
          </button>
          <button
            className="block w-full text-left p-1 hover:text-primary-green"
            onClick={() => selectLanguage("Deutsch")}
          >
            Deutsch
          </button>
        </div>
      )}
    </div>
  )
}

export default LanguageMenu
