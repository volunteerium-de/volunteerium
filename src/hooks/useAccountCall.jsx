import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, fetchSuccess, logoutSuccess } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import useAxios from "./useAxios"
import toastNotify from "../utils/toastNotify"
import { useSelector } from "react-redux"

const useAccountCall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { axiosWithToken } = useAxios()

  const updateUserDetails = async (userData) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.put(`details/users/${userDetailsId}`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      dispatch(fetchSuccess(data))
      console.log(data)
      return data
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const getSingleUser = async (userId) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken(`users/${userId}`)
      console.log(data)
      return data
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const deleteUser = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.delete(`users/${currentUser?._id}`)
      console.log(data)
      dispatch(logoutSuccess())
      toastNotify("success", data.message)

      setTimeout(() => {
        navigate("/")
      }, 0)
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const createAccountFile = async (documentData) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.post("documents", documentData)
      dispatch(fetchSuccess(data))
      return data
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const updateAccountFile = async (documentId, documentData) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.put(`documents/${documentId}`, documentData)
      dispatch(fetchSuccess(data))
      return data
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  const deleteAccountFile = async (documentId) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.delete(`documents/${documentId}`)
      dispatch(fetchSuccess(data))
      return data
    } catch (error) {
      dispatch(fetchFail())
      toastNotify("error", error.response.data.message)
    }
  }

  return {
    updateUserDetails,
    deleteUser,
    createAccountFile,
    updateAccountFile,
    deleteAccountFile,
    getSingleUser,
  }
}

export default useAccountCall
