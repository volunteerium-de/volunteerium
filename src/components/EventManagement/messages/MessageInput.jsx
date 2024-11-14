import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaArrowRight } from "react-icons/fa"
import { translations } from "../../../locales/translations"

const MessageInput = ({ isAnnouncement, isOwner, sendMessage }) => {
  const {t} = useTranslation()
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim() !== "") {
      sendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          isAnnouncement
            ? isOwner
              ? t(translations.eventMng.messages.messageInput.messagePH1)
              : t(translations.eventMng.messages.messageInput.messagePH2)
            : isOwner
              ? t(translations.eventMng.messages.messageInput.messagePH3)
              : t(translations.eventMng.messages.messageInput.messagePH4)
        }
        className={`text-sm md:text-base border rounded-lg focus:outline-none p-2 mb-2 flex-grow bg-light-gray-2 ${isAnnouncement && !isOwner && "opacity-70 cursor-not-allowed"}`}
        disabled={isAnnouncement && !isOwner}
      />
      <button
        onClick={handleSend}
        disabled={message.trim() === ""}
        className={`bg-primary-green text-white w-8 h-8 rounded-full flex items-center ml-2 mb-2 ${message.trim() === "" && "opacity-60"}`}
      >
        <FaArrowRight className="text-white m-auto" />
      </button>
    </div>
  )
}

export default MessageInput
