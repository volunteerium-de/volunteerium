import React from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"

const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null
  const {t} = useTranslation()

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="max-w-sm w-full p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-dark-gray-2">{t(translations.delAccount.h2)}</h2>
        <p className="text-dark-gray-2">
          {t(translations.delAccount.p)}
        </p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={onClose}>
          {t(translations.delAccount.cancelButton)}
          </button>
          <button className="bg-danger text-white px-4 py-2 rounded" onClick={onDelete}>
          {t(translations.delAccount.delButton)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
