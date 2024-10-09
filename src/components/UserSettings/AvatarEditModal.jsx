import React, { useRef, useState } from "react"
import Avatar from "../../assets/example-avatar.jpg"
import { MdClose } from "react-icons/md"
import { MdOutlinePhotoCamera } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"

const AvatarEditModal = ({ isOpen, onClose, currentUser, onUpdateAvatar }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const handleAddPhoto = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      const uploadEndpoint =
        currentUser.userType === "organization"
          ? "/api/upload-organization-logo"
          : "/api/upload-avatar"

      setLoading(true)
      setError(null)

      fetch(uploadEndpoint, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then((data) => {
          if (currentUser.userType === "organization") {
            onUpdateAvatar({ organizationLogo: data.fileUrl })
          } else {
            onUpdateAvatar({ avatar: data.fileUrl })
          }
          alert("Photo uploaded successfully!")
        })
        .catch((error) => {
          console.error("Error uploading file:", error)
          setError("There was an error loading the photo. Please try again.")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleDelete = () => {
    onUpdateAvatar(null)
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-50 backdrop-blur-sm">
      <div className="max-w-full sm:w-[643px] w-[200px] sm:h-[375px] font-Poppins p-[10px] bg-white text-white rounded-[8px] shadow-2xl">
        {/* Loading */}
        {loading && <p className="text-primary-green">Loading...</p>}
        {/* Error */}
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="flex justify-between items-start ">
          <h1 className="sm:text-[1.25rem] leading-[1.5] text-gray-1">
            {currentUser.userType === "organization" ? "Logo" : "Profile Photo"}
          </h1>
          <button onClick={onClose} className="hover:bg-gray-200 p-1 rounded-full">
            <MdClose className="sm:w-[20px] sm:h-[20px] text-gray-1" />
          </button>
        </div>
        <img
          src={
            currentUser.userType === "organization"
              ? currentUser.userDetailsId.organizationLogo || Avatar
              : currentUser.userDetailsId.avatar || Avatar
          }
          alt="User Avatar"
          className="w-[100px] h-[100px] mx-auto sm:w-[150px] sm:h-[150px] mt-[30px]"
        />
        <hr className="mt-[50px] border-gray-1" />
        <div className="flex justify-between items-center mt-[20px] text-[1rem]">
          <div className="flex items-center flex-col gap-2">
            <button onClick={handleAddPhoto}>
              <MdOutlinePhotoCamera className="sm:w-[25px] sm:h-[25px] text-primary-green" />
            </button>
            <p className="text-primary-green">Add photo</p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center flex-col gap-2">
            <button onClick={handleDelete}>
              <RiDeleteBin6Line className="sm:w-[25px] sm:h-[25px] text-primary-green" />
            </button>
            <p className="text-primary-green">Delete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarEditModal
