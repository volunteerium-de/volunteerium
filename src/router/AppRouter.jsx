import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRouter from "./PrivateRouter"
import NotFound from "../pages/NotFound"
import AboutUs from "../pages/AboutUs"
import EmailVerification from "../pages/EmailVerification";

const AppRouter = () => {
  return (
    <Router>
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
	      <Route path="register/email-verify" element={<EmailVerification/>} />
        <Route path="about" element={<AboutUs />} />

        <Route path="" element={<PrivateRouter />}>
          {/* <Route path="profile/:userId" element={<Profile />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
