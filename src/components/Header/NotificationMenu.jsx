/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react"
import { FaBell } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"

const NotificationMenu = ({ notifications, fetchNotifications }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const wasOpen = useRef(false)

  // Toggle the notification dropdown
  const toggleNotificationMenu = () => {
    setIsOpen(!isOpen)
  }

  // Time ago calculation
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  // Read notifications when the menu is closed
  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      if (notifications.some((notification) => notification.isRead === false)) {
        fetchNotifications("/notifications/read-all")
      }
    }
    wasOpen.current = isOpen
  }, [isOpen, fetchNotifications])

  return (
    <div className="" ref={menuRef}>
      <div
        className="relative flex items-center justify-center p-1 cursor-pointer"
        onClick={toggleNotificationMenu}
      >
        {/* Notification Icon */}
        <FaBell className="text-primary-green dark:text-gray-2 h-7 w-7" />

        {/* Notification Count Badge */}
        {notifications.length > 0 && (
          <span
            className={`select-none absolute top-0 right-0 h-5 w-5 ${
              notifications.find((notification) => notification?.isRead === false) && "bg-warning"
            } text-white rounded-full text-xs flex items-center justify-center`}
          >
            {notifications.filter((notification) => notification.isRead === false).length
              ? notifications.filter((notification) => notification.isRead === false).length
              : ""}
          </span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-2 mt-3 w-96 bg-white rounded-lg shadow-lg z-10">
          {/* Menu Header */}
          <div className="bg-primary-green text-white p-2 rounded-t-lg">Notifications</div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.map(({ _id, content, isRead, createdAt }) => (
              <div
                key={_id}
                className={`p-3 border-b border-light-gray-2 dark:border-gray-2  ${
                  isRead ? "bg-white dark:bg-dark-gray-3" : "bg-light-gray-2 dark:bg-dark-gray-2"
                } shadow-md`}
              >
                {/* Notification */}
                <div className="flex items-center">
                  {isRead && (
                    <span className="inline-block h-2 w-2 bg-primary-green dark:bg-white rounded-full mr-2"></span>
                  )}
                  <div>
                    {/* Notification Text */}
                    <h4 className="text-base font-normal text-primary-green dark:text-white ">
                      {content}
                    </h4>
                    {/* Time Ago */}
                    <p className="text-xs font-light text-gray-2 dark:text-gray-1">
                      {timeAgo(createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationMenu
