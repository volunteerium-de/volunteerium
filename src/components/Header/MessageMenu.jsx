import { useState, useEffect, useRef } from "react"
import { FaEnvelope } from "react-icons/fa"
import { formatDistanceToNow } from "date-fns"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formatName } from "../../helpers/formatName"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import useChatCall from "../../hooks/useChatCall"
import i18n from "../../i18n"
import { enUS, de } from "date-fns/locale"
import { formatConversation } from "../../helpers/formatConversations"

const MessageMenu = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)
  const { conversations } = useSelector((state) => state.chat)
  const [totalUnreadCount, setTotalUnreadCount] = useState(0)
  const { markAsRead } = useChatCall()

  // Toggle the message dropdown
  const toggleMessageMenu = () => {
    setIsOpen(!isOpen)
  }
  //Time ago calculation
  const timeAgo = (timestamp) => {
    const locales = { en: enUS, de: de }
    const locale = locales[i18n.language] || enUS
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale })
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

  useEffect(() => {
    let totalUnread = 0
    if (Array.isArray(conversations)) {
      conversations.forEach(({ messageIds }) => {
        const { unreadCount } = getUnreadCountAndLatestMessage(messageIds)
        totalUnread += unreadCount
      })
    }
    setTotalUnreadCount(totalUnread)
  }, [conversations])

  const getUnreadCountAndLatestMessage = (messageIds) => {
    let unreadCount = 0
    let latestMessage = null

    messageIds.forEach((message) => {
      if (!isUserInReaderIds(message.readerIds)) {
        unreadCount++
      }
      if (!latestMessage || new Date(message.createdAt) > new Date(latestMessage.createdAt)) {
        latestMessage = message
      }
    })

    return { unreadCount, latestMessage }
  }

  const handleMessageClick = (conversationId) => {
    navigate(`/event-management?tab=messages&conversation=${conversationId}`)
    markAsRead(conversationId)
  }

  const sortedConversations = formatConversation(conversations)

  return (
    <div className="" ref={menuRef}>
      <div
        className="relative flex items-center justify-center p-1 cursor-pointer"
        onClick={toggleMessageMenu}
      >
        {/* Message Icon */}
        <FaEnvelope className="text-primary-green hover:text-dark-green dark:text-gray-2 h-7 w-7" />

        {/* Message Count Badge */}
        {totalUnreadCount > 0 && (
          <span className="select-none absolute top-0 right-0 h-5 w-5 bg-warning text-white rounded-full text-xs flex items-center justify-center">
            {totalUnreadCount}
          </span>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-2 mt-3 w-96 bg-white rounded-lg shadow-lg z-10">
          {/* Menu Header */}
          <div className="bg-primary-green text-white p-2 rounded-t-lg flex justify-between items-center">
            <h3>{t(translations.msgMenu.h3)}</h3>
            <Link
              to="/event-management?tab=messages"
              className="text-light-green text-[.7rem] cursor-pointer"
            >
              {t(translations.msgMenu.link)}
            </Link>
          </div>

          {/* Message List */}
          <div className="max-h-80 scrollbar overflow-y-auto">
            {sortedConversations &&
            sortedConversations.filter(({ messageIds }) => messageIds && messageIds.length > 0)
              .length ? (
              sortedConversations
                .filter(({ messageIds }) => messageIds && messageIds.length > 0)
                .map(({ _id, eventId, createdBy, messageIds }) => {
                  const { unreadCount, latestMessage } = getUnreadCountAndLatestMessage(messageIds)
                  const { title, eventPhoto } = eventId
                  const { fullName, organizationName, userType, userDetailsId } =
                    latestMessage.senderId
                  const { isFullNameDisplay } = userDetailsId
                  const name =
                    userType === "individual" || userType === "admin" ? fullName : organizationName
                  return (
                    <div
                      key={_id}
                      onClick={() => handleMessageClick(_id)}
                      className={`${unreadCount > 0 && "bg-light-gray-3"} p-3 border-b border-light-gray-2 dark:border-gray-2 dark:bg-dark-gray-2 hover:bg-light-gray-2 dark:hover:bg-dark-gray-1 shadow-md cursor-pointer`}
                    >
                      <div className="flex gap-2 items-start w-full">
                        <div className="w-[14%]">
                          {/* Event Photo */}
                          <img
                            src={eventPhoto}
                            alt={title}
                            className="object-fit h-10 w-10 rounded-full border-2 border-primary-green dark:border-gray-2 mx-auto"
                          />
                        </div>
                        {/* Message */}
                        <div className="flex flex-col w-[86%]">
                          <div className="flex items-center">
                            {/* Event Title */}
                            <h4 className="font-medium text-base text-primary-green dark:text-white">
                              {title}
                            </h4>

                            {unreadCount > 0 && (
                              <span className="inline-flex items-center justify-center p-1 h-5 w-4 text-xs bg-warning text-white  ml-2">
                                {unreadCount}
                              </span>
                            )}
                          </div>
                          {/* Sender Name */}
                          <p className="font-medium text-[0.9rem] text-gray-2 dark:text-gray-1">
                            {currentUser._id === latestMessage.senderId._id
                              ? t(translations.msgMenu.you)
                              : createdBy._id === eventId.createdBy
                                ? t(translations.msgMenu.announce)
                                : formatName(name, isFullNameDisplay)}
                          </p>
                          {/* Message Text */}
                          <p className="text-sm font-light text-dark-gray-2 dark:text-gray-1 truncate">
                            {latestMessage.content}
                          </p>
                          {/* Time Ago */}
                          <p className="text-xs pt-1 font-light text-right text-gray-2 dark:text-gray-1">
                            {timeAgo(latestMessage.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
            ) : (
              <div>
                <p className="text-center text-gray-2 py-3">{t(translations.msgMenu.noMsg)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageMenu
