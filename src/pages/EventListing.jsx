import React, { useState, useEffect } from "react"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Footer from "../components/Footer/Footer"
import EventCardList from "../components/EventListing/EventCardList"
import FilterSidebar from "../components/EventListing/FilterSidebar"
import useEventCall from "../hooks/useEventCall"
import { useSelector, useDispatch } from "react-redux"
import Pagination from "../components/ui/Pagination/Pagination"
import { setSortOrder } from "../features/searchSlice"
import { useLocation, useNavigate } from "react-router-dom"
import { LiaSpinnerSolid } from "react-icons/lia"
import { IoIosArrowBack } from "react-icons/io"
import useLanguageOptions from "../hooks/useLanguages"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"

const EventsListingPage = () => {
  const { t } = useTranslation()
  const { getEvents } = useEventCall()
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)

  const {
    searchTermEvent,
    searchTermLocation,
    categoryFilters,
    languageFilters,
    startDate,
    endDate,
    sortOrder,
  } = useSelector((state) => state.search)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const pageFromUrl = queryParams.get("page") || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalEventRecord, setTotalEventRecord] = useState(0)
  const { getLangName } = useLanguageOptions()

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)

      try {
        const queryParams = {
          ...(searchTermEvent && { "search[title]": searchTermEvent }),
          ...(searchTermLocation && { "search[location]": searchTermLocation }),
          ...(startDate && { "filter[startDate]": startDate }),
          ...(endDate && { "filter[endDate]": endDate }),
          ...(categoryFilters.length > 0 && {
            "filter[category]": categoryFilters.join(","),
          }),
          ...(languageFilters.length > 0 && {
            "filter[languages]": languageFilters.join(","),
          }),
          "sort[startDate]": sortOrder === "Newest" ? "asc" : "desc",
        }
        const query = `?${new URLSearchParams(
          queryParams
        ).toString()}&filter[isActive]=true&filter[isDone]=false&page=${currentPage}`
        const eventData = await getEvents(`events/${query}`)
        setEvents(eventData.data || [])
        setTotalPages(eventData.details.pages.total || 1)
        setCurrentPage(eventData.details.pages.current || 1)
        setTotalEventRecord(eventData.details.totalRecords)

        if (!isNaN(currentPage) && currentPage > 0) {
          navigate(query, { replace: true })
        } else {
          setCurrentPage(1)
        }
      } catch (error) {
        console.log(error)
        setError("Error fetching events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [
    searchTermEvent,
    searchTermLocation,
    categoryFilters,
    languageFilters,
    startDate,
    endDate,
    sortOrder,
    currentPage,
  ])

  const renderFilterMessagePart = (label, content) => (
    <span key={label}>
      <span> | </span>
      <span className="text-dark-green dark:text-white">{label}: </span>
      <span>{content}</span>
    </span>
  )

  const renderFilterMessage = () => {
    let resultMessage = `${t(translations.eventsPage.result)}:`
    let resultParts = []

    if (searchTermEvent) {
      resultParts.push(
        renderFilterMessagePart(`${t(translations.eventsPage.search)}`, searchTermEvent)
      )
    }

    if (searchTermLocation) {
      resultParts.push(
        renderFilterMessagePart(`${t(translations.eventsPage.location)}`, searchTermLocation)
      )
    }

    if (categoryFilters.length > 0) {
      resultParts.push(
        renderFilterMessagePart(
          `${t(translations.eventsPage.category)}`,
          categoryFilters.join(", ")
        )
      )
    }
    console.log("Category", categoryFilters)

    if (languageFilters.length > 0) {
      resultParts.push(
        renderFilterMessagePart(
          `${t(translations.eventsPage.language)}`,
          languageFilters.map((lang) => getLangName(lang)).join(", ")
        )
      )
    }

    if (!totalEventRecord) {
      resultMessage += `${t(translations.eventsPage.notFound)}`
    } else {
      resultMessage += ` ${totalEventRecord} ${totalEventRecord > 1 ? t(translations.eventsPage.events) : t(translations.eventsPage.event)} ${t(translations.eventsPage.found)}`
    }

    return { resultMessage, resultParts }
  }

  const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value
    dispatch(setSortOrder(selectedSortOrder))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const { resultMessage, resultParts } = renderFilterMessage()

  return (
    <div className={`relative ${isFilterSidebarOpen && "h-screen overflow-hidden"}`}>
      <Header />
      <Hero />
      <div className={`pt-10 px-4 max-w-[1400px] mx-auto`}>
        <div className="flex justify-between items-center mb-4 mx-2">
          <div>
            <h1 className="text-xs md:text-sm lg:text-md flex gap-1 ">
              <span className="font-semibold dark:text-white">{resultMessage}</span>
              <span className="text-gray-2 hidden lg:block">
                {" "}
                {resultParts.map((part, index) => (
                  <React.Fragment key={index}>{part}</React.Fragment>
                ))}
              </span>
            </h1>
          </div>
          <div className="flex justify-end gap-3 items-center">
            <p className="text-sm font-bold text-black dark:text-white">
              {t(translations.eventsPage.sort)}:
            </p>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="appearance-none border border-primary-green rounded-md font-medium text-[0.875rem] px-2 bg-light-green text-primary-green focus:outline-none focus:ring-2 focus:primary-green"
            >
              <option value="Newest">{t(translations.eventsPage.new)}</option>
              <option value="Oldest">{t(translations.eventsPage.old)}</option>
            </select>

            <button
              className="block lg:hidden text-primary-green mr-5"
              onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            >
              {t(translations.eventsPage.filter)}
            </button>
          </div>
        </div>

        <div className="flex justify-start gap-5">
          <div
            className={`h-full rounded-lg z-50 absolute w-full inset-0 bg-white transition-transform duration-300 ${isFilterSidebarOpen ? "translate-x-0" : "-translate-x-full max-w-[350px]"} lg:relative lg:translate-x-0 lg:block`}
          >
            <FilterSidebar />
            {isFilterSidebarOpen && (
              <button
                className="absolute top-4 right-8 text-primary-green lg:hidden"
                onClick={() => setIsFilterSidebarOpen(false)}
              >
                <IoIosArrowBack className="h-[30px] w-[30px]" />
              </button>
            )}
          </div>
          <div className="flex flex-col justify-between w-full">
            {error ? (
              <div>{error}</div>
            ) : loading ? (
              <div className="flex text-md justify-center items-center text-center w-[200px] mx-auto mt-14 dark:text-white">
                {t(translations.eventsPage.loading)}...{" "}
                <span className="animate-spin text-primary-green text-3xl">
                  <LiaSpinnerSolid />
                </span>
              </div>
            ) : (
              <EventCardList events={events} />
            )}
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EventsListingPage
