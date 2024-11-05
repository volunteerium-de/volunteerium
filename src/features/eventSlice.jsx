import { createSlice } from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name: "event",

  initialState: {
    singleEvent: null,
    loading: false,
    error: false,
    participationLoading: false,
    participationError: false,
  },
  reducers: {
    fetchEventStart: (state) => {
      state.loading = true
      state.error = false
    },
    participationStart: (state) => {
      state.participationLoading = true
      state.participationError = false
    },
    fetchSingleEventSuccess: (state, { payload: data }) => {
      state.loading = false
      state.error = false
      state.participationLoading = false
      state.singleEvent = data
    },
    fetchEventFail: (state) => {
      state.loading = false
      state.error = true
    },
    participationFail: (state) => {
      state.participationLoading = false
      state.participationError = true
    },
  },
})

export const {
  fetchEventStart,
  participationStart,
  fetchSingleEventSuccess,
  fetchEventFail,
  participationFail,
} = eventSlice.actions
export default eventSlice.reducer
