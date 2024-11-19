import React, { useState } from "react"
import PasswordModal from "./PasswordModal"
import DeleteModal from "../ui/Modals/DeleteModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useSelector } from "react-redux"
import useAccountCall from "../../hooks/useAccountCall"

const SecuritySettings = () => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingOrgName, setIsEditingOrgName] = useState(false)
  const [newName, setNewName] = useState("")
  const [newOrgName, setNewOrgName] = useState("")
  const { currentUser } = useSelector((state) => state.auth)
  const { deleteUser, updateUser } = useAccountCall()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleOrgNameChange = (e) => {
    setNewOrgName(e.target.value)
  }

  const handleSaveChanges = async (type) => {
    const data = type === "name" ? { fullName: newName } : { organizationName: newOrgName }

    try {
      const response = await updateUser(data)

      // Disable the edit mode after saving
      if (type === "name") {
        setIsEditingName(false)
        setNewName(currentUser?.fullName || "")
      }
      if (type === "organizationName") {
        setIsEditingOrgName(false)
        setNewOrgName(currentUser?.organizationName || "")
      }
    } catch (error) {}
  }

  const handleDeleteAccount = async () => {
    await deleteUser()
    closeDeleteModal()
  }
  const handleEditClick = (type) => {
    if (type === "name") {
      setIsEditingName(true)
      setNewName(currentUser?.fullName || "")
    } else if (type === "organizationName") {
      setIsEditingOrgName(true)
      setNewOrgName(currentUser?.organizationName || "")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-light-gray  dark:bg-dark-gray-3 rounded-lg shadow-md dark:text-white">
      <h1 className="text-center font-medium text-[1.25rem] mt-5">{t(translations.secSett.h1)}</h1>

      {/* Name field only for individual users */}
      {currentUser?.userType === "individual" && (
        <div className="flex flex-col mb-[10px] mt-5">
          <label
            htmlFor="name"
            className="block text-[1rem] leading-[1.5625] text-gray-2 dark:text-white mb-[10px]"
          >
            {t(translations.secSett.name)}
          </label>
          <div className="flex justify-between items-center">
            <div className="flex-grow">
              <input
                type="text"
                id="name"
                name="name"
                value={
                  isEditingName ? newName : currentUser?.fullName || t(translations.secSett.namePH)
                }
                onChange={handleNameChange}
                placeholder={currentUser?.fullName || t(translations.secSett.namePH)}
                className="w-full h-[36px] text-[0.9rem] sm:text-[1rem] p-2 border border-gray-1 rounded focus:outline-none dark:bg-light-gray-3 text-black focus:border-primary-green"
                disabled={!isEditingName}
              />
            </div>
            <button
              className="flex-shrink-0 mx-2 sm:w-[15%] w-[10%] text-[0.9rem]  px-3 sm:py-1.5 py-2 items-center rounded border text-white border-primary-green hover:bg-dark-green bg-primary-green dark:text-white"
              onClick={() => {
                if (isEditingName) {
                  handleSaveChanges("name")
                } else {
                  handleEditClick("name")
                }
              }}
            >
              {isEditingName ? t(translations.secSett.save) : t(translations.secSett.edit)}
            </button>
          </div>
        </div>
      )}

      {/* Organization-specific information */}
      {currentUser.userType === "organization" && (
        <div className="mt-[30px]">
          <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="organizationName">
            {t(translations.secSett.orgName)}
          </label>
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <input
                type="text"
                id="organizationName"
                value={
                  isEditingOrgName
                    ? newOrgName
                    : currentUser?.organizationName || t(translations.secSett.orgNamePH)
                }
                onChange={handleOrgNameChange}
                placeholder={currentUser?.organizationName || t(translations.secSett.orgNamePH)}
                className="w-full h-[36px] text-[0.9rem] sm:text-[1rem] p-2 border border-gray-1 rounded focus:outline-none dark:bg-light-gray-3 dark:text-black  focus:border-primary-green"
                disabled={!isEditingOrgName}
              />
            </div>
            <button
              className="flex-shrink-0 mx-2 sm:w-[15%] w-[20%] text-[0.9rem] px-3 sm:py-1.5 py-2 items-center rounded border border-primary-green bg-primary-green text-white hover:bg-dark-green"
              onClick={() => {
                if (isEditingOrgName) {
                  handleSaveChanges("organizationName")
                } else {
                  handleEditClick("organizationName")
                }
              }}
            >
              {isEditingOrgName ? t(translations.secSett.save) : t(translations.secSett.edit)}
            </button>
          </div>
        </div>
      )}

      {/* Shared fields (e.g., Email) */}
      <div className="mt-[50px]">
        <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="email">
          {t(translations.secSett.email)}
        </label>
        <input
          type="email"
          id="email"
          placeholder={currentUser?.email || t(translations.secSett.emailPH)}
          className="w-full h-[36px] text-[0.9rem] sm:text-[1rem] p-2 border border-gray-1  rounded focus:outline-none dark:bg-light-gray-3 focus:border-primary-green cursor-not-allowed"
          disabled={true}
        />
        <p className="text-sm text-danger">{t(translations.secSett.p2)}</p>
      </div>

      {/* Password Change Button */}
      <div className="text-center">
        <button
          className="bg-primary-green w-[70%] py-2 px-4 rounded my-[50px] duration-200 hover:bg-dark-green"
          onClick={openModal}
        >
          <p className="text-[0.9rem] sm:text-[1rem] text-white">
            {t(translations.secSett.changePsw)}
          </p>
        </button>
        <PasswordModal isOpen={isModalOpen} onClose={closeModal} />
      </div>

      {/* Delete Account Section */}
      <div className="text-[0.9rem] sm:text-[1rem] my-[10px]">
        <h1 className="text-center font-bold my-[20px] text-dark-gray-3">
          {t(translations.secSett.delAccount)}
        </h1>
        <p className="text-dark-gray-2 text-center dark:text-white">
          {currentUser?.userType === "individual"
            ? t(translations.secSett.delAlert1)
            : t(translations.secSett.delAlert2)}
        </p>
        <div onClick={() => openDeleteModal()} className="text-center">
          <button className="bg-danger w-[70%] py-2 px-4 rounded my-[50px] duration-200 hover:bg-dark-danger">
            <p className="text-[0.9rem] sm:text-[1rem] text-white">
              {t(translations.secSett.userRes)}
            </p>
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={closeDeleteModal}
          onDelete={handleDeleteAccount}
          title={t(translations.delModal.accountTitle)}
          description={t(translations.delModal.accountDesc)}
        />
      )}

      {feedbackMessage && <div className="mt-4 text-center text-green-500">{feedbackMessage}</div>}
    </div>
  )
}

export default SecuritySettings
