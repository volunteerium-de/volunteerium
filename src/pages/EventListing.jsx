import React, { useState, useEffect } from "react"
import Header from "../components/Header/Header"
import Hero from "../components/Hero/Hero"
import Footer from "../components/Footer/Footer"
import EventCardList from "../components/EventListing/EventCardList"
import FilterSidebar from "../components/EventListing/FilterSidebar"
import useEventCall from "../hooks/useEventCall"
import { useSelector } from "react-redux"
import Pagination from "../components/ui/Pagination/Pagination"
import { setSortOrder } from "../features/searchSlice"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getLangName } from "../components/EventListing/FilterSidebar"
import { LiaSpinnerSolid } from "react-icons/lia"

const EventsListingPage = () => {
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

  // Pagination state
  const queryParams = new URLSearchParams(location.search)
  const pageFromUrl = queryParams.get("page") || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalEventRecord, setTotalEventRecord] = useState(0)

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
          "sort[startDate]": sortOrder === "Newest" ? "desc" : "asc",
        }

        const query = `?${new URLSearchParams(queryParams).toString()}&page=${currentPage}`
        const eventData = await getEvents(`events/${query}`)
        console.log(eventData)
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
      <span className="text-dark-green">{label}: </span>
      <span>{content}</span>
    </span>
  )

  const renderFilterMessage = () => {
    let resultMessage = "Results for your search:"
    let resultParts = []

    if (searchTermEvent) {
      resultParts.push(renderFilterMessagePart("Search Term", searchTermEvent))
    }

    if (searchTermLocation) {
      resultParts.push(renderFilterMessagePart("Location", searchTermLocation))
    }

    if (categoryFilters.length > 0) {
      resultParts.push(renderFilterMessagePart("Category", categoryFilters.join(", ")))
    }

    if (languageFilters.length > 0) {
      resultParts.push(
        renderFilterMessagePart(
          "Language",
          languageFilters.map((lang) => getLangName(lang)).join(", ")
        )
      )
    }

    if (!totalEventRecord) {
      resultMessage += ` No Events Found`
    } else {
      resultMessage += ` ${totalEventRecord} Event${totalEventRecord > 1 ? "s" : ""} Found`
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
          {/*Filter Message*/}
          <div>
            <h1 className="text-xs md:text-sm lg:text-md flex gap-1 ">
              <span className="font-semibold">{resultMessage}</span>
              <span className="text-gray-2 hidden lg:block">
                {" "}
                {resultParts.map((part, index) => (
                  <React.Fragment key={index}>{part}</React.Fragment>
                ))}
              </span>
            </h1>
          </div>
          {/*Sort and Filters*/}
          <div className="flex justify-end gap-3 items-center">
            <p className="text-sm font-bold">Sort by:</p>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border rounded font-medium text-[0.875rem]"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>

            <button
              className="block lg:hidden text-primary-green mr-5"
              onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            >
              Filters
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
                Close
              </button>
            )}
          </div>
          <div className="flex flex-col justify-between w-full">
            {error ? (
              <div>{error}</div>
            ) : loading ? (
              <div className="flex text-md justify-center items-center text-center w-[200px] mx-auto mt-14">
                Loading events...{" "}
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
