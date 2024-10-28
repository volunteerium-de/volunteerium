import { useState, useEffect } from "react"
import AddEvent from "../components/EventManagement/AddEvent"
import Header from "../components/Header/Header"
import Sidebar from "../components/ui/Sidebar/Sidebar"
import { FaCalendar, FaEnvelope } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import OrganizedEvents from "../components/EventManagement/OrganizedEvents"
import AttendedEvents from "../components/EventManagement/AttendedEvents"
import Messages from "../components/EventManagement/Messages"
import { useLocation, useNavigate } from "react-router-dom"

const EventManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("organizedEvents")
  const [isAddingEvent, setIsAddingEvent] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tab = queryParams.get("tab")
    if (tab) setActiveTab(tab)
  }, [location.search])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    navigate(`/event-management?tab=${tab}`)
  }

  const menuItems = [
    {
      key: "organizedEvents",
      label: "Organized Events",
      icon: <FaCalendar className="text-2xl mx-auto" />,
    },
    {
      key: "attendedEvents",
      label: "Attended Events",
      icon: <FaPeopleGroup className="text-2xl mx-auto" />,
    },
    { key: "messages", label: "Messages", icon: <FaEnvelope className="text-2xl mx-auto" /> },
  ]

  const renderContent = () => {
    if (isAddingEvent) return <AddEvent onClose={() => setIsAddingEvent(false)} />

    switch (activeTab) {
      case "organizedEvents":
        return <OrganizedEvents onAddEvent={() => setIsAddingEvent(true)} />
      case "attendedEvents":
        return <AttendedEvents />
      case "messages":
        return <Messages />
      default:
        return <OrganizedEvents onAddEvent={() => setIsAddingEvent(true)} />
    }
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar items={menuItems} activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="flex-1 p-5">{renderContent()}</div>
      </div>
    </div>
  )
}

export default EventManagement
