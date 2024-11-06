import { FaPlus } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations/"

const OrganizedEvents = ({ onAddEvent }) => {
  const { t } = useTranslation()

  return (
    <div className="p-5">
      <button
        onClick={onAddEvent}
        className="flex items-center border hover:bg-dark-green px-4 py-2 rounded-lg bg-primary-green text-white"
      >
        <FaPlus className="mr-2" />
        {t(translations.eventMng.addNew)}
      </button>
    </div>
  )
}

export default OrganizedEvents
