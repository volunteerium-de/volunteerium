import React from "react"

const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="max-w-sm w-full p-6 bg-white rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-dark-gray-2">Delete Account</h2>
        <p className="text-dark-gray-2">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-danger text-white px-4 py-2 rounded" onClick={onDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
