import { FaUser, FaBars } from "react-icons/fa"
import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect, useRef } from "react"
import LanguageSwitcher from "./LanguageSwitcher"
import { useNavigate } from "react-router-dom/dist"
import { useSelector } from "react-redux"
import useTheme from "../../hooks/useTheme"
import useAuthCall from "../../hooks/useAuthCall"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { UserAvatar } from "../ui/Avatar/userAvatar"

const UserMenu = ({ user }) => {
  const { t } = useTranslation()
  const mode = useSelector((state) => state.theme.mode)
  const { logout } = useAuthCall()
  const { toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Handle Logout
  const handleLogout = () => {
    logout(true)
    toggleMenu()
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
  const { currentUser } = useSelector((state) => state.auth)

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="flex items-center justify-center border-2 dark:border-gray-2 border-primary-green dark:border-primary-white rounded-full py-1 px-2 cursor-pointer"
        onClick={toggleMenu}
      >
        {/* Menu Icon */}
        <FaBars className="text-primary-green dark:text-gray-2  h-5 w- mr-2" />
        <UserAvatar user={currentUser} size="h-6 w-6" />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-gray-3  text-dark-gray-2 dark:text-white border border-light-green dark:border-gray-2 rounded-lg shadow-lg z-10">
          <div className="p-2">
            <div className="mt-2">
              {user ? (
                <>
                  {user.userType !== "admin" && (
                    <button
                      className="block w-full text-left p-1 hover:text-primary-green"
                      onClick={() => navigate(`/profile/${user._id}`)}
                    >
                      {t(translations.userMenu.profile)}
                    </button>
                  )}
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() =>
                      navigate(`/${user.userType === "admin" ? "admin-panel" : "event-management"}`)
                    }
                  >
                    {user.userType === "admin" ? "Admin Panel" : t(translations.userMenu.eventMng)}
                  </button>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("/settings")}
                  >
                    {t(translations.userMenu.settings)}
                  </button>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={handleLogout}
                  >
                    {t(translations.userMenu.logout)}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("/login")}
                  >
                    {t(translations.userMenu.login)}
                  </button>
                  <button
                    className="block w-full text-left p-1 hover:text-primary-green"
                    onClick={() => navigate("/register")}
                  >
                    {t(translations.userMenu.register)}
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
                {/* Switch icon based on the chosen theme */}
                {mode === "dark" ? (
                  <>
                    <FiSun className="mr-2" /> {t(translations.userMenu.light)}
                  </>
                ) : (
                  <>
                    <FiMoon className="mr-2" /> {t(translations.userMenu.dark)}
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
