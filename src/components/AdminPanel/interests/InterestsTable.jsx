import React from "react"
import { useState } from "react"
import { ImSpinner9 } from "react-icons/im"
import DeleteModal from "../../ui/Modals/DeleteModal"
import toastNotify from "../../../utils/toastNotify"
import useAdminCall from "../../../hooks/useAdminCall"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import useLanguage from "../../../hooks/useLanguages"
import useEventCall from "../../../hooks/useEventCall"
import { formatDateWithTime } from "../../../helpers/formatDate"

const InterestsTable = ({ data, loading, refreshData }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const { deleteData } = useAdminCall()
  const { getEventCategories } = useEventCall()
  const { getTranslatedCategory } = useLanguage()
  const [interestId, setInterestId] = useState(null)
  const { t } = useTranslation()

  const handleClickDelete = (id) => {
    setIsOpenDeleteModal(true)
    setInterestId(id)
  }

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }

  const handleDeleteInterest = async () => {
    if (interestId) {
      await deleteData("interests", interestId)
      await getEventCategories()
      refreshData()
    } else {
      toastNotify("error", "Failed to delete interest. Please try again later.")
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
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.interests.interestsTable.interestsId)}
                </th>
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.interests.interestsTable.name)}
                </th>
                <th className="th p-3 text-center">
                  {t(translations.adminPanel.interests.interestsTable.createdAt)}
                </th>
                <th className="th p-3 w-[150px] text-center">
                  {t(translations.adminPanel.interests.interestsTable.actions)}
                </th>
              </tr>
            </thead>
            <tbody className="tbody text-dark-gray-1 dark:text-light-gray text-sm font-light">
              {data.map((interest) => (
                <tr
                  key={interest?._id}
                  className="border-b border-light-gray dark:border-dark-gray-1 text-sm"
                >
                  <td
                    className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                    data-label={t(translations.adminPanel.interests.interestsTable.interestsId)}
                  >
                    {interest?._id}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label={t(translations.adminPanel.interests.interestsTable.name)}
                  >
                    {getTranslatedCategory(interest?.name)}
                  </td>

                  <td
                    className="td text-center whitespace-nowrap"
                    data-label={t(translations.adminPanel.interests.interestsTable.createdAt)}
                  >
                    {formatDateWithTime(interest?.createdAt)}
                  </td>
                  <td
                    className="td text-center whitespace-nowrap flex flex-row justify-between items-center"
                    data-label={t(translations.adminPanel.interests.interestsTable.actions)}
                  >
                    <RiDeleteBin5Fill
                      onClick={() => handleClickDelete(interest?._id)}
                      className="h-5 w-5 hover:text-danger duration-300 cursor-pointer 2xl:mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 sm:p-0 mt-4 text-center sm:text-left text-dark-gray-2 dark:text-light-gray">
          {t(translations.adminPanel.interests.interestsTable.noInterestsFound)}
        </div>
      )}
      {/* Delete Modal */}
      {isOpenDeleteModal && (
        <DeleteModal
          onClose={closeDeleteModal}
          onDelete={handleDeleteInterest}
          title={t(translations.adminPanel.interests.interestsTable.deleteInterest)}
          description={t(translations.adminPanel.interests.interestsTable.deleteDescription)}
        />
      )}
    </>
  )
}

export default InterestsTable
