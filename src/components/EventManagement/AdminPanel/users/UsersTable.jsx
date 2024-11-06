import React from "react"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"

const UsersTable = ({ data, loading }) => {
  const navigate = useNavigate()

  const handleNavigateSingleUser = (userId) => {
    navigate(`?tab=eusers&identifier=${userId}`)
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div>Users Table</div>
      )}
    </>
  )
}

export default UsersTable
