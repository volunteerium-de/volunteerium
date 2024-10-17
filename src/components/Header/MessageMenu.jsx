import { useState, useEffect, useRef } from "react"
import { FaEnvelope } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"
import { useSocket } from "../../context/SocketContext"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formatName } from "../../helpers/formatName"

const MessageMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { newMessages } = useSocket()
  const { currentUser } = useSelector((state) => state.auth)

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

  const isUserInReaderIds = (readerIds) => {
    const isRead = readerIds.includes(String(currentUser._id))
    return isRead
  }

  console.log(newMessages)

  return (
    <div className="" ref={menuRef}>
      <div
        className="relative flex items-center justify-center p-1 cursor-pointer"
        onClick={toggleMessageMenu}
      >
        {/* Message Icon */}
        <FaEnvelope className="text-primary-green dark:text-gray-2 h-7 w-7" />

        {/* Message Count Badge */}
        {newMessages && newMessages.length > 0 && (
          <span className="select-none absolute top-0 right-0 h-5 w-5 bg-warning text-white rounded-full text-xs flex items-center justify-center">
            {newMessages.length}
          </span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-2 mt-3 w-96 bg-white rounded-lg shadow-lg z-10">
          {/* Menu Header */}
          <div className="bg-primary-green text-white p-2 rounded-t-lg flex justify-between items-center">
            <h3>Messages</h3>
            <Link className="text-light-green text-[.7rem] cursor-pointer">View All</Link>
          </div>

          {/* Message List */}
          <div className="max-h-80 overflow-y-auto">
            {newMessages && newMessages.length ? (
              newMessages.map(
                ({
                  _id,
                  conversationId,
                  conversationOwner,
                  eventId,
                  content,
                  readerIds,
                  createdAt,
                  senderId,
                }) => {
                  const isRead = isUserInReaderIds(readerIds)
                  const { title, eventPhoto, createdBy } = eventId
                  const { fullName, organizationName, userType, userDetailsId } = senderId
                  const { isFullNameDisplay } = userDetailsId
                  const name =
                    userType === "individual" || userType === "admin" ? fullName : organizationName
                  return (
                    <div
                      key={_id}
                      // onClick={() => navigate(`/event-management?tab=messages&conversation=${conversationId}`)}
                      className={`p-3 border-b border-light-gray-2 dark:border-gray-2 dark:bg-dark-gray-2 hover:bg-light-gray-2 dark:hover:bg-dark-gray-1 shadow-md cursor-pointer`}
                    >
                      <div className="flex gap-2 items-start">
                        <div className="w-12">
                          {/* Event Photo */}
                          <img
                            src={eventPhoto}
                            alt={title}
                            className="object-fit h-10 w-full rounded-full border-2 border-primary-green dark:border-gray-2"
                          />
                        </div>
                        {/* Message */}
                        <div className="flex flex-col w-full">
                          <div className="flex items-center">
                            {/* Event Title */}
                            <h4 className="font-medium text-base text-primary-green dark:text-white">
                              {title}
                            </h4>

                            {isRead && (
                              <span className="inline-block h-2 w-2 bg-primary-green dark:bg-white rounded-full ml-2"></span>
                            )}
                          </div>
                          {/* Sender Name */}
                          <p className="font-medium text-[0.9rem] text-gray-2 dark:text-white">
                            {conversationOwner === createdBy
                              ? "Announcement"
                              : formatName(name, isFullNameDisplay)}
                          </p>
                          {/* Message Text */}
                          <p className="text-sm font-light text-gray-2 dark:text-gray-1 truncate">
                            {content}
                          </p>
                          {/* Time Ago */}
                          <p className="text-xs font-light text-right text-gray-2 dark:text-gray-1">
                            {timeAgo(createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                }
              )
            ) : (
              <div>
                <p className="text-center text-gray-2 py-3 dark:text-light-gray-2">
                  No new messages
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageMenu
