import React, { useState } from "react"
import MyDocumentsModal from "../../UserSettings/MyDocumentsModal"

const OrganisationSettingsForm = ({ currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [certificates, setCertificates] = useState([
    { id: 1, name: "First aid certificate", fileName: "First aid certificate.pdf" },
    { id: 2, name: "CPR certificate", fileName: "CPR certificate.pdf" },
    {
      id: 3,
      name: "Advanced first aid certificate",
      fileName: "Advanced first aid certificate.pdf",
    },
    { id: 4, name: "Lifeguard certificate", fileName: "Lifeguard certificate.pdf" },
    { id: 5, name: "Safety training certificate", fileName: "Safety training certificate.pdf" },
    {
      id: 6,
      name: "Project management certificate",
      fileName: "Project management certificate.pdf",
    },
  ])

  const [name, setName] = useState(currentUser.userDetailsId.organizationName)
  const [url, setUrl] = useState(currentUser.userDetailsId.organizationUrl)
  const [streetName, setStreetName] = useState(currentUser.userDetailsId.addressId.streetName)
  const [streetNumber, setStreetNumber] = useState(currentUser.userDetailsId.addressId.streetNumber)
  const [zipCode, setZipCode] = useState(currentUser.userDetailsId.addressId.zipCode)
  const [city, setCity] = useState(currentUser.userDetailsId.addressId.city)
  const [country, setCountry] = useState(currentUser.userDetailsId.addressId.country)
  const [bio, setBio] = useState(currentUser.userDetailsId.organizationDesc)

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
    // Validate form fields
    if (!name || !url || !streetName || !streetNumber || !zipCode || !city || !country || !bio) {
      setErrorMessage("Please fill in all fields.")
      return
    }

    const userData = { name, url, streetName, streetNumber, zipCode, city, country, bio }
    try {
      const response = await fetch("https://api.example.com/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const result = await response.json()
      setSuccessMessage("Data saved successfully!")
      setErrorMessage("") // Reset previous error message

      console.log("Saved data:", result)
    } catch (error) {
      setErrorMessage("Error saving data: " + error.message)
      setSuccessMessage("") // Reset previous success message
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="font-Poppins max-w-[698px] mx-auto p-2 px-12 w-full h-auto bg-white rounded-md">
        <div className="mb-[10px]">
          <h1 className="text-center font-medium text-[1.5rem] my-[20px]">Profile Settings</h1>

          {/* Name Appearance Section */}
          <div className="flex flex-col flex-wrap">
            <div className="flex flex-col flex-wrap sm:flex-row gap-5 ">
              <div className="flex-1 flex flex-col">
                <label className="block text-[1rem] text-gray-2" htmlFor="name">
                  Organization Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Volunteerium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-[36px] mt-1 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-2"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="block text-[1rem] text-gray-2" htmlFor="url">
                  Organization URL
                </label>
                <input
                  id="url"
                  type="text"
                  placeholder="www.volunteerium.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-[36px] mt-1 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 mb-[10px]">
          <div className="w-full sm:w-6/6 flex flex-col">
            <label className="block text-[1rem] text-gray-2" htmlFor="streetName">
              Street Name
            </label>
            <input
              id="streetName"
              type="text"
              placeholder="Dammstraße"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              className="h-[36px] mt-1 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            />
          </div>
          <div className="w-full sm:w-2/6 flex flex-col mr-[90px]">
            <label className="block text-[1rem] text-gray-2" htmlFor="streetNumber">
              Street Number
            </label>
            <input
              id="streetNumber"
              type="text"
              placeholder="10"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              className="h-[36px] mt-1 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            />
          </div>
          <div className="w-full sm:w-2/6 flex flex-col ">
            <label className="block text-[1rem] text-gray-2" htmlFor="zipCode">
              Zip Code
            </label>
            <input
              id="zipCode"
              type="text"
              placeholder="10117"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="h-[36px] mt-1 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            />
          </div>
        </div>

        <div className="flex flex-col flex-wrap sm:flex-row gap-5 ">
          <div className="flex-1 flex flex-col">
            <label className="block text-[1rem]  text-gray-2" htmlFor="city">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Berlin"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-[36px] mt-2 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block text-[1rem] text-gray-2" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="Germany"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-[36px] mt-2 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="my-[5px] w-full">
          <label className="block text-[1rem] leading-[1.5625] text-gray-2" htmlFor="bio">
            Description
          </label>
          <textarea
            id="bio"
            className="w-full md:max-w-[600px] lg:max-w-[800px] h-[100px] md:h-[150px] lg:h-[150px] mt-1 border border-gray-2 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green text-dark-gray-1"
            placeholder="Write your description here..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        {/* Files Section */}
        <div className="mx-auto px-4">
          <div className="flex justify-between">
            <p className="text-[1rem] leading-[1.5625] text-gray-2">Files</p>
            <p
              className="text-[1rem] leading-[1.5625] text-primary-green cursor-pointer"
              onClick={openModal}
            >
              Edit
            </p>
          </div>
          <div>
            <div className={`max-h-[200px] overflow-y-auto border border-gray-300 rounded-lg p-2`}>
              {certificates.map((certificate, index) => (
                <div
                  key={certificate.id}
                  className={`bg-light-gray mb-[${index === certificates.length - 1 ? 25 : 15}px] w-full`}
                >
                  <p className="text-dark-gray-1">{certificate.name}</p>
                  <p className="text-[0.875rem] text-gray-1">{certificate.fileName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="text-primary-green text-center mt-3">{successMessage}</div>
        )}
        {errorMessage && <div className="text-danger text-center mt-3">{errorMessage}</div>}
        {/* Save Button */}
        <div>
          <button type="submit" className="bg-primary-green w-full py-2 rounded-md mt-1">
            <p className="text-[1rem] text-white">Save</p>
          </button>
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
