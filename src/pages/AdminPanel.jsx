import { useState, useEffect } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/ui/Sidebar/Sidebar"
import { FaCalendar } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { FaUsersGear } from "react-icons/fa6"
import { MdEmail, MdReportProblem } from "react-icons/md"
import EventsPanel from "../components/EventManagement/AdminPanel/events/EventsPanel"
import UsersPanel from "../components/EventManagement/AdminPanel/users/UsersPanel"
import ContactPanel from "../components/EventManagement/AdminPanel/contacts/ContactPanel"
import ReportsPanel from "../components/EventManagement/AdminPanel/reports/ReportsPanel"
import useAdminCall from "../hooks/useAdminCall"
import SingleEventPanel from "../components/EventManagement/AdminPanel/events/SingleEventPanel"
import SingleUserPanel from "../components/EventManagement/AdminPanel/users/SingleUserPanel"
import SingleContactPanel from "../components/EventManagement/AdminPanel/contacts/SingleContactPanel"
import SingleReportPanel from "../components/EventManagement/AdminPanel/reports/SingleReportPanel"

const EventManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("events")
  const [contacts, setContacts] = useState([])
  const [reports, setReports] = useState([])
  const [identifier, setIdentifier] = useState(null)
  const { fetchAllData } = useAdminCall()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const tab = queryParams.get("tab")
    const id = queryParams.get("identifier")
    if (tab) setActiveTab(tab)
    if (id) setIdentifier(id)
  }, [location.search])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setIdentifier(null)
    navigate(`?tab=${tab}`)
  }

  useEffect(() => {
    fetchAllData("contacts").then((data) => setContacts(data.data))
    fetchAllData("event-reports").then((data) => setReports(data.data))
  }, [])

  const adminMenuItems = [
    {
      key: "events",
      label: "Events",
      icon: <FaCalendar className="text-2xl mx-auto" />,
    },
    {
      key: "users",
      label: "Users",
      icon: <FaUsersGear className="text-2xl mx-auto" />,
    },
    {
      key: "feedback-contacts",
      label: "Feedback & Contact",
      icon: <MdEmail className="text-2xl mx-auto" />,
    },
    {
      key: "reports",
      label: "Reports",
      icon: <MdReportProblem className="text-2xl mx-auto" />,
    },
  ]

  const renderContent = () => {
    if (identifier) {
      switch (activeTab) {
        case "events":
          return <SingleEventPanel eventId={identifier} setIdentifier={setIdentifier} />
        case "users":
          return <SingleUserPanel userId={identifier} setIdentifier={setIdentifier} />
        case "feedback-contacts":
          return <SingleContactPanel contactId={identifier} setIdentifier={setIdentifier} />
        case "reports":
          return <SingleReportPanel reportId={identifier} setIdentifier={setIdentifier} />
        default:
          return <SingleEventPanel eventId={identifier} setIdentifier={setIdentifier} />
      }
    }

    switch (activeTab) {
      case "events":
        return <EventsPanel />
      case "users":
        return <UsersPanel />
      case "feedback-contacts":
        return <ContactPanel contacts-={contacts} setContacts={setContacts} />
      case "reports":
        return <ReportsPanel reports={reports} setReports={setReports} />
      default:
        return <EventsPanel />
    }
  }

  return (
    <>
      <Header />
      <div className="flex max-w-[1800px] mx-auto">
        <Sidebar
          items={adminMenuItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          contacts={contacts}
          reports={reports}
        />
        <div className="flex-1 my-3 me-3 p-[10px] md:p-[30px] bg-light-gray dark:bg-dark-gray-3 rounded-lg">
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default EventManagement
