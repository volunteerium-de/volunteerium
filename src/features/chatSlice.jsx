import { createSlice } from "@reduxjs/toolkit"

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    notifications: [],
    conversations: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    notificationSuccess: (state, { payload: data }) => {
      state.loading = false
      state.error = false
      state.notifications = data
    },
    conversationSuccess: (state, { payload: data }) => {
      state.loading = false
      state.error = false
      state.conversations = data
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { fetchStart, notificationSuccess, conversationSuccess, fetchFail } = chatSlice.actions
export default chatSlice.reducer
