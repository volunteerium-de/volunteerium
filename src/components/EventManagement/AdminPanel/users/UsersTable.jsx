import React from "react"
import useAdminCall from "../../../../hooks/useAdminCall"
import { ImSpinner9 } from "react-icons/im"

const UsersTable = ({ users }) => {
  const { loading } = useAdminCall()

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default UsersTable
