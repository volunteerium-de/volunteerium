import { createSlice } from "@reduxjs/toolkit"

// {
//   _id: "650c5a4f1c4ae3b5e8bfcdb0",
//   userType: "organization",
//   fullName: "",
//   email: "contact@greenearth.org",
//   organizationName: "Green Earth Org",
//   userDetailsId: {
//     _id: "650c5a7a1c4ae3b5e8bfcdb3",
//     userId: "650c5a4f1c4ae3b5e8bfcdb0",
//     isFullNameDisplay: true,
//     gender: "",
//     ageRange: "",
//     bio: "We are dedicated to making the planet greener and cleaner.",
//     languages: [],
//     avatar: "",
//     totalPoint: 0,
//     interestIds: [],
//     organizationLogo:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxwZpSs9IU4bCRfFrY-wXSDdbMR1cwod_TA&s",
//     organizationDesc: "A non-profit organization focused on environmental sustainability.",
//     addressId: {
//       _id: "650c5b3b1c4ae3b5e8bfcdc1",
//       city: "Berlin",
//       country: "Germany",
//       zipCode: "10115",
//       state: "Berlin",
//       streetName: "Alexanderplatz",
//       streetNumber: "1",
//       additional: "Suite 10",
//       iframeSrc:
//         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.669082902881!2d13.410042978021215!3d52.52132753612963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fc57b75cc47%3A0x5d30d5b670e16fad!2sAlexanderpl.%201%2C%2010178%20Berlin!5e0!3m2!1str!2sde!4v1726665851130!5m2!1str!2sde",
//     },
//     organizationUrl: "https://greenearth.org",
//   },
//   isActive: true,
//   isEmailVerified: true,
//   isProfileSetup: true,
//   documentIds: [
//     {
//       _id: "310c912e8q2ae3b5el4fcdb1",
//       userId: "650c5a4f1c4ae3b5e8bfcdb0",
//       title: "Organization-Photo-1",
//       file: "https://www.robinage.com/wp-content/uploads/2022/06/green-earth.jpg",
//     },
//     {
//       _id: "190p4t7f1d2ae3r1el4fcdb1",
//       userId: "650c5a4f1c4ae3b5e8bfcdb0",
//       title: "Organization-Photo-2",
//       file:
//         "https://t3.ftcdn.net/jpg/06/29/21/26/360_F_629212697_BrgbrBH0AF2mnGIKL3GR5arPTTuk9pj5.jpg",
//     },
//   ],
//   createdAt: "2023-09-18T12:34:56.789Z",
//   updatedAt: "2023-09-18T12:34:56.789Z",
// }

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    token: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    fetchSuccess: (state) => {
      state.loading = false
      state.error = false
    },
    registerSuccess: (state) => {
      state.loading = false
      state.error = false
    },
    verifySuccess: (state, { payload }) => {
      state.loading = false
      state.currentUser = payload?.data
      state.token = payload?.token
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.currentUser = payload?.user
      state.token = payload?.token
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.currentUser = null
      state.token = null
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { fetchStart, fetchSuccess, registerSuccess, logoutSuccess, loginSuccess, fetchFail } =
  authSlice.actions
export default authSlice.reducer
