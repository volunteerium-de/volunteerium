import React, { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
translations

const AddNewDocumentModal = ({ isOpen, onClose }) => {
  const {t} = useTranslation()
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  //
  const handleAddNewClick = () => {
    fileInputRef.current.click()
  }

  const handleResetClick = () => {
    setFile(null)
    setFileName("")
  }

  const handleSaveClick = () => {
    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File saved successfully.")

            onClose()
            handleResetClick()
            setError(null) // Clear any previous error
          } else {
            throw new Error("Error saving file.")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          setError("Failed to upload file. Please try again.") // Set error message
        })
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg max-w-[654px] w-full">
          <h2 className="text-[1.75rem] leading-[1.464] text-center font-semibold mb-4">
            {t(translations.addNewDoc.newDoc)}
          </h2>

          <div className="max-w-[696px] mx-auto">
            <h1 className="text-gray-2 leading-[1.5625]">{t(translations.addNewDoc.docTitle)}</h1>
            <label htmlFor="certification"></label>
            <input
              id="certification"
              type="text"
              className="h-[36px] w-full mt-2 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            />
            <div className="flex justify-start items-center gap-5">
              <div>
                {/* FileName */}
                {fileName && <div className="text-dark-gray-1">{fileName}</div>}
                {/* "Add new +" butonu */}
                <button
                  className="block font-medium px-[10px] py-[5px] mt-[20px] border border-primary-green rounded-md text-primary-green hover:bg-primary-green-dark transition duration-300"
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

          <div className="flex justify-center gap-3 mt-[25px]">
            {error && <div className="text-danger text-sm text-center mb-2">{error}</div>}
            <button
              className="bg-gray-1 text-white px-4 py-2 rounded-md font-medium leading-[1.5625] w-[150px]"
              onClick={onClose}
            >
              {t(translations.addNewDoc.cancel)}
            </button>
            <button
              className="bg-primary-green px-4 py-2 rounded-md text-white font-medium leading-[1.5625] w-[150px]"
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
