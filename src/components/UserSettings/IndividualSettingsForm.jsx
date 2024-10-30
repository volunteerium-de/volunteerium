import React, { useState, useEffect } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import MyDocumentsModal from "./MyDocumentsModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useSelector } from "react-redux"
import useAccountCall from "../../hooks/useAccountCall"
import toastNotify from "../../utils/toastNotify"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import LanguageSelect from "../../components/ui/Selects/LanguageSelect"
import SelectInput from "../ui/Selects/SelectInput"

// Validation Schema
const IndividualSchema = Yup.object().shape({
  city: Yup.string().nullable().max(100, "City cannot exceed 100 characters"),
  country: Yup.string().nullable().max(100, "Country cannot exceed 100 characters"),
  bio: Yup.string().max(250, "Bio cannot exceed 250 characters"),
  gender: Yup.string().nullable(),
  ageRange: Yup.string().nullable(),
  isFullNameDisplay: Yup.boolean(),
  languages: Yup.array().nullable(),
})

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
  const { updateUserDetails } = useAccountCall()

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

  useEffect(() => {
    setCertificates(currentUser.documentIds || [])
  }, [currentUser])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = async (values) => {
    // console.log("Form submitted with values:", values)
    try {
      const data = await updateUserDetails(values)
      toastNotify("success", data.message)
    } catch (error) {
      console.error("Update failed:", error)
      toastNotify("error", error.response?.data?.message || "An error occurred")
    }
  }

  const ageRangeOptions = [
    { label: "16-25", value: "16-25" },
    { label: "26-35", value: "26-35" },
    { label: "35+", value: "35+" },
  ]

  const genderOptions = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "Prefer not to say", value: "Prefer not to say" },
  ]

  return (
    <div>
      <div className="max-w-4xl mx-auto p-8 bg-light-gray dark:bg-dark-gray-3 rounded-lg shadow-md">
        <Formik
          initialValues={defaultUserDetails}
          validationSchema={IndividualSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, resetForm, errors, touched }) => (
            <Form>
              <div className="mb-[10px]">
                <h1 className="text-center font-medium text-[1.25rem]">
                  {t(translations.indvSettings.h1)}
                </h1>

                <div className="flex flex-col flex-wrap">
                  <p className="block text-dark-gray-2 dark:text-white mb-2">
                    {t(translations.indvSettings.p1)}
                  </p>

                  <div className="flex flex-col flex-wrap sm:flex-row gap-5">
                    <RadioInput
                      id="fullName"
                      label={currentUser.fullName}
                      checked={values.isFullNameDisplay}
                      onChange={() => setFieldValue("isFullNameDisplay", true)}
                    />
                    <RadioInput
                      id="shortName"
                      label={`${currentUser.fullName.split(" ")[0]} ${currentUser.fullName.split(" ")[1]?.charAt(0)}.`}
                      checked={!values.isFullNameDisplay}
                      onChange={() => setFieldValue("isFullNameDisplay", false)}
                    />
                  </div>
                  <p className="text-[0.875rem] text-dark-gray-2 leading-[1.785]">
                    {t(translations.indvSettings.p2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col flex-wrap sm:flex-row gap-5 mb-[25px]">
                <div className="flex-1 flex flex-col relative">
                  <label className="block text-dark-gray-2 dark:text-white mb-2">City</label>
                  <Field
                    label={t(translations.indvSettings.label1)}
                    id="city"
                    name="city"
                    maxLength="101"
                    placeholder={t(translations.indvSettings.label1PH)}
                    className={`h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green ${errors.city ? "border-danger" : ""}`}
                  />
                  {errors.city && (
                    <div className="text-danger text-sm absolute -bottom-5">{errors.city}</div>
                  )}
                </div>
                <div className="flex-1 flex flex-col relative">
                  <label className="block text-dark-gray-2 dark:text-white mb-2">Country</label>
                  <Field
                    label={t(translations.indvSettings.label2)}
                    id="country"
                    name="country"
                    maxLength="101"
                    placeholder={t(translations.indvSettings.label2PH)}
                    className={`h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green ${errors.country ? "border-danger" : ""}`}
                  />
                  {errors.country && (
                    <div className="text-danger text-sm absolute -bottom-5">{errors.country}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-row flex-wrap max-[780px]:flex-col gap-4 mb-[5px]">
                <div className="flex-1">
                  <p className="block text-dark-gray-2 dark:text-white mb-2">Gender</p>
                  <SelectInput
                    name="gender"
                    placeholder={values.gender || "Add gender"}
                    options={genderOptions}
                    onChange={(value) => setFieldValue("gender", value)}
                  />
                </div>
                <div className="flex-1">
                  <p className="block text-dark-gray-2 dark:text-white mb-2">Age</p>
                  <SelectInput
                    name="ageRange"
                    placeholder={values.ageRange || "Add age range"}
                    options={ageRangeOptions}
                    onChange={(value) => setFieldValue("ageRange", value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <LanguageSelect />
              </div>

              <div className="mb-[20px]">
                <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="bio">
                  {t(translations.indvSettings.label6)}
                </label>
                <Field
                  as="textarea"
                  id="bio"
                  name="bio"
                  maxLength="250"
                  placeholder={t(translations.indvSettings.label6PH)}
                  className="w-full p-2 border border-gray-1 rounded h-[100px] focus:outline-none focus:border-primary-green"
                />
                <p className="text-sm text-gray-500">{values.bio.length}/250 characters</p>
              </div>

              <div className="mx-auto ">
                <div className="flex justify-between">
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

                <div className="max-h-[200px] overflow-y-auto p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green">
                  {certificates.map((certificate, index) => {
                    const marginBottom = index === certificates.length - 1 ? "mb-25" : "mb-15"
                    return (
                      <div
                        key={certificate._id}
                        onClick={() => window.open(certificate.fileUrl, "_blank")}
                        className={`flex justify-between items-center bg-light-gray-2 ${marginBottom} w-full h-[40px] mb-[10px]`}
                      >
                        <p className="text-dark-gray-1 hover:text-dark-gray-2 cursor-pointer font-medium flex gap-2 items-center ml-3">
                          {certificate.title}
                          <FaExternalLinkAlt size={12} className="text-dark-gray-2" />
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="text-center py-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    resetForm({ values: defaultUserDetails })
                  }}
                  className="bg-danger flex-1 py-2 px-4 text-[1rem] text-white rounded hover:bg-danger/20"
                >
                  {t(translations.indvSettings.reset)}
                </button>
                <button
                  type="submit"
                  className="bg-primary-green flex-1 py-2 px-4 text-[1rem] text-white rounded hover:bg-light-green"
                >
                  {t(translations.indvSettings.save)}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isModalOpen && (
        <MyDocumentsModal isOpen={isModalOpen} onClose={closeModal} certificates={certificates} />
      )}
    </div>
  )
}

export default IndividualSettingsForm
