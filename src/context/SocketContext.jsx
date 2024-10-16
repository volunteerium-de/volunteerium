/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import io from "socket.io-client"

const SocketContext = createContext(null)

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { bearer } = useSelector((state) => state.auth)

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

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
