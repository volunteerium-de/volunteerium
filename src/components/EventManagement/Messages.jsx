import React, { useState } from "react"
import { useSelector } from "react-redux"
import { FiMessageCircle } from "react-icons/fi"
import MessageInput from "./messages/MessageInput"
import useChatCall from "../../hooks/useChatCall"
import { useRef } from "react"
import { useEffect } from "react"
import { formatTime, formatDate } from "../../helpers/formatDate"
import { UserAvatar } from "../ui/Avatar/userAvatar"
import { useNavigate } from "react-router-dom"

const Messages = () => {
  const { currentUser, loading } = useSelector((state) => state.auth)
  const { conversations } = useSelector((state) => state.chat)
  const [selectedId, setSelectedId] = useState(null)
  const { sendMessage, markAsRead } = useChatCall()
  const navigate = useNavigate()
  const bottomRef = useRef(null)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const conversationId = queryParams.get("conversation")
    if (conversationId) {
      setSelectedId(conversationId)
      markAsRead(conversationId)
    }
  }, [location.search])

  const selectedConversation = conversations.find((conversation) => conversation._id === selectedId)

  const getUnreadCount = (messageIds) => {
    return messageIds.filter((message) => !message.readerIds.includes(currentUser._id)).length
  }

  const handleConversationClick = async (conversation) => {
    setSelectedId(conversation._id)
    navigate(`/event-management?tab=messages&conversation=${conversation._id}`)
    markAsRead(conversation._id)
  }

  const handleSendMessage = (content) => {
    if (selectedId) {
      sendMessage(content, selectedId)
    }
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView()
    }
  }, [selectedConversation?.messageIds])

  return (
    <>
      {loading ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-green border-opacity-50 dark:border-light-green"></div>
          <p className="text-2xl font-semibold text-primary-green dark:text-light-gray">
            Loading...
          </p>
        </div>
      ) : (
        <div className="md:flex dark:bg-black -mt-2">
          <div className=" md:w-[450px] 3xl:w-[700px] h-[85.5vh] p-4 overflow-y-auto dark:bg-dark-gray-3 rounded-l-lg scrollbar">
            <div>
              {conversations && conversations.length > 0 ? (
                conversations.map((conversation) => {
                  const {
                    _id,
                    participantIds,
                    eventId: { eventPhoto, title } = {},
                    createdBy,
                    messageIds = [],
                  } = conversation
                  const lastMessage =
                    messageIds.length > 0 ? messageIds[messageIds.length - 1] : null
                  const unreadCount = getUnreadCount(messageIds)
                  const isSelected = selectedConversation?._id === _id
                  const isAnnouncement = createdBy._id === conversation.eventId.createdBy

                  return (
                    <div
                      key={_id}
                      onClick={() => handleConversationClick(conversation)}
                      className={`flex items-center justify-center gap-2 pt-2 -mt-3 my-2 rounded-lg cursor-pointer${
                        isSelected ? " bg-light-gray-2 dark:bg-dark-gray-2" : ""
                      } rounded-xl`}
                    >
                      <div className="relative mx-1">
                        <img
                          src={eventPhoto}
                          alt="event photo"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                        />
                        {isAnnouncement && (
                          <div className="absolute bottom-0 right-0 bg-primary-green text-white rounded-full w-6 h-6 border-2 border-white flex items-center justify-center text-xs font-bold">
                            {participantIds?.length}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm sm:text-base dark:text-white">
                            {title}
                          </h3>
                          {unreadCount > 0 && (
                            <span className="w-2 h-2 bg-primary-green rounded-full"></span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-2 font-bold">
                          {isAnnouncement
                            ? "Announcement"
                            : createdBy.fullName || createdBy.organizationName}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-2 truncate overflow-hidden text-ellipsis max-w-[200px] sm:max-w-[370px]">
                          {lastMessage?.content}
                        </p>
                        <div className="w-[90%] border-b-2 mt-4 border-light-gray-2 dark:border-dark-gray-2"></div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-center dark:text-white mt-[59px]">No conversations found.</p>
              )}
            </div>
          </div>

          <div className="md:w-[663px] h-[85.5vh] 3xl:w-[814px] bg-white px-4 dark:bg-dark-gray-3 sm:rounded-r-md flex flex-col py-2">
            {selectedConversation ? (
              <div className="flex flex-col flex-grow overflow-y-auto border-y border-l border-light-gray-1 dark:border-dark-gray-1 rounded-lg">
                <div className="flex-shrink-0 mx-4 ">
                  <h3 className="font-semibold dark:text-light-gray-2 mt-3">
                    {selectedConversation.eventId.title}
                  </h3>
                  <p className="text-[0.8rem] text-primary-green mb-1">
                    {selectedConversation?.createdBy?.fullName
                      ? selectedConversation.createdBy?.fullName
                      : selectedConversation.createdBy?.organizationName}
                  </p>
                  <div className="border-b mb-5 -ml-4 w-[40vw] dark:border-dark-gray-1"></div>
                </div>
                <div className="flex-grow overflow-y-auto scrollbar">
                  {selectedConversation.messageIds.map((message) => (
                    <div key={message._id} className="mb-4">
                      <div
                        className={`p-3 mx-4 w-[90%] sm:w-[80%] md:w-[70%] rounded ${
                          message.senderId._id === currentUser._id
                            ? "bg-primary-green ml-auto"
                            : "bg-light-gray-2"
                        }`}
                      >
                        <p
                          className={`${message.senderId._id === currentUser._id ? "text-white" : "text-black"}`}
                        >
                          {message.content}
                        </p>
                        <div className="flex gap-1 mt-3">
                          <div
                            className={`flex ${message.senderId._id === currentUser._id ? "ml-auto" : ""}`}
                          >
                            <UserAvatar user={message.senderId} size="w-4 h-4 mt-1 rounded-full" />
                          </div>
                          <p
                            className={`text-xs mt-1 ${message.senderId._id === currentUser._id ? "text-light-gray-2" : "text-dark-gray-3"}`}
                          >
                            {message?.senderId?._id === currentUser._id
                              ? "You"
                              : message?.senderId?.fullName || message?.senderId?.organizationName}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`mx-4 text-xs text-dark-gray-3 dark:text-light-gray-3 mt-1 ${message.senderId._id === currentUser._id ? "text-right" : "text-left"}`}
                      >
                        {formatDate(message.createdAt)} at {formatTime(message.createdAt)}
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef}></div>
                </div>

                <div className="flex-shrink-0 mt-4 mx-4">
                  <MessageInput
                    isAnnouncement={
                      selectedConversation?.createdBy?._id ===
                      selectedConversation?.eventId?.createdBy
                    }
                    isOwner={selectedConversation?.eventId?.createdBy === currentUser._id}
                    sendMessage={handleSendMessage}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center sm:justify-center h-full p-4 dark:bg-dark-gray-3">
                <FiMessageCircle className="text-8xl opacity-70 text-dark-gray-3 dark:text-white mb-4" />
                <p className="text-lg font-semibold text-dark-gray-1 dark:text-white text-center">
                  Click on a conversation on the left to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Messages
