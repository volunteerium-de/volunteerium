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
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"

const EventManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { conversations } = useSelector((state) => state.chat)
  const { currentUser } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState("organized-events")
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const { t } = useTranslation()
  const [eventToEdit, setEventToEdit] = useState(null)

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
      key: "organized-events",
      label: t(translations.eventManagement.sidebarLabels.organizedEvents),
      icon: <FaCalendar className="text-2xl mx-auto" />,
    },
    {
      key: "attending-events",
      label: t(translations.eventManagement.sidebarLabels.attendingEvents),
      icon: <FaPeopleGroup className="text-2xl mx-auto" />,
      show: currentUser?.userType !== "organization",
    },
    {
      key: "messages",
      label: t(translations.eventManagement.sidebarLabels.messages),
      icon: (
        <>
          <FaEnvelope className="text-2xl" />
          {unreadMessageCount > 0 && (
            <span className="absolute top-4 ml-10 sm:ml-10 md:ml-14 lg:-ml-1 xl:ml-4 2xl:-ml-6 w-2 h-2 bg-primary-green rounded-full"></span>
          )}
        </>
      ),
    },
  ].filter((item) => item.show !== false)

  const renderContent = () => {
    if (isAddingEvent)
      return (
        <AddEvent
          onClose={() => setIsAddingEvent(false)}
          eventData={eventToEdit}
          eventToEdit={eventToEdit}
        />
      )

    switch (activeTab) {
      case "organized-events":
        return (
          <OrganizedEvents
            onAddEvent={() => setIsAddingEvent(true)}
            setEditEvent={setEventToEdit}
          />
        )
      case "attending-events":
        return <AttendingEvents />

      case "messages":
        return <Messages conversations={conversations} currentUser={currentUser} />
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
