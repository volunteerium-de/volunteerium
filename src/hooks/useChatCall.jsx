import { useDispatch } from "react-redux"
import {
  fetchFail,
  fetchStart,
  notificationSuccess,
  conversationSuccess,
} from "../features/chatSlice"
import toastNotify from "../utils/toastNotify"
import { useEffect } from "react"
import io from "socket.io-client"
import useAxios from "./useAxios"
import { useState } from "react"
import { useSelector } from "react-redux"

const useChatCall = () => {
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  const { currentUser, bearer } = useSelector((state) => state.auth)
  const { axiosWithToken } = useAxios()

  useEffect(() => {
    if (currentUser) {
      fetchConversations()
      fetchNotifications("/notifications")
    }
  }, [currentUser])

  useEffect(() => {
    if (bearer) {
      const newSocket = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
        query: { token: bearer },
      })

      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [bearer])

  useEffect(() => {
    if (socket) {
      socket.on("receive_notifications", (data) => {
        if (data.find((n) => n.userId === currentUser._id)) dispatch(notificationSuccess(data))
      })

      socket.on("receive_conversations", () => {
        fetchConversations()
      })

      return () => {
        socket.off("receive_notifications")
        socket.off("receive_conversations")
      }
    }
  }, [socket])

  const fetchNotifications = async (url) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get(url)
      // console.log(data)
      dispatch(notificationSuccess(data.data))
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
    }
  }

  const fetchConversations = async () => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get(`/conversations`)
      // console.log(data)
      dispatch(conversationSuccess(data.data))
    } catch (error) {
      dispatch(fetchFail())
      console.log(error)
    }
  }

  const sendMessage = async (content, conversationId) => {
    if (content) {
      try {
        await axiosWithToken.post(`/messages`, { content, conversationId })
      } catch (error) {
        console.log(error)
        toastNotify("error", error.message)
      }
    } else {
      toastNotify("error", "Please enter a message.")
    }
  }

  const createConversation = async (eventId, participantId) => {
    dispatch(fetchStart())
    if ((eventId, participantId)) {
      try {
        const { data } = await axiosWithToken.post(`/conversations`, {
          eventId,
          participantIds: [participantId],
        })
        // In Single Event Page , user will click send messages button, after that one conversation will be created. We just navigate with this conversationId to chat section
        return data.data._id
      } catch (error) {
        console.log(error)
        dispatch(fetchFail())
      }
    } else {
      toastNotify("error", "Event ID or Participant ID are missing.")
    }
  }

  const deleteConversation = async (conversationId) => {
    if (conversationId) {
      try {
        await axiosWithToken.delete(`/conversations/${conversationId}`)
      } catch (error) {
        // console.log(error)
        toastNotify("error", error.message)
      }
    } else {
      toastNotify("error", "Please select a conversation!")
    }
  }

  return { fetchConversations, sendMessage, createConversation, deleteConversation }
}

export default useChatCall
