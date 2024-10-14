import { useEffect } from "react"
import useAuthCall from "../../hooks/useAuthCall"

const EmailVerify = () => {
  const { verifyEmail } = useAuthCall()

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
      <h1>Verifying your email...</h1>
    </div>
  )
}

export default EmailVerify
