import React from "react"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { ImSpinner9 } from "react-icons/im"
import { useState } from "react"
import useAdminCall from "../../../hooks/useAdminCall"
import { useEffect } from "react"

const StatisticsPanel = () => {
  const { t } = useTranslation()
  const { fetchAllData, loading } = useAdminCall()
  const [statistics, setStatistics] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchStatistics()
    window.scrollTo(0, 0)
    setIsLoaded(true)
  }, [])

  const fetchStatistics = async () => {
    const data = await fetchAllData("administration/statistics")
    setStatistics(data.data)
  }

  const maxCount = Math.max(
    statistics?.User || 0,
    statistics?.Event || 0,
    statistics?.Address || 0,
    statistics?.Interest || 0,
    statistics?.EventParticipant || 0,
    statistics?.EventFeedback || 0,
    statistics?.Subscription || 0,
    statistics?.EventReport || 0,
    statistics?.Conversation || 0,
    statistics?.Message || 0,
    statistics?.Notification || 0,
    statistics?.Document || 0
  )

  const calculateBarWidth = (count) => {
    return `${(count / maxCount) * 100}%`
  }

  return (
    <>
      {loading ? (
        <div className="flex h-full justify-center items-start mt-24">
          <ImSpinner9 className="animate-spin h-8 w-8 text-primary-green" />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="h-full ">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-green dark:text-light-gray">
              {t(translations.adminPanel.statistics.statisticsPanel.title)}
            </h1>
            <div className="space-y-4 py-5 px-3 text-gray-2 dark:text-light-gray bg-white dark:bg-dark-gray-1 mt-5">
              {Object.entries(statistics).map(([key, count]) => (
                <div
                  key={key}
                  className="flex items-center space-x-4 border-b border-gray-1 dark:border-gray-2 pb-1"
                >
                  <span className="w-[220px] sm:w-[200px] text-xs sm:text-md xl:text-[1rem] overflow-x-auto scrollbar-hide font-semibold">
                    {t(translations.adminPanel.statistics.statisticsBars[key])
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  </span>

                  <div className="w-full bg-gray-200 dark:bg-dark-gray-3 border border-gray-200 dark:border-dark-gray-3 rounded-full h-3 md:h-4overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        key === "User"
                          ? "bg-blue-500"
                          : key === "Event"
                            ? "bg-green-500"
                            : key === "Address"
                              ? "bg-red-500"
                              : key === "Interest"
                                ? "bg-yellow-500"
                                : key === "EventParticipant"
                                  ? "bg-purple-500"
                                  : key === "EventFeedback"
                                    ? "bg-pink-500"
                                    : key === "Subscription"
                                      ? "bg-teal-500"
                                      : key === "EventReport"
                                        ? "bg-indigo-500"
                                        : key === "Conversation"
                                          ? "bg-orange-500"
                                          : key === "Message"
                                            ? "bg-gray-400"
                                            : key === "Notification"
                                              ? "bg-cyan-500"
                                              : "bg-gray-500"
                      }`}
                      style={{ width: isLoaded ? calculateBarWidth(count) : "0%" }}
                    ></div>
                  </div>

                  <span className="ml-4 text-xs sm:text-md xl:text-lg font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StatisticsPanel
