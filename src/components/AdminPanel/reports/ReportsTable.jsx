import React from "react"
import { useTranslation } from "react-i18next"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { translations } from "../../../locales/translations"

const ReportsTable = ({ data, loading }) => {
  const {t} = useTranslation()
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
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table min-w-full bg-white dark:bg-dark-gray-1">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-dark-gray-1 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">Report ID</th>
                <th className="th p-3 text-left">Report Type</th>
                <th className="th p-3 text-left">Reported By</th>
                <th className="th p-3 text-left">Event ID</th>
                <th className="th p-3 text-center">Created At</th>
              </tr>
            </thead>
            <tbody className="tbody text-dark-gray-1 dark:text-light-gray text-sm font-light">
              {data.map((report) => (
                <tr
                  key={report?._id}
                  onClick={() => handleNavigateSingleReport(report?._id)}
                  className="border-b border-light-gray dark:border-dark-gray-1 hover:bg-gray-100 dark:hover:bg-dark-gray-2 text-sm cursor-pointer"
                >
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label="Report ID"
                  >
                    {report?._id}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label="Report Type"
                  >
                    {report?.reportType}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label="Reported By"
                  >
                    {report?.reportedBy}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label="Event ID"
                  >
                    {report?.eventId}
                  </td>
                  <td className="td text-center whitespace-nowrap" data-label="Created At">
                    {new Date(report?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>{t(translations.adminPanel.reports.reportsTable.header)}</div>
      )}
    </>
  )
}

export default ReportsTable
