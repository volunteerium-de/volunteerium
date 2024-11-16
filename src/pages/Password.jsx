// src/pages/Password.jsx

import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ForgotPassword from "../components/Password/Forgot/ForgotPassword"
import Verification from "../components/Password/Verification/Verification"
import ResetPassword from "../components/Password/Reset/ResetPassword"
import Header from "../components/Header/Header"

const Password = () => {
  // State to track the current page/issue
  const [searchParams, setSearchParams] = useSearchParams()
  const [email, setEmail] = useState("")
  const [issue, setIssue] = useState("forgot")
  const [identifier, setIdentifier] = useState("")

  // Effect to update URL parameters whenever issue or identifier changes
  useEffect(() => {
    const params = { issue }
    if (identifier) {
      params.identifier = identifier
    }
    setSearchParams(params)
  }, [issue, identifier, setSearchParams])

  // Render the correct component based on the current issue value
  const renderContent = () => {
    switch (issue) {
      case "forgot":
        return (
          <ForgotPassword setIssue={setIssue} setIdentifier={setIdentifier} setEmail={setEmail} />
        )
      case "verify-reset-token":
        return (
          <Verification
            setIssue={setIssue}
            identifier={identifier}
            setIdentifier={setIdentifier}
            email={email}
          />
        )
      case "set-new-password":
        return <ResetPassword identifier={identifier} email={email} />
      default:
        return (
          <ForgotPassword setIssue={setIssue} setIdentifier={setIdentifier} setEmail={setEmail} />
        )
    }
  }

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Render the corresponding content */}
      {renderContent()}
    </>
  )
}

export default Password
