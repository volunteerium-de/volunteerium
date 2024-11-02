import { useState } from "react"
import AvatarEditModal from "../components/UserSettings/AvatarEditModal"
import Header from "../components/Header/Header"
import Sidebar from "../components/ui/Sidebar/Sidebar"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineVisibility, MdOutlineSecurity } from "react-icons/md"
import ProfileSettings from "../components/UserSettings/ProfileSettings"
import SecuritySettings from "../components/UserSettings/SecuritySettings"
import VisibilitySettings from "../components/UserSettings/VisibilitySettings"
import { useSelector } from "react-redux"

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("organizedEvents")
  const [isModalOpen, setModalOpen] = useState(false)
  const { currentUser } = useSelector((state) => state.auth)

  const menuItems = [
    {
      key: "profile",
      label: "Profile",
      icon: <IoSettingsOutline className="text-2xl mx-auto" />,
    },
    {
      key: "security",
      label: "Security",
      icon: <MdOutlineSecurity className="text-2xl mx-auto" />,
    },
    {
      key: "visibility",
      label: "Visibility",
      icon: <MdOutlineVisibility className="text-2xl mx-auto" />,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />
      case "security":
        return <SecuritySettings />
      case "visibility":
        return <VisibilitySettings />
      default:
        return <ProfileSettings />
    }
  }

  const handleEditAvatar = () => {
    setModalOpen(true)
  }

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-[1800px]">
        <div className="flex mx-auto max-w-[1440px] ">
          <Sidebar
            items={menuItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
