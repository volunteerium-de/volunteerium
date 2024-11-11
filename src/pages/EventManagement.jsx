import { useState, useEffect } from "react"
import AddEvent from "../components/EventManagement/AddEvent"
import Header from "../components/Header/Header"
import Sidebar from "../components/ui/Sidebar/Sidebar"
import { FaCalendar, FaEnvelope } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import OrganizedEvents from "../components/EventManagement/OrganizedEvents"
import AttendingEvents from "../components/EventManagement/AttendingEvents"
import Messages from "../components/EventManagement/Messages"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const EventManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { conversations } = useSelector((state) => state.chat)
  const { currentUser, loading } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState("organizedEvents")
  const [isAddingEvent, setIsAddingEvent] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tab = queryParams.get("tab")
    if (tab) setActiveTab(tab)
  }, [location.search])

  const handleTabChange = (tab) => {
    setIsAddingEvent(false)
    setActiveTab(tab)
    navigate(`/event-management?tab=${tab}`)
  }

  const getUnreadMessageCount = () => {
    return (conversations || []).reduce((count, conversation) => {
      const unreadMessages = conversation.messageIds.filter(
        (message) => !message.readerIds.includes(currentUser._id)
      )
      return count + unreadMessages.length
    }, 0)
  }

  const unreadMessageCount = getUnreadMessageCount()

  const menuItems = [
    {
      key: "organizedEvents",
      label: "Organized Events",
      icon: <FaCalendar className="text-2xl mx-auto" />,
    },
    {
      key: "attendingEvents",
      label: "Attending Events",
      icon: <FaPeopleGroup className="text-2xl mx-auto" />,
    },
    {
      key: "messages",
      label: "Messages",
      icon: (
        <>
          <FaEnvelope className="text-2xl" />
          {unreadMessageCount > 0 && (
            <span className="absolute top-4 left-16 sm:left-72 md:left-64 w-2 h-2 bg-primary-green rounded-full"></span>
          )}
        </>
      ),
    },
  ]

  const renderContent = () => {
    if (isAddingEvent) return <AddEvent onClose={() => setIsAddingEvent(false)} />

    switch (activeTab) {
      case "organizedEvents":
        return <OrganizedEvents onAddEvent={() => setIsAddingEvent(true)} />
      case "attendingEvents":
        return <AttendingEvents />
      case "messages":
        return (
          <Messages conversations={conversations} currentUser={currentUser} loading={loading} />
        )
      default:
        return <OrganizedEvents onAddEvent={() => setIsAddingEvent(true)} />
    }
  }

  return (
    <>
      <Header />
      <div className="flex max-w-[1800px] mx-auto">
        <Sidebar items={menuItems} activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </>
  )
}

export default EventManagement
