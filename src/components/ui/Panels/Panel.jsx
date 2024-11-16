import React, { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import { useNavigate, useLocation } from "react-router-dom"
import Pagination from "../Pagination/Pagination"
import useAdminCall from "../../../hooks/useAdminCall"
import { ImSpinner9 } from "react-icons/im"
import SubscriptionsTable from "../../AdminPanel/subscriptions/SubscriptionsTable"
import InterestsTable from "../../AdminPanel/interests/InterestsTable"

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
  const [totalRecords, setTotalRecords] = useState(0)

  const refreshData = () => {
    setLoading(true)
    fetchAllData(`${fetchUrl}?page=${currentPage}&limit=10`)
      .then((fetchedData) => {
        setData(fetchedData?.data)
        setTotalPages(fetchedData?.details?.pages?.total || 1)
        setCurrentPage(fetchedData?.details?.pages?.current || 1)
        setTotalRecords(fetchedData?.details?.totalRecords || 0)

        if (currentPage > 0) {
          navigate(
            `?tab=${title === "Event Feedbacks" ? "feedbacks" : title === "Event Reports" ? "reports" : title.toLowerCase()}&page=${currentPage}`,
            { replace: true }
          )
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!identifier) {
      refreshData() // Load data on initial mount
    }
  }, [currentPage])

  // Conditionally pass setData only to SubscriptionsTable
  const renderTableComponent = () => {
    if (TableComponent == SubscriptionsTable || TableComponent == InterestsTable) {
      return <TableComponent data={data} loading={loading} refreshData={refreshData} />
    }
    return <TableComponent data={data} loading={loading} />
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-start mt-24">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="h-full">
            <div className="mt-2 sm:mt-0 flex justify-between">
              <h1 className="text-xl sm:text-2xl font-bold text-primary-green dark:text-light-gray">
                {title} ({totalRecords})
              </h1>
              <div className="relative">
                <input
                  type="text"
                  className="rounded px-2 py-1 w-[80px] md:w-[150px] border border-primary-green placeholder:text-primary-green focus:outline-none text-sm"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {!searchQuery && (
                  <CiSearch className="absolute top-[6px] right-2 text-primary-green " />
                )}
              </div>
            </div>
            {renderTableComponent()}
          </div>
          <div className="mx-auto sm:mx-0 sm:ms-auto">
            {data.length > 0 && (
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Panel
