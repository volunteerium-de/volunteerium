import React, { useState, useRef, useEffect } from "react"
import { FaAngleDown, FaAngleUp, FaExternalLinkAlt } from "react-icons/fa"
import MyDocumentsModal from "./MyDocumentsModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useSelector } from "react-redux"
import useAccountCall from "../../hooks/useAccountCall"
import toastNotify from "../../utils/toastNotify"

// Custom Dropdown Component
const CustomDropdown = ({ options, label, selectedOptions, isMultiSelect, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (option) => {
    if (isMultiSelect) {
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((selected) => selected !== option)
        : [...selectedOptions, option]

      onChange(updatedOptions)
    } else {
      onChange([option])
      setIsOpen(false)
    }
  }
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const getOptionLabel = (option) => {
    switch (option) {
      case "male":
        return "Male"
      case "female":
        return "Female"
      case "n/a":
        return "Prefer not to say"
      default:
        return option
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[1rem] leading-[1.5625] text-gray-2">{label}</label>
      <div
        className="mt-2 cursor-pointer flex justify-between items-center p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
        onClick={toggleDropdown}
      >
        <span className="text-dark-gray-1">
          {selectedOptions.length > 0
            ? selectedOptions.map(getOptionLabel).join(", ")
            : ` ${options.length > 0 ? getOptionLabel(options[0]) : ""}`}
        </span>
        <span className="text-dark-gray-1">{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-light-green cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {getOptionLabel(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Reusable Input Field Component
const InputField = ({ id, label, value, onChange, placeholder }) => (
  <div className="flex-1 flex flex-col">
    <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
    />
  </div>
)

// Reusable Radio Input Component
const RadioInput = ({ id, label, checked, onChange }) => (
  <div className="flex flex-1 items-center gap-2 h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green">
    <input
      type="radio"
      id={id}
      name="displayName"
      checked={checked}
      onChange={onChange}
      className="accent-primary-green"
    />
    <label className={checked ? "text-primary-green" : "text-dark-gray-1"} htmlFor={id}>
      {label}
    </label>
  </div>
)

const IndividualSettingsForm = () => {
  const { t } = useTranslation()
  const { currentUser } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [certificates, setCertificates] = useState([])
  const { updateUser } = useAccountCall()

  const initialUserDetails = {
    city: "",
    country: "",
    gender: "",
    ageRange: "",
    languages: [],
    bio: "",
    isFullNameDisplay: false,
  }

  const { userDetailsId } = currentUser
  const defaultUserDetails = {
    isFullNameDisplay: userDetailsId.isFullNameDisplay,
    city: userDetailsId.addressId?.city || "",
    country: userDetailsId.addressId?.country || "",
    bio: userDetailsId.bio || "",
    gender: userDetailsId.gender || "",
    ageRange: userDetailsId.ageRange || "",
    languages: userDetailsId.languages || [],
  }

  const [userDetailsForm, setUserDetailsForm] = useState(initialUserDetails)

  useEffect(() => {
    setUserDetailsForm(defaultUserDetails)
    setCertificates(currentUser.documentIds || [])
  }, [currentUser])

  const handleChange = (field) => (value) => {
    setUserDetailsForm((prev) => ({ ...prev, [field]: value }))
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await updateUser(userDetailsForm)
      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error.response.data.message)
    }
  }

  return (
    <div>
      <div className="font-Poppins max-w-[698px] mx-auto p-2 px-12 w-full h-auto bg-light-gray rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-[10px]">
            <h1 className="text-center font-medium text-[1.25rem] my-[20px]">
              {t(translations.indvSettings.h1)}
            </h1>

            {/* Name Appearance Section */}
            <div className="flex flex-col flex-wrap">
              <p className="block text-dark-gray-2 dark:text-white mb-2">
                {t(translations.indvSettings.p1)}
              </p>
              <div className="flex flex-col flex-wrap sm:flex-row gap-5">
                <RadioInput
                  id="fullName"
                  label={currentUser.fullName}
                  checked={userDetailsForm.isFullNameDisplay}
                  onChange={() => handleChange("isFullNameDisplay")(true)}
                  className="accent-primary-green"
                />
                <RadioInput
                  id="shortName"
                  label={`${currentUser.fullName.split(" ")[0]} ${currentUser.fullName.split(" ")[1]?.charAt(0)}.`}
                  checked={!userDetailsForm.isFullNameDisplay}
                  onChange={() => handleChange("isFullNameDisplay")(false)}
                  className="accent-primary-green"
                />
              </div>
              <p className="text-[0.875rem] text-dark-gray-2 leading-[1.785]">
                {t(translations.indvSettings.p2)}
              </p>
            </div>
          </div>

          {/* City and Country Section */}
          <div className="flex flex-col flex-wrap sm:flex-row gap-5 mb-[25px]">
            <InputField
              id="city"
              label={t(translations.indvSettings.label1)}
              value={userDetailsForm.city}
              onChange={handleChange("city")}
              placeholder={t(translations.indvSettings.label1PH)}
            />

            <InputField
              id="country"
              label={t(translations.indvSettings.label2)}
              value={userDetailsForm.country}
              onChange={handleChange("country")}
              placeholder={t(translations.indvSettings.label2PH)}
            />
          </div>

          {/* Gender, Age Group, Languages Section */}
          <div className="flex flex-row flex-wrap max-[780px]:flex-col gap-5 mb-[5px]">
            <div className="flex-1 ">
              <CustomDropdown
                label={t(translations.indvSettings.label3)}
                options={["male", "female", "n/a"]}
                selectedOptions={[userDetailsForm.gender]}
                onChange={(selectedOptions) => handleChange("gender")(selectedOptions[0])}
                isMultiSelect={false}
                l
              />
            </div>
            <div className="flex-1">
              <CustomDropdown
                label={t(translations.indvSettings.label4)}
                options={["16-25", "26-35", "35+"]}
                selectedOptions={[userDetailsForm.ageRange]}
                onChange={(selectedOptions) => handleChange("ageRange")(selectedOptions[0])}
                isMultiSelect={false}
              />
            </div>
            <div className="flex-1">
              <CustomDropdown
                label={t(translations.indvSettings.label5)}
                options={["English", "German", "Turkish"]}
                selectedOptions={userDetailsForm.languages}
                onChange={handleChange("languages")}
                isMultiSelect={true}
              />
            </div>
          </div>
          {/* Bio Section */}
          <div className="my-[5px] w-full">
            <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="bio">
              {t(translations.indvSettings.label6)}
            </label>
            <textarea
              id="bio"
              value={userDetailsForm.bio}
              onChange={(e) => handleChange("bio")(e.target.value)}
              className="w-full md:max-w-[600px] lg:max-w-[800px] h-[100px] md:h-[150px] lg:h-[150px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
              placeholder="Write your bio here..."
            ></textarea>
          </div>

          {/* Files Section */}
          <div className="mx-auto ">
            <div className="flex justify-between  ">
              <p className="text-[1rem] leading-[1.5625] text-gray-2">
                {t(translations.indvSettings.label7)}
              </p>
              <p
                className="text-[1rem] leading-[1.5625] text-primary-green cursor-pointer"
                onClick={openModal}
              >
                {t(translations.indvSettings.edit)}
              </p>
            </div>

            <div
              className={`max-h-[200px] overflow-y-auto p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green`}
            >
              {certificates.map((certificate, index) => {
                const marginBottom = index === certificates.length - 1 ? "mb-25" : "mb-15"
                return (
                  <div
                    key={certificate.id}
                    onClick={() => window.open(certificate.fileUrl, "_blank")}
                    className={`bg-light-gray-2 ${marginBottom} w-full`}
                  >
                    <p className="text-dark-gray-1 hover:text-dark-gray-2 cursor-pointer font-medium flex gap-2 items-center">
                      {certificate.title}{" "}
                      <span>
                        <FaExternalLinkAlt size={12} />
                      </span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="text-center py-2 flex space-x-2">
            <button
              type="reset"
              onClick={() => setUserDetailsForm(defaultUserDetails)}
              className="bg-danger flex-1 py-2 px-4 text-white rounded hover:bg-danger/20"
            >
              <p className="text-[1rem] text-white">{t(translations.indvSettings.reset)}</p>
            </button>
            <button
              type="submit"
              className="bg-primary-green flex-1 py-2 px-4 text-white rounded hover:bg-light-green"
            >
              <p className="text-[1rem] text-white">{t(translations.indvSettings.save)}</p>
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <MyDocumentsModal isOpen={isModalOpen} onClose={closeModal} certificates={certificates} />
      )}
    </div>
  )
}

export default IndividualSettingsForm
