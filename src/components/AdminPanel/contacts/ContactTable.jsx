import React from "react"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"

const ContactTable = ({ data, loading }) => {
  const navigate = useNavigate()

  const handleNavigateSingleContact = (contactId) => {
    navigate(`?tab=contacts&identifier=${contactId}`)
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
                <th className="th p-3 text-left">Contact ID</th>
                <th className="th p-3 text-left">Name</th>
                <th className="th p-3 text-left">Mail</th>
                <th className="th p-3 text-left">Subject</th>
                <th className="th p-3 text-center">Created At</th>
              </tr>
            </thead>
            <tbody className="tbody text-dark-gray-1 dark:text-light-gray text-sm font-light">
              {data.map((contact) => (
                <tr
                  key={contact?._id}
                  onClick={() => handleNavigateSingleContact(contact?._id)}
                  className="border-b border-light-gray dark:border-dark-gray-1 hover:bg-gray-100 dark:hover:bg-dark-gray-2 text-sm cursor-pointer"
                >
                  <td
                    className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                    data-label="Contact ID"
                  >
                    {contact?._id}
                  </td>

                  <td
                    className="td text-left 2xl:w-[100px] whitespace-nowrap overflow-ellipsis overflow-hidden"
                    data-label="Name"
                  >
                    <div className="flex flex-row gap-1 items-center">
                      <span>{contact?.name}</span>
                    </div>
                  </td>
                  <td className={"td text-left 2xl:w-[150px] whitespace-nowrap"} data-label="Email">
                    {contact?.email}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label="Subject"
                  >
                    {contact?.subject}
                  </td>
                  <td className="td text-center whitespace-nowrap" data-label="Created At">
                    {new Date(contact?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 sm:p-0 mt-4 text-center sm:text-left text-dark-gray-2 dark:text-light-gray">
          No contacts found
        </div>
      )}
    </>
  )
}

export default ContactTable
