import MessageInput from "./MessageInput"
import { formatDateWithTime } from "../../../helpers/formatDate"
import { UserAvatar } from "../../ui/Avatar/userAvatar"
import { IoChevronBackOutline } from "react-icons/io5"
import { FiMessageCircle } from "react-icons/fi"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const MessageView = ({
  conversations,
  selectedConversation,
  currentUser,
  onBackClick,
  onSendMessage,
  bottomRef,
}) => {
  const { t } = useTranslation()
  const selectedConversationId = conversations.find(
    (conv) => conv._id === selectedConversation?._id
  )
  const handleSelectPromptClick = () => {
    if (!selectedConversationId) {
      onBackClick()
    }
  }

  return (
    <>
      <div className="flex flex-col py-2 h-[88vh] mt-3 -ml-2 sm:ml-0 lg:border-l rounded-r-lg rounded-lg lg:rounded-l-none bg-white dark:bg-dark-gray-3 border-primary-green border-opacity-40 dark:border-dark-gray-1 px-2">
        {!selectedConversationId ? (
          <div
            onClick={handleSelectPromptClick}
            className="flex flex-col items-center h-[88vh] p-3 mt-3 rounded-r-lg rounded-lg lg:rounded-l-none dark:bg-dark-gray-3 justify-center mb-44 sm:mb-0"
          >
            <FiMessageCircle className="text-6xl opacity-70 text-dark-gray-3 dark:text-white mb-4" />
            <p className="text-lg font-semibold text-dark-gray-1 dark:text-white text-center cursor-pointer lg:cursor-default">
              {t(translations.eventMng.messages.messageView.startMsg)}
            </p>
          </div>
        ) : (
          <div className="flex flex-col flex-grow overflow-y-auto border-y border-l border-light-gray-1 dark:border-dark-gray-1 rounded-lg">
            <div className="flex-shrink-0 mx-1 lg:mx-4">
              <h3 className="font-semibold dark:text-light-gray-2 mt-3 flex gap-1">
                <IoChevronBackOutline
                  onClick={onBackClick}
                  className="block lg:hidden dark:text-white text-xl mt-0.5 cursor-pointer"
                />
                {selectedConversationId.eventId.title}
              </h3>
              <p className="text-[0.8rem] text-primary-green mb-1 ml-6 lg:ml-0">
                {selectedConversationId.displayName ||
                  selectedConversationId.createdBy?.organizationName}
              </p>
              <div className="border-b mb-5 -ml-4 w-full dark:border-dark-gray-1" />
            </div>
            <div className="flex-grow overflow-y-auto scrollbar">
              {selectedConversationId.messageIds.map((message) => (
                <div key={message._id} className="mb-4">
                  <div
                    className={`p-3 mx-4 w-[250px] md:w-[400px] lg:w-[250px] xl:w-[450px] rounded ${message.senderId._id === currentUser._id ? "bg-primary-green ml-auto" : "bg-light-gray-2"}`}
                  >
                    <p
                      className={`whitespace-pre-line ${message.senderId._id === currentUser._id ? "text-white" : "text-black"} whitespace-normal break-words`}
                    >
                      {message.content}
                    </p>
                    <div className="flex gap-1 mt-3">
                      <div
                        className={`flex ${message.senderId._id === currentUser._id ? "ml-auto" : ""}`}
                      >
                        <UserAvatar
                          user={message.senderId}
                          size="w-4 h-4 rounded-full mt-0.5"
                          backgroundActive={true}
                        />
                      </div>
                      <p
                        className={`text-xs mt-0.5 ${
                          message.senderId._id === currentUser._id
                            ? "text-light-gray-2"
                            : "text-dark-gray-3"
                        }`}
                      >
                        {message?.senderId?._id === currentUser._id
                          ? t(translations.eventMng.messages.messageView.you)
                          : selectedConversationId.displayName}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`mx-5 text-xs text-dark-gray-3 dark:text-light-gray-3 mt-1 ${
                      message.senderId._id === currentUser._id ? "text-right" : "text-left"
                    }`}
                  >
                    {formatDateWithTime(message.createdAt)}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="flex-shrink-0 mt-4 mx-4">
              <MessageInput
                isAnnouncement={
                  selectedConversation?.createdBy?._id === selectedConversation?.eventId?.createdBy
                }
                isOwner={selectedConversation?.eventId?.createdBy === currentUser._id}
                sendMessage={onSendMessage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default MessageView
