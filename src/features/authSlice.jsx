import { createSlice } from "@reduxjs/toolkit"

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
