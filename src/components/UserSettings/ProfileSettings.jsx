import React from "react"
import IndividualSettingsForm from "./IndividualSettingsForm"
import OrganisationSettingsForm from "./OrganisationSettingsForm"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import { useSelector } from "react-redux"
translations
// import SecuritySettings from "./SecuritySettings"

const ProfileSettings = () => {
  const { t } = useTranslation()

  const { currentUser } = useSelector((state) => state.auth)
  return (
    <div className="mx-auto ">
      {currentUser.userType === "individual" ? (
        <IndividualSettingsForm />
      ) : currentUser.userType === "organization" ? (
        <OrganisationSettingsForm />
      ) : (
        <p>{t(translations.profileSettings.p)}</p>
      )}
    </div>
  )
}

export default ProfileSettings
