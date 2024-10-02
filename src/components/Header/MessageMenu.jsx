import { useState, useEffect, useRef } from "react"
import { FaEnvelope } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"

// Sample messages
const sampleMessages = [
  {
    id: 1,
    event: "Charity Run",
    message: "Your registration is confirmed for the event.",
    unread: true,
    timestamp: Date.now() - 10 * 60 * 1000, // 10 minutes ago
  },
  {
    id: 2,
    event: "Food Drive",
    message: "Thank you for volunteering! Please check the details.",
    unread: false,
    timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
  },
  {
    id: 3,
    event: "Tree Planting",
    message: "Remember to bring your tools and gloves.",
    unread: true,
    timestamp: Date.now() - 20 * 60 * 1000, // 20 minutes ago
  },
  {
    id: 4,
    event: "Beach Cleanup",
    message: "Meeting point is the north end of the beach.",
    unread: false,
    timestamp: Date.now() - 5 * 60 * 1000, // 5 minutes ago
  },
  {
    id: 5,
    event: "Blood Donation",
    message: "Don’t forget to bring your ID and health card.",
    unread: false,
    timestamp: Date.now() - 1 * 60 * 1000, // 1 minute ago
  },
]

const MessageMenu = ({ messageCount }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Toggle the message dropdown
  const toggleMessageMenu = () => {
    setIsOpen(!isOpen)
  }
  //Time ago calculation
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }
  //Closing the menu when cliicking outside
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
        onClick={toggleMessageMenu}
      >
        {/* Message Icon */}
        <FaEnvelope className="text-primary-green dark:text-gray-2 h-7 w-7" />

        {/* Message Count Badge */}
        {messageCount > 0 && (
          <span className="select-none absolute top-0 right-0 h-5 w-5 bg-warning text-white rounded-full text-xs flex items-center justify-center">
            {messageCount}
          </span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-2 mt-3 w-96 bg-white rounded-lg shadow-lg z-10">
          {/* Menu Header */}
          <div className="bg-primary-green text-white p-2 rounded-t-lg">Messages</div>

          {/* Message List */}
          <div className="max-h-70 overflow-y-auto">
            {sampleMessages.map(({ id, event, message, isRead, timestamp }) => (
              <div
                key={id}
                className={`p-3 border-b border-light-gray-2 dark:border-gray-2 ${
                  isRead ? "bg-light-gray-2 dark:bg-dark-gray-2" : "bg-white dark:bg-dark-gray-3"
                } shadow-md`}
              >
                {/* Message */}
                <div className="flex items-center">
                  {/* Event Title */}
                  <h4 className="font-medium text-base text-primary-green dark:text-white">
                    {event}
                  </h4>
                  {isRead && (
                    <span className="inline-block h-2 w-2 bg-primary-green dark:bg-white rounded-full ml-2"></span>
                  )}
                </div>
                {/* Message Text */}
                <p className="text-sm font-light text-gray-2 dark:text-gray-1 truncate">
                  {message}
                </p>
                {/* Time Ago */}
                <p className="text-xs font-thin text-gray-2 dark:text-gray-1">
                  {timeAgo(timestamp)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageMenu
