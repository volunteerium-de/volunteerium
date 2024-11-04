import { FaEdit } from "react-icons/fa"
import { useSelector } from "react-redux"
import { UserAvatar } from "../Avatar/userAvatar"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { Link } from "react-router-dom"
import { GrUserAdmin } from "react-icons/gr"

const Sidebar = ({ items, activeTab, onTabChange, onEditAvatar, contacts = [], reports = [] }) => {
  const { currentUser: user } = useSelector((state) => state.auth)
  const { conversations } = useSelector((state) => state.chat)
  const { t } = useTranslation()
  const getMenuClassName = (item) => {
    return `max-w-[374px] h-[50px]  bg-white flex items-center gap-5 p-4 hover:bg-gray-100 mt-[20px] relative ${
      activeTab === item.key ? "bg-gray-white" : ""
    }`
  }

  const getUnreadMessageCount = () => {
    return conversations.reduce((count, conversation) => {
      const unreadMessages = conversation.messageIds.filter(
        (message) => !message.readerIds.includes(user._id)
      )
      return count + unreadMessages.length
    }, 0)
  }

  const unreadMessageCount = getUnreadMessageCount()

  return (
    <div className="h-screen max-h-[88vh] m-3 mr-3">
      <div className="w-[85px] sm:w-[240px] lg:w-[300px] 2xl:w-[350px] h-[88vh] py-[30px] bg-light-gray dark:bg-dark-gray-3 rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <div>
            {user.userType !== "admin" ? (
              <>
                <UserAvatar user={user} size="h-24 w-24 sm:h-32 sm:w-32 p-4" />
                {onEditAvatar && (
                  <button
                    onClick={() => {
                      onEditAvatar()
                    }}
                    className="mx-auto bg-white p-[2px] rounded text-center border border-primary-green gap-1 flex sm:translate-y-[-20px] sm:translate-x-[-20px] translate-x-[-10px] translate-y-[-20px]"
                  >
                    <FaEdit className="text-primary-green" />
                    <p className="text-[0.75rem] text-primary-green font-medium hidden sm:block">
                      {t(translations.userSettings.edit)}
                    </p>
                  </button>
                )}
              </>
            ) : (
              <div className="bg-primary-green rounded-full h-18 w-18 sm:h-32 sm:w-32 p-4 grid place-content-center place-items-center">
                <GrUserAdmin className="h-[2.5rem] w-[2.5rem] sm:h-[4rem] sm:w-[4rem] text-white" />
              </div>
            )}
          </div>

          <p className="font-bold text-gray-2 dark:text-white text-[1rem] text-center tracking-wider mt-[10px] mb-[30px] hidden sm:block">
            {t(translations.sidebar.welcome)}{" "}
            <span className="text-primary-green">{user.fullName || user.organizationName}!</span>
          </p>
        </div>
        <div className="my-[30px]">
          <ul className="text-gray-2 dark:bg-dark-gray- text-[1.125rem] font-medium ">
            {items.map((item) => (
              <li
                key={item.key}
                className={`${getMenuClassName(item)} dark:bg-dark-gray-1 dark:text-white`}
                onClick={() => onTabChange(item.key)}
              >
                {item.icon}
                <Link
                  to={item.label}
                  className={`flex-1 sm:block hidden ${item.key === "contacts" && "ellipsis me-4 lg:me-10"}`}
                >
                  {item.label}
                </Link>
                {activeTab === item.key && (
                  <span className="sm:w-[16px] w-[8px] sm:h-[50px] h-[50px] bg-dark-green dark:bg-primary-green absolute right-[-0px] top-0"></span>
                )}
                {item.key === "messages" && unreadMessageCount > 0 && (
                  <span className="absolute right-6 md:left-40 top-2 bg-primary-green text-white rounded-full w-[9px] h-[9px] text-xs font-bold"></span>
                )}
                {item.key === "contacts" && contacts.length > 0 && (
                  <span className="bg-primary-green text-white rounded-full text-sm text-center font-bold absolute right-4 top-2 sm:flex h-5 w-5 sm:h-8 sm:w-8  items-center justify-center sm:me-3">
                    {contacts.length}
                  </span>
                )}
                {item.key === "reports" && reports.length > 0 && (
                  <span className="bg-primary-green text-white rounded-full text-sm text-center font-bold absolute right-4 top-2 sm:flex h-5 w-5 sm:h-8 sm:w-8  items-center justify-center sm:me-3">
                    {reports.length}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
