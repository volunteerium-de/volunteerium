import logo from "../../assets/logo.png"
import UserMenu from "./UserMenu"
import NotificationMenu from "./NotificationMenu"
import MessageMenu from "./MessageMenu"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import useAxios from "../../hooks/useAxios"
import { useSocket } from "../../context/SocketContext"
import toastNotify from "../../utils/toastNotify"

const Header = () => {
  const { currentUser: user } = useSelector((state) => state.auth)
  const [notifications, setNotifications] = useState([])
  const { axiosWithToken } = useAxios()
  const socket = useSocket()

  useEffect(() => {
    // Initial fetch
    if (user) {
      fetchNotifications("/notifications")
    }
  }, [user])

  // socket-io listening for notifications
  useEffect(() => {
    if (socket) {
      socket.on("receive_notifications", (data) => {
        if (data.find((n) => n.userId === user._id)) setNotifications(data)
      })

      return () => {
        socket.off("receive_notifications")
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

  return (
    <header className="relative bg-light-gray dark:bg-dark-gray-3 shadow-sm py-1">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center space-x-4">
          {/* Logo */}
          <img src={logo} alt="Volunterium Logo" className="h-[30px] w-auto sm:h-[40px]" />

          {/* Text */}
          <div className="hidden sm:block text-center">
            <h1 className="font-quattrocento text-2xl font-bold tracking-wider text-primary-green dark:text-light-green">
              Volunteerium
            </h1>
            <p className="font-quattrocento text-sm font-regular tracking-wide text-primary-green dark:text-light-green">
              SMALL ACT, BIG IMPACT
            </p>
          </div>
        </Link>
        {/* User - Notification - Message Menu  */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <NotificationMenu
                notifications={notifications}
                fetchNotifications={fetchNotifications}
              />
              <MessageMenu messageCount={5} />
            </>
          ) : null}
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}

export default Header
