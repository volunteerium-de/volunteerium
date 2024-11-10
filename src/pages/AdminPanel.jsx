import { useState, useEffect } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/ui/Sidebar/Sidebar"
import { FaCalendar } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { FaUsersGear } from "react-icons/fa6"
import { MdEmail, MdReportProblem } from "react-icons/md"
import EventsPanel from "../components/AdminPanel/events/EventsPanel"
import UsersPanel from "../components/AdminPanel/users/UsersPanel"
import ContactPanel from "../components/AdminPanel/contacts/ContactPanel"
import ReportsPanel from "../components/AdminPanel/reports/ReportsPanel"
import useAdminCall from "../hooks/useAdminCall"
import SingleEventPanel from "../components/AdminPanel/events/SingleEventPanel"
import SingleUserPanel from "../components/AdminPanel/users/SingleUserPanel"
import SingleContactPanel from "../components/AdminPanel/contacts/SingleContactPanel"
import SingleReportPanel from "../components/AdminPanel/reports/SingleReportPanel"
import SingleFeedbackPanel from "../components/AdminPanel/feedbacks/SingleFeedbackPanel"
import { SiImessage } from "react-icons/si"
import FeedbacksPanel from "../components/AdminPanel/feedbacks/FeedbacksPanel"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"

const AdminPanel = () => {
  const {t} = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("events")
  const [contacts, setContacts] = useState([])
  const [reports, setReports] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
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
    fetchAllData("event-feedbacks").then((data) => setFeedbacks(data.data))
  }, [])

  const adminMenuItems = [
    {
      key: "events",
      label: t(translations.adminPanelPage.eventLabel),
      icon: <FaCalendar className="text-2xl mx-auto" />,
    },
    {
      key: "users",
      label: t(translations.adminPanelPage.userLabel),
      icon: <FaUsersGear className="text-2xl mx-auto" />,
    },
    {
      key: "contacts",
      label: t(translations.adminPanelPage.contactLabel),
      icon: <MdEmail className="text-2xl mx-auto" />,
    },
    {
      key: "feedbacks",
      label: t(translations.adminPanelPage.feedbackLabel),
      icon: <SiImessage className="text-2xl mx-auto" />,
    },
    {
      key: "reports",
      label: t(translations.adminPanelPage.reportLabel),
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
        case "contacts":
          return <SingleContactPanel contactId={identifier} setIdentifier={setIdentifier} />
        case "reports":
          return <SingleReportPanel reportId={identifier} setIdentifier={setIdentifier} />
        case "feedbacks":
          return <SingleFeedbackPanel feedbackId={identifier} setIdentifier={setIdentifier} />
        default:
          return <SingleEventPanel eventId={identifier} setIdentifier={setIdentifier} />
      }
    }

    switch (activeTab) {
      case "events":
        return <EventsPanel />
      case "users":
        return <UsersPanel />
      case "contacts":
        return <ContactPanel />
      case "reports":
        return <ReportsPanel />
      case "feedbacks":
        return <FeedbacksPanel />
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
          feedbacks={feedbacks}
        />
        <div className="flex-1 my-3 me-3 p-[10px] max-w-[calc(100vw-85px)] sm:max-w-[calc(100vw-280px)] w-auto md:p-[30px] bg-light-gray dark:bg-dark-gray-3 rounded-lg">
          {renderContent()}
        </div>
      </div>
    </>
  )
}

export default AdminPanel
