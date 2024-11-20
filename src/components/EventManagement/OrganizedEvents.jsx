import { useEffect } from "react"
import { useState } from "react"
import { FaPlus, FaSearch, FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa"
import { useSelector } from "react-redux"
import useEventCall from "../../hooks/useEventCall"
import EventManagementCard from "./EventCard/EventManagementCard"
import ParticipantRequestsModal from "./EventCard/ParticipantRequestsModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"

const OrganizedEvents = ({ onAddEvent, setEditEvent }) => {
  const { currentUser: user } = useSelector((state) => state.auth)
  const [isUpcomingOpen, setIsUpcomingOpen] = useState(true)
  const [isPastOpen, setIsPastOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const { getEvents } = useEventCall()
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [refetch, setRefetch] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { t } = useTranslation()

  const openModal = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setSelectedEvent(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const eventsResponse = await getEvents(
          `events/management?clientId=${user._id}&type=organized-events`
        )
        setEvents(eventsResponse.data)

        setFilteredEvents(eventsResponse.data)

        if (selectedEvent) {
          const updatedSelectedEvent = eventsResponse.data.find((e) => e._id === selectedEvent._id)
          setSelectedEvent(updatedSelectedEvent)
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [refetch])

  const handleRefetch = async () => {
    setRefetch(new Date().getTime())
  }

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase()
    const filtered = events.filter((event) => event.title.toLowerCase().includes(query))
    setFilteredEvents(filtered)
  }

  const handleAddNewEventButton = () => {
    onAddEvent()
    setEditEvent(null)
  }
  const upcomingEvents = filteredEvents?.filter((event) => !event.isDone) || []
  const pastEvents = filteredEvents?.filter((event) => event.isDone) || []

  return loading ? (
    <div className="flex mt-12 items-center justify-center text-primary-green text-md font-semibold">
      <FaSpinner className="animate-spin mr-2" />
      {t(translations.registerForm.loading)}
    </div>
  ) : (
    <div className="mt-3 p-4 max-w-[77vw] min-h-[calc(100vh-116px)] rounded-lg bg-light-gray dark:bg-dark-gray-3 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-primary-green text-[1.5rem] font-semibold">
          {t(translations.eventManagement.organizedEvents)}
        </h2>
        <div className="flex flex-col md:flex-row gap-2">
          <button
            onClick={handleAddNewEventButton}
            className="flex md:text-[0.8rem] text-[0.6rem] px-2 sm:py-1 py-2 items-center border hover:bg-dark-green rounded-lg bg-primary-green text-white"
          >
            <FaPlus className="mr-2" />
            {t(translations.eventManagement.addNewEvent)}
          </button>
          <div className="flex items-center border border-primary-green dark:border-white rounded-lg">
            <FaSearch className="mx-2 text-primary-green dark:text-white" />
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder={t(translations.eventManagement.searchInput)}
              className="text-[0.7rem] py-1 border-none rounded-lg focus:outline-none focus:ring-0  text-primary-green font-medium bg-light-gray dark:bg-dark-gray-3 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-2">
        <div
          onClick={() => setIsUpcomingOpen(!isUpcomingOpen)}
          className="mr-4 my-6 flex justify-between items-center cursor-pointer text-primary-green text-md font-semibold"
        >
          <span>{t(translations.eventManagement.upcomingEvents)}</span>
          {isUpcomingOpen ? (
            <FaChevronUp className="text-primary-green" />
          ) : (
            <FaChevronDown className="text-primary-green" />
          )}
        </div>
        {isUpcomingOpen && (
          <div className="flex flex-col gap-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventManagementCard
                  key={event._id}
                  eventId={event}
                  isOrganized={true}
                  refetch={handleRefetch}
                  openModal={openModal}
                  onAddEvent={onAddEvent}
                  setEditEvent={setEditEvent}
                />
              ))
            ) : (
              <p>{t(translations.eventManagement.noUpcomingEvents)}</p>
            )}
          </div>
        )}
      </div>

      {/* Past Events */}
      <div>
        <div
          onClick={() => setIsPastOpen(!isPastOpen)}
          className="mr-4 my-6 flex justify-between items-center cursor-pointer text-primary-green text-md font-semibold"
        >
          <span>{t(translations.eventManagement.yourPastEvents)}</span>
          {isPastOpen ? (
            <FaChevronUp className="text-primary-green" />
          ) : (
            <FaChevronDown className="text-primary-green" />
          )}
        </div>

        {/* Conditionally render the past events */}
        {isPastOpen && (
          <div className="mt-2 p-2 flex flex-col gap-3">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => <EventManagementCard key={event._id} eventId={event} />)
            ) : (
              <p className="dark:text-white">{t(translations.eventManagement.noPastEvents)}</p>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <ParticipantRequestsModal
          onClose={closeModal}
          event={selectedEvent}
          refetch={handleRefetch}
        />
      )}
    </div>
  )
}

export default OrganizedEvents
