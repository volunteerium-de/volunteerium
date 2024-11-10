import eventPhoto from "../../../assets/default-event-photo-.jpg"

const ConversationList = ({
  conversations,
  selectedConversation,
  currentUser,
  onConversationClick,
  onDeleteClick,
  getUnreadCount,
}) => {
  const defaultEventPhoto = eventPhoto

  const updatedConversations = conversations.map((conversation) => {
    const lastMessage = conversation.messageIds[conversation.messageIds.length - 1]
    return {
      ...conversation,
      lastMessageTimestamp: lastMessage?.createdAt || 0,
    }
  })

  const sortedConversations = updatedConversations.sort(
    (a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp)
  )

  return (
    <div className="h-[88vh] py-3 mt-3 -ml-2 sm:ml-0 rounded-lg lg:rounded-r-none overflow-y-auto scrollbar dark:bg-dark-gray-3 dark:pt-5">
      <div className="mx-4">
        {sortedConversations?.map((conversation) => {
          const {
            _id,
            participantIds,
            eventId: { eventPhoto, title, createdBy: eventCreatorId } = {},
            displayName,
            createdBy,
            messageIds = [],
          } = conversation
          const lastMessage = messageIds[messageIds.length - 1]
          const unreadCount = getUnreadCount(messageIds)
          const isAnnouncement = createdBy._id === eventCreatorId
          const isSelected = selectedConversation?._id === _id
          const messageContent =
            lastMessage?.senderId?._id === currentUser._id
              ? `You: ${lastMessage.content}`
              : lastMessage?.content

          return (
            <div
              key={_id}
              onClick={() => onConversationClick(conversation)}
              className={`flex items-center justify-center gap-2 pt-2 my-2 rounded-lg cursor-pointer ${
                isSelected ? "bg-light-gray-2 dark:bg-dark-gray-2" : ""
              } rounded-xl`}
            >
              <div className="relative mx-1">
                <img
                  src={eventPhoto ? eventPhoto : defaultEventPhoto}
                  alt="event"
                  className="w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-full object-cover"
                />
                {isAnnouncement && (
                  <div className="absolute bottom-4 right-0 bg-primary-green text-white rounded-full w-6 h-6 border-2 border-white flex items-center justify-center text-xs font-bold">
                    {participantIds?.length}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="flex justify-between items-center w-[95%]">
                    <h3 className="relative font-semibold text-sm sm:text-base dark:text-white">
                      {title}
                      {unreadCount > 0 && (
                        <span className="absolute top-2 -right-4 w-2 h-2 bg-primary-green rounded-full" />
                      )}
                    </h3>
                    {/* {createdBy._id === currentUser._id && (
                      <button
                        onClick={(e) => onDeleteClick(_id, e)}
                        className="text-primary-green dark:text-light-gray-3 hover:opacity-80"
                      >
                        <TbMessage2X />
                      </button>
                    )} */}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-2 font-bold">{displayName}</p>
                <p className="text-xs sm:text-sm text-gray-2 truncate overflow-hidden text-ellipsis w-[50vw] sm:w-[42vw] lg:w-[20vw]">
                  {unreadCount > 0 ? (
                    <span className="text-dark-gray-1 dark:text-white font-semibold">
                      {messageContent}
                    </span>
                  ) : (
                    <span>{messageContent}</span>
                  )}
                </p>
                <div className="w-[95%] border-b-2 mt-4 border-light-gray-2 dark:border-dark-gray-2" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConversationList
