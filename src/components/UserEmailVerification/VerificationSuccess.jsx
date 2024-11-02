import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { translations } from "../../locales/translations"

const VerificationSuccess = () => {
  const { t } = useTranslation()
  const { currentUser: user } = useSelector((state) => state.auth)

  const getUserTypeLink = () => {
    if (!user?.userDetailsId?.isProfileSetup) {
      if (user?.userType === "individual") {
        return `/account-setup/individual?clientId=${user?._id}`
      } else if (user?.userType === "organization") {
        return `/account-setup/organization?clientId=${user?._id}`
      } else {
        return "/"
      }
    }
    return "/"
  }

  return (
    <div className="h-screen flex items-center justify-center font-poppins dark:bg-black">
      <div className="text-center max-w-xl mx-auto px-8 py-8 rounded-lg">
        <h1 className="text-[1.75rem] font-bold  dark:text-white mb-6">
          Hey {user?.fullName.split(" ")[0] || user?.organizationName},{" "}
          {t(translations.verifySuccess.h1)}
        </h1>
        <p className="text-primary-green font-semibold mb-4">{t(translations.verifySuccess.p1)}</p>
        <p className="hidden md:block text-dark-gray-1 dark:text-white mb-6">
          {t(translations.verifySuccess.p2)}{" "}
          <span className="text-primary-green font-semibold">
            {t(translations.verifySuccess.p3)}
          </span>
          .
        </p>
        <p className="text-dark-gray-1 dark:text-white mb-8">{t(translations.verifySuccess.p4)}</p>
        <Link
          to={getUserTypeLink()}
          className="px-14 py-2 bg-primary-green text-white rounded-md hover:bg-dark-green transition-colors"
        >
          {t(translations.verifySuccess.link)}
        </Link>
      </div>
    </div>
  )
}

export default VerificationSuccess
