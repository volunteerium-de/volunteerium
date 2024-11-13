import React from "react"
import { ImSpinner9 } from "react-icons/im"

const SubscriptionsTable = ({ data, loading }) => {
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
                <th className="th p-3 text-left">Subscription ID</th>
                <th className="th p-3 text-left">Email</th>
                <th className="th p-3 text-center">Subscriped At</th>
              </tr>
            </thead>
            <tbody className="tbody text-dark-gray-1 dark:text-light-gray text-sm font-light">
              {data.map((subscription) => (
                <tr
                  key={subscription?._id}
                  className="border-b border-light-gray dark:border-dark-gray-1  text-sm"
                >
                  <td
                    className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                    data-label="Subscription ID"
                  >
                    {subscription?._id}
                  </td>
                  <td className={"td text-left 2xl:w-[150px] whitespace-nowrap"} data-label="Email">
                    {subscription?.email}
                  </td>
                  <td className="td text-center whitespace-nowrap" data-label="Subscriped At">
                    {new Date(subscription?.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No subscription found</div>
      )}
    </>
  )
}

export default SubscriptionsTable
