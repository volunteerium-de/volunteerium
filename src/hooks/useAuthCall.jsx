import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, loginSuccess, logoutSuccess } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import useAxios, { axiosWithPublic } from "./useAxios"

const useAuthCall = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiosWithToken = useAxios()

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithPublic.post("api/v1/auth/login", userInfo)
      dispatch(loginSuccess(data))

      navigate("/")
      console.log(data)
    } catch (error) {
      dispatch(fetchFail())
      console.error("Login failed: ", error.response?.data || error.message)
    }
  }
  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.get("api/v1/auth/logout")

      dispatch(logoutSuccess())
      navigate("/")
    } catch (error) {
      dispatch(fetchFail())
      console.error("Logout failed: ", error.response?.data || error.message)
    }
  }
  return { login, logout }
}

export default useAuthCall
