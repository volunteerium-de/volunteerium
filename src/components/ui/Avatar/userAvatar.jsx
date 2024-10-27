import { FaUser } from "react-icons/fa"

export const UserAvatar = ({ user, size }) => {
  const avatarSrc = user?.userDetailsId?.avatar || user?.userDetailsId?.organizationLogo

  return (
    <div className="flex flex-col items-center gap-1">
      <div>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={user ? user.fullName || user.organizationName : "User"}
            className={`${size} rounded-full object-cover`}
          />
        ) : (
          <FaUser className={`text-primary-green dark:text-gray-2 ${size}`} />
        )}
      </div>
    </div>
  )
}