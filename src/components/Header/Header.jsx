import logo from "../../assets/logo.png"
import UserMenu from "./UserMenu"
import NotificationMenu from "./NotificationMenu"
import MessageMenu from "./MessageMenu"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
  const { currentUser: user } = useSelector((state) => state.auth)

  return (
    <header className="relative bg-light-gray dark:bg-dark-gray-3 shadow-sm py-1">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center space-x-4">
          {/* Logo */}
          <img src={logo} alt="Volunterium Logo" className="h-[30px] w-auto sm:h-[40px]" />

          {/* Text */}
          <div className="hidden sm:block text-center">
            <h1 className="font-quattrocento text-2xl font-bold tracking-wider text-primary-green dark:text-light-green">
              Volunteerium
            </h1>
            <p className="font-quattrocento text-sm font-regular tracking-wide text-primary-green dark:text-light-green">
              SMALL ACT, BIG IMPACT
            </p>
          </div>
        </Link>
        {/* User - Notification - Message Menu  */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <NotificationMenu />
              <MessageMenu />
            </>
          ) : null}
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}

export default Header
