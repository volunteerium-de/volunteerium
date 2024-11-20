import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import useAccountCall from "../../hooks/useAccountCall"
import toastNotify from "../../utils/toastNotify"
import { useSelector } from "react-redux"

const AddNewDocumentModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const { currentUser } = useSelector((state) => state.auth)

  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [documentTitle, setDocumentTitle] = useState("")
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const { createAccountFile } = useAccountCall()

  if (!isOpen) return null

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const handleAddNewClick = () => {
    fileInputRef.current.click()
  }

  const handleResetClick = () => {
    setFile(null)
    setFileName("")
    setDocumentTitle("")
  }

  const handleSaveClick = async () => {
    if (file) {
      const formData = new FormData()
      formData.append("fileUrl", file)
      formData.append("title", documentTitle)
      formData.append("userId", currentUser._id)

      try {
        const data = await createAccountFile(formData)

        toastNotify("success", data.message)
      } catch (error) {
        toastNotify("error", error.response.data.message)
      } finally {
        onClose()
        handleResetClick()
      }
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-dark-gray-3 max-h-[300px] sm:max-h-[420px] p-6 rounded-lg max-w-[854px] w-full px-[20px] py-[40px]">
          <h2 className="text-[1.15rem] sm:text-[1.75rem] text-center font-semibold mb-4 dark:text-white">
            {t(translations.addNewDoc.newDoc)}
          </h2>

          <div className="max-w-[696px] mx-auto">
            <h1 className="text-dark-gray-2 text-[0.9rem] sm:text-[1rem] dark:text-white my-8">
              {t(translations.addNewDoc.docTitle)}
              <span>*</span>
            </h1>
            <label htmlFor="certification"></label>
            <input
              id="certification"
              type="text"
              value={documentTitle}
              placeholder={t(translations.addNewDoc.placeholder)}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="h-[36px] w-full p-2 border border-gray-1 rounded focus:outline-none focus:border-primary-green"
            />
            <div className="flex justify-start items-center gap-5">
              <div>
                {/* FileName */}
                {fileName && <div className="text-dark-gray-1  dark:text-white">{fileName}</div>}
                {/* "Add new +" butonu */}
                <button
                  className="block sm:text-[0.8rem] text-[0.6rem] px-2  py-1 items-center border hover:bg-dark-green rounded-lg bg-primary-green text-white transition duration-300 mt-8"
                  onClick={file ? handleResetClick : handleAddNewClick}
                >
                  {file ? t(translations.addNewDoc.reset) : t(translations.addNewDoc.addNew)}
                </button>
              </div>
              {/* File upload input */}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 sm:mt-[50px] mt-[20px] ">
            {error && <div className="text-danger text-sm text-center mb-2">{error}</div>}
            <button
              className="py-1 px-4 text-primary-green md:text-[1rem] text-[0.6rem]"
              onClick={onClose}
            >
              {t(translations.addNewDoc.cancel)}
            </button>
            <button
              className="bg-primary-green md:text-[1rem] text-[0.6rem] px-3 py-1 rounded text-white hover:bg-dark-green"
              onClick={handleSaveClick}
              disabled={!file}
            >
              {t(translations.addNewDoc.save)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewDocumentModal
