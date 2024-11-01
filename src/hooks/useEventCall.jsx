import { useDispatch } from "react-redux"
import toastNotify from "../utils/toastNotify"
import useAxios, { axiosWithPublic } from "./useAxios"
import { fetchFail, fetchStart, getCategoriesSuccess } from "../features/searchSlice"
import { useSelector } from "react-redux"

const useEventCall = () => {
  const { axiosWithToken } = useAxios()
  const { currentUser: user } = useSelector((state) => state.auth)
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
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithPublic(`events/${eventId}`)
      console.log(data)
      return data
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(fetchFail())
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
      const { data } = await axiosWithToken.post(`events`, eventInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      toastNotify("success", data.message)

      // getEvents("events")
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const editEvent = async (eventId, eventInfo) => {
    try {
      const { data } = await axiosWithToken.put(`events/${eventId}`, eventInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(data)
      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
    } finally {
      getSingleEvent(eventId)
    }
  }

  const deleteEvent = async (eventId) => {
    try {
      const { data } = await axiosWithToken.delete(`events/${eventId}`)
      console.log("Delete response:", data)

      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const joinEvent = async (eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/join`, {
        eventId,
        userId: user?._id,
      })
      // console.log(data)
      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const approveParticipant = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/approve`, {
        userId,
        eventId,
      })
      // console.log(data)
      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const rejectParticipant = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/reject`, {
        userId,
        eventId,
      })
      // console.log(data)
      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const confirmAttendance = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/confirm-attendance`, {
        userId,
        eventId,
      })
      // console.log(data)
      toastNotify("success", data.message)

      const updatedEvent = getSingleEvent(eventId)
      return updatedEvent
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const confirmAbsence = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/confirm-absence`, {
        userId,
        eventId,
      })
      // console.log(data)
      toastNotify("success", data.message)

      const updatedEvent = getSingleEvent(eventId)
      return updatedEvent
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const deleteEventParticipation = async (eventParticipantId) => {
    try {
      const { data } = await axiosWithToken.delete(`event-participants/${eventParticipantId}`)
      // console.log(data)
      toastNotify("success", data.message)

      const updatedEvent = getSingleEvent(data.eventId)
      return updatedEvent
    } catch (error) {
      console.log(error)
      toastNotify("error", error?.response?.data?.message)
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
