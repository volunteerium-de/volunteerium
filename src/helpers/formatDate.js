import i18n from "../i18n"
// import { useTranslation } from "react-i18next"

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(i18n.language, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export const formatDateWithTime = (dateString) => {
  return new Date(dateString)
    .toLocaleString(i18n.language, {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace("at", "-")
}

export const formatDateWithAll = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const formattedStartDate = start.toLocaleString(i18n.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedStartTime = start.toLocaleTimeString(i18n.language, {
    hour: "2-digit",
    minute: "2-digit",
  })

  const formattedEndTime = end.toLocaleTimeString(i18n.language, {
    hour: "2-digit",
    minute: "2-digit",
  })

  return `${formattedStartDate.split(",")[0]}, ${formattedStartTime} - ${formattedEndTime}`
}
