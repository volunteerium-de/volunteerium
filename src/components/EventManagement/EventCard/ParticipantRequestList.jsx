import ParticipantRequestItem from "./ParticipantRequestItem"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"

const ParticipantRequestList = ({ title, event, participants, refetch }) => {
  const { t } = useTranslation()

  return (
    <>
      <h3 className="text-primary-green dark:text-white font-light">{title}</h3>

      {participants.map((user, index) => (
        <div
          key={index}
          className="flex items-center w-full justify-between bg-light-gray rounded-md py-2 px-2"
        >
          <ParticipantRequestItem user={user} event={event} key={index} refetch={refetch} />
        </div>
      ))}

      {participants.length === 0 && (
        <div
          className="px-3 py-2 text-sm text-blue-400 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span className="font-medium">
            {t(translations.eventManagement.no)} {title.toLowerCase()}
          </span>
        </div>
      )}
    </>
  )
}

export default ParticipantRequestList
