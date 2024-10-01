import logo from "../../assets/logo.png"
import UserMenu from "./UserMenu"
import NotificationMenu from "./NotificationMenu"
import MessageMenu from "./MessageMenu"
import { useState, useEffect } from "react"

const Header = () => {
  // States
  const [user, setUser] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [notificationCount, setNotificationCount] = useState(0)
  const [messageCount, setMessageCount] = useState(0)

  // Effect to fetch user data only once when the component mounts
  useEffect(() => {
    // Simulating user data fetch
    const fetchUser = async () => {
      const fetchedUser = {
        name: "Julia Bretzel",
        profileImage: "https://tinyurl.com/c496979c",
      }
      setUser(fetchedUser)
      setProfileImage(fetchedUser.profileImage)
    }

    // Fetch user info once
    fetchUser()
  }, [])

  // Effect to handle notifications and messages
  useEffect(() => {
    // Function to simulate fetching notification and message counts
    const fetchNotificationsAndMessages = () => {
      // Simulate random counts for notifications and messages
      const fetchedNotificationCount = Math.floor(Math.random() * 5)
      const fetchedMessageCount = Math.floor(Math.random() * 10)

      // Set fetched counts
      setNotificationCount(fetchedNotificationCount)
      setMessageCount(fetchedMessageCount)
    }

    // Initial fetch
    fetchNotificationsAndMessages()

    // Set interval to fetch every 20 seconds
    const intervalId = setInterval(fetchNotificationsAndMessages, 20000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <header className="relative bg-light-gray dark:bg-dark-gray-3 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-4">
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
        </div>
        {/* User - Notification - Message Menu  */}
        <div className="flex items-center space-x-4">
          <NotificationMenu notificationCount={notificationCount} />
          <MessageMenu messageCount={messageCount} />
          <UserMenu user={user} profileImage={profileImage} />
        </div>
      </div>
    </header>
  )
}

export default Header
