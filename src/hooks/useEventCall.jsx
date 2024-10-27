import { useDispatch } from "react-redux"
import toastNotify from "../utils/toastNotify"
import useAxios, { axiosWithPublic } from "./useAxios"
import { fetchFail, fetchStart, getCategoriesSuccess } from "../features/searchSlice"

const useEventCall = () => {
  const { axiosWithToken } = useAxios()
  const dispatch = useDispatch()

  const getEvents = async (url) => {
    try {
      const { data } = await axiosWithPublic(url)
      return data
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const getSingleEvent = async (eventId) => {
    try {
      const { data } = await axiosWithPublic(`events/${eventId}`)
      // console.log(data)
      return data
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const getEventCategories = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithPublic("interests")
      dispatch(getCategoriesSuccess(data.data))
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(fetchFail())
    }
  }

  const postEvent = async (eventInfo) => {
    try {
      const { data } = await axiosWithToken.post(`events`, eventInfo)
      console.log(data)
      toastNotify("success", data.message)
      // getEvents("events")
    } catch (error) {
      console.log(error)
      toastNotify(
        "error",
        error?.response?.data?.message || "Failed to post event. Please try again."
      )
    }
  }

  const editEvent = async (eventId, eventInfo) => {
    try {
      const { data } = await axiosWithToken.put(`events/${eventId}`, eventInfo)
      console.log(data)
      toastNotify("success", "Event edited successfully!")
    } catch (error) {
      console.log(error)
      toastNotify(
        "error",
        error?.response?.data?.message || "Failed to edit Event. Please try again."
      )
    } finally {
      getSingleEvent(eventId)
    }
  }

  const deleteEvent = async (eventId) => {
    try {
      const data = await axiosWithToken.delete(`events/${eventId}`)
      console.log("Delete response:", data)

      toastNotify("success", "Event deleted successfully!")
    } catch (error) {
      console.log(error)
      toastNotify(
        "error",
        error?.response?.data?.message || "Failed to delete event. Please try again."
      )
    }
  }

  return {
    getEvents,
    getSingleEvent,
    getEventCategories,
    postEvent,
    editEvent,
    deleteEvent,
  }
}

export default useEventCall
