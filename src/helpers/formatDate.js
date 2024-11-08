import i18n from "../i18n"

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
