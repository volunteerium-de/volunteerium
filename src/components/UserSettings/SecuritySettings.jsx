import React, { useState } from "react"
import PasswordModal from "./PasswordModal"
import DeleteAccountModal from "./DeleteAccountModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useSelector } from "react-redux"

const SecuritySettings = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const { currentUser } = useSelector((state) => state.auth)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const handleDeleteAccount = async () => {}
  return (
    <div className="font-Poppins max-w-[698px] mx-auto py-2 px-12 w-full h-auto bg-light-gray rounded-md">
      <h1 className="text-center font-medium text-[1.5rem] my-[50px]">
        {t(translations.secSett.h1)}
      </h1>

      {/* Name field only for individual users */}
      {currentUser?.userType === "individual" && (
        <div className="flex flex-col mb-[10px]">
          <label
            htmlFor="name"
            className="block text-[1rem] leading-[1.5625] text-gray-2 mb-[10px]"
          >
            {t(translations.secSett.name)}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={currentUser?.fullName || t(translations.secSett.namePH)}
            className="w-full h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
          />
        </div>
      )}

      {/* Organization-specific information */}
      {currentUser.userType === "organization" && (
        <div className="mt-[30px]">
          <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="organizationName">
            {t(translations.secSett.orgName)}
          </label>
          <input
            type="text"
            id="organizationName"
            placeholder={
              currentUser?.userDetailsId.organizationName || t(translations.secSett.orgNamePH)
            }
            className="w-full h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
          />
        </div>
      )}

      {/* Shared fields (e.g., Email) */}
      <div className="mt-[30px]">
        <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="email">
          {t(translations.secSett.email)}
        </label>
        <input
          type="email"
          id="email"
          placeholder={currentUser?.email || t(translations.secSett.emailPH)}
          className="w-full h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
        />
      </div>

      {/* Password Change Button */}
      <div className="text-center">
        <button
          className="bg-primary-green w-[70%] py-2 px-4 rounded my-[50px]  hover:bg-light-green"
          onClick={openModal}
        >
          <p className="text-[1rem] leading-[1.5625] text-white">
            {t(translations.secSett.changePsw)}
          </p>
        </button>
        <PasswordModal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      {/* Delete Account Section */}
      <div className="text-[1rem] leading-[1.5625] my-[10px]">
        <h1 className="text-center font-bold my-[20px] text-dark-gray-3">
          {t(translations.secSett.delAccount)}
        </h1>
        <p className="text-dark-gray-2 text-center">
          {currentUser?.userType === "individual"
            ? t(translations.secSett.delAlert1)
            : t(translations.secSett.delAlert2)}
        </p>
        <div className="text-center">
          {" "}
          <button
            className="bg-danger  w-[70%] py-2 px-4 rounded my-[50px]  hover:bg-light-green"
            onClick={openDeleteModal}
          >
            <p className="text-[1rem] leading-[1.5625] text-white">
              {currentUser?.userType === "individual"
                ? t(translations.secSett.userRes1)
                : t(translations.secSett.userRes2)}
            </p>
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteAccount}
      />

      {feedbackMessage && <div className="mt-4 text-center text-green-500">{feedbackMessage}</div>}
    </div>
  )
}

export default SecuritySettings
