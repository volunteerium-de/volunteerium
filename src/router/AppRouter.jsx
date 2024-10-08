import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRouter from "./PrivateRouter"
import NotFound from "../pages/NotFound"
import AboutUs from "../pages/AboutUs"
import EmailVerification from "../pages/EmailVerification"
import Feedback from "../pages/Feedback"
import VerificationSuccess from "../pages/VerificationSuccess"
import SetupOrganization from "../pages/SetupOrganization"
import SetupIndividual from "../pages/SetupIndividual"
import Profile from "../pages/Profile"
import FAQuestion from "../pages/FAQuestion"
import UserSettings from "../pages/UserSettings"

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="profile" element={<Profile />} />
        <Route path="register/email-verify" element={<EmailVerification />} />
        <Route path="register/email-verify/success" element={<VerificationSuccess />} />
        <Route path="/register/email-verify/success/org-setup" element={<SetupOrganization />} />
        <Route path="/register/email-verify/success/indv-setup" element={<SetupIndividual />} />
        <Route path="faq" element={<FAQuestion />} />
        <Route path="feedback" element={<Feedback />} />

        <Route element={<PrivateRouter />}>
          {/* <Route path="profile/:userId" element={<Profile />} /> */}
          <Route path="/settings" element={<UserSettings />} />
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
