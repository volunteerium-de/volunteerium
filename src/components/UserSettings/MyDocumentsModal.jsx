import React, { useState } from "react"
import AddNewDocumentModal from "./AddNewDocumentModal"
import UpdateDocumentModal from "./UpdateDocumentModal"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { FaExternalLinkAlt } from "react-icons/fa"

// Modal component
const MyDocumentsModal = ({ isOpen, onClose, certificates }) => {
  const { t } = useTranslation()
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)

  const openAddNewModal = () => setIsAddNewModalOpen(true)
  const closeAddNewModal = () => setIsAddNewModalOpen(false)

  const closeUpdateModal = () => setIsUpdateModalOpen(false)

  const handleDelete = (id) => {}

  const handleUpdate = (updatedDocument) => {}

  const handleOpenUpdateModal = (certificate) => {
    setCurrentDocument(certificate)
    setIsUpdateModalOpen(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg max-w-[954px] w-full px-[20px] py-[40px]">
        <h2 className="text-[1.75rem] leading-[1.4642] font-semibold mb-4 text-center">
          {t(translations.myDocs.h2)}
        </h2>
        <p className="text-center text-dark-gray-1 leading-[1.5625]">{t(translations.myDocs.p)}</p>

        <div className="max-w-[669px] mx-auto ">
          <div className="flex justify-end items-center mb-[15px] mt-[25px]">
            <button
              className="text-[1rem] leading-[1.5625] text-primary-green cursor-pointer"
              onClick={openAddNewModal}
            >
              {t(translations.myDocs.addNew)}
            </button>
          </div>
          <AddNewDocumentModal isOpen={isAddNewModalOpen} onClose={closeAddNewModal} />
          <div className="max-h-[300px] overflow-y-auto">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="flex justify-between items-center bg-light-gray mb-[15px] w-full"
              >
                <div onClick={() => window.open(certificate.fileUrl, "_blank")}>
                  <p className="text-dark-gray-1 hover:text-dark-gray-2 cursor-pointer font-medium flex gap-2 items-center">
                    {certificate.title}{" "}
                    <span>
                      <FaExternalLinkAlt size={12} />
                    </span>
                  </p>
                </div>
                <div>
                  <button
                    className="leading-[1.5625] font-bold text-dark-gray-1 mr-[20px]"
                    onClick={() => handleDelete(certificate.id)}
                  >
                    {t(translations.myDocs.delete)}
                  </button>
                  <button
                    className="leading-[1.5625] font-bold text-primary-green mr-[5px]"
                    onClick={() => handleOpenUpdateModal(certificate)}
                  >
                    {t(translations.myDocs.update)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-[25px]">
          <button className="py-2 px-4 text-primary-green" onClick={onClose}>
            {t(translations.myDocs.cancel)}
          </button>
          {/* <button
            className="bg-primary-green px-4 py-2 rounded text-white  hover:bg-light-green"
            onClick={handleSaveChanges}
          >
            {t(translations.myDocs.saveChanges)}
          </button> */}
        </div>
      </div>
      <UpdateDocumentModal
        key={currentDocument ? currentDocument.id : "new"}
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        document={currentDocument}
        onUpdate={handleUpdate}
        documentTitle={currentDocument ? currentDocument.name : ""}
      />
    </div>
  )
}

export default MyDocumentsModal
