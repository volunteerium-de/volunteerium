import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, fetchSuccess } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import useAxios from "./useAxios"
import toastNotify from "../utils/toastNotify"

const useAccountCall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const updateUser = async (userData, userDetailsId) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.put(`details/users/${userDetailsId}`, userData)
      dispatch(fetchSuccess(data))
      console.log(data)
      navigate("/")
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  return { updateUser }
}

export default useAccountCall
