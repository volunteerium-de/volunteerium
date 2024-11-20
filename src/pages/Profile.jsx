import { LiaMedalSolid, LiaTrophySolid } from "react-icons/lia"
import { FaRegCalendarAlt, FaExternalLinkAlt } from "react-icons/fa"
import { IoLocationOutline, IoInformationCircleOutline } from "react-icons/io5"
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
import { formatName } from "../helpers/formatName"
import { useTranslation } from "react-i18next"
import { translations } from "../locales/translations"
import { UserAvatar } from "../components/ui/Avatar/userAvatar"
import useLanguageOptions from "../hooks/useLanguages"

const getMedalInfo = (totalPoints, t) => {
  if (totalPoints >= 70) {
    return {
      medal: t(translations.profile.medals.goldenHeart),
      icon: <LiaTrophySolid className="text-[1.4rem]" />,
      textClass: "text-[#FCB434]",
    }
  } else if (totalPoints >= 40) {
    return {
      medal: t(translations.profile.medals.silverMedal),
      icon: <LiaMedalSolid className="text-[1.4rem]" />,
      textClass: "text-[#b0aeae]",
    }
  } else if (totalPoints >= 10) {
    return {
      medal: t(translations.profile.medals.bronzeMedal),
      icon: <LiaMedalSolid className="text-[1.4rem]" />,
      textClass: "text-[#CD7F32]",
    }
  } else {
    return {
      medal: t(translations.profile.medals.newVolunteer),
      icon: null,
      textClass: "text-[#9D9EA1]",
    }
  }
}

