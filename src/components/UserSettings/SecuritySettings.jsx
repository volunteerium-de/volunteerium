import React, { useState } from "react"
import PasswordModal from "./PasswordModal"
import DeleteAccountModal from "./DeleteAccountModal"

const SecuritySettings = ({ currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const handleDeleteAccount = async () => {
    try {
      // Simulate API call
      await someApiCallToDeleteAccount()
      console.log("Account deleted")
      setFeedbackMessage("Your account has been deleted successfully.")
    } catch (error) {
      console.error("Error deleting account:", error)
      setFeedbackMessage("There was an error deleting your account.")
    } finally {
      closeDeleteModal()
    }
  }
  return (
    <div className="font-['Poppins'] max-w-[698px] mx-auto py-2 px-12 w-full h-auto bg-white rounded-md">
      <h1 className="text-center font-medium text-[1.5rem] my-[50px]">Security Settings</h1>

      {/* Name field only for individual users */}
      {currentUser.userType === "individual" && (
        <div className="flex flex-col mb-[10px]">
          <label
            htmlFor="name"
            className="block text-[1rem] leading-[1.5625] text-gray-2 mb-[10px]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={currentUser.fullName || "Name"}
            className="w-full h-[36px] px-3 py-2 border border-gray-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
          />
        </div>
      )}

      {/* Organization-specific information */}
      {currentUser.userType === "organization" && (
        <div className="mt-[30px]">
          <label
            className="block text-[1rem] leading-[1.5625] text-gray-2 mb-[10px]"
            htmlFor="organizationName"
          >
            Organization Name
          </label>
          <input
            type="text"
            id="organizationName"
            placeholder={currentUser.userDetailsId.organizationName || "Organization Name"}
            className="w-full h-[36px] px-3 py-2 border border-gray-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
          />
        </div>
      )}

      {/* Shared fields (e.g., Email) */}
      <div className="mt-[30px]">
        <label className="block text-[1rem] leading-[1.5625] text-gray-2 mb-[10px]" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder={currentUser.email || "example@gmail.com"}
          className="w-full h-[36px] px-3 py-2 border border-gray-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
        />
      </div>

      {/* Password Change Button */}
      <button
        className="bg-primary-green w-full py-[7px] px-[10px] rounded-[6px] my-[50px]"
        onClick={openModal}
      >
        <p className="text-[1rem] leading-[1.5625] text-white">Change Password</p>
      </button>
      <PasswordModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Delete Account Section */}
      <div className="text-[1rem] leading-[1.5625] my-[10px]">
        <h1 className="text-center font-bold my-[20px] text-dark-gray-3">Delete Account</h1>
        <p className="text-dark-gray-2 text-center">
          {currentUser.userType === "individual"
            ? "Would you like to delete your account? Deleting your account will remove all the content associated with it."
            : "Would you like to delete your organization? Deleting your organization will remove all the content associated with it."}
        </p>
        <button
          className="bg-danger w-full py-[7px] px-[10px] rounded-[6px] my-[50px]"
          onClick={openDeleteModal}
        >
          <p className="text-[1rem] leading-[1.5625] text-white">
            {currentUser.userType === "individual"
              ? "I want to delete my account"
              : "I want to delete my organization"}
          </p>
        </button>
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
