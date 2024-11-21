import { useDispatch } from "react-redux"
import toastNotify from "../utils/toastNotify"
import useAxios, { axiosWithPublic } from "./useAxios"
import { fetchStart, fetchFail, getCategoriesSuccess } from "../features/searchSlice"
import { useSelector } from "react-redux"
import {
  fetchEventFail,
  fetchEventStart,
  fetchSingleEventSuccess,
  participationFail,
  participationStart,
} from "../features/eventSlice"
import { useNavigate } from "react-router-dom"

const useEventCall = () => {
  const { axiosWithToken, axiosWithBearer } = useAxios()
  const { currentUser: user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getEvents = async (url) => {
    try {
      const axiosInstance = user ? axiosWithBearer : axiosWithPublic
      const { data } = await axiosInstance(url)
      return data
    } catch (error) {
      console.error(
        "Error fetching events:",
        error.response ? error.response.data.message : error.message
      )
    }
  }

  const getSingleEvent = async (eventId) => {
    dispatch(fetchEventStart())
    try {
      const axiosInstance = user ? axiosWithBearer : axiosWithPublic
      const { data } = await axiosInstance(`events/${eventId}`)
      dispatch(fetchSingleEventSuccess(data.data))
    } catch (error) {
      console.log(error.response.data.message)
      dispatch(fetchEventFail())
      navigate("/not-found")
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
    dispatch(fetchEventStart())
    try {
      const { data } = await axiosWithToken.post(`events`, eventInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const editEvent = async (eventId, eventInfo) => {
    dispatch(fetchEventStart())
    try {
      const { data } = await axiosWithToken.put(`events/${eventId}`, eventInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const deleteEvent = async (eventId) => {
    dispatch(fetchEventStart())
    try {
      const { data } = await axiosWithToken.delete(`events/${eventId}`)
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
      dispatch(fetchEventFail())
    }
  }

  const joinEvent = async (eventId) => {
    dispatch(participationStart())
    try {
      const { data } = await axiosWithToken.post(`event-participants/join`, {
        eventId,
        userId: user?._id,
      })
      toastNotify("success", data.message)
      dispatch(fetchSingleEventSuccess(data.data))
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
      dispatch(participationFail())
    }
  }

  const getEventParticipant = async () => {
    try {
      const { data } = await axiosWithToken.get("event-participants")
      return data
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const approveParticipant = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/approve`, {
        userId,
        eventId,
      })
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const rejectParticipant = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/reject`, {
        userId,
        eventId,
      })
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const confirmAttendance = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/confirm-attendance`, {
        userId,
        eventId,
      })
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const confirmAbsence = async (userId, eventId) => {
    try {
      const { data } = await axiosWithToken.post(`event-participants/confirm-absence`, {
        userId,
        eventId,
      })
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const deleteEventParticipation = async (eventParticipantId) => {
    try {
      const { data } = await axiosWithToken.delete(`event-participants/${eventParticipantId}`)
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    }
  }

  const sendEventFeedback = async (formData) => {
    try {
      const { data } = await axiosWithToken.post(`event-feedbacks`, formData)
      toastNotify("success", data.message)
    } catch (error) {
      toastNotify("error", error?.response?.data?.message)
    } finally {
      getSingleEvent(formData.eventId)
    }
  }

  const sendEventReport = async (formData) => {
    try {
      const { data } = await axiosWithToken.post(`event-reports`, formData)
      toastNotify("success", data.message)
    } catch (error) {
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
    joinEvent,
    getEventParticipant,
    approveParticipant,
    rejectParticipant,
    confirmAttendance,
    confirmAbsence,
    deleteEventParticipation,
    sendEventFeedback,
    sendEventReport,
  }
}

export default useEventCall