const Profile = () => {
  const { t } = useTranslation()
  const { currentUser } = useSelector((state) => state.auth)
  const { userId } = useParams()
  const { getEvents } = useEventCall()
  const [eventType, setEventType] = useState("Attended Events")
  const [organizedFilter, setOrganizedFilter] = useState("Unfinished Events")
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pageFromUrl = queryParams.get("page") || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl > 0 ? pageFromUrl : 1)
  const [totalPages, setTotalPages] = useState(0)
  const { getTranslatedCategory } = useLanguageOptions()
  const { getEventCategories } = useEventCall()

  useEffect(() => {
    if (user.userType === "organization") {
      setEventType("Organized Events")
    }
  }, [user.userType])

  useEffect(() => {
    getEventCategories()
    const fetchEvents = async () => {
      setLoading(true)
      try {
        let query = `events/?filter[createdBy]=${userId}&page=${currentPage}`
        if (eventType === "Attended Events") {
          query = `events/participant/${userId}?filter[isDone]=true&sort[startDate]=desc&page=${currentPage}`
        } else if (organizedFilter === "Finished Events") {
          query += `&filter[isDone]=true&sort[startDate]=desc`
        } else if (organizedFilter === "Unfinished Events") {
          query += `&filter[isDone]=false&sort[startDate]=asc`
        }

        const eventData = await getEvents(query)
        const { data } = await axiosWithPublic(`users/${userId}`)
        setUser(data.data)
        setEvents(eventData.data)
        setTotalPages(eventData.details.pages.total || 1)
        setCurrentPage(eventData.details.pages.current || 1)

        if (currentPage > 0) {
          navigate(`?page=${currentPage}`, { replace: true })
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [currentPage, eventType, organizedFilter, t])

  const pastEvents = events?.filter((event) => event.isDone) || []
  const approvedEvents =
    pastEvents?.filter((event) =>
      event.eventParticipantIds.some((participant) => participant.isApproved === true)
    ) || []

  const {
    _id,
    fullName,
    userType,
    organizationName,
    documentIds,
    createdAt,
    userDetailsId: {
      isFullNameDisplay,
      languages = [],
      addressId = {},
      gender,
      interestIds = [],
      bio,
      organizationDesc,
      totalPoint,
    } = {},
  } = user

  const medalInfoText = [
    {
      label: t(translations.profile.medals.bronzeInfo),
      className: "text-[#CD7F32]",
    },
    {
      label: t(translations.profile.medals.silverInfo),
      className: "text-[#b0aeae]",
    },
    {
      label: t(translations.profile.medals.goldenInfo),
      className: "text-[#FCB434]",
    },
  ]

  const medalInfo = getMedalInfo(totalPoint, t)
  const { getLangName } = useLanguageOptions()

  const languagesFormatted = languages.map((langCode) => getLangName(langCode)).join(", ")

  const infoItems = [
    {
      icon: <FaRegCalendarAlt />,
      description: `${t(translations.profile.memberSince)} ${formatDate(createdAt)}`,
    },
    {
      icon: <IoLocationOutline />,
      description:
        addressId?.city && addressId?.country ? `${addressId?.city}, ${addressId?.country}` : null,
    },
    {
      icon: <BsGenderAmbiguous />,
      description: gender?.charAt(0).toUpperCase() + gender?.slice(1).toLowerCase(),
    },
    {
      icon: <MdLanguage />,
      description: languagesFormatted,
    },
  ]

  return (
    <>
      <Header />
      {loading ? (
        <div className=" flex flex-col justify-center items-center min-h-[calc(100vh-116px)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-green border-opacity-50 dark:border-light-green"></div>
          <p className="text-2xl font-semibold text-primary-green dark:text-light-gray">
            {t(translations.profile.loading)}
          </p>
        </div>
      ) : (
        <>
          <div className="max-w-[1800px] mx-auto font-poppins block sm:flex justify-center gap-5 dark:bg-black p-3">
            <div className=" w-full sm:w-[600px] sm:min-h-[calc(100vh-116px)] bg-light-gray rounded-t-md sm:rounded-md px-4 sm:px-6 dark:bg-dark-gray-3 dark:text-white">
              <div className="flex justify-between px-2 ">
                <UserAvatar
                  user={user}
                  size="w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] rounded-full mt-4 sm:mt-8"
                />

                {_id === currentUser?._id && (
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-auto px-2 h-8 sm:h-[30px] text-[0.9375rem] rounded-md bg-primary-green text-white mt-4 sm:mt-8 hover:bg-dark-green"
                  >
                    {t(translations.profile.edit)}
                  </button>
                )}
              </div>
              {/*Name & Trophy */}
              <div className="mt-4 sm:mt-2">
                <h1 className="text-[1.5rem] sm:text-[1.7rem] font-medium tracking-wide">
                  {userType === "individual"
                    ? formatName(fullName, isFullNameDisplay)
                    : organizationName}
                </h1>
                <div className="flex">
                  {userType === "individual" && medalInfo?.medal && (
                    <div className="flex">
                      <h5 className={`italic font-semibold flex gap-1 mt-1 ${medalInfo.textClass}`}>
                        {medalInfo.medal} {medalInfo.icon}
                      </h5>
                      <div className="relative inline-block group">
                        <IoInformationCircleOutline className="absolute left-2 opacity-50 cursor-pointer group-hover:opacity-100" />
                        <div className="absolute mb-2 top-7 -left-14 sm:-left-10 w-[281px] h-[140px] rounded-md bg-light-gray-2 text-white text-sm px-3 py-2 opacity-0 translate-y-4 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 font-semibold pointer-events-none group-hover:pointer-events-auto dark:bg-dark-gray-2 dark:text-dark-gray-2">
                          {medalInfoText.map((item, i) => (
                            <p key={i} className={item.className}>
                              {item.label}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                {interestIds?.length > 0 && (
                  <div>
                    <h2 className="mt-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold ">
                      {t(translations.profile.interests)}
                    </h2>
                    <div className=" flex flex-wrap gap-2 my-2 text-dark-gray-1">
                      {interestIds?.map((interest) => (
                        <div key={interest?._id}>
                          <p className="text-[0.6875rem] text-center text-primary-green border border-primary-green px-2 py-1 rounded-2xl font-bold">
                            {getTranslatedCategory(interest?.name)?.toUpperCase()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About */}
                {userType == "individual" ? (
                  <div>
                    <h2 className="mt-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold">
                      {t(translations.profile.aboutMe)}
                    </h2>
                    <p className="text-dark-gray-1 my-2 dark:text-white">{bio}</p>
                  </div>
                ) : (
                  <div>
                    <h2 className="mt-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold">
                      {t(translations.profile.aboutUs)}
                    </h2>
                    <p className="text-dark-gray-1 my-2 dark:text-white">{organizationDesc}</p>
                  </div>
                )}

                {/* Certification & Document  */}
                {documentIds?.length > 0 && (
                  <div className="hidden sm:block">
                    <h2 className="my-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold">
                      {t(translations.profile.documents)}
                    </h2>
                    {documentIds.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-300 dark:border-gray-400 pb-2 mb-4"
                      >
                        <div className="flex items-center justify-between mt-2 text-dark-gray-1 dark:text-white ">
                          <p>{item.title}</p>
                          <div
                            onClick={() => window.open(item.fileUrl, "_blank")}
                            className="text-dark-gray-1 dark:text-white cursor-pointer"
                          >
                            <FaExternalLinkAlt className="opacity-65 dark:opacity-80 text-primary-green dark:text-light-gray" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full sm:min-h-[calc(100vh-116px)] bg-light-gray rounded-b-md sm:rounded-md px-8  sm:px-4 lg:px-12 dark:bg-dark-gray-3 -mt-4 sm:mt-0 pt-6 sm:pt-0 ">
              <div className="flex gap-10 font-semibold text-xl my-4 text-dark-gray-1 text-center">
                {userType !== "organization" && (
                  <div
                    className={`text-[0.9375rem] cursor-pointer border-b-2 ${
                      eventType === "Attended Events"
                        ? "text-primary-green border-primary-green"
                        : "border-transparent dark:text-white"
                    }`}
                    onClick={() => {
                      setEventType("Attended Events")
                      setCurrentPage(1)
                    }}
                  >
                    {t(translations.profileCard.attendEvents)}
                  </div>
                )}
                <div
                  className={`text-[0.9375rem] cursor-pointer border-b-2 ${
                    eventType === "Organized Events"
                      ? "text-primary-green border-primary-green"
                      : "border-transparent dark:text-white"
                  }`}
                  onClick={() => {
                    setEventType("Organized Events")
                    setCurrentPage(1)
                  }}
                >
                  {t(translations.profileCard.organizedEvents)}
                </div>
              </div>

              {eventType === "Organized Events" && (
                <div className="flex gap-4 font-medium text-sm my-2 text-dark-gray-1 text-center sm:justify-end">
                  <button
                    className={`py-1 px-2 rounded-md ${
                      organizedFilter === "Unfinished Events"
                        ? "bg-primary-green text-white hover:bg-dark-green"
                        : "bg-light-gray-3 dark:bg-dark-gray-2 text-dark-gray-1 dark:text-white hover:bg-dark-gray-1/20 dark:hover:bg-dark-gray-1"
                    }`}
                    onClick={() => {
                      setOrganizedFilter("Unfinished Events")
                      setCurrentPage(1)
                    }}
                  >
                    {t("profileCard.unfinishedEvents")}
                  </button>
                  <button
                    className={`py-1 px-2 rounded-md ${
                      organizedFilter === "Finished Events"
                        ? "bg-primary-green text-white hover:bg-dark-green"
                        : "bg-light-gray-3 dark:bg-dark-gray-2 text-dark-gray-1 dark:text-white hover:bg-dark-gray-1/20 dark:hover:bg-dark-gray-1"
                    }`}
                    onClick={() => {
                      setOrganizedFilter("Finished Events")
                      setCurrentPage(1)
                    }}
                  >
                    {t("profileCard.finishedEvents")}
                  </button>
                </div>
              )}

              {eventType === "Attended Events" ? (
                <div className="flex flex-col justify-between h-[calc(100vh-180px)]">
                  <ProfileCard
                    events={approvedEvents}
                    loading={loading}
                    currentUserId={currentUser?._id}
                  />
                  {events.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      totalPages={totalPages}
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col justify-between h-[calc(100vh-215px)]">
                  <ProfileCard events={events} loading={loading} currentUserId={currentUser?._id} />
                  {events.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      onPageChange={setCurrentPage}
                      totalPages={totalPages}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Profile
