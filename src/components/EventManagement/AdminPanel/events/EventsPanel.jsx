import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import useAdminCall from "../../../../hooks/useAdminCall"
import EventsTable from "./EventsTable"
import Pagination from "../../../ui/Pagination/Pagination"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

const EventsPanel = () => {
  const [searchEventQuery, setSearchEventQuery] = useState("")
  const [events, setEvents] = useState([])
  const { fetchAllData } = useAdminCall()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const identifier = queryParams.get("identifier")
  const pageFromUrl = queryParams.get("page") || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (!identifier) {
      fetchAllData(`events?page=${currentPage}&limit=10`).then((data) => {
        setEvents(data.data)
        setTotalPages(data.details.pages.total || 1)
        setCurrentPage(data.details.pages.current || 1)

        if (!isNaN(currentPage) && currentPage > 0) {
          navigate(`?tab=events&page=${currentPage}`, { replace: true })
        } else {
          setCurrentPage(1)
        }
      })
    }
  }, [currentPage, identifier])

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="h-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-primary-green dark:text-light-gray">Events</h1>
          <div className="relative">
            <input
              type="text"
              className="rounded px-2 py-1 w-[150px] border border-primary-green placeholder:text-primary-green focus:outline-none text-sm"
              placeholder="Search"
              value={searchEventQuery}
              onChange={(e) => setSearchEventQuery(e.target.value)}
            />
            {!searchEventQuery && (
              <CiSearch className="absolute top-[6px] right-2 text-primary-green " />
            )}
          </div>
        </div>
        <EventsTable events={events} />
      </div>
      <div className="ms-auto">
        {events.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  )
}

export default EventsPanel
