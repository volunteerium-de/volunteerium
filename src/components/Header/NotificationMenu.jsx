import { useState, useEffect, useRef } from "react"
import { FaBell } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"

// Mockup notifications
const sampleNotifications = [
  {
    id: 1,
    notificationTitle: "A new volunteer request is available.",
    isRead: true,
    timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
  },
  {
    id: 2,
    notificationTitle: "The time for your event has been updated. ",
    isRead: true,
    timestamp: Date.now() - 50 * 60 * 1000, // 50 minutes ago
  },
  {
    id: 3,
    notificationTitle: "Your request to join the event has been approved!",
    isRead: false,
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
  },
  {
    id: 4,
    notificationTitle: "A new event is happening near you!",
    isRead: false,
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
  },
  {
    id: 5,
    notificationTitle: "Don't forget about the event tomorrow.",
    isRead: false,
    timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
  },
]

const NotificationMenu = ({ notificationCount }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

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

  return (
    <div className="" ref={menuRef}>
      <div
        className="relative flex items-center justify-center p-1 cursor-pointer"
        onClick={toggleNotificationMenu}
      >
        {/* Notification Icon */}
        <FaBell className="text-primary-green dark:text-gray-2 h-7 w-7" />

        {/* Notification Count Badge */}
        {notificationCount > 0 && (
          <span className="select-none absolute top-0 right-0 h-5 w-5 bg-warning text-white rounded-full text-xs flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-2 mt-3 w-96 bg-white rounded-lg shadow-lg z-10">
          {/* Menu Header */}
          <div className="bg-primary-green text-white p-2 rounded-t-lg">Notifications</div>

          {/* Notification List */}
          <div className="max-h-70 overflow-y-auto">
            {sampleNotifications.map(({ id, notificationTitle, isRead, timestamp }) => (
              <div
                key={id}
                className={`p-3 border-b border-light-gray-2 dark:border-gray-2  ${
                  isRead ? "bg-light-gray-2 dark:bg-dark-gray-2" : "bg-white dark:bg-dark-gray-3"
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
                      {notificationTitle}
                    </h4>
                    {/* Time Ago */}
                    <p className="text-xs font-light text-gray-2 dark:text-gray-1">
                      {timeAgo(timestamp)}
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
