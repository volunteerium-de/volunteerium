import { useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/ui/Sidebar/Sidebar"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineVisibility, MdOutlineSecurity } from "react-icons/md"
import ProfileSettings from "../components/UserSettings/ProfileSettings"
import SecuritySettings from "../components/UserSettings/SecuritySettings"
import VisibilitySettings from "../components/UserSettings/VisibilitySettings"

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("organizedEvents")

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

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar
          items={menuItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentUser={{}}
          onEditAvatar={true}
        />
        <div className="flex-1 p-5">{renderContent()}</div>
      </div>
    </div>
  )
}

export default UserSettings
