import React, { useState, useEffect, useRef } from "react"
import { BiConversation } from "react-icons/bi"
import { useNavigate, useLocation } from "react-router-dom"
import useChatCall from "../../hooks/useChatCall"
import ConversationList from "./messages/ConversationList"
import MessageView from "./messages/MessageView"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import DeleteModal from "../ui/Modals/DeleteModal"
import { formatName } from "../../helpers/formatName"

const Messages = ({ conversations, currentUser }) => {
  const { t } = useTranslation()
  const bottomRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { sendMessage, markAsRead, deleteConversation } = useChatCall()
  const [loading, setLoading] = useState(true)
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
    setLoading(true)
    const queryParams = new URLSearchParams(location.search)
    const conversationId = queryParams.get("conversation")
    if (conversationId) {
      setSelectedId(conversationId)
    }
    setLoading(false)
  }, [location.search, navigate])

  const selectedConversation = conversations.find((conversation) => conversation._id === selectedId)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedConversation?.messageIds])

  if (!loading && conversations.length === 0) {
    return (
      <div className="mr-3">
        <div className="flex justify-center sm:items-center pt-48 sm:pt-0 mt-3 w-full h-[88vh] rounded-lg dark:bg-dark-gray-3">
          <div className="flex flex-col items-center">
            <BiConversation className="text-6xl opacity-70 text-dark-gray-3 dark:text-white mb-4" />
            <p className="text-lg font-semibold text-dark-gray-1 dark:text-white text-center">
              No conversations found
            </p>
          </div>
        </div>
      </div>
    )
  }

  const getDisplayName = (conversation) => {
    if (!conversation || !conversation.createdBy) return ""
    const { createdBy, eventId: { createdBy: eventCreatorId } = {}, participantIds } = conversation

    const isAnnouncement = createdBy._id === eventCreatorId
    const eventCreatorFullName = createdBy.fullName

    const conversationParticipant = participantIds.find(
      (participant) => participant !== eventCreatorId
    )
    const conversationParticipantFullName =
      conversationParticipant?.fullName || conversationParticipant?.organizationName
    const conversationParticipantIsFullNameDisplay =
      conversationParticipant?.userDetailsId?.isFullNameDisplay

    let displayName

    if (isAnnouncement) {
      displayName = "Announcement"
    } else {
      displayName =
        createdBy._id === currentUser._id
          ? formatName(conversationParticipantFullName, conversationParticipantIsFullNameDisplay)
          : formatName(eventCreatorFullName, createdBy.userDetailsId?.isFullNameDisplay)
    }

    return displayName
  }

  const validConversations = conversations.filter(
    (conversation) =>
      conversation && conversation.createdBy && conversation.eventId && conversation.participantIds
  )
  const mappedConversations = validConversations.map((conversation) => ({
    ...conversation,
    displayName: getDisplayName(conversation),
  }))

  return (
    <>
      {loading ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-green border-opacity-50 dark:border-light-green" />
          <p className="text-2xl font-semibold text-primary-green dark:text-light-gray">
            Loading...
          </p>
        </div>
      ) : (
        <>
          <div className="flex dark:bg-black mr-3 max-w-[1400px]">
            <div className={`w-full lg:w-1/2 xl:w-2/5 ${selectedId ? "hidden lg:block" : "block"}`}>
              <ConversationList
                conversations={mappedConversations}
                selectedConversation={selectedConversation}
                currentUser={currentUser}
                onConversationClick={handleConversationClick}
                onDeleteClick={handleDeleteConversationClick}
                getUnreadCount={getUnreadCount}
              />
            </div>
            <div className={`w-full lg:w-1/2 xl:w-3/5 ${selectedId ? "block" : "hidden lg:block"}`}>
              <MessageView
                conversations={mappedConversations}
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
          {isDeleteModalOpen && (
            <DeleteModal
              onClose={() => setDeleteModalOpen(false)}
              onDelete={confirmDeleteConversation}
              title={t(translations.delModal.conversationTitle)}
              description={t(translations.delModal.conversationDesc)}
            />
          )}
        </>
      )}
    </>
  )
}

export default Messages
