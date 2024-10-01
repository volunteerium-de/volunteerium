import { GiTrophyCup } from "react-icons/gi"
import { FaRegCalendarAlt, FaExternalLinkAlt } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { BsGenderAmbiguous } from "react-icons/bs"
import { MdLanguage } from "react-icons/md"
import ProfileCard from "../components/ui/Cards/ProfileCard"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Home/Footer"
import Header from "../components/Header/Header"
import { formatDate } from "../helpers/formatDate"

const Profile = () => {
  const navigate = useNavigate()

  const currentUser = {
    _id: "650c697f1c4ae3b5e8bfcdb1",
    userType: "individual",
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    organizationName: "",
    userDetailsId: {
      _id: "650c6a3a1c4ae3b5e8bfcdac",
      userId: "650c697f1c4ae3b5e8bfcdb1",
      isFullNameDisplay: true,
      gender: "Female",
      ageRange: "26-35",
      bio: "Passionate about community service and environmental sustainability.",
      languages: ["en", "fr", "de"],
      avatar:
        "https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg",
      totalPoint: 450,
      interestIds: [
        { _id: "a1b2c3d4e5f6g7h8i9j0k1l2", name: "animal" },
        { _id: "b2c3d4e5f6g7h8i9j0k1l2m3", name: "environment" },
        { _id: "c3d4e5f6g7h8i9j0k1l2m3n4", name: "health" },
      ],
      organizationLogo: "",
      organizationDesc: "",
      addressId: {
        _id: "650c6b4b1c4ae3b5e8bfcdc7",
        city: "Munich",
        country: "Germany",
        zipCode: "80331",
        state: "Bavaria",
        streetName: "Marienplatz",
        streetNumber: "1",
        additional: "Near the New Town Hall",
        iframeSrc:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5900098446964!2d11.572142177922961!3d48.137429451169446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75f4d5d25587%3A0xc4e347226b3ab033!2sMarienplatz%201%2C%2080331%20M%C3%BCnchen!5e0!3m2!1str!2sde!4v1726665817507!5m2!1str!2sde",
      },
      organizationUrl: "",
    },
    isActive: true,
    isSetup: true,
    documentIds: [
      {
        _id: "012ry27f1d2ae3r1el4fcdb1",
        userId: "650c697f1c4ae3b5e8bfcdb1",
        title: "Cv",
        fileUrl: "https://www.sbs.ox.ac.uk/sites/default/files/2019-01/cv-template.pdf",
      },
      {
        _id: "012ry27f1d2ae3r1el4fcdb1",
        userId: "650c697f1c4ae3b5e8bfcdb1",
        title: "First aid",
        fileUrl: "https://www.sbs.ox.ac.uk/sites/default/files/2019-01/cv-template.pdf",
      },
      {
        _id: "012ry27f1d2ae3r1el4fcdb1",
        userId: "650c697f1c4ae3b5e8bfcdb1",
        title: "Certificate of Appreciation for Volunteer Work",
        fileUrl: "https://www.sbs.ox.ac.uk/sites/default/files/2019-01/cv-template.pdf",
      },
    ],
    createdAt: "2023-09-18T14:34:56.789Z",
    updatedAt: "2023-09-18T14:34:56.789Z",
  }

  const languagesFormatted = currentUser?.userDetailsId.languages
    .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
    .join(", ")

  const datesFormatted = formatDate(currentUser.createdAt)

  const infoItems = [
    {
      icon: <FaRegCalendarAlt />,
      description: `Member since ${datesFormatted}`,
    },
    {
      icon: <IoLocationOutline />,
      description: `${currentUser?.userDetailsId.addressId.city} ,  ${currentUser?.userDetailsId.addressId.country}`,
    },
    {
      icon: <BsGenderAmbiguous />,
      description: currentUser?.userDetailsId.gender,
    },
    {
      icon: <MdLanguage />,
      description: languagesFormatted,
    },
  ]

  return (
    <>
      <Header />
      <div className="font-poppins block sm:flex sm:justify-evenly dark:bg-black pb-12 pt-3">
        <div className="w-full sm:w-[35vw] md:w-[38vw] bg-light-gray rounded-md px-4 sm:px-6 dark:bg-dark-gray-2 dark:text-white">
          <div className="flex justify-between px-2">
            <img
              src={
                currentUser.userType === "individual"
                  ? currentUser.userDetailsId?.avatar
                  : currentUser.userDetailsId?.organizationLogo
              }
              alt="Avatar"
              className="w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] rounded-full mt-4 sm:mt-8"
            />
            <button
              onClick={() => navigate("/page-not-created-yet")}
              className="w-[4rem] h-[1.6rem] sm:w-[60px] sm:h-[30px] text-[0.9375rem] rounded-md bg-primary-green text-white mt-4 sm:mt-8"
            >
              Edit
            </button>
          </div>
          {/*Name & Trophy */}
          <div className="mt-4 sm:mt-2 ">
            <h1 className="text-[1.5rem] sm:text-[1.7rem] font-medium tracking-wide">
              {currentUser?.userType === "individual"
                ? currentUser.fullName
                : currentUser.organizationName}
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
                          <div className="mt-[1px] text-dark-gray-1 text-[1.3rem] dark:text-white">
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
            {currentUser?.userDetailsId.interestIds.length > 0 && (
              <div>
                <h2 className="mt-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold ">
                  Interests
                </h2>
                <div className=" flex flex-wrap gap-2 my-2 text-dark-gray-1">
                  {currentUser?.userDetailsId?.interestIds.map((interest) => (
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
              <p className="text-dark-gray-1 my-2  dark:text-white">
                {currentUser?.userDetailsId.bio}
              </p>
            </div>

            {/* Certification & Document  */}
            <div className="hidden sm:block max-w-[450px]">
              <h2 className="my-6 font-semibold text-dark-gray-1 dark:text-white dark:font-bold">
                Certification & Document
              </h2>
              {currentUser?.documentIds.map((item, index) => (
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
                      <FaExternalLinkAlt className="opacity-65 dark:opacity-80" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[61vw] md:w-[55vw] bg-light-gray rounded-md px-4 sm:px-6 -mt-3 sm:mt-0 dark:bg-dark-gray-2">
          <ProfileCard />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
