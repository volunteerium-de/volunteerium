import { t } from "i18next"
import React from "react"
import { ImSpinner9 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { translations } from "../../../locales/translations"
import { formatDate } from "../../../helpers/formatDate"

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
      ) : data && Array.isArray(data) && data.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table min-w-full bg-white dark:bg-dark-gray-1">
            <thead className="thead">
              <tr className="tr w-full bg-primary-green dark:bg-light-gray text-light-gray dark:text-dark-gray-1 uppercase text-sm leading-normal">
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.reports.reportsTable.reportId)}
                </th>
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.reports.reportsTable.reportType)}
                </th>
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.reports.reportsTable.reportedBy)}
                </th>
                <th className="th p-3 text-left">
                  {t(translations.adminPanel.reports.reportsTable.eventId)}
                </th>
                <th className="th p-3 text-center">
                  {t(translations.adminPanel.reports.reportsTable.createdAt)}
                </th>
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
                    data-label={t(translations.adminPanel.reports.reportsTable.reportId)}
                  >
                    {report?._id}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label={t(translations.adminPanel.reports.reportsTable.reportType)}
                  >
                    <span className="font-semibold text-danger">{report?.reportType}</span>
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label={t(translations.adminPanel.reports.reportsTable.reportedByDL)}
                  >
                    {report?.reportedBy ||
                      t(translations.adminPanel.reports.singleReportPanel.guest)}
                  </td>
                  <td
                    className={"td text-left 2xl:w-[150px] whitespace-nowrap"}
                    data-label={t(translations.adminPanel.reports.reportsTable.eventIdDL)}
                  >
                    {report?.eventId}
                  </td>
                  <td
                    className="td text-center whitespace-nowrap"
                    data-label={t(translations.adminPanel.reports.reportsTable.createdAt)}
                  >
                    {formatDate(report?.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 sm:p-0 mt-4 text-center sm:text-left text-dark-gray-2 dark:text-light-gray">
          {t(translations.adminPanel.reports.reportsTable.noReports)}
        </div>
      )}
    </>
  )
}

export default ReportsTable
