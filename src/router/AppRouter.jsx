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
import EmailVerify from "../components/UserEmailVerification/EmailVerify"
import { Navigate } from "react-router-dom"

const AppRouter = () => {
  const { currentUser: user } = useSelector((state) => state.auth)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="faq" element={<FAQuestion />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="password" element={<Password />} />

        <Route element={<PrivateRouter />}>
          {/* <Route path="profile/:userId" element={<Profile />} /> */}
          <Route path="/settings" element={<UserSettings />} />
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />

        {!user ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register/success" element={<RegisterSuccess />} />
            <Route path="/verify-email" element={<EmailVerify />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Navigate to="/" />} />
            <Route path="register" element={<Navigate to="/" />} />
            <Route path="register/success" element={<Navigate to="/" />} />
            <Route path="/verify-email" element={<Navigate to="/" />} />
          </>
        )}

        <Route element={<PrivateRouter />}>
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/user-org-setup" element={<SetupOrganization />} />
          <Route path="/user-ind-setup" element={<SetupIndividual />} />
          <Route path="/verify-email/success" element={<VerificationSuccess />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
