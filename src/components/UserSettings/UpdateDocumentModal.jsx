import React, { useState, useRef } from "react"
import { useEffect } from "react"

const UpdateDocumentModal = ({ isOpen, onClose, documentTitle, document, onUpdate }) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState("")

  useEffect(() => {
    // If the documentTitle prop exists, we set it, otherwise document.name is used
    if (document) {
      setTitle(documentTitle || document.name || "")
      setFileName(document.fileName || "")
    }
  }, [document, documentTitle]) // state is updated when document or documentTitle changes
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
    setFileName(document?.fileName || "")
  }

  const handleUpdateClick = () => {
    const updatedDocument = {
      ...document,
      name: title,
      fileName: file ? file.name : document.fileName,
    }

    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully.")
            onUpdate(updatedDocument)
            onClose()
            handleResetClick()
          } else {
            throw new Error("Error updating file.")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    } else {
      // Only if the title is updated
      onUpdate(updatedDocument)
      onClose()
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg max-w-[654px] w-full">
          <h2 className="text-[1.75rem] leading-[1.464] text-center font-semibold mb-4">
            Update Document
          </h2>

          <div className="max-w-[696px] mx-auto">
            <h1 className="text-gray-2 leading-[1.5625]">Document Title</h1>
            <label htmlFor="certification" name="certification"></label>
            <input
              id="certification"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[36px] w-full mt-2 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            />
            <div className="flex justify-start items-center gap-5">
              <div>
                {/* FileName */}
                {fileName && <div className="text-dark-gray-1">{fileName}</div>}
                {/* "Select file" button */}
                <button
                  className="block font-medium px-[10px] py-[5px] mt-[20px] border border-primary-green rounded-md text-primary-green hover:bg-primary-green-dark transition duration-300"
                  onClick={file ? handleResetClick : handleAddNewClick}
                >
                  {file ? "Reset" : "Select file"}
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
            <button
              className="bg-gray-1 text-white px-4 py-2 rounded-md font-medium leading-[1.5625] w-[150px]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary-green px-4 py-2 rounded-md text-white font-medium leading-[1.5625] w-[150px]"
              onClick={handleUpdateClick}
              disabled={!title.trim()} // If the title is empty, the button is disabled.
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateDocumentModal
