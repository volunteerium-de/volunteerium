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
import EventDetails from "../pages/EventDetails"
import GoogleAuthSuccess from "../pages/GoogleAuthSuccess"
import GoogleAuthFail from "../pages/GoogleAuthFail"
import EventManagement from "../pages/EventManagement"
import PrivacyPolicy from "../pages/PrivacyPolicy"
import AdminPanel from "../pages/AdminPanel"
import { useParams } from "react-router-dom"
import TermsOfService from "../pages/TermsOfService"
import GooglePassword from "../pages/GooglePassword"

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
        <Route path="profile/:userId" element={<ProfileRedirect />} />
        <Route path="events" element={<EventListing />} />
        <Route path="events/:eventId" element={<EventDetails />} />
        <Route path="password" element={<Password />} />
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
                ) : user?.userType === "individual" ? (
                  <Navigate to={`/account-setup/individual?clientId=${user?._id}`} />
                ) : (
                  <Navigate to="/" />
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
                ) : user?.userType === "organization" ? (
                  <Navigate to={`/account-setup/organization?clientId=${user?._id}`} />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin-panel"
            element={user?.userType !== "admin" ? <Navigate to="/not-found" /> : <AdminPanel />}
          />
          <Route
            path="/event-management"
            element={
              user?.userType === "admin" ? <Navigate to="/not-found" /> : <EventManagement />
            }
          />
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />

        {/* Conditinally Rendered Routers */}
        {!user ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register/success" element={<RegisterSuccess />} />
            <Route path="auth/failure" element={<GoogleAuthFail />} />
            <Route path="auth/success" element={<GoogleAuthSuccess />} />
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route path="auth/password" element={<Navigate to="/" />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Navigate to="/" />} />
            <Route path="register" element={<Navigate to="/" />} />
            <Route path="register/success" element={<Navigate to="/" />} />
            <Route path="auth/failure" element={<Navigate to="/" />} />
            <Route path="auth/password" element={<GooglePassword />} />
            <Route path="auth/success" element={<Navigate to="/" />} />
            <Route path="/verify-email" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default AppRouter

export const ProfileRedirect = () => {
  const { userId } = useParams()
  if (String(userId) === String(import.meta.env.VITE_ADMIN_ID)) {
    return <Navigate to="/" />
  } else {
    return <Profile />
  }
}
