import React from "react"

const DeleteConversationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4 text-dark-gray-3">Delete Conversation</h2>
        <p className="text-sm text-dark-gray-2 mb-6">
          Are you sure you want to delete this conversation? <br />
          <span className="font-medium text-danger">This action cannot be undone.</span>
        </p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-5 py-2 font-semibold rounded-md border border-light-gray-2 text-dark-gray-2 hover:bg-light-gray transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 font-semibold rounded-md text-white bg-danger transition"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConversationModal
