export function formatConversation(conversations) {
  const updatedConversations = conversations.map((conversation) => {
    const lastMessage = conversation.messageIds[conversation.messageIds.length - 1]
    return {
      ...conversation,
      lastMessageTimestamp: lastMessage?.createdAt || 0,
    }
  })

  return updatedConversations.sort(
    (a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
  )
}
