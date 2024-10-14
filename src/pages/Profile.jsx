import { GiTrophyCup } from "react-icons/gi"
import { FaRegCalendarAlt, FaExternalLinkAlt } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { BsGenderAmbiguous } from "react-icons/bs"
import { MdLanguage } from "react-icons/md"
import ProfileCard from "../components/ui/Cards/ProfileCard"
import Header from "../components/Header/Header"
import { formatDate } from "../helpers/formatDate"
import { useEffect } from "react"
import { useState } from "react"
import useEventCall from "../hooks/useEventCall"
import { useSelector } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { useParams } from "react-router-dom"
import Pagination from "../components/ui/Pagination/Pagination"
import { axiosWithPublic } from "../hooks/useAxios"

const Profile = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { userId } = useParams()
  const { getEvents } = useEventCall()
  const [eventType, setEventType] = useState("Attended Events")
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [user, setUser] = useState({})
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const pageFromUrl = queryParams.get("page") || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const query =
          eventType === "Attended Events"
            ? `events/?filter[eventParticipantIds]=${userId}&page=${currentPage}`
            : `events/?filter[createdBy]=${userId}&page=${currentPage}`
        const eventData = await getEvents(query)
        const { data } = await axiosWithPublic(`users/${userId}`)
        setUser(data.data)
        setEvents(eventData.data)
        setTotalPages(eventData.details.pages.total || 1)
        setCurrentPage(eventData.details.pages.current || 1)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [currentPage, eventType])

  useEffect(() => {
    if (!isNaN(currentPage) && currentPage > 0) {
      navigate(`?page=${currentPage}`, { replace: true })
    } else {
      setCurrentPage(1)
    }
  }, [currentPage, navigate, eventType])

  const languagesFormatted = user?.userDetailsId?.languages
    .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
    .join(", ")

  const datesFormatted = formatDate(user?.createdAt)

  const infoItems = [
    {
      icon: <FaRegCalendarAlt />,
      description: `Member since ${datesFormatted}`,
    },
    {
      icon: <IoLocationOutline />,
      description:
        user?.userDetailsId?.addressId?.city && user?.userDetailsId?.addressId?.country
          ? `${user?.userDetailsId?.addressId?.city}, ${user?.userDetailsId?.addressId?.country}`
          : null,
    },
    {
      icon: <BsGenderAmbiguous />,
      description: user?.userDetailsId?.gender,
    },
    {
      icon: <MdLanguage />,
      description: languagesFormatted,
    },
  ]

  return (
    <>
      {loading && (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-green border-opacity-50 dark:border-light-green"></div>
          <p className="text-2xl font-semibold text-primary-green dark:text-light-gray">
            Loading...
          </p>
        </div>
      )}
      <Header />
      <div className="min-h-[100vh] font-poppins block sm:flex justify-center gap-5 mx-5 dark:bg-black pb-3 pt-3">
        <div className=" w-full sm:w-[600px] bg-light-gray rounded-md px-4 sm:px-6 dark:bg-dark-gray-3 dark:text-white">
          <div className="flex justify-between px-2 ">
            <img
              src={
                user?.userType === "individual"
                  ? user?.userDetailsId?.avatar
                  : user?.userDetailsId?.organizationLogo
              }
              alt={user?.userType === "individual" ? "Avatar" : "Logo"}
              className="w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] rounded-full mt-4 sm:mt-8"
            />
            {user._id === currentUser._id && (
              <button
                onClick={() => navigate("/settings")}
                className="w-[4rem] h-[1.6rem] sm:w-[60px] sm:h-[30px] text-[0.9375rem] rounded-md bg-primary-green text-white mt-4 sm:mt-8"
              >
                Edit
              </button>
            )}
          </div>
          {/*Name & Trophy */}
          <div className="mt-4 sm:mt-2 ">
            <h1 className="text-[1.5rem] sm:text-[1.7rem] font-medium tracking-wide">
              {user?.userType === "individual" ? user.fullName : user.organizationName}
            </h1>
            <h5 className="italic text-warning font-semibold  text-[1rem] sm:text-[1.2rem] flex gap-2">
              Golden Heart <GiTrophyCup className="text-[1.2rem] -ml-1 mt-1" />
            </h5>
            {/* Info */}
            <div className="pt-2 sm:mt-4">
              <div>
                {infoItems.map((items, index) => {
                  if (items.description) {
                    return (
                      <div key={index}>
                        <div className="flex gap-3 py-1 text-[0.9375rem] text-gray-2 dark:text-white">
                          <div className="mt-[1px] text-primary-green text-[1.3rem] dark:text-light-gray">
                            {items.icon}
                          </div>
                          <p>{items.description}</p>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
            {/* Interest */}
            {user.userDetailsId?.interestIds?.length > 0 && (
              <div>
                <h2 className="mt-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold ">
                  Interests
                </h2>
                <div className=" flex flex-wrap gap-2 my-2 text-dark-gray-1">
                  {user?.userDetailsId?.interestIds.map((interest) => (
                    <div key={interest._id}>
                      <p className="text-[0.6875rem] text-center text-primary-green border border-primary-green px-2 py-1 rounded-2xl font-bold">
                        {interest.name.toUpperCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About */}
            <div>
              <h2 className="mt-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold">
                About Me
              </h2>
              <p className="text-dark-gray-1 my-2 dark:text-white">{user.userDetailsId?.bio}</p>
            </div>

            {/* Certification & Document  */}
            <div className="hidden sm:block">
              <h2 className="my-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold">
                Certification & Document
              </h2>
              {user.documentIds?.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-400 pb-2 mb-4"
                >
                  <div className="flex items-center justify-between mt-2 text-dark-gray-1 dark:text-white ">
                    <p>{item.title}</p>
                    <div
                      onClick={() => navigate(item.fileUrl)}
                      className="text-dark-gray-1 dark:text-white cursor-pointer"
                    >
                      <FaExternalLinkAlt className="opacity-65 dark:opacity-80 text-primary-green dark:text-light-gray" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1500px] bg-light-gray rounded-md px-8 sm:px-2 lg:px-12 -mt-3 sm:mt-0 dark:bg-dark-gray-3 ">
          <div className="flex flex-col justify-between h-full">
            <ProfileCard
              events={events}
              loading={loading}
              currentUserId={currentUser._id}
              eventType={eventType}
              setEventType={setEventType}
              setCurrentPage={setCurrentPage}
            />
            {events.length > 0 && (
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
