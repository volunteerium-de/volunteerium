import i18n from "../i18n"

export function debounce(func, wait) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}

export function validateLocation(event) {
  if (event.isOnline) {
    return "Online"
  }
  if (event?.addressId?.iframeSrc && isValidIframeSrc(event?.addressId?.iframeSrc)) {
    return `${event.addressId?.city}, ${event.addressId?.country}`
  }
  return i18n.language == "de" ? "Ungültige Addresse" : "Invalid Address"
}
function isValidIframeSrc(iframeSrc) {
  const validIframePatterns = [/openstreetmap\.org/i, /google\.com\/maps/i]
  return validIframePatterns.some((pattern) => pattern.test(iframeSrc))
}
