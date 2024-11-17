import React from "react"
import { useState, useRef, useEffect } from "react"
import { ImSpinner9 } from "react-icons/im"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import useAdminCall from "../../../hooks/useAdminCall"
import DeleteModal from "../../ui/Modals/DeleteModal"
import { formatDateWithTime } from "../../../helpers/formatDate"
import { MdOutlineSettings } from "react-icons/md"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const SingleReportPanel = ({ reportId, setIdentifier }) => {
  const { t } = useTranslation()
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
    setIdentifier(null)
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
        <span>{t(translations.adminPanel.backButton)}</span>
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
                <span className="text-primary-green dark:text-white font-semibold w-[80px] sm:w-fit">
                  {t(translations.adminPanel.reports.singleReportPanel.reportId)}:
                </span>
                <span className="w-[100px] md:w-auto overflow-x-scroll scrollbar-hide">
                  {reportId}
                </span>
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
                  {t(translations.adminPanel.reports.singleReportPanel.reportInfo)}
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2">
                  {/* Full Name  */}
                  <li className="flex flex-col sm:flex-row gap-1 mt-4">
                    <span className="font-semibold">
                      {t(translations.adminPanel.reports.singleReportPanel.reportType)}:
                    </span>
                    <span>{reportData?.reportType}</span>
                  </li>
                  <li className="flex gap-1 flex-col sm:flex-row mt-4">
                    <span className="font-semibold">
                      {t(translations.adminPanel.reports.singleReportPanel.reportedBy)}:
                    </span>
                    {reportData?.reportedBy ? (
                      <span
                        className="text-primary-green cursor-pointer"
                        onClick={() =>
                          navigate(`/admin-panel?tab=users&identifier=${reportData?.reportedBy}`)
                        }
                      >
                        {reportData?.reportedBy}
                      </span>
                    ) : (
                      <span className="text-gray-500 italic">
                        {t(translations.adminPanel.reports.singleReportPanel.guest)}
                      </span>
                    )}
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1 mt-4">
                    <span className="font-semibold">
                      {t(translations.adminPanel.reports.singleReportPanel.eventId)}:
                    </span>
                    <span
                      className="text-primary-green cursor-pointer"
                      onClick={() =>
                        navigate(`/admin-panel?tab=events&identifier=${reportData?.eventId}`)
                      }
                    >
                      {reportData?.eventId}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.reports.singleReportPanel.createdAt)}:
                    </span>
                    <span>{formatDateWithTime(reportData?.createdAt)}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.reports.singleReportPanel.lastUpdatedAt)}:
                    </span>
                    <span>{formatDateWithTime(reportData?.updatedAt)}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <h1 className="text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  {t(translations.adminPanel.reports.singleReportPanel.reportDetails)}
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2">
                  <li className="flex flex-col sm:flex-row gap-1 my-4">
                    <span className="font-semibold">
                      {t(translations.adminPanel.reports.singleReportPanel.content)}:
                    </span>
                    <span>{reportData?.content}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>{t(translations.adminPanel.reports.singleReportPanel.noReport)}</div>
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
                {t(translations.adminPanel.reports.singleReportPanel.deleteReport)}
              </button>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className=" text-primary-green hover:text-primary-green/50 hover:bg-light-gray-2 w-full py-2"
              >
                {t(translations.adminPanel.cancel)}
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
          title={t(translations.adminPanel.reports.singleReportPanel.deleteReport)}
          description={t(translations.adminPanel.reports.singleReportPanel.deleteDescription)}
        />
      )}
    </div>
  )
}

export default SingleReportPanel
