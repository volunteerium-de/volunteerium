import { createSlice } from "@reduxjs/toolkit"

const eventSlice = createSlice({
  name: "event",

  initialState: {
    singleEvent: null,
    upcomingEvents: [],
    onlineEvents: [],
    events: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    fetchSingleEventSuccess: (state, { payload: data }) => {
      state.loading = false
      state.error = false
      state.singleEvent = data
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const { fetchStart, fetchSingleEventSuccess, fetchFail } = eventSlice.actions
export default eventSlice.reducer
