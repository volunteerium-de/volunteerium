import AvatarEditModal from "../components/UserSettings/AvatarEditModal"
import Header from "../components/Header/Header"
import Sidebar from "../components/ui/Sidebar/Sidebar"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineVisibility, MdOutlineSecurity } from "react-icons/md"
import ProfileSettings from "../components/UserSettings/ProfileSettings"
import SecuritySettings from "../components/UserSettings/SecuritySettings"
import VisibilitySettings from "../components/UserSettings/VisibilitySettings"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"

const UserSettings = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)
  const isAdmin = currentUser.userType === "admin"
  const [activeTab, setActiveTab] = useState(isAdmin ? "security" : "profile")
  const [isModalOpen, setModalOpen] = useState(false)
  const menuItems = [
    {
      key: "profile",
      label: t(translations.userSettings.profile),
      icon: <IoSettingsOutline className="text-2xl mx-auto" />,
    },
    {
      key: "security",
      label: t(translations.userSettings.security),
      icon: <MdOutlineSecurity className="text-2xl mx-auto" />,
    },
    {
      key: "visibility",
      label: t(translations.userSettings.visibility),
      icon: <MdOutlineVisibility className="text-2xl mx-auto" />,
    },
  ]
  const filteredMenuItems = isAdmin ? menuItems.filter((item) => item.key !== "profile") : menuItems
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return isAdmin ? <SecuritySettings /> : <ProfileSettings />
      case "security":
        return <SecuritySettings />
      case "visibility":
        return <VisibilitySettings />
      default:
        return isAdmin ? <SecuritySettings /> : <ProfileSettings />
    }
  }
  const handleTabChange = (newTab) => {
    let tab
    if (isAdmin && newTab === "profile") {
      setActiveTab("security")
      tab = "security"
    } else {
      setActiveTab(newTab)
      tab = newTab
    }
    navigate(`?tab=${tab}`)
  }

  const handleEditAvatar = () => {
    setModalOpen(true)
  }

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-[1800px]">
        <div className="flex">
          <Sidebar
            items={filteredMenuItems}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onEditAvatar={handleEditAvatar}
          />
          <div className="flex-1 p-3">{renderContent()}</div>
        </div>
      </div>
      {isModalOpen && (
        <AvatarEditModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          currentUser={currentUser}
          onUpdateAvatar={(newAvatar) => console.log("Avatar updated:", newAvatar)}
        />
      )}
    </div>
  )
}
export default UserSettings
