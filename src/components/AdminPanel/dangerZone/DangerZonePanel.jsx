import React, { useState, useEffect, useRef } from "react"
import { FaExclamationTriangle } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import ResetDatabaseModal from "./ResetDatabaseModal"
import useAdminCall from "../../../hooks/useAdminCall"

const DangerZonePanel = () => {
  const { t } = useTranslation()
  const { requestDatabaseReset } = useAdminCall()
  const [resetToken, setResetToken] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setResetToken("")
    setIsModalOpen(false)
  }, [])

  const sendResetRequest = async () => {
    const data = await requestDatabaseReset()
    if (data) {
      setResetToken(data)
      setIsModalOpen(true) // Open modal after fetching token
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="h-full">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-green dark:text-light-gray">
          {t(translations.adminPanel.dangerZone.title)}
        </h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 mt-4 rounded">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2 text-xl" />
            <h3 className="font-semibold text-lg">
              {t(translations.adminPanel.dangerZone.importantWarning)}
            </h3>
          </div>
          <p className="mt-2">{t(translations.adminPanel.dangerZone.resetDatabaseWarning)}</p>
        </div>

        {/* Information Section */}
        <div className="mt-6 bg-gray-100 dark:bg-dark-gray-1 text-dark-gray-1 dark:text-gray-1 p-4 rounded shadow-md">
          <div>
            <h2 className="text-lg font-semibold text-primary-green dark:text-dark-gray-3">
              {t(translations.adminPanel.dangerZone.databaseResetInfo)}
            </h2>
            <ul className="list-disc ml-5 mt-2">
              <li>{t(translations.adminPanel.dangerZone.databaseResetInfoList.first)}</li>
              <li>{t(translations.adminPanel.dangerZone.databaseResetInfoList.second)}</li>
              <li>{t(translations.adminPanel.dangerZone.databaseResetInfoList.third)}</li>
            </ul>
          </div>
          {/* Reset Database Button */}
          <button
            onClick={sendResetRequest}
            className="mt-6 w-[220px] py-2 bg-danger text-white rounded-lg hover:bg-dark-danger"
          >
            {t(translations.adminPanel.dangerZone.resetDatabaseButton)}
          </button>
        </div>
      </div>

      {/* Reset Database Modal */}
      <ResetDatabaseModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        resetToken={resetToken}
        setResetToken={setResetToken}
      />
    </div>
  )
}

export default DangerZonePanel
