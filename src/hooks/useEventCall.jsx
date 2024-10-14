import toastNotify from "../utils/toastNotify"
import useAxios, { axiosWithPublic } from "./useAxios"

const version = import.meta.env.VITE_VERSION

const useEventCall = () => {
  const { axiosWithToken } = useAxios()

  const getEvents = async (url) => {
    try {
      const { data } = await axiosWithPublic(`/api/${version}/${url}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const getSingleEvent = async (eventId) => {
    try {
      const { data } = await axiosWithPublic(`/api/${version}/events/${eventId}`)
      // console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const postEvent = async (eventInfo) => {
    try {
      const { data } = await axiosWithToken.post(`/api/${version}/events`, eventInfo)
      console.log(data)
      toastNotify("success", "Event created successfully")
      getEvents("events")
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
      const { data } = await axiosWithToken.put(`/api/${version}/events/${eventId}`, eventInfo)
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
      const data = await axiosWithToken.delete(`/api/${version}/events/${eventId}`)
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

  return { getEvents, getSingleEvent, postEvent, editEvent, deleteEvent }
}

export default useEventCall
