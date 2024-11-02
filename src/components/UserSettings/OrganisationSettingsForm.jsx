import MyDocumentsModal from "./MyDocumentsModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import useAccountCall from "../../hooks/useAccountCall"
import { FaExternalLinkAlt } from "react-icons/fa"
import toastNotify from "../../utils/toastNotify"

// Validation Schema
const OrganisationSchema = Yup.object().shape({
  organizationName: Yup.string().required("Organization name is required"),
  // organizationUrl: Yup.string().url("Please enter a valid URL"),
  streetName: Yup.string().required("Street name is required"),
  streetNumber: Yup.string().required("Street number is required"),
  zipCode: Yup.string().required("ZIP code is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  organizationDesc: Yup.string().max(250, "Description cannot exceed 250 characters"),
})

const OrganisationSettingsForm = () => {
  const { t } = useTranslation()
  const { currentUser } = useSelector((state) => state.auth)
  console.log(currentUser)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [certificates, setCertificates] = useState([])
  const { updateUserDetails } = useAccountCall()

  const { userDetailsId } = currentUser
  const defaultUserDetails = {
    organizationName: currentUser.organizationName || "",
    organizationUrl: userDetailsId.organizationUrl || "",
    streetName: userDetailsId.addressId?.streetName || "",
    streetNumber: userDetailsId.addressId?.streetNumber || "",
    zipCode: userDetailsId.addressId?.zipCode || "",
    state: userDetailsId.addressId?.state || "",
    city: userDetailsId.addressId?.city || "",
    country: userDetailsId.addressId?.country || "",
    organizationDesc: userDetailsId.organizationDesc || "",
  }

  useEffect(() => {
    setCertificates(currentUser.documentIds || [])
  }, [currentUser])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values)
    try {
      const data = await updateUserDetails(values)
      toastNotify("success", data.message)
    } catch (error) {
      console.error("Update failed:", error)
      toastNotify("error", error.response?.data?.message || "An error occurred")
    }
  }
  return (
    <div>
      <div className="max-w-4xl mx-auto p-8 bg-light-gray dark:bg-dark-gray-3  rounded-lg shadow-md">
        <Formik
          initialValues={defaultUserDetails}
          validationSchema={OrganisationSchema}
          onSubmit={(values) => {
            console.log("Formik onSubmit triggered with values:", values)
            handleSubmit(values)
          }}
        >
          {({ values, resetForm }) => (
            <Form>
              <div className="mb-[10px]">
                <h1 className="text-center font-medium text-[1.25rem] dark:text-white">
                  {t(translations.orgSettings.h1)}
                </h1>
              </div>

              <div className="flex flex-col gap-4 mb-4">
                <div className="flex-1 flex flex-col">
                  <label
                    className="block text-dark-gray-2 dark:text-white mb-2"
                    htmlFor="organizationName"
                  >
                    {t(translations.orgSettings.label1)}
                  </label>
                  <Field
                    label={t(translations.orgSettings.label1)}
                    id="organizationName"
                    name="organizationName"
                    placeholder={t(translations.orgSettings.label1PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage
                    name="organizationName"
                    component="div"
                    className="text-danger text-sm"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label
                    className="block text-dark-gray-2 dark:text-white mb-2"
                    htmlFor="organizationUrl"
                  >
                    {t(translations.orgSettings.label2)}
                  </label>
                  <Field
                    label={t(translations.orgSettings.label2)}
                    id="organizationUrl"
                    name="organizationUrl"
                    placeholder={t(translations.orgSettings.label2PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage
                    name="organizationUrl"
                    component="div"
                    className="text-danger text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1 flex flex-col">
                  <label
                    className="block text-dark-gray-2 dark:text-white mb-2"
                    htmlFor="streetName"
                  >
                    {t(translations.orgSettings.label3)}
                  </label>
                  <Field
                    id="streetName"
                    name="streetName"
                    placeholder={t(translations.orgSettings.label3PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage name="streetName" component="div" className="text-danger text-sm" />
                </div>

                <div className="flex-1 flex flex-col">
                  <label
                    className="block text-dark-gray-2 dark:text-white mb-2"
                    htmlFor="streetNumber"
                  >
                    {t(translations.orgSettings.label4)}
                  </label>
                  <Field
                    id="streetNumber"
                    name="streetNumber"
                    placeholder={t(translations.orgSettings.label4PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage
                    name="streetNumber"
                    component="div"
                    className="text-danger text-sm"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="state">
                    {t(translations.orgSettings.label9)}
                  </label>
                  <Field
                    id="state"
                    name="state"
                    placeholder={t(translations.orgSettings.label9PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage name="state" component="div" className="text-danger text-sm" />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="zipCode">
                    {t(translations.orgSettings.label5)}
                  </label>
                  <Field
                    id="zipCode"
                    name="zipCode"
                    placeholder={t(translations.orgSettings.label5PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage name="zipCode" component="div" className="text-danger text-sm" />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1 flex flex-col">
                  <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="city">
                    {t(translations.orgSettings.label6)}
                  </label>
                  <Field
                    id="city"
                    name="city"
                    placeholder={t(translations.orgSettings.label6PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage name="city" component="div" className="text-danger text-sm" />
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor="country">
                    {t(translations.orgSettings.label7)}
                  </label>
                  <Field
                    id="country"
                    name="country"
                    placeholder={t(translations.orgSettings.label7PH)}
                    className="h-[36px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                  />
                  <ErrorMessage name="country" component="div" className="text-danger text-sm" />
                </div>
              </div>

              <div className="mb-[20px]">
                <label
                  className="block text-dark-gray-2 dark:text-white mb-2"
                  htmlFor="organizationDesc"
                >
                  {t(translations.orgSettings.label8)}
                </label>
                <Field
                  as="textarea"
                  id="organizationDesc"
                  name="organizationDesc"
                  placeholder={t(translations.orgSettings.label8PH)}
                  className="w-full h-[100px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
                />
                <ErrorMessage
                  name="organizationDesc"
                  component="div"
                  className="text-danger text-sm"
                />
                <p className="text-sm text-gray-500 dark:text-white">
                  {values.organizationDesc.length}/250 characters
                </p>
              </div>

              <div className="mx-auto">
                <div className="flex justify-between">
                  <p className="text-[1rem] dark:text-white ">
                    {t(translations.orgSettings.files)}
                  </p>
                  <p
                    className="text-[1rem] leading-[1.5625] text-primary-green cursor-pointer"
                    onClick={openModal}
                  >
                    {t(translations.orgSettings.edit)}
                  </p>
                </div>

                <div className="max-h-[200px] overflow-y-auto p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green">
                  {certificates.length === 0 ? (
                    <p className="dark:text-white">No certificates uploaded.</p>
                  ) : (
                    certificates.map((certificate, index) => {
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
                    })
                  )}
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
                  {t(translations.orgSettings.reset)}
                  Reset
                </button>

                <button
                  type="submit"
                  onClick={() => setTimeout(() => console.log("Button clicked"), 0)}
                  className="bg-primary-green flex-1 py-2 px-4 text-[1rem] text-white rounded hover:bg-light-green"
                >
                  {t(translations.orgSettings.save)}
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

export default OrganisationSettingsForm
