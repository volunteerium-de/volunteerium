import React, { useRef } from "react"
import { MdClose } from "react-icons/md"
import { MdOutlinePhotoCamera } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { translations } from "../../locales/translations"
import { useTranslation } from "react-i18next"
import useAccountCall from "../../hooks/useAccountCall"
import toastNotify from "../../utils/toastNotify"
import { useSelector } from "react-redux"
import { UserAvatar } from "../ui/Avatar/userAvatar"
import { ImSpinner9 } from "react-icons/im"

const AvatarEditModal = ({ isOpen, onClose, currentUser }) => {
  const { t } = useTranslation()
  const { loading } = useSelector((state) => state.auth)

  const fileInputRef = useRef(null)
  const { updateUserDetails } = useAccountCall()

  if (!isOpen) return null

  const handleAddPhoto = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      if (currentUser.userType === "organization") {
        formData.append("organizationLogo", file)
      } else {
        formData.append("avatar", file)
      }

      try {
        const updatedData = await updateUserDetails(formData)
        if (updatedData) {
          toastNotify("success", updatedData.message)
        }
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }
  }

  const handleDelete = async () => {
    try {
      const formData = new FormData()

      if (currentUser.userType === "organization") {
        formData.append("organizationLogo", "")
      } else {
        formData.append("avatar", "")
      }

      const updatedData = await updateUserDetails(formData)
      if (updatedData) {
        toastNotify("success", updatedData.message)
      }
    } catch (error) {
      console.error("Error deleting avatar:", error)
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-50 backdrop-blur-sm">
      <div className="relative max-w-full sm:w-[643px] w-[200px] sm:h-[375px] font-Poppins p-[10px] bg-white text-white rounded-[8px] shadow-2xl dark:bg-dark-gray-3">
        <div className="flex justify-between items-start mb-[30px]">
          <h1 className="sm:text-[1.05rem] p-1 text-primary-green dark:text-white">
            {currentUser.userType === "organization"
              ? t(translations.avatarEdit.logo)
              : t(translations.avatarEdit.profilePhoto)}
          </h1>
          <button
            onClick={onClose}
            className="dark:hover:bg-primary-green hover:bg-dark-green p-1 rounded-full"
          >
            <MdClose className="size-[20px] dark:text-white text-primary-green" />
          </button>
        </div>
        {loading ? (
          <div className="text-primary-green h-[100px] sm:h-[150px] flex flex-col gap-2 justify-center items-center">
            <span>{t(translations.avatarEdit.loading)}</span>
            <ImSpinner9 size={32} className="animate-spin" />
          </div>
        ) : (
          <UserAvatar
            user={currentUser}
            size="w-[100px] h-[100px] mx-auto sm:w-[150px] sm:h-[150px]"
          />
        )}

        <hr className="mt-[75px] border-primary-green" />
        <div className="flex justify-between items-center mt-[20px] text-[1rem]">
          <div onClick={handleAddPhoto} className="flex items-center flex-col gap-2">
            <button>
              <MdOutlinePhotoCamera className="size-[20px] text-primary-green dark:text-white" />
            </button>
            <p className="text-primary-green dark:text-white cursor-pointer">
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
          <div onClick={handleDelete} className="flex items-center flex-col gap-2">
            <button>
              <RiDeleteBin6Line className="size-[20px] text-primary-green dark:text-white" />
            </button>
            <p className="text-primary-green dark:text-white cursor-pointer">
              {t(translations.avatarEdit.delete)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarEditModal
