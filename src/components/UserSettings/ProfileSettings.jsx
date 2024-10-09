import React from "react"
import IndividualSettingsForm from "./IndividualSettingsForm"
import OrganisationSettingsForm from "./OrganisationSettingsForm"
import { useState } from "react"
// import SecuritySettings from "./SecuritySettings"

const ProfileSettings = () => {
  const [currentUser] = useState(
    // {
    //   _id: "650c697f1c4ae3b5e8bfcdb1",
    //   userType: "individual",
    //   fullName: "Alice Johnson",
    //   email: "alice.johnson@example.com",
    //   organizationName: "",
    //   userDetailsId: {
    //     _id: "650c6a3a1c4ae3b5e8bfcdac",
    //     userId: "650c697f1c4ae3b5e8bfcdb1",
    //     isFullNameDisplay: true,
    //     gender: "female",
    //     ageRange: "26-35",
    //     bio: "Passionate about community service and environmental sustainability.",
    //     languages: ["en", "fr", "de"],
    //     avatar:
    //       "https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg",
    //     totalPoint: 450,
    //     interestIds: [
    //       { _id: "a1b2c3d4e5f6g7h8i9j0k1l2", name: "animal" },
    //       { _id: "b2c3d4e5f6g7h8i9j0k1l2m3", name: "environment" },
    //       { _id: "c3d4e5f6g7h8i9j0k1l2m3n4", name: "health" },
    //     ],
    //     organizationLogo: "",
    //     organizationDesc: "",
    //     addressId: {
    //       _id: "650c6b4b1c4ae3b5e8bfcdc7",
    //       city: "Munich",
    //       country: "Germany",
    //       zipCode: "80331",
    //       state: "Bavaria",
    //       streetName: "Marienplatz",
    //       streetNumber: "1",
    //       additional: "Near the New Town Hall",
    //       iframeSrc:
    //         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.5900098446964!2d11.572142177922961!3d48.137429451169446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75f4d5d25587%3A0xc4e347226b3ab033!2sMarienplatz%201%2C%2080331%20M%C3%BCnchen!5e0!3m2!1str!2sde!4v1726665817507!5m2!1str!2sde",
    //     },
    //     organizationUrl: "",
    //   },
    //   isActive: true,
    //   isSetup: true,
    //   documentIds: [],
    //   createdAt: "2023-09-18T14:34:56.789Z",
    //   updatedAt: "2023-09-18T14:34:56.789Z",
    // }
    {
      _id: "650c5a4f1c4ae3b5e8bfcdb0",
      userType: "organization",
      fullName: "Green Earth Org",
      email: "contact@greenearth.org",
      userDetailsId: {
        _id: "650c5a7a1c4ae3b5e8bfcdb3",
        userId: "650c5a4f1c4ae3b5e8bfcdb0",
        isFullNameDisplay: true,
        gender: "",
        ageRange: "",
        bio: "We are dedicated to making the planet greener and cleaner.",
        languages: [],
        avatar: "",
        totalPoint: 0,
        interestIds: [],
        organizationName: "Green Earth Org",
        organizationLogo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxwZpSs9IU4bCRfFrY-wXSDdbMR1cwod_TA&s",
        organizationDesc: "A non-profit organization focused on environmental sustainability.",
        addressId: {
          _id: "650c5b3b1c4ae3b5e8bfcdc1",
          city: "Berlin",
          country: "Germany",
          zipCode: "10115",
          state: "Berlin",
          streetName: "Alexanderplatz",
          streetNumber: "1",
          additional: "Suite 10",
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.669082902881!2d13.410042978021215!3d52.52132753612963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fc57b75cc47%3A0x5d30d5b670e16fad!2sAlexanderpl.%201%2C%2010178%20Berlin!5e0!3m2!1str!2sde!4v1726665851130!5m2!1str!2sde",
        },
        organizationUrl: "https://greenearth.org",
      },
    }
  )

  return (
    <div className="mx-auto dark:text-white">
      {currentUser.userType === "individual" ? (
        <IndividualSettingsForm currentUser={currentUser} />
      ) : currentUser.userType === "organization" ? (
        <OrganisationSettingsForm currentUser={currentUser} />
      ) : (
        <p>Invalid user type</p>
      )}
    </div>
  )
}

export default ProfileSettings
