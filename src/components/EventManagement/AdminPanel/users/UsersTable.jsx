import React from "react"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { UserAvatar } from "../../../ui/Avatar/userAvatar"

const UsersTable = ({ data, loading }) => {
  const navigate = useNavigate()

  const handleNavigateSingleUser = (userId) => {
    navigate(`?tab=users&identifier=${userId}`)
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-start mt-24">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table min-w-full bg-white dark:bg-dark-gray-2">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-gray-600 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">User ID</th>
                <th className="th p-3 text-center">Status</th>
                <th className="th p-3 text-center">User Type</th>
                <th className="th p-3 text-left">Name/Organization</th>
                <th className="th p-3 text-left">Email</th>
                <th className="th p-3 text-center">Created At</th>
              </tr>
            </thead>
            <tbody className="tbody text-gray-600 dark:text-gray-200 text-sm font-light">
              {data
                .filter((user) => user._id !== import.meta.env.VITE_ADMIN_ID)
                .map((user) => (
                  <tr
                    key={user?._id}
                    onClick={() => handleNavigateSingleUser(user?._id)}
                    className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer"
                  >
                    <td
                      className="td text-left whitespace-nowrap 2xl:max-w-[140px] overflow-x-scroll scrollbar-hide"
                      data-label="User ID"
                    >
                      {user?._id}
                    </td>
                    <td
                      className={`td text-center whitespace-nowrap 2xl:w-[100px] ${user?.isActive ? "text-primary-green" : "text-danger"}`}
                      data-label="User Status"
                    >
                      {user?.isActive ? "Active" : "Suspended"}
                    </td>
                    <td
                      className={`td text-center whitespace-nowrap 2xl:w-[100px] ${user?.userType === "individual" ? "text-blue-400" : "text-warning"}`}
                      data-label="User Type"
                    >
                      {user?.userType.toUpperCase()}
                    </td>
                    <td
                      className="td text-left 2xl:w-[100px] whitespace-nowrap overflow-ellipsis overflow-hidden"
                      data-label="Name"
                    >
                      <div className="flex flex-row gap-1 items-center">
                        <UserAvatar user={user} size="h-6 w-6" backgroundActive={true} />
                        <span>{user?.fullName || user?.organizationName}</span>
                      </div>
                    </td>
                    <td
                      className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                      data-label="Email"
                    >
                      {user?.email}
                    </td>
                    <td className="td text-center whitespace-nowrap" data-label="Created At">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No users found</div>
      )}
    </>
  )
}

export default UsersTable
