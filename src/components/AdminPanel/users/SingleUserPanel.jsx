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

const SingleUserPanel = ({ userId, setIdentifier }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { fetchSingleData, updateData, deleteData } = useAdminCall()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false)
  const modalRef = useRef(null)
  const settingsButtonRef = useRef(null)
  const { getLangName } = useLanguage()

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
        <span>Back</span>
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
                  User ID:
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
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-warning dark:bg-white text-md sm:text-xl border border-warning px-1 sm:px-2 py-1">
                    SUSPENDED
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
                  User Informations
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2">
                  <li className="flex justify-start my-4">
                    <UserAvatar user={userData} size="h-24 w-24" backgroundActive={true} />
                  </li>
                  <li className="flex gap-1 mt-4">
                    <span className="font-semibold">
                      {userData?.userType === "individual" ? "Full Name:" : "Organization Name"}
                    </span>
                    <span>{userData?.fullName || userData?.organizationName}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">User Type:</span>
                    <span>{userData?.userType?.toUpperCase()}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">Email Address:</span>
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
                    <span className="font-semibold">Created At:</span>
                    <span>{formatDateWithTime(userData?.createdAt)}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">Last Updated At:</span>
                    <span>{formatDateWithTime(userData?.updatedAt)}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-dark-gray-1 rounded-lg w-full xl:w-1/2 p-4">
                <h1 className="text-[1.125rem] font-semibold text-primary-green dark:text-white">
                  User Details
                </h1>
                <ul className="space-y-2 text-dark-gray-1 dark:text-light-gray-2 mt-4">
                  {userData?.userType === "individual" && (
                    <li className="flex gap-1">
                      <span className="font-semibold">Full Name Display:</span>
                      <span>{userData?.userDetailsId?.isFullNameDisplay ? "Yes" : "No"}</span>
                    </li>
                  )}
                  <li className="flex gap-1">
                    <span className="font-semibold">Profile Setup:</span>
                    <span>{userData?.userDetailsId?.isProfileSetup ? "Yes" : "No"}</span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Email Verified:</span>
                    <span>{userData?.userDetailsId?.isEmailVerified ? "Yes" : "No"}</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">Languages:</span>
                    <span>
                      {userData?.userDetailsId?.languages?.length > 0 &&
                        userData?.userDetailsId?.languages
                          .map((language) => getLangName(language))
                          .filter(Boolean)
                          .join(", ")}
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1">
                    <span className="font-semibold">Interests:</span>
                    <span>
                      {userData?.userDetailsId?.interestIds.length > 0 &&
                        userData?.userDetailsId?.interestIds
                          .map((interest) => interest.name)
                          .join(" , ")}
                    </span>
                  </li>
                  <li className="flex gap-1">
                    <span className="font-semibold">Address:</span>
                    <span>
                      {`${userData?.userDetailsId?.addressId?.userDetailsId?.zipCode || ""} ${userData?.userDetailsId?.addressId?.city || ""} ${userData?.userDetailsId?.addressId?.country || ""}`}
                    </span>
                  </li>
                  <li className="flex gap-1 flex-col">
                    <span className="font-semibold">Documents: </span>
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
                                Document Id: {document._id}
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
          <div>No User Found</div>
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
                Delete User
              </button>
              <button
                onClick={handleSuspendEvent}
                className="text-warning hover:text-warning/50 border-b dark:border-gray-2 hover:bg-light-gray-2 w-full py-2"
              >
                {userData?.isActive ? "Suspend User" : "Unsuspend User"}
              </button>
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className=" text-primary-green hover:text-primary-green/50 hover:bg-light-gray-2 w-full py-2"
              >
                Cancel
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
          title={`Delete User`}
          description={`Are you sure you want to delete this user?`}
        />
      )}
    </div>
  )
}

export default SingleUserPanel
