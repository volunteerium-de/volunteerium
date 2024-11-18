import React, { useState, useEffect, useRef } from "react"
import { CiSearch } from "react-icons/ci"
import { useNavigate, useLocation } from "react-router-dom"
import Pagination from "../Pagination/Pagination"
import useAdminCall from "../../../hooks/useAdminCall"
import { ImSpinner9 } from "react-icons/im"
import SubscriptionsTable from "../../AdminPanel/subscriptions/SubscriptionsTable"
import InterestsTable from "../../AdminPanel/interests/InterestsTable"
import { FaCirclePlus } from "react-icons/fa6"
import { translations } from "../../../locales/translations"
import { useTranslation } from "react-i18next"
import useEventCall from "../../../hooks/useEventCall"

const Panel = ({ title, fetchUrl, TableComponent }) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const identifier = queryParams.get("identifier")
  const pageFromUrl = queryParams.get("page") || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1)
  const [totalPages, setTotalPages] = useState(0)
  const { fetchAllData, postData } = useAdminCall()
  const { getEventCategories } = useEventCall()
  const [loading, setLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)
  const [interestName, setInterestName] = useState("")
  const [interestNameDE, setInterestNameDE] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const addRef = useRef(null)

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
            `?tab=${fetchUrl === "event-feedbacks" ? "feedbacks" : fetchUrl === "event-reports" ? "reports" : fetchUrl.toLowerCase()}&page=${currentPage}`,
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Conditionally pass setData only to SubscriptionsTable
  const renderTableComponent = () => {
    if (TableComponent == SubscriptionsTable || TableComponent == InterestsTable) {
      return <TableComponent data={data} loading={loading} refreshData={refreshData} />
    }
    return <TableComponent data={data} loading={loading} />
  }

  const handleAdd = async () => {
    if (interestName && interestNameDE) {
      await postData("interests", { name: interestName, nameDE: interestNameDE })
      await getEventCategories()
      onClose()
      refreshData()
    }
  }

  const onClose = () => {
    setInterestName("")
    setInterestNameDE("")
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event) => {
        if (addRef.current && !addRef.current.contains(event.target)) {
          onClose()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isOpen])

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-start mt-24">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="h-full">
            <div className="mt-2 sm:mt-0 flex justify-between relative">
              {fetchUrl === "interests" && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="absolute right-[90px] sm:right-[95px] md:right-[160px]"
                >
                  <FaCirclePlus className="w-8 h-8 text-primary-green dark:text-light-gray hover:text-primary-green/60 dark:hover:text-light-gray/60 rounded-full" />
                </button>
              )}
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-green dark:text-light-gray">
                {title} ({totalRecords})
              </h1>
              <div className="relative">
                <input
                  type="text"
                  className="rounded px-2 py-1 w-[80px] md:w-[150px] border border-primary-green placeholder:text-primary-green focus:outline-none text-sm"
                  placeholder={t(translations.adminPanel.search)}
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
      {fetchUrl === "interests" && isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 dark:bg-black/30">
          <div
            ref={addRef}
            className="max-w-sm w-full p-6 bg-white dark:bg-dark-gray-3 rounded shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4 text-dark-gray-2 dark:text-white">
              {t(translations.adminPanel.addNewInterest)}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="interestName"
                className="block text-sm font-semibold text-dark-gray-2 dark:text-white"
              >
                {t(translations.adminPanel.interestNameEnglish)}
              </label>
              <input
                id="interestName"
                type="text"
                value={interestName}
                onChange={(e) => setInterestName(e.target.value)}
                placeholder={t(translations.adminPanel.addNewInterestPH)}
                className="w-full p-2 mb-4 border border-primary-green rounded focus:outline-none placeholder:text-[12px]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="interestNameDE"
                className="block text-sm font-semibold text-dark-gray-2 dark:text-white"
              >
                {t(translations.adminPanel.interestNameGerman)}{" "}
              </label>
              <input
                id="interestNameDE"
                type="text"
                value={interestNameDE}
                onChange={(e) => setInterestNameDE(e.target.value)}
                placeholder={t(translations.adminPanel.addNewInterestPHDE)}
                className="w-full p-2 mb-4 border border-primary-green rounded focus:outline-none placeholder:text-[12px]"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-2 py-1 text-primary-green" onClick={onClose}>
                {t(translations.adminPanel.cancel)}
              </button>
              <button
                disabled={!interestName && !interestNameDE}
                className={` ${!interestName || (!interestNameDE && "opacity-50 cursor-not-allowed")} bg-primary-green text-white px-2 py-1 rounded ml-2`}
                onClick={handleAdd}
              >
                {t(translations.adminPanel.create)}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Panel
