import React, { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import { useNavigate, useLocation } from "react-router-dom"
import Pagination from "../Pagination/Pagination"
import useAdminCall from "../../../hooks/useAdminCall"

const Panel = ({ title, fetchUrl, TableComponent }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const identifier = queryParams.get("identifier")
  const pageFromUrl = queryParams.get("page") || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1)
  const [totalPages, setTotalPages] = useState(0)
  const { fetchAllData } = useAdminCall()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!identifier) {
      setLoading(true)
      fetchAllData(`${fetchUrl}?page=${currentPage}&limit=10`)
        .then((fetchedData) => {
          setData(fetchedData.data)
          setTotalPages(fetchedData.details.pages.total || 1)
          setCurrentPage(fetchedData.details.pages.current || 1)

          if (!isNaN(currentPage) && currentPage > 0) {
            navigate(
              `?tab=${title === "Feedback & Contacts" ? "feedback-contacts" : title.toLowerCase()}&page=${currentPage}`,
              { replace: true }
            )
          } else {
            setCurrentPage(1)
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [currentPage])

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="h-full">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-primary-green dark:text-light-gray">{title}</h1>
          <div className="relative">
            <input
              type="text"
              className="rounded px-2 py-1 w-[150px] border border-primary-green placeholder:text-primary-green focus:outline-none text-sm"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {!searchQuery && (
              <CiSearch className="absolute top-[6px] right-2 text-primary-green " />
            )}
          </div>
        </div>
        <TableComponent data={data} loading={loading} />
      </div>
      <div className="ms-auto">
        {data.length > 0 && (
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

export default Panel
