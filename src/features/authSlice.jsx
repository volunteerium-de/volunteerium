import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    token: null,
    bearer: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false
      state.error = false
      state.currentUser = payload?.new
    },
    registerSuccess: (state) => {
      state.loading = false
      state.error = false
    },
    verifySuccess: (state, { payload }) => {
      state.loading = false
      state.currentUser = payload?.data
      state.token = payload?.token
      state.bearer = payload?.bearer?.access
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.currentUser = payload?.user
      state.token = payload?.token
      state.bearer = payload?.bearer?.access
    },
    logoutSuccess: (state) => {
      state.loading = false
      state.currentUser = null
      state.token = null
      state.bearer = null
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
