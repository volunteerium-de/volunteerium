import React from "react"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"

const ReportsTable = ({ data, loading }) => {
  const navigate = useNavigate()

  const handleNavigateSingleReport = (reportId) => {
    navigate(`?tab=reports&identifier=${reportId}`)
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-center">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div>Reports Table</div>
      )}
    </>
  )
}

export default ReportsTable