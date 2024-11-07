import { FaEdit } from "react-icons/fa"
import { useSelector } from "react-redux"
import { UserAvatar } from "../Avatar/userAvatar"
import { useTranslation } from "react-i18next"
import { translations } from "../../../locales/translations"
import { Link } from "react-router-dom"
import { GrUserAdmin } from "react-icons/gr"

const Sidebar = ({
  items,
  activeTab,
  onTabChange,
  onEditAvatar,
  contacts = [],
  feedbacks = [],
  reports = [],
}) => {
  const { currentUser: user } = useSelector((state) => state.auth)
  const { t } = useTranslation()
  const getMenuClassName = (item) => {
    return `max-w-[374px] h-[50px]  bg-white flex items-center justify-center	 gap-5 p-4 hover:bg-gray-100 mt-[20px] relative ${
      activeTab === item.key ? "bg-gray-white" : ""
    }`
  }

  return (
    <div className="h-auto min-h-[calc(100vh-116px)] m-3 mr-3">
      <div className="w-[65px] sm:w-[240px] lg:w-[300px] h-full 2xl:w-[350px] py-[30px] bg-light-gray dark:bg-dark-gray-3 rounded-lg">
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
        <div className="relative my-[30px] ">
          <ul className="text-gray-2 dark:bg-dark-gray- text-[1rem] font-medium text-center ">
            {items.map((item) => (
              <li
                key={item.key}
                className={`${getMenuClassName(item)} text-left dark:bg-dark-gray-1 dark:text-white`}
                onClick={() => onTabChange(item.key)}
              >
                {item.icon}
                <Link
                  to={item.label}
                  className={`flex-1 sm:block hidden ${item.key === "contacts" && "ellipsis me-4 lg:me-10"}`}
                >
                  {item.label}
                </Link>
                {item.key === "contacts" && (
                  <span className="bg-primary-green text-white rounded-full text-sm text-center font-bold absolute right-4 top-3 sm:flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center sm:me-3">
                    {contacts.length}
                  </span>
                )}
                {item.key === "feedbacks" && (
                  <span className="bg-primary-green text-white rounded-full text-sm text-center font-bold absolute right-4 top-3 sm:flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center sm:me-3">
                    {feedbacks.length}
                  </span>
                )}
                {item.key === "reports" && (
                  <span className="bg-primary-green text-white rounded-full text-sm text-center font-bold absolute right-4 top-2 sm:flex h-5 w-5 sm:h-7 sm:w-7  items-center justify-center sm:me-3">
                    {reports.length}
                  </span>
                )}
                {activeTab === item.key && (
                  <span className="sm:w-[16px] w-[8px] sm:h-[50px] h-[50px] bg-dark-green dark:bg-primary-green absolute right-[-0px] top-0"></span>
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
