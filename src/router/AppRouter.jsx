import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRouter from "./PrivateRouter"
import NotFound from "../pages/NotFound"
import AboutUs from "../pages/AboutUs"
import RegisterSuccess from "../components/Register/RegisterSuccess"
import ContactUs from "../pages/ContactUs"
import VerificationSuccess from "../components/UserEmailVerification/VerificationSuccess"
import SetupOrganization from "../pages/SetupOrganization"
import SetupIndividual from "../pages/SetupIndividual"
import Profile from "../pages/Profile"
import FAQuestion from "../pages/FAQuestion"
import Password from "../pages/Password"
import UserSettings from "../pages/UserSettings"
import EventListing from "../pages/EventListing"
import EmailVerify from "../components/UserEmailVerification/EmailVerify"
import { Navigate } from "react-router-dom"
import GoogleAuthSuccess from "../pages/GoogleAuthSuccess"
import GoogleAuthFail from "../pages/GoogleAuthFail"
import EventManagement from "../pages/EventManagement"
import PrivacyPolicy from "../pages/PrivacyPolicy";

const AppRouter = () => {
  const { currentUser: user } = useSelector((state) => state.auth)

  return (
    <Router>
      <Routes>
        {/* Public Routers */}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="faq" element={<FAQuestion />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="events" element={<EventListing />} />
        <Route path="password" element={<Password />} />
        <Route path="auth/success" element={<GoogleAuthSuccess />} />
        {/* Private Routers */}
        <Route element={<PrivateRouter />}>
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/verify-email/success" element={<VerificationSuccess />} />
          <Route
            path="/account-setup/organization"
            element={
              !user?.userDetailsId?.isProfileSetup ? (
                user?.userType === "organization" ? (
                  <SetupOrganization />
                ) : (
                  <Navigate to={`/account-setup/individual?clientId=${user?._id}`} />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/account-setup/individual"
            element={
              !user?.userDetailsId?.isProfileSetup ? (
                user?.userType === "individual" ? (
                  <SetupIndividual />
                ) : (
                  <Navigate to={`/account-setup/organization?clientId=${user?._id}`} />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />

        {/* Conditinally Rendered Routers */}
        {!user ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register/success" element={<RegisterSuccess />} />
            <Route path="auth/failure" element={<GoogleAuthFail />} />
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Navigate to="/" />} />
            <Route path="register" element={<Navigate to="/" />} />
            <Route path="register/success" element={<Navigate to="/" />} />
            <Route path="auth/failure" element={<Navigate to="/" />} />
            <Route path="/verify-email" element={<Navigate to="/" />} />
          </>
        )}

        <Route element={<PrivateRouter />}>
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/event-management" element={<EventManagement />} />
          <Route path="/user-org-setup" element={<SetupOrganization />} />
          <Route path="/user-ind-setup" element={<SetupIndividual />} />
          <Route path="/verify-email/success" element={<VerificationSuccess />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
