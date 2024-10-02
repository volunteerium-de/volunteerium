import { FaUser, FaBars } from "react-icons/fa"
import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect, useRef } from "react"
import LanguageSwitcher from "./LanguageSwitcher"
import { useNavigate } from "react-router-dom/dist"
import { useSelector } from "react-redux"
import useTheme from "../../hooks/useTheme"

const UserMenu = ({ user, profileImage }) => {
  const mode = useSelector((state) => state.theme.mode)
  const { toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Closing the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center justify-center border-2 dark:border-gray-2 border-primary-green dark:border-primary-white rounded-full p-2 cursor-pointer"
        onClick={toggleMenu}
      >
        {/* Menu Icon */}
        <FaBars className="text-primary-green dark:text-gray-2  h-5 w- mr-2" />

        {/* Profile Icon or User Image */}
        {false ? (
          <img
            src={profileImage}
            alt={user ? user.name : "User"}
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <FaUser className="text-primary-green dark:text-gray-2 h-5 w-5" />
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-gray-3  text-dark-gray-2 dark:text-white border border-light-green dark:border-gray-2 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="mt-2">
              {user ? (
                <>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("")}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("")}
                  >
                    Event Management
                  </button>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("")}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </>
              )}

              {/* Divider Line */}
              <div className="border-b border-light-green dark:border-gray-2  my-2"></div>

              {/* Theme Toggle Button */}
              <button
                className="flex items-center w-full text-left p-1 hover:text-primary-green"
                onClick={toggleTheme}
              >
                {/* Switch icon based on the choosen theme */}
                {mode === "dark" ? (
                  <>
                    <FiMoon className="mr-2" /> Dark
                  </>
                ) : (
                  <>
                    <FiSun className="mr-2" /> Light
                  </>
                )}
              </button>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
