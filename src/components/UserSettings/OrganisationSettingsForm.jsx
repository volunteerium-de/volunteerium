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

const OrganisationSettingsForm = () => {
  const { t } = useTranslation()
  const { currentUser } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [certificates, setCertificates] = useState([])
  const { updateUserDetails } = useAccountCall()

  // Validation Schema
  const OrganisationSchema = Yup.object().shape({
    organizationUrl: Yup.string().url("Please enter a valid URL"),
    streetName: Yup.string().required(t(translations.yup.required.streetName)),
    streetNumber: Yup.string().required(t(translations.yup.required.streetNumber)),
    zipCode: Yup.string().required(t(translations.yup.required.zipCode)),
    city: Yup.string().required(t(translations.yup.required.city)),
    country: Yup.string().required(t(translations.yup.required.country)),
    organizationDesc: Yup.string().max(250, t(translations.yup.maxLength.characters250)),
  })

  const { userDetailsId } = currentUser
  console.log(currentUser)
  const defaultUserDetails = {
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

  const fields = [
    {
      name: "organizationUrl",
      label: t(translations.orgSettings.label2),
      placeholder: t(translations.orgSettings.label2PH),
      type: "text",
    },
    {
      name: "streetName",
      label: t(translations.orgSettings.label3),
      placeholder: t(translations.orgSettings.label3PH),
      type: "text",
    },
    {
      name: "streetNumber",
      label: t(translations.orgSettings.label4),
      placeholder: t(translations.orgSettings.label4PH),
      type: "text",
    },
    {
      name: "state",
      label: t(translations.orgSettings.label9),
      placeholder: t(translations.orgSettings.label9PH),
      type: "text",
    },
    {
      name: "zipCode",
      label: t(translations.orgSettings.label5),
      placeholder: t(translations.orgSettings.label5PH),
      type: "text",
    },
    {
      name: "city",
      label: t(translations.orgSettings.label6),
      placeholder: t(translations.orgSettings.label6PH),
      type: "text",
    },
    {
      name: "country",
      label: t(translations.orgSettings.label7),
      placeholder: t(translations.orgSettings.label7PH),
      type: "text",
    },
  ]

  const renderField = ({ name, label, placeholder }) => (
    <div className="flex-1 flex flex-col" key={name}>
      <label className="block text-dark-gray-2 dark:text-white mb-2" htmlFor={name}>
        {label}
      </label>
      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        className="p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
      />
      <ErrorMessage name={name} component="div" className="text-danger text-sm" />
    </div>
  )
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = async (values) => {
    try {
      const data = await updateUserDetails(values)
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error.response?.data?.message || t(translations.toastify.error))
    }
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-8 bg-light-gray dark:bg-dark-gray-3 rounded-lg shadow-md">
        <Formik
          initialValues={defaultUserDetails}
          validationSchema={OrganisationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, resetForm }) => (
            <Form>
              <div className="mb-[10px]">
                <h1 className="text-center font-medium text-[1.25rem] dark:text-white">
                  {t(translations.orgSettings.h1)}
                </h1>
              </div>

              {/*First Line */}
              <div className="flex flex-col gap-4 mb-4">{fields.slice(0, 2).map(renderField)}</div>

              {/* Second Line*/}
              <div className="flex flex-wrap gap-4 mb-4">{fields.slice(2, 6).map(renderField)}</div>

              {/* Third Line */}
              <div className="flex flex-wrap gap-4 mb-4">{fields.slice(6).map(renderField)}</div>

              {/* Description*/}
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
                  className="w-full h-[100px] p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green  scrollbar resize-none whitespace-pre-line"
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

              {/* Files */}
              <div className="mx-auto">
                <div className="flex justify-between">
                  <p className="text-[1rem] dark:text-white text-dark-gray-2">
                    {t(translations.orgSettings.files)}
                  </p>
                  <p
                    className="text-[1rem] leading-[1.5625] text-primary-green cursor-pointer"
                    onClick={openModal}
                  >
                    {t(translations.orgSettings.edit)}
                  </p>
                </div>

                <div className="max-h-[150px] overflow-y-auto scrollbar p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green text-blue-400 dark:text-blue-200 bg-light-gray dark:bg-dark-gray-2">
                  {certificates.length === 0 ? (
                    <p className="dark:text-white">{t(translations.indvSettings.label10)}</p>
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
                  className="bg-danger flex-1 py-2 px-4 text-[1rem] text-white rounded hover:bg-dark-danger"
                >
                  {t(translations.indvSettings.reset)}
                </button>

                <button
                  type="submit"
                  onClick={() => setTimeout(() => console.log("Button clicked"), 0)}
                  className="bg-primary-green flex-1 py-2 px-4 text-[1rem] text-white rounded hover:bg-dark-green"
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
