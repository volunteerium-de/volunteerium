import React from "react"
import { useState } from "react"
import { ImSpinner9 } from "react-icons/im"
import DeleteModal from "../../ui/Modals/DeleteModal"
import useAccountCall from "../../../hooks/useAccountCall"
import toastNotify from "../../../utils/toastNotify"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const SubscriptionsTable = ({ data, loading, refreshData }) => {
  const { t } = useTranslation()
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const { unsubscribe } = useAccountCall()
  const [subscriptionId, setSubscriptionId] = useState(null)

  const handleClickUnsubscription = (id) => {
    setIsOpenDeleteModal(true)
    setSubscriptionId(id)
  }

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false)
  }

  const handleUnsubscribe = async () => {
    if (subscriptionId) {
      try {
        await unsubscribe(subscriptionId)
        refreshData()
      } catch (error) {
        console.error(error)
      } finally {
        setIsOpenDeleteModal(false)
      }
    } else {
      toastNotify("error", "Failed to unsubscribe. Please try again later.")
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
                  {t(translations.adminPanel.subscriptions.subscriptionsTable.subscriptionsId)}
                </th>
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.subscriptions.subscriptionsTable.email)}
                </th>
                <th className="th p-3 text-center">
                  {t(translations.adminPanel.subscriptions.subscriptionsTable.subscripedAt)}
                </th>
              </tr>
            </thead>
            <tbody className="tbody text-dark-gray-1 dark:text-light-gray text-sm font-light">
              {data.map((subscription) => (
                <tr
                  key={subscription?._id}
                  onClick={() => handleClickUnsubscription(subscription?._id)}
                  className="border-b border-light-gray dark:border-dark-gray-1 text-sm cursor-pointer hover:bg-light-gray-2 dark:hover:bg-dark-gray-2"
                >
                  <td
                    className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                    data-label={t(
                      translations.adminPanel.subscriptions.subscriptionsTable.subscriptionsIdDL
                    )}
                  >
                    {subscription?._id}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label={t(translations.adminPanel.subscriptions.subscriptionsTable.email)}
                  >
                    {subscription?.email}
                  </td>
                  <td
                    className="td text-center whitespace-nowrap"
                    data-label={t(
                      translations.adminPanel.subscriptions.subscriptionsTable.subscripedAt
                    )}
                  >
                    {new Date(subscription?.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 sm:p-0 mt-4 text-center sm:text-left text-dark-gray-2 dark:text-light-gray">
          {t(translations.adminPanel.subscriptions.subscriptionsTable.noSubscriptionsFound)}
        </div>
      )}
      {/* Delete Modal */}
      {isOpenDeleteModal && (
        <DeleteModal
          onClose={closeDeleteModal}
          onDelete={handleUnsubscribe}
          title={t(translations.adminPanel.subscriptions.subscriptionsTable.deleteSubscription)}
          description={t(
            translations.adminPanel.subscriptions.subscriptionsTable.deleteDescription
          )}
        />
      )}
    </>
  )
}

export default SubscriptionsTable
