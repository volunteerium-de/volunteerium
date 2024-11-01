import React, { useState, useRef, useEffect } from "react"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import MyDocumentsModal from "./MyDocumentsModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"

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

    // Add event listener for mousedown event
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-[1rem] leading-[1.5625] text-gray-2">{label}</label>
      <div
        className="border border-gray-300 rounded-lg p-2 mt-2 cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span className="text-dark-gray-1">
          {selectedOptions.length > 0 ? selectedOptions.join(", ") : ` ${options[0]}`}
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
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const IndividualSettingsForm = ({ currentUser }) => {
  const {t} = useTranslation
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: "First aid certificate",
      fileName: "First aid certificate.pdf",
    },
    {
      id: 2,
      name: "CPR certificate",
      fileName: "CPR certificate.pdf",
    },
    {
      id: 3,
      name: "Advanced first aid certificate",
      fileName: "Advanced first aid certificate.pdf",
    },
    {
      id: 4,
      name: "Lifeguard certificate",
      fileName: "Lifeguard certificate.pdf",
    },
    {
      id: 5,
      name: "Safety training certificate",
      fileName: "Safety training certificate.pdf",
    },
    {
      id: 6,
      name: "Project management certificate",
      fileName: "Project management certificate.pdf",
    },
  ])

  const [city, setCity] = useState(currentUser.userDetailsId.addressId.city)
  const [country, setCountry] = useState(currentUser.userDetailsId.addressId.country)
  const [gender, setGender] = useState(currentUser.userDetailsId.gender)
  const [ageGroup, setAgeGroup] = useState(currentUser.userDetailsId.ageRange)
  const [languages, setLanguages] = useState(currentUser.userDetailsId.languages)
  const [bio, setBio] = useState(currentUser.userDetailsId.bio)

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleDeleteCertificate = (id) => {
    const updatedCertificates = certificates.filter((cert) => cert.id !== id)
    setCertificates(updatedCertificates)
  }
  const handleUpdateCertificates = (updatedCertificates) => {
    setCertificates(updatedCertificates)
    console.log("Certificates updated:", updatedCertificates)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    // List of fields to validate
    const requiredFields = [city, country, gender, ageGroup, bio]
    const hasLanguages = languages.length > 0 // Ensure at least one language is selected

    // Validate form fields
    if (requiredFields.every((field) => field) && hasLanguages) {
      // Proceed with form submission
      const userData = {
        gender,
        ageGroup,
        languages,
        city,
        country,
        bio,
      }

      try {
        const response = await fetch("https://api.example.com/user", {
          method: "POST", // or "PUT"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const result = await response.json()
        setSuccessMessage(t(translations.indvSettings.success))
        setErrorMessage("") // Reset previous error message

        console.log("Saved data:", result)
      } catch (error) {
        setErrorMessage(t(translations.indvSettings.catchError) + error.message)
        setSuccessMessage("") // Reset previous success message
      }
    } else {
      setErrorMessage(t(translations.indvSettings.elseError))
    }
  }
  return (
    <div>
      <div className="font-Poppins max-w-[698px] mx-auto p-2 px-12 w-full h-auto bg-white rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-[10px]">
            <h1 className="text-center font-medium text-[1.5rem] my-[20px]">{t(translations.indvSettings.h1)}</h1>

            {/* Name Appearance Section */}
            <div className="flex flex-col flex-wrap">
              <p className="block text-[1rem]  text-gray-2 ">{t(translations.indvSettings.p1)}</p>
              <div className="flex flex-col flex-wrap sm:flex-row gap-5">
                <div className="flex flex-1 items-center gap-2 h-[36px] mt-1 border border-gray-300 rounded-lg p-2">
                  <input
                    type="radio"
                    id="juliaBretzel"
                    name="person"
                    value={currentUser.fullName}
                  />
                  <label className="text-primary-green" htmlFor="fullName">
                    {currentUser.fullName}
                  </label>
                </div>
                <div className="flex flex-1 items-center gap-2 h-[36px] mt-1 border border-gray-300 rounded-lg p-2">
                  <input
                    type="radio"
                    id="shortname"
                    name="person"
                    value={`${currentUser.fullName.split(" ")[0]} ${currentUser.fullName.split(" ")[1]}`}
                  />
                  <label className="text-dark-gray-1" htmlFor="shortName">
                    {`${currentUser.fullName.split(" ")[0]} ${currentUser.fullName.split(" ")[1]?.charAt(0)}.`}
                  </label>
                </div>
              </div>
              <p className="text-[0.875rem] text-dark-gray-2 leading-[1.785]">
                {t(translations.indvSettings.p2)}
              </p>
            </div>
          </div>

          {/* City and Country Section */}
          <div className="flex flex-col flex-wrap sm:flex-row gap-5 mb-[25px]">
            <div className="flex-1 flex flex-col">
              <label className="block text-[1rem] leading-[1.5625] text-gray-2" htmlFor="city">
                {t(translations.indvSettings.label1)}
              </label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder= {t(translations.indvSettings.label1PH)}
                className="h-[36px] mt-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="block text-[1rem] leading-[1.5625] text-gray-2" htmlFor="country">
              {t(translations.indvSettings.label2)}
              </label>
              <input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                placeholder= {t(translations.indvSettings.label2PH)}
                className="h-[36px] mt-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
              />
            </div>
          </div>

          {/* Gender, Age Group, Languages Section */}
          <div className="flex flex-row flex-wrap max-[780px]:flex-col gap-5 mb-[5px]">
            <div className="flex-1 ">
              <CustomDropdown
                label= {t(translations.indvSettings.label3)}
                options={["Male", "Female", "Non-binary", "Other"]}
                selectedOptions={[gender]}
                onChange={(selectedOptions) => setGender(selectedOptions[0])}
                isMultiSelect={false}
                l
              />
            </div>
            <div className="flex-1">
              <CustomDropdown
                label= {t(translations.indvSettings.label4)}
                options={["18-25", "26-35", "36-45", "46-60", "60+"]}
                selectedOptions={[ageGroup]}
                onChange={(selectedOptions) => setAgeGroup(selectedOptions[0])}
                isMultiSelect={false}
              />
            </div>
            <div className="flex-1">
              <CustomDropdown
                label= {t(translations.indvSettings.label5)}
                options={["English", "German", "Turkish"]}
                selectedOptions={languages}
                onChange={setLanguages}
                isMultiSelect={true}
              />
            </div>
          </div>
          {/* Bio Section */}
          <div className="my-[5px] w-full">
            <label className="block text-[1rem] leading-[1.5625] text-gray-2" htmlFor="bio">
            {t(translations.indvSettings.label6)}
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full md:max-w-[600px] lg:max-w-[800px] h-[100px] md:h-[150px] lg:h-[150px] mt-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
              placeholder="Write your bio here..."
            ></textarea>
          </div>

          {/* Files Section */}
          <div className="mx-auto px-4">
            <div className="flex justify-between ">
              <p className="text-[1rem] leading-[1.5625] text-gray-2">{t(translations.indvSettings.label7)}</p>
              <p
                className="text-[1rem] leading-[1.5625] text-primary-green cursor-pointer"
                onClick={openModal}
              >
                {t(translations.indvSettings.edit)}
              </p>
            </div>

            <div className={`max-h-[200px] overflow-y-auto border border-gray-300 rounded-lg p-2`}>
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className={`bg-light-gray mb-[${certificate.id === certificates.length ? 25 : 15}px] w-full`}
                >
                  <p className="text-dark-gray-1">{certificate.name}</p>
                  <p className="text-[0.875rem] text-gray-1">{certificate.fileName}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Success/Error Messages */}
          {successMessage && (
            <div className="text-primary-green text-center mt-3">{successMessage}</div>
          )}
          {errorMessage && <div className="text-danger text-center mt-3">{errorMessage}</div>}
          {/* Save Button */}
          <div>
            <button type="submit" className="bg-primary-green w-full py-[7px] rounded-md mt-2">
              <p className="text-[1rem] text-white">{t(translations.indvSettings.save)}</p>
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <MyDocumentsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          certificates={certificates}
          onDeleteCertificate={handleDeleteCertificate}
          onUpdateCertificates={handleUpdateCertificates}
        />
      )}
    </div>
  )
}

export default IndividualSettingsForm
