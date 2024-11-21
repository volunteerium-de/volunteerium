import React, { useState } from "react"
import AddNewDocumentModal from "./AddNewDocumentModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { FaExternalLinkAlt } from "react-icons/fa"
import DeleteModal from "../ui/Modals/DeleteModal"
import useAccountCall from "../../hooks/useAccountCall"
import toastNotify from "../../utils/toastNotify"

// Modal component
const MyDocumentsModal = ({ isOpen, onClose, certificates }) => {
  const { t } = useTranslation()
  const { deleteAccountFile } = useAccountCall()
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)

  const openAddNewModal = () => setIsAddNewModalOpen(true)
  const closeAddNewModal = () => setIsAddNewModalOpen(false)

  const closeDeleteModal = () => setIsDeleteModalOpen((prevState) => !prevState)

  const handleDelete = async () => {
    if (currentDocument && currentDocument._id) {
      try {
        const data = await deleteAccountFile(currentDocument._id)
        toastNotify("success", data.message)
      } catch (error) {
        toastNotify("error", error.response.data.message)
      } finally {
        closeDeleteModal()
      }
    } else {
      toastNotify("error", t(translations.toastify.selectError))
    }
  }

  const handleOpenDeleteModal = (deletedDocument) => {
    setCurrentDocument(deletedDocument)
    setIsDeleteModalOpen(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-dark-gray-3 max-h-[300px] sm:max-h-[420px]  rounded-lg max-w-[854px] w-full p-4 sm:px-[20px] sm:py-[40px]">
        <h2 className="sm:text-[1.75rem] text-[1.2rem] dark:text-white leading-[1.4642] font-semibold mb-4 text-center">
          {t(translations.myDocs.h2)}
        </h2>
        <p className="text-center sm:text-[1rem] text-[0.9rem] text-dark-gray-1 dark:text-white leading-[1.5625]">
          {t(translations.myDocs.p)}
        </p>

        <div className="max-w-[669px] mx-auto ">
          <div className="flex justify-end items-center mb-[15px] mt-[10px]">
            <button
              className="md:text-[0.8rem] text-[0.7rem] px-2 py-1 items-center border hover:bg-dark-green rounded-lg bg-primary-green text-white"
              onClick={openAddNewModal}
            >
              {t(translations.myDocs.addNew)}
            </button>
          </div>
          <AddNewDocumentModal isOpen={isAddNewModalOpen} onClose={closeAddNewModal} />
          <div className="max-h-[90px] sm:max-h-[150px] overflow-y-auto scrollbar p-2 border border-gray-1 rounded focus:outline-none text-blue-400 dark:text-blue-200 bg-light-gray dark:bg-dark-gray-2">
            {certificates.length === 0 ? (
              <p className="dark:text-white">{t(translations.indvSettings.label10)}</p>
            ) : (
              certificates.map((certificate, index) => {
                const marginBottom = index === certificates.length - 1 ? "mb-25" : "mb-15"
                return (
                  <div
                    key={certificate._id}
                    className={`flex justify-between items-center bg-light-gray-2 ${marginBottom} w-full h-[40px] mb-[10px]`}
                  >
                    <div onClick={() => window.open(certificate.fileUrl, "_blank")}>
                      <p className="text-dark-gray-1 hover:text-dark-gray-2 ml-3 cursor-pointer sm:text-[1rem] text-[0.9rem] font-medium flex gap-2 items-center">
                        {certificate.title}
                        <span>
                          <FaExternalLinkAlt size={12} />
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        className="leading-[1.5625] font-semibold text-danger hover:text-danger/30 duration-100 mr-[20px]"
                        onClick={() => handleOpenDeleteModal(certificate)}
                      >
                        {t(translations.myDocs.delete)}
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        <div className="text-center mt-[15px]">
          <button className="py-2 px-4 text-primary-green" onClick={onClose}>
            {t(translations.myDocs.cancel)}
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onClose={closeDeleteModal}
          onDelete={handleDelete}
          title={t(translations.delModal.documentTitle)}
          description={t(translations.delModal.documentDesc)}
        />
      )}
    </div>
  )
}

export default MyDocumentsModal
