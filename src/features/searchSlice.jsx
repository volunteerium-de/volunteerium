import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchTermEvent: "",
  searchTermLocation: "",
  homeSelectedCategory: null,
  categories: [],
  categoryFilters: [],
  languageFilters: [],
  startDate: null,
  endDate: null,
  loading: false,
  error: false,
  sortOrder: "Newest",
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
    getLanguagesSuccess: (state, { payload }) => {
      state.loading = false
      state.languages = payload
    },
    setStartDate: (state, { payload }) => {
      state.startDate = payload
    },
    setEndDate: (state, { payload }) => {
      state.endDate = payload
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
    // Category management on the Event Listing page
    setEventListingCategoryFilters: (state, { payload }) => {
      state.categoryFilters = payload
    },
    setLanguageFilters: (state, { payload }) => {
      state.languageFilters = payload
    },
    setSortOrder: (state, { payload }) => {
      state.sortOrder = payload
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
  getLanguagesSuccess,
  setStartDate,
  setEndDate,
  setSearchTerm,
  setManualLocation,
  setCategoryFilters,
  setEventListingCategoryFilters,
  setLanguageFilters,
  setHomeSelectedCategory,
  setSortOrder,
  clearFilters,
  fetchFail,
} = searchSlice.actions

export default searchSlice.reducer
