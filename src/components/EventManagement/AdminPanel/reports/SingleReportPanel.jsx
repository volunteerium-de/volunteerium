import React from "react"
import { useState, useRef, useEffect } from "react"
import { ImSpinner9 } from "react-icons/im"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import useAdminCall from "../../../../hooks/useAdminCall"
import DeleteModal from "../../../ui/Modals/DeleteModal"
import { formatDateWithTime } from "../../../../helpers/formatDate"
import { MdOutlineSettings } from "react-icons/md"

const SingleReportPanel = ({ reportId, setIdentifier }) => {
  const navigate = useNavigate()
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)
  const { fetchSingleData, deleteData } = useAdminCall()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isDeleteReportModalOpen, setIsDeleteReportModalOpen] = useState(false)
  const modalRef = useRef(null)
  const settingsButtonRef = useRef(null)

  const fetchReportData = async () => {
    setLoading(true)
    try {
      const data = await fetchSingleData("event-reports", reportId)
      setReportData(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReportData()
  }, [reportId])

  const handleNavigateBack = () => {
    setIdentifier(null)
    navigate(`/admin-panel?tab=reports`)
  }

  const closeDeleteReportModal = () => {
    setIsDeleteReportModalOpen(false)
  }

  const openDeleteReportModal = () => {
    setIsDeleteReportModalOpen(true)
  }

  const handleSettingsButtonClick = () => {
    setIsSettingsModalOpen((prevState) => !prevState)
  }

  const handleOutsideClick = (e) => {
    // Check if the click is outside the settings button and modal
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      settingsButtonRef.current &&
      !settingsButtonRef.current.contains(e.target)
    ) {
      setIsSettingsModalOpen(false)
    }
  }

  useEffect(() => {
    // Event listener for outside click
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  const handleDeleteReport = () => {
    deleteData("event-reports", reportId)
    navigate(`/admin-panel?tab=reports`)
    setIsSettingsModalOpen(false)
    closeDeleteReportModal()
  }

  return (
    <div className="relative">
      <button
        onClick={handleNavigateBack}
        className="absolute -top-8 left-0 md:-left-5 flex items-center gap-1 text-primary-green dark:text-white"
      >
        <IoIosArrowBack className="w-5 h-5" />
        <span>Back</span>
      </button>
      <div>
        {loading ? (
          <div className="my-4 flex h-max justify-center items-start pt-24">
            <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green dark:text-white" />
          </div>
        ) : reportData ? (
          <div className="my-8 md:my-4 space-y-2 h-max">
            <div className="flex justify-between items-center p-4 bg-white dark:bg-dark-gray-1 rounded-lg ">
              <div className="text-sm sm:text-[1.125rem] flex gap-1 md:gap-2 items-center text-dark-gray-1 me-3">
                ReportId - {reportId}
              </div>

              <div className="flex gap-1 md:gap-2 items-center">
                <button ref={settingsButtonRef} onClick={handleSettingsButtonClick}>
                  <MdOutlineSettings className="w-5 h-5 sm:w-8 sm:h-8 text-dark-gray-1 dark:text-white hover:text-dark-gray-1" />
                </button>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-2 h-full">
              {/* User Information */}
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <h1 className="text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  Reports Informations
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2">
                  {/* Full Name  */}
                  <li className="flex gap-1 mt-4">
                    <span className="font-semibold">Report Type:</span>
                    <span>{reportData?.reportType}</span>
                  </li>
                  <li className="flex gap-1 mt-4">
                    <span className="font-semibold">Reported By:</span>
                    <span>{reportData?.reportedBy}</span>
                  </li>
                  <li className="flex gap-1 mt-4">
                    <span className="font-semibold">Event Id:</span>
                    <span>{reportData?.eventId}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">Created At:</span>
                    <span>{formatDateWithTime(reportData?.createdAt)}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">Last Updated At:</span>
                    <span>{formatDateWithTime(reportData?.updatedAt)}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <h1 className="text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  Reports Details
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2">
                  <li className="flex gap-1 my-4">
                    <span className="font-semibold">Content:</span>
                    <span>{reportData?.content}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>No Report Found</div>
        )}
      </div>
      {isSettingsModalOpen && (
        <div className="absolute z-50 top-14 right-8 border border-gray-1 dark:border-gray-1 overflow-hidden rounded-lg">
          <div ref={modalRef} className="bg-white dark:bg-gray-1 shadow-lg w-[120px] md:w-[200px]">
            <div className="flex flex-col justify-between">
              <button
                onClick={openDeleteReportModal}
                className="text-danger hover:text-danger/50 border-b dark:border-gray-2 hover:bg-light-gray-2 w-full py-2"
              >
                Delete Report
              </button>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className=" text-primary-green hover:text-primary-green/50 hover:bg-light-gray-2 w-full py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      {isDeleteReportModalOpen && (
        <DeleteModal
          onClose={closeDeleteReportModal}
          onDelete={handleDeleteReport}
          title={`Delete Report`}
          description={`Are you sure you want to delete this report?`}
        />
      )}
    </div>
  )
}

export default SingleReportPanel
