export function formatName(name, isFullNameDisplay) {
  if (isFullNameDisplay) {
    return name
  } else {
    const nameParts = name.split(" ")
    if (nameParts.length > 1) {
      const lastName = nameParts[nameParts.length - 1]
      const abbreviatedLastName = lastName.charAt(0) + "."
      nameParts[nameParts.length - 1] = abbreviatedLastName
      return nameParts.join(" ")
    }
    return name
  }
}
