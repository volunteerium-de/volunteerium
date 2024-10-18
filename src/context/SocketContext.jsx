/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import io from "socket.io-client"
import useAxios from "../hooks/useAxios"
import toastNotify from "../utils/toastNotify"

const SocketContext = createContext(null)

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { currentUser, bearer } = useSelector((state) => state.auth)
  const [conversations, setConversations] = useState([])
  const [notifications, setNotifications] = useState([])
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
        if (data.find((n) => n.userId === currentUser._id)) setNotifications(data)
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
    try {
      const { data } = await axiosWithToken.get(url)
      // console.log(data)
      setNotifications(data.data)
    } catch (error) {
      console.log(error)
      toastNotify("error", error.message)
    }
  }

  const fetchConversations = async () => {
    const { data } = await axiosWithToken.get(`/conversations`)
    // console.log(data)
    setConversations(data.data)
  }

  const createConversation = async (eventId, participantId) => {
    if ((eventId, participantId)) {
      try {
        await axiosWithToken.post(`/conversations`, {
          eventId,
          participantIds: [participantId],
        })
      } catch (error) {
        // console.log(error);
        toastNotify("error", error.message)
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
      toastNotify("error", "Conversation ID is missing.")
    }
  }

  const values = {
    socket,
    notifications,
    fetchNotifications,
    conversations,
    createConversation,
    deleteConversation,
  }

  return <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
}
