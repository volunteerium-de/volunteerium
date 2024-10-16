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
  const { bearer } = useSelector((state) => state.auth)
  const [conversations, setConversations] = useState([])
  const { axiosWithToken } = useAxios()

  useEffect(() => {
    fetchConversations()
  }, [])

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
      socket.on("receive_conversations", () => {
        fetchConversations()
      })

      return () => {
        socket.off("receive_conversations")
      }
    }
  }, [socket])

  const fetchConversations = async () => {
    const { data } = await axiosWithToken.get(`/conversations`)
    console.log(data)
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

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
