import React, { useRef, useState } from "react"
import Avatar from "../../assets/example-avatar.jpg"
import { MdClose } from "react-icons/md"
import { MdOutlinePhotoCamera } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { translations } from "../../locales/translations"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const AvatarEditModal = ({ isOpen, onClose, currentUser, onUpdateAvatar }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const { currentUser: user } = useSelector((state) => state.auth)
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
            throw new Error(t(translations.avatarEdit.networkError))
          }
          return response.json()
        })
        .then((data) => {
          if (currentUser.userType === "organization") {
            onUpdateAvatar({ organizationLogo: data.fileUrl })
          } else {
            onUpdateAvatar({ avatar: data.fileUrl })
          }
          alert(t(translations.avatarEdit.photoAlert))
        })
        .catch((error) => {
          console.error("Error uploading file:", error)
          setError(t(translations.avatarEdit.photoError))
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
      <div className=" relative max-w-full sm:w-[643px] w-[200px] sm:h-[375px] font-Poppins p-[10px] bg-white text-white rounded-[8px] shadow-2xl dark:bg-dark-gray-3">
        {/* Loading */}
        {loading && <p className="text-primary-green">{t(translations.avatarEdit.loading)}</p>}
        {/* Error */}
        {error && <p className=" absolute bottom-50 left-36 text-danger text-center">{error}</p>}
        <div className="flex justify-between items-start ">
          <h1 className="sm:text-[1.05rem] p-1 text-primary-green dark:text-white">
            {currentUser.userType === "organization"
              ? t(translations.avatarEdit.logo)
              : t(translations.avatarEdit.profilePhoto)}
          </h1>
          <button
            onClick={onClose}
            className="dark:hover:bg-primary-green hover:bg-dark-green p-1 rounded-full"
          >
            <MdClose className="size-[20px] dark:text-white text-primary-green " />
          </button>
        </div>
        <img
          src={
            currentUser.userType === "organization"
              ? currentUser.userDetailsId.organizationLogo || Avatar
              : currentUser.userDetailsId.avatar || Avatar
          }
          alt={t(translations.avatarEdit.avatarAlt)}
          className="w-[100px] h-[100px] mx-auto sm:w-[150px] sm:h-[150px] mt-[30px]"
        />
        <hr className="mt-[75px] border-primary-green" />
        <div className="flex justify-between items-center mt-[20px] text-[1rem]">
          <div className="flex items-center flex-col gap-2">
            <button onClick={handleAddPhoto}>
              <MdOutlinePhotoCamera className="size-[20px] text-primary-green dark:text-white" />
            </button>
            <p className="text-primary-green dark:text-white">
              {t(translations.avatarEdit.addPhoto)}
            </p>
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
              <RiDeleteBin6Line className="size-[20px]  text-primary-green dark:text-white" />
            </button>
            <p className="text-primary-green dark:text-white">
              {t(translations.avatarEdit.delete)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarEditModal
