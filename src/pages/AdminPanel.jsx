import { useState, useEffect, useCallback } from "react"
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
import { debounce } from "../utils/functions"
import SubscriptionsPanel from "../components/AdminPanel/subscriptions/SubscriptionsPanel"
import { PiNewspaperClippingFill } from "react-icons/pi"
import InterestsPanel from "../components/AdminPanel/interests/InterestsPanel"
import { BiSolidCategoryAlt } from "react-icons/bi"
import { translations } from "../locales/translations"
import { useTranslation } from "react-i18next"
import { IoStatsChart } from "react-icons/io5"
import { FaSkull } from "react-icons/fa"
import StatisticsPanel from "../components/AdminPanel/statistics/StatisticsPanel"
import DangerZonePanel from "../components/AdminPanel/dangerZone/DangerZonePanel"

const AdminPanel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(
    new URLSearchParams(location.search).get("tab") || "events"
  )
  const [contacts, setContacts] = useState([])
  const [reports, setReports] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [identifier, setIdentifier] = useState(null)
  const [debouncedActiveTab, setDebouncedActiveTab] = useState(activeTab)
  const [debouncedIdentifier, setDebouncedIdentifier] = useState(identifier)
  const { fetchAllData } = useAdminCall()
  const { t } = useTranslation()

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

  const debouncedSetActiveTab = useCallback(
    debounce((tab) => {
      setDebouncedActiveTab(tab)
    }, 300),
    []
  )

  const debouncedSetIdentifier = useCallback(
    debounce((id) => {
      setDebouncedIdentifier(id)
    }, 300),
    []
  )

  useEffect(() => {
    fetchAllData("contacts").then((data) => setContacts(data.data))
    fetchAllData("event-reports").then((data) => setReports(data.data))
    fetchAllData("event-feedbacks").then((data) => setFeedbacks(data.data))
  }, [])

  useEffect(() => {
    debouncedSetActiveTab(activeTab)
  }, [activeTab, debouncedSetActiveTab])

  useEffect(() => {
    debouncedSetIdentifier(identifier)
  }, [identifier, debouncedSetIdentifier])

  useEffect(() => {
    const handlePopState = () => {
      const queryParams = new URLSearchParams(window.location.search)
      const tab = queryParams.get("tab")
      const id = queryParams.get("identifier")
      if (!id && identifier) {
        setIdentifier(null)
        navigate(`?tab=${tab || "events"}`)
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [identifier, navigate])

  const adminMenuItems = [
    {
      key: "events",
      label: t(translations.adminPanel.events.eventsPanel.title),
      icon: <FaCalendar className="text-2xl mx-auto" />,
    },
    {
      key: "users",
      label: t(translations.adminPanel.users.usersPanel.title),
      icon: <FaUsersGear className="text-2xl mx-auto" />,
    },
    {
      key: "interests",
      label: t(translations.adminPanel.interests.interestsPanel.title),
      icon: <BiSolidCategoryAlt className="text-2xl mx-auto" />,
    },
    {
      key: "contacts",
      label: t(translations.adminPanel.contacts.contactPanel.title),
      icon: <MdEmail className="text-2xl mx-auto" />,
    },
    {
      key: "feedbacks",
      label: t(translations.adminPanel.feedbacks.feedbacksPanel.title),
      icon: <SiImessage className="text-2xl mx-auto" />,
    },
    {
      key: "reports",
      label: t(translations.adminPanel.reports.reportsPanel.title),
      icon: <MdReportProblem className="text-2xl mx-auto" />,
    },
    {
      key: "subscriptions",
      label: t(translations.adminPanel.subscriptions.subscriptionsPanel.title),
      icon: <PiNewspaperClippingFill className="text-2xl mx-auto" />,
    },
    {
      key: "statistics",
      label: t(translations.adminPanel.statistics.statisticsPanel.title),
      icon: <IoStatsChart className="text-2xl mx-auto" />,
    },
    {
      key: "danger-zone",
      label: t(translations.adminPanel.dangerZone.title),
      icon: <FaSkull className="text-2xl mx-auto" />,
    },
  ]

  const renderContent = () => {
    if (debouncedIdentifier) {
      switch (debouncedActiveTab) {
        case "events":
          return <SingleEventPanel eventId={debouncedIdentifier} setIdentifier={setIdentifier} />
        case "users":
          return <SingleUserPanel userId={debouncedIdentifier} setIdentifier={setIdentifier} />
        case "contacts":
          return (
            <SingleContactPanel contactId={debouncedIdentifier} setIdentifier={setIdentifier} />
          )
        case "reports":
          return <SingleReportPanel reportId={debouncedIdentifier} setIdentifier={setIdentifier} />
        case "feedbacks":
          return (
            <SingleFeedbackPanel feedbackId={debouncedIdentifier} setIdentifier={setIdentifier} />
          )
        default:
          return <SingleEventPanel eventId={debouncedIdentifier} setIdentifier={setIdentifier} />
      }
    }

    switch (debouncedActiveTab) {
      case "interests":
        return <InterestsPanel />
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
      case "subscriptions":
        return <SubscriptionsPanel />
      case "statistics":
        return <StatisticsPanel />
      case "danger-zone":
        return <DangerZonePanel />
      default:
        return <EventsPanel />
    }
  }

  return (
    <>
      <Header />
      <div className="flex max-w-[1800px] mx-auto min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-100px)]">
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
