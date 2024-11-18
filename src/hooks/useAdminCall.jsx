import useAxios from "./useAxios"
import toastNotify from "../utils/toastNotify"
import { useSelector } from "react-redux"
import { useState } from "react"
import { fetchEventFail, fetchEventStart, fetchSingleEventSuccess } from "../features/eventSlice"
import { useDispatch } from "react-redux"

const useAdminCall = () => {
  const { currentUser: user } = useSelector((state) => state.auth)
  const { axiosWithBearer } = useAxios()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const ErrorMessage = "Error: Only admin can perform this action"

  const fetchAllData = async (url) => {
    if (user.userType === "admin") {
      setLoading(true)
      try {
        const { data } = await axiosWithBearer.get(url)
        return data
      } catch (error) {
        toastNotify("error", error.response.data.message || error.message)
      } finally {
        setLoading(false)
      }
    } else {
      toastNotify("error", ErrorMessage)
    }
  }

  const fetchSingleData = async (url, id) => {
    if (user.userType === "admin") {
      setLoading(true)
      try {
        const { data } = await axiosWithBearer.get(`${url}/${id}`)
        return data.data
      } catch (error) {
        toastNotify("error", error.response.data.message || error.message)
      } finally {
        setLoading(false)
      }
    } else {
      toastNotify("error", ErrorMessage)
    }
  }

  const postData = async (url, newData) => {
    if (user.userType === "admin") {
      setLoading(true)
      try {
        const { data } = await axiosWithBearer.post(url, newData)
        toastNotify("success", data.message)
        return data
      } catch (error) {
        toastNotify("error", error.response.data.message || error.message)
      } finally {
        setLoading(false)
      }
    } else {
      toastNotify("error", ErrorMessage)
    }
  }

  const updateData = async (url, id, newData) => {
    if (user.userType === "admin") {
      setLoading(true)
      if (url === "events") {
        dispatch(fetchEventStart())
      }
      try {
        const { data } = await axiosWithBearer.put(`${url}/${id}`, newData)
        toastNotify("success", data.message)

        if (url === "events") {
          dispatch(fetchSingleEventSuccess(data.new))
        }

        return data.new
      } catch (error) {
        toastNotify("error", error.response.data.message || error.message)
        if (url === "events") {
          dispatch(fetchEventFail())
        }
      } finally {
        setLoading(false)
      }
    } else {
      toastNotify("error", ErrorMessage)
    }
  }

  const deleteData = async (url, id) => {
    if (user.userType === "admin") {
      setLoading(true)
      try {
        const { data } = await axiosWithBearer.delete(`${url}/${id}`)
        toastNotify("success", data.message)
        const newData = fetchAllData(url)
        return newData
      } catch (error) {
        toastNotify("error", error.response.data.message || error.message)
      } finally {
        setLoading(false)
      }
    } else {
      toastNotify("error", ErrorMessage)
    }
  }

  const requestDatabaseReset = async () => {
    try {
      const { data } = await axiosWithBearer.get("administration/reset-database")
      toastNotify("success", data.message)
      return data.data
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const resetDatabase = async (email, resetToken, code) => {
    try {
      const { data } = await axiosWithBearer.post("administration/reset-database", {
        email,
        resetDatabaseToken: resetToken,
        resetCode: code,
      })
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  return {
    loading,
    fetchAllData,
    fetchSingleData,
    postData,
    updateData,
    deleteData,
    requestDatabaseReset,
    resetDatabase,
  }
}

export default useAdminCall
