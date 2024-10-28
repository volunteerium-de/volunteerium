import React from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { MdOutlineVisibility } from "react-icons/md"
import { MdOutlineSecurity } from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import { useState } from "react"
import AvatarEditModal from "../components/UserSettings/AvatarEditModal"
import ProfileSettings from "../components/UserSettings/ProfileSettings"
import SecuritySettings from "../components/UserSettings/SecuritySettings"
import VisibilitySettings from "../components/UserSettings/VisibilitySettings"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import Header from "../components/Header/Header"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"
translations

const UserSettings = () => {
  const {t} = useTranslation()
  const [currentUser, setCurrentUser] = useState(
    // {
    //   _id: "650c697f1c4ae3b5e8bfcdb1",
    //   userType: "individual",
    //   fullName: "Alice Johnson",
    //   email: "alice.johnson@example.com",
    //   organizationName: "",
    //   userDetailsId: {
    //     _id: "650c6a3a1c4ae3b5e8bfcdac",
    //     userId: "650c697f1c4ae3b5e8bfcdb1",
    //     isFullNameDisplay: true,
    //     gender: "female",
    //     ageRange: "26-35",
    //     bio: "Passionate about community service and environmental sustainability.",
    //     languages: ["en", "fr", "de"],
    //     avatar:
    //       "https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg",
    //     totalPoint: 450,
    //     interestIds: [
    //       { _id: "a1b2c3d4e5f6g7h8i9j0k1l2", name: "animal" },
    //       { _id: "b2c3d4e5f6g7h8i9j0k1l2m3", name: "environment" },
    //       { _id: "c3d4e5f6g7h8i9j0k1l2m3n4", name: "health" },
    //     ],
    //     organizationLogo: "",
    //     organizationDesc: "",
    //     addressId: {
    //       _id: "650c6b4b1c4ae3b5e8bfcdc7",
    //       city: "Munich",
    //       country: "Germany",
    //       zipCode: "80331",
    //       state: "Bavaria",
    //       streetName: "Marienplatz",
    //       streetNumber: "1",
    //       additional: "Near the New Town Hall",
    //       iframeSrc:
    //         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5900098446964!2d11.572142177922961!3d48.137429451169446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75f4d5d25587%3A0xc4e347226b3ab033!2sMarienplatz%201%2C%2080331%20M%C3%BCnchen!5e0!3m2!1str!2sde!4v1726665817507!5m2!1str!2sde",
    //     },
    //     organizationUrl: "",
    //   },
    //   isActive: true,
    //   isSetup: true,
    //   documentIds: [],
    //   createdAt: "2023-09-18T14:34:56.789Z",
    //   updatedAt: "2023-09-18T14:34:56.789Z",
    // }
    {
      _id: "650c5a4f1c4ae3b5e8bfcdb0",
      userType: "organization",
      fullName: "Green Earth Org",
      email: "contact@greenearth.org",
      userDetailsId: {
        _id: "650c5a7a1c4ae3b5e8bfcdb3",
        userId: "650c5a4f1c4ae3b5e8bfcdb0",
        isFullNameDisplay: true,
        gender: "",
        ageRange: "",
        bio: "We are dedicated to making the planet greener and cleaner.",
        languages: [],
        avatar: "",
        totalPoint: 0,
        interestIds: [],
        organizationName: "Green Earth Org",
        organizationLogo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxwZpSs9IU4bCRfFrY-wXSDdbMR1cwod_TA&s",
        organizationDesc: "A non-profit organization focused on environmental sustainability.",
        addressId: {
          _id: "650c5b3b1c4ae3b5e8bfcdc1",
          city: "Berlin",
          country: "Germany",
          zipCode: "10115",
          state: "Berlin",
          streetName: "Alexanderplatz",
          streetNumber: "1",
          additional: "Suite 10",
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.669082902881!2d13.410042978021215!3d52.52132753612963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fc57b75cc47%3A0x5d30d5b670e16fad!2sAlexanderpl.%201%2C%2010178%20Berlin!5e0!3m2!1str!2sde!4v1726665851130!5m2!1str!2sde",
        },
        organizationUrl: "https://greenearth.org",
      },
    }
  )
  const [isModalOpen, setModalOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get("tab") || "profile"

  useEffect(() => {
    setSearchParams({ tab })
  }, [tab, setSearchParams])

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const getMenuClassName = (item) => {
    return `max-w-[374px] h-[50px] bg-white flex items-center gap-5 p-4 hover:bg-gray-100 mt-[20px] relative ${
      tab === item ? "bg-gray-white" : ""
    }`
  }

  const renderContent = () => {
    switch (tab) {
      case "profile":
        return <ProfileSettings />
      case "security":
        return <SecuritySettings currentUser={currentUser} />
      case "visibility":
        return <VisibilitySettings />
      default:
        return <ProfileSettings />
    }
  }

  const handleUpdateAvatar = (newAvatar) => {
    // Update the current user's avatar or organization logo in the state
    setCurrentUser((prevUser) => ({
      ...prevUser,
      userDetailsId: {
        ...prevUser.userDetailsId,
        // Check if user is an organization, update organizationLogo, otherwise update avatar
        ...(prevUser.userType === "organization"
          ? { organizationLogo: newAvatar } // Update logo for organization
          : { avatar: newAvatar }), // Update avatar for individual user
      },
    }))

    // Optionally: Send newAvatar to the server to save it permanently
    // axios.post('/api/update-avatar', { avatar: newAvatar })...
  }

  return (
    <>
      <Header />
      <div className="flex bg-light-green dark:bg-dark-green py-5 ">
        {/* Sidebar */}
        <div className="sm:w-[350px] w-[80px] sm:min-w-[300px] h-auto min-h-screen py-[30px] bg-light-gray font-Poppins transition-all duration-300 ease-in-out  shadow-lg rounded-r-lg ">
          {/* Avatar */}
          <div>
            <img
              src={
                currentUser.userType === "organization"
                  ? currentUser.userDetailsId.organizationLogo
                  : currentUser.userDetailsId.avatar
              }
              alt= {t(translations.userSettings.avatarAlt)}
              className="sm:max-w-[200px] sm:max-h-[200px] rounded-full mx-auto min-w-[80px] min-h-[80px] "
            />

            <button
              onClick={openModal}
              className="mx-auto bg-white p-[2.5px] rounded-[6px] text-center border border-primary-green gap-2 sm:flex flex sm:translate-y-[-30px] sm:translate-x-[-20px] translate-x-[-10px] translate-y-[-20px] "
            >
              <CiEdit className="text-primary-green mt-[2px]" />
              <p className="text-[0.875rem] text-primary-green font-medium leading-[1.5625] sm:flex hidden">
              {t(translations.userSettings.edit)}
              </p>
            </button>
            <AvatarEditModal
              isOpen={isModalOpen}
              onClose={closeModal}
              currentUser={currentUser}
              onUpdateAvatar={handleUpdateAvatar}
            />
            {/* Welcome */}
            <p className="font-bold text-gray-2 text-[1rem] text-center tracking-wider mt-[10px] mb-[30px] hidden sm:block">
            {t(translations.userSettings.welcome)}{" "}
              {`${currentUser.userType === "individual" ? currentUser.fullName.split(" ")[0] : ""}`}
              !
            </p>
          </div>
          <hr className="max-w-[333px] mx-auto sm:hidden" />

          {/* Menu */}
          <div className="my-[30px]">
            <ul className="text-gray-2 dark:bg-dark-gray-2 text-[1.125rem] font-medium ">
              {/* Settings */}
              <li
                className={getMenuClassName("profile")}
                onClick={() => setSearchParams({ tab: "profile" })}
              >
                <IoSettingsOutline className="w-[20px] h-[20px] mx-auto" />
                <a href="" className="flex-1 sm:block hidden">
                {t(translations.userSettings.profile)}
                </a>
                {tab === "profile" && (
                  <span className="sm:w-[16px] w-[8px] sm:h-[50px] h-[50px] bg-dark-green absolute right-[-0px] top-0"></span>
                )}
              </li>

              {/* Security */}
              <li
                className={getMenuClassName("security")}
                onClick={() => setSearchParams({ tab: "security" })}
              >
                <MdOutlineSecurity className="w-[20px] h-[20px] mx-auto" />
                <a href="" className="flex-1 sm:block hidden">
                {t(translations.userSettings.security)}
                </a>
                {tab === "security" && (
                  <span className="w-[16px] h-[50px] bg-dark-green absolute right-[-0px] top-0"></span>
                )}
              </li>

              {/* Visibility */}
              <li
                className={getMenuClassName("visibility")}
                onClick={() => setSearchParams({ tab: "visibility" })}
              >
                <MdOutlineVisibility className="w-[20px] h-[20px] mx-auto" />
                <a href="" className="flex-1 sm:block hidden">
                {t(translations.userSettings.visibility)}
                </a>
                {tab === "visibility" && (
                  <span className="w-[16px] h-[50px] bg-dark-green absolute right-[-0px] top-0"></span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Content area */}
        <div className="bg-light-green dark:bg-dark-green flex-1 px-5 ">{renderContent()}</div>
      </div>
    </>
  )
}

export default UserSettings
