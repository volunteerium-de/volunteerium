import React, { useState, useEffect, useRef } from "react"
import { BiConversation } from "react-icons/bi"
import { useNavigate, useLocation } from "react-router-dom"
import useChatCall from "../../hooks/useChatCall"
import DeleteConversationModal from "./messages/DeleteConversationModal"
import ConversationList from "./messages/ConversationList"
import MessageView from "./messages/MessageView"

const Messages = ({ conversations, currentUser, loading }) => {
  const bottomRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { sendMessage, markAsRead, deleteConversation } = useChatCall()
  const [selectedId, setSelectedId] = useState(null)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [conversationToDelete, setConversationToDelete] = useState(null)

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

  const handleDeleteConversationClick = (conversationId, e) => {
    e.stopPropagation()
    setConversationToDelete(conversationId)
    setDeleteModalOpen(true)
  }

  const confirmDeleteConversation = () => {
    if (conversationToDelete) {
      deleteConversation(conversationToDelete)
      setDeleteModalOpen(false)
      setConversationToDelete(null)
      setSelectedId(null)
      navigate("/event-management?tab=messages")
    }
  }

  const getUnreadCount = (messageIds) => {
    if (!messageIds) return 0
    return messageIds.filter((message) => !message.readerIds.includes(currentUser._id)).length
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const conversationId = queryParams.get("conversation")
    if (conversationId) {
      setSelectedId(conversationId)
    }
  }, [location.search])

  const selectedConversation = conversations.find((conversation) => conversation._id === selectedId)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation?.messageIds])

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-green border-opacity-50 dark:border-light-green" />
        <p className="text-2xl font-semibold text-primary-green dark:text-light-gray">Loading...</p>
      </div>
    )
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex justify-center items-center w-full mt-3 h-[88vh] rounded-lg dark:bg-dark-gray-3">
        <div className="flex flex-col items-center">
          <BiConversation className="text-6xl opacity-70 text-dark-gray-3 dark:text-white mb-4" />
          <p className="text-lg font-semibold text-dark-gray-1 dark:text-white text-center">
            No conversations found
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex dark:bg-black sm:mr-3">
        <div
          className={`w-full lg:w-1/2 2xl:w-2/5 mr-3 lg:mr-0 ${selectedId ? "hidden lg:block" : "block"}`}
        >
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            currentUser={currentUser}
            onConversationClick={handleConversationClick}
            onDeleteClick={handleDeleteConversationClick}
            getUnreadCount={getUnreadCount}
          />
        </div>
        <div className={`w-full lg:w-1/2 2xl:w-3/5 ${selectedId ? "block" : "hidden lg:block"}`}>
          <MessageView
            selectedConversation={selectedConversation}
            currentUser={currentUser}
            onBackClick={() => {
              setSelectedId(null)
              navigate(`/event-management?tab=messages`)
            }}
            onSendMessage={handleSendMessage}
            bottomRef={bottomRef}
          />
        </div>
      </div>

      {/* <DeleteConversationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDeleteConversation}
      /> */}
    </>
  )
}

export default Messages
