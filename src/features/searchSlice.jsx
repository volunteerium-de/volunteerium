import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchTermEvent: "",
  searchTermLocation: "",
  homeSelectedCategory: null,
  categories: [],
  categoryFilters: [],
  loading: false,
  error: false,
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.loading = false
      state.categories = payload
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTermEvent = payload
    },
    setManualLocation: (state, { payload }) => {
      state.searchTermLocation = payload
    },
    setHomeSelectedCategory: (state, { payload }) => {
      state.homeSelectedCategory = payload
    },
    setCategoryFilters: (state, { payload }) => {
      state.categoryFilters = [...new Set([state.homeSelectedCategory, ...payload])]
    },
    clearFilters: (state) => {
      Object.assign(state, initialState)
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  getCategoriesSuccess,
  setSearchTerm,
  setManualLocation,
  setCategoryFilters,
  setHomeSelectedCategory,
  clearFilters,
  fetchFail,
} = searchSlice.actions

export default searchSlice.reducer
