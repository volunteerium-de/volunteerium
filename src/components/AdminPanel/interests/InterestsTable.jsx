import React from "react"
import { useState } from "react"
import { ImSpinner9 } from "react-icons/im"
import DeleteModal from "../../ui/Modals/DeleteModal"
import toastNotify from "../../../utils/toastNotify"
import useAdminCall from "../../../hooks/useAdminCall"
import { FaEdit } from "react-icons/fa"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { FaCheckSquare } from "react-icons/fa"
import { FaWindowClose } from "react-icons/fa"

const InterestsTable = ({ data, loading, refreshData }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const { postData, deleteData, updateData } = useAdminCall()
  const [interestId, setInterestId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [newInterestName, setNewInterestName] = useState("")
  const [oldInterestName, setOldInterestName] = useState("")

  const handleClickDelete = (id) => {
    setIsOpenDeleteModal(true)
    setInterestId(id)
    setIsEdit(false)
  }

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }

  const handleClickEdit = (id, name) => {
    setIsEdit(true)
    setInterestId(id)
    setOldInterestName(name)
    setNewInterestName(name)
  }

  const handleClickClose = () => {
    setIsEdit(false)
    setNewInterestName("")
    setInterestId(null)
  }

  const handleDeleteInterest = async () => {
    if (interestId) {
      await deleteData("interests", interestId)
      refreshData()
    } else {
      toastNotify("error", "Failed to delete interest. Please try again later.")
    }
  }

  const handleEditInterest = async () => {
    if (interestId) {
      if (newInterestName) {
        const normalize = (str) => str.toLowerCase().replace(/[^a-z]/g, "")
        if (normalize(newInterestName).includes(normalize(oldInterestName))) {
          await updateData("interests", interestId, { name: newInterestName })
          refreshData()
          setIsEdit(false)
          setNewInterestName("")
          setInterestId(null)
        } else {
          toastNotify("error", "Interest name cannot be changed to a different name.")
        }
      } else {
        handleClickDelete(interestId)
      }
    } else {
      toastNotify("error", "Failed to update interest. Please try again later.")
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table min-w-full bg-white dark:bg-dark-gray-1">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-dark-gray-1 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">Interest ID</th>
                <th className="th p-3 text-left">Name</th>
                <th className="th p-3 text-center">Created At</th>
                <th className="th p-3 text-center">Updated At</th>
                <th className="th p-3 w-[150px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="tbody text-dark-gray-1 dark:text-light-gray text-sm font-light">
              {data.map((interest) => (
                <tr
                  key={interest?._id}
                  className="border-b border-light-gray dark:border-dark-gray-1 text-sm cursor-pointer hover:bg-light-gray-2 dark:hover:bg-dark-gray-2"
                >
                  <td
                    className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                    data-label="Interest ID"
                  >
                    {interest?._id}
                  </td>
                  <td className={"td text-left 2xl:w-[150px] whitespace-nowrap"} data-label="Name">
                    {isEdit && interestId === interest._id ? (
                      <input
                        type="text"
                        value={newInterestName}
                        autoFocus
                        className="border px-2 border-primary-green focus:border-dark-gray-1 focus:outline-none "
                        onChange={(e) => setNewInterestName(e.target.value)}
                      />
                    ) : (
                      <input
                        disabled={true}
                        value={interest?.name}
                        className="bg-inherit px-2 w-auto text-right xl:text-left"
                      />
                    )}
                  </td>
                  <td className="td text-center whitespace-nowrap" data-label="Created At">
                    {new Date(interest?.createdAt).toDateString()}
                  </td>
                  <td className="td text-center whitespace-nowrap" data-label="Updated At">
                    {new Date(interest?.updatedAt).toUTCString()}
                  </td>
                  <td
                    className="td text-center whitespace-nowrap flex flex-row justify-between items-center"
                    data-label="Actions"
                  >
                    <div className="flex justify-center text-center xl:mx-auto gap-1">
                      {isEdit && interest._id === interestId ? (
                        <FaCheckSquare
                          onClick={handleEditInterest}
                          className="h-5 w-5 text-primary-green hover:text-primary-green/60 duration-300"
                        />
                      ) : (
                        <FaEdit
                          onClick={() => handleClickEdit(interest?._id, interest.name)}
                          className="h-5 w-5 hover:text-warning duration-300"
                        />
                      )}
                      {isEdit && interest._id === interestId ? (
                        <FaWindowClose
                          onClick={handleClickClose}
                          className="h-5 w-5 text-danger hover:text-danger/60 duration-300"
                        />
                      ) : (
                        <RiDeleteBin5Fill
                          onClick={() => handleClickDelete(interest?._id)}
                          className="h-5 w-5 hover:text-danger duration-300"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 sm:p-0 mt-4 text-center sm:text-left text-dark-gray-2 dark:text-light-gray">
          No interest found
        </div>
      )}
      {/* Delete Modal */}
      {isOpenDeleteModal && (
        <DeleteModal
          onClose={closeDeleteModal}
          onDelete={handleDeleteInterest}
          title={`Delete Interest`}
          description={`Are you sure you want to delete this interest?`}
        />
      )}
    </>
  )
}

export default InterestsTable
