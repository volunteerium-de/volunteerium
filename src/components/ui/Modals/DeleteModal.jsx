import React from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const DeleteModal = ({ onClose, onDelete, title, description }) => {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="max-w-sm w-full p-6 bg-white dark:bg-dark-gray-3  rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-dark-gray-2 dark:text-white">{title}</h2>
        <p className="text-dark-gray-2 dark:text-white">{description}</p>
        <div className="flex justify-end mt-4">
          <button className="px-2 py-1 text-primary-green" onClick={() => onClose()}>
            {t(translations.delModal.cancelButton)}
          </button>
          <button
            className="bg-danger hover:bg-danger/60 text-white px-2 py-1 rounded"
            onClick={onDelete}
          >
            {t(translations.delModal.delButton)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
