import React from "react"
import { useState } from "react"
import { ImSpinner9 } from "react-icons/im"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import useAdminCall from "../../../hooks/useAdminCall"
import { useEffect } from "react"
import { useRef } from "react"
import DeleteModal from "../../ui/Modals/DeleteModal"
import { MdOutlineSettings } from "react-icons/md"
import { FaExternalLinkAlt } from "react-icons/fa"
import { UserAvatar } from "../../ui/Avatar/userAvatar"
import { formatDateWithTime } from "../../../helpers/formatDate"
import useLanguage from "../../../hooks/useLanguages"
import { LuMailPlus } from "react-icons/lu"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const SingleUserPanel = ({ userId, setIdentifier }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { fetchSingleData, updateData, deleteData } = useAdminCall()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false)
  const modalRef = useRef(null)
  const settingsButtonRef = useRef(null)
  const { getLangName, getTranslatedCategory } = useLanguage()

  const fetchUserData = async () => {
    setLoading(true)
    try {
      const data = await fetchSingleData("users", userId)
      setUserData(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [userId])

  const handleNavigateBack = () => {
    setIdentifier(null)
    navigate(`/admin-panel?tab=users`)
  }

  const closeDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false)
  }

  const openDeleteUserModal = () => {
    setIsDeleteUserModalOpen(true)
  }

  const handleSettingsButtonClick = () => {
    setIsSettingsModalOpen((prevState) => !prevState)
  }

  const handleOutsideClick = (e) => {
    // Check if the click is outside the settings button and modal
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      settingsButtonRef.current &&
      !settingsButtonRef.current.contains(e.target)
    ) {
      setIsSettingsModalOpen(false)
    }
  }

  const handleDeleteEvent = () => {
    deleteData("users", userId)
    navigate(`/admin-panel?tab=users`)
    setIdentifier(null)
    setIsSettingsModalOpen(false)
    closeDeleteUserModal()
  }

  const handleSuspendEvent = async () => {
    let updatedData
    if (userData?.isActive) {
      updatedData = await updateData("users", userData._id, { isActive: false })
    } else {
      updatedData = await updateData("users", userData._id, { isActive: true })
    }
    if (updatedData) {
      setUserData(updatedData)
    }
    setIsSettingsModalOpen(false)
  }

  useEffect(() => {
    // Event listener for outside click
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  return (
    <div className="relative">
      <button
        onClick={handleNavigateBack}
        className="absolute -top-8 left-0 md:-left-5 flex items-center gap-1 text-primary-green dark:text-white"
      >
        <IoIosArrowBack className="w-5 h-5" />
        <span> {t(translations.adminPanel.backButton)}</span>
      </button>
      <div>
        {loading ? (
          <div className="my-4 flex h-max justify-center items-start pt-24">
            <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green dark:text-white" />
          </div>
        ) : userData ? (
          <div className="my-8 md:my-4 space-y-2 h-max">
            <div className="flex justify-between items-center p-4 bg-white dark:bg-dark-gray-1 rounded-lg ">
              <div className="text-sm sm:text-[1.125rem] flex gap-1 md:gap-2 items-center text-dark-gray-1 me-3">
                <span className="text-primary-green dark:text-white font-semibold w-[50px] sm:w-fit">
                  {t(translations.adminPanel.users.singleUserPanel.userId)}:
                </span>
                <span className="w-[100px] md:w-auto overflow-x-scroll scrollbar-hide">
                  {userId}
                </span>
                <span>
                  <FaExternalLinkAlt
                    onClick={() => navigate(`/profile/${userData?._id}`)}
                    className="hover:text-gray-1 cursor-pointer"
                  />
                </span>
              </div>
              <div className="flex gap-1 md:gap-2 items-center">
                {userData?.isActive ? (
                  <span className="text-primary-green dark:bg-white text-md sm:text-xl border border-primary-green dark:border-white px-1 sm:px-2 py-1">
                    {t(translations.adminPanel.activeUpper)}
                  </span>
                ) : (
                  <span className="text-warning dark:bg-white text-md sm:text-xl border border-warning px-1 sm:px-2 py-1">
                    {t(translations.adminPanel.suspendedUpper)}
                  </span>
                )}
                <button ref={settingsButtonRef} onClick={handleSettingsButtonClick}>
                  <MdOutlineSettings className="w-5 h-5 sm:w-8 sm:h-8 text-dark-gray-1 dark:text-white hover:text-dark-gray-1" />
                </button>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-2 h-full">
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <h1 className="text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  {t(translations.adminPanel.users.singleUserPanel.userInformations)}
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2">
                  <li className="flex justify-start my-4">
                    <UserAvatar user={userData} size="h-24 w-24" backgroundActive={true} />
                  </li>
                  <li className="flex gap-1 mt-4">
                    <span className="font-semibold">
                      {userData?.userType === "individual"
                        ? t(translations.adminPanel.users.singleUserPanel.fullName)
                        : t(translations.adminPanel.users.singleUserPanel.orgName)}
                      :
                    </span>
                    <span>{userData?.fullName || userData?.organizationName}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.userType)}:
                    </span>
                    <span>{userData?.userType?.toUpperCase()}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.emailAddress)}:
                    </span>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${userData?.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center text-primary-green dark:text-green-300 hover:underline"
                    >
                      {userData?.email} <LuMailPlus />
                    </a>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.createdAt)}:
                    </span>
                    <span>{formatDateWithTime(userData?.createdAt)}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.lastUpdatedAt)}:
                    </span>
                    <span>{formatDateWithTime(userData?.updatedAt)}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <h1 className="text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  {t(translations.adminPanel.users.singleUserPanel.userDetails)}
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2 mt-4">
                  {userData?.userType === "individual" && (
                    <li className="flex gap-1">
                      <span className="font-semibold">
                        {t(translations.adminPanel.users.singleUserPanel.fullNameDisplay)}:
                      </span>
                      <span>
                        {userData?.userDetailsId?.isFullNameDisplay
                          ? t(translations.adminPanel.yes)
                          : t(translations.adminPanel.no)}
                      </span>
                    </li>
                  )}
                  <li className="flex gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.profileSetup)}:
                    </span>
                    <span>
                      {userData?.userDetailsId?.isProfileSetup
                        ? t(translations.adminPanel.yes)
                        : t(translations.adminPanel.no)}
                    </span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.emailVerified)}:
                    </span>
                    <span>
                      {userData?.userDetailsId?.isEmailVerified
                        ? t(translations.adminPanel.yes)
                        : t(translations.adminPanel.no)}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.languages)}:
                    </span>
                    <span>
                      {userData?.userDetailsId?.languages?.length > 0 &&
                        userData?.userDetailsId?.languages
                          .map((language) => getLangName(language))
                          .filter(Boolean)
                          .join(", ")}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.interests)}:
                    </span>
                    <span>
                      {userData?.userDetailsId?.interestIds.length > 0 &&
                        userData?.userDetailsId?.interestIds
                          .map((interest) => getTranslatedCategory(interest.name))
                          .join(" , ")}
                    </span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.address)}:
                    </span>
                    <span>
                      {`${userData?.userDetailsId?.addressId?.userDetailsId?.zipCode || ""} ${userData?.userDetailsId?.addressId?.city || ""}, ${userData?.userDetailsId?.addressId?.country || ""}`}
                    </span>
                  </li>
                  <li className="flex gap-1 flex-col">
                    <span className="font-semibold">
                      {t(translations.adminPanel.users.singleUserPanel.documents)}:{" "}
                    </span>
                    <span>
                      {userData?.documentIds?.length > 0 &&
                        userData?.documentIds.map((document) => {
                          return (
                            <div
                              key={document._id}
                              className="p-1 text-dark-gray-1 rounded cursor-pointer flex flex-col gap-1 items-start"
                            >
                              <span
                                onClick={() => window.open(`${document.fileUrl}`, "_blank")}
                                className="text-sm font-medium flex gap-1 items-center hover:text-gray-1"
                              >
                                - {document.title} <FaExternalLinkAlt />
                              </span>
                              <span className="text-xs text-gray-500">
                                {t(translations.adminPanel.users.singleUserPanel.documentId)}:{" "}
                                {document._id}
                              </span>
                            </div>
                          )
                        })}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>{t(translations.adminPanel.users.singleUserPanel.noUserFound)}</div>
        )}
      </div>
      {isSettingsModalOpen && (
        <div className="absolute z-50 top-14 right-8 border border-gray-1 dark:border-gray-1 overflow-hidden rounded-lg">
          <div ref={modalRef} className="bg-white dark:bg-gray-1 shadow-lg w-[120px] md:w-[200px]">
            <div className="flex flex-col justify-between">
              <button
                onClick={openDeleteUserModal}
                className="text-danger hover:text-danger/50 border-b dark:border-gray-2 hover:bg-light-gray-2 w-full py-2"
              >
                {t(translations.adminPanel.users.singleUserPanel.deleteUser)}
              </button>
              <button
                onClick={handleSuspendEvent}
                className="text-warning hover:text-warning/50 border-b dark:border-gray-2 hover:bg-light-gray-2 w-full py-2"
              >
                {userData?.isActive
                  ? t(translations.adminPanel.users.singleUserPanel.suspendUser)
                  : t(translations.adminPanel.users.singleUserPanel.unsuspendUser)}
              </button>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className=" text-primary-green hover:text-primary-green/50 hover:bg-light-gray-2 w-full py-2"
              >
                {t(translations.adminPanel.cancel)}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      {isDeleteUserModalOpen && (
        <DeleteModal
          onClose={closeDeleteUserModal}
          onDelete={handleDeleteEvent}
          title={t(translations.adminPanel.users.singleUserPanel.deleteUser)}
          description={t(translations.adminPanel.users.singleUserPanel.deleteDescription)}
        />
      )}
    </div>
  )
}

export default SingleUserPanel
