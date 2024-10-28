import { useEffect } from "react"
import useAuthCall from "../../hooks/useAuthCall"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"

const EmailVerify = () => {
  const { verifyEmail } = useAuthCall()
  const {t} = useTranslation()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const verifyToken = queryParams.get("verifyToken")

    if (verifyToken) {
      verifyEmail(verifyToken)
    } else {
      console.error("Token not found in the URL")
    }
  }, [])

  return (
    <div>
      <h1>{t(translations.emailVerify.h1)}</h1>
    </div>
  )
}

export default EmailVerify
