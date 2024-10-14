import { useDispatch } from "react-redux"
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import useAxios, { axiosWithPublic } from "./useAxios"
import toastNotify from "../utils/toastNotify"

const useAuthCall = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiosWithToken = useAxios()

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithPublic.post("auth/register", userInfo)
      dispatch(registerSuccess())
      navigate("/register/success")
      toastNotify("success", "Registration successful!")
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithPublic.post("auth/login", userInfo)
      dispatch(loginSuccess(data))
      navigate("/")
      toastNotify("success", "Login successful!")
      console.log(data)
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.get("auth/logout")
      dispatch(logoutSuccess())
      navigate("/")
      toastNotify("success", "Logout successful!")
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const verifyEmail = async (verifyEmailToken) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithPublic.post("/auth/verify-email", {
        verifyEmailToken,
      })
      dispatch(loginSuccess(data))
      navigate("/verify-email/success")
      toastNotify("success", "Email verified successful!")
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const SignUpWithGoogle = async () => {
    dispatch(fetchStart())

    try {
      toastNotify("success", "Registration successful!")
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const SignInWithGoogle = async () => {
    dispatch(fetchStart())

    try {
      toastNotify("success", "Login successful!")
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  return { register, login, logout, verifyEmail }
}

export default useAuthCall
