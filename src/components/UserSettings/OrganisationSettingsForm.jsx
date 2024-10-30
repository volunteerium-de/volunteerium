import React, { useState, useEffect } from "react"
import MyDocumentsModal from "./MyDocumentsModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useSelector } from "react-redux"

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

// Reusable Text Area Component
const TextAreaField = ({ id, label, value, onChange, placeholder }) => (
  <div className="my-[5px] w-full">
    <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor={id}>
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full md:max-w-[600px] lg:max-w-[800px] h-[100px] md:h-[150px] lg:h-[150px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
    />
  </div>
)

const OrganisationSettingsForm = () => {
  const { t } = useTranslation()
  const { currentUser } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [certificates, setCertificates] = useState([])

  const defaultUserDetails = {
    streetName: "",
    streetNumber: "",
    zipCode: "",
    city: "",
    country: "",
    organizationDesc: "",
    organizationUrl: "",
    organizationName: "",
  }

  const [userDetailsForm, setUserDetailsForm] = useState(defaultUserDetails)

  useEffect(() => {
    const { userDetailsId } = currentUser
    setUserDetailsForm({
      name: userDetailsId.organizationName || "",
      url: userDetailsId.organizationUrl || "",
      streetName: userDetailsId.addressId?.streetName || "",
      streetNumber: userDetailsId.addressId?.streetNumber || "",
      zipCode: userDetailsId.addressId?.zipCode || "",
      city: userDetailsId.addressId?.city || "",
      country: userDetailsId.addressId?.country || "",
      desc: userDetailsId.organizationDesc || "",
    })

    setCertificates(currentUser.documentIds || [])
  }, [currentUser])

  const handleChange = (field) => (value) => {
    setUserDetailsForm((prev) => ({ ...prev, [field]: value }))
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleDeleteCertificate = (id) => {}

  const handleUpdateCertificates = (updatedCertificates) => {}

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-Poppins max-w-[698px] mx-auto p-2 px-12 w-full h-auto bg-light-gray rounded-md">
        <div className="mb-[10px]">
          <h1 className="text-center font-medium text-[1.25rem] my-[20px]">
            {t(translations.orgSettings.h1)}
          </h1>

          {/* Name Appearance Section */}
          <div className="flex flex-col flex-wrap">
            <div className="flex flex-col flex-wrap sm:flex-row gap-5 ">
              <InputField
                id="name"
                label={t(translations.orgSettings.label1)}
                value={userDetailsForm.organizationName}
                onChange={handleChange("organizationName")}
                placeholder={t(translations.orgSettings.label1PH)}
              />
              <InputField
                id="url"
                label={t(translations.orgSettings.label2)}
                value={userDetailsForm.organizationUrl}
                onChange={handleChange("organizationUrl")}
                placeholder={t(translations.orgSettings.label2PH)}
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 mb-[10px]">
          <InputField
            id="streetName"
            label={t(translations.orgSettings.label3)}
            value={userDetailsForm.streetName}
            onChange={handleChange("streetName")}
            placeholder={t(translations.orgSettings.label3PH)}
          />
          <InputField
            id="streetNumber"
            label={t(translations.orgSettings.label4)}
            value={userDetailsForm.streetNumber}
            onChange={handleChange("streetNumber")}
            placeholder={t(translations.orgSettings.label4PH)}
          />
          <InputField
            id="zipCode"
            label={t(translations.orgSettings.label5)}
            value={userDetailsForm.zipCode}
            onChange={handleChange("zipCode")}
            placeholder={t(translations.orgSettings.label5PH)}
          />
        </div>
        <div className="flex flex-col flex-wrap sm:flex-row gap-5 ">
          <InputField
            id="city"
            label={t(translations.orgSettings.label6)}
            value={userDetailsForm.city}
            onChange={handleChange("city")}
            placeholder={t(translations.orgSettings.label6PH)}
          />
          <InputField
            id="country"
            label={t(translations.orgSettings.label7)}
            value={userDetailsForm.country}
            onChange={handleChange("country")}
            placeholder={t(translations.orgSettings.label7PH)}
          />
        </div>

        {/* Description Section */}

        <TextAreaField
          id="bio"
          label={t(translations.orgSettings.label8)}
          value={userDetailsForm.organizationDesc}
          onChange={handleChange("organizationDesc")}
          placeholder={t(translations.orgSettings.label8PH)}
        ></TextAreaField>

        {/* Files Section */}
        <div className="mx-auto">
          <div className="flex justify-between">
            <p className="text-[1rem] ">{t(translations.orgSettings.files)}</p>
            <p
              className="text-[1rem] leading-[1.5625] text-primary-green cursor-pointer"
              onClick={openModal}
            >
              {t(translations.orgSettings.edit)}
            </p>
          </div>
          <div>
            <div
              className={`max-h-[200px] overflow-y-auto p-2 border border-gray-1 rounded focus:outline-none`}
            >
              {certificates.map((certificate, index) => {
                const marginBottom = index === certificates.length - 1 ? "mb-25" : "mb-15"
                return (
                  <div key={certificate.id} className={`bg-light-gray-2 ${marginBottom} w-full`}>
                    <p className="text-dark-gray-1">{certificate.name}</p>
                    <p className="text-[0.875rem] text-gray-1 ">{certificate.fileName}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
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
    </form>
  )
}

export default OrganisationSettingsForm
