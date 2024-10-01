import { createSlice } from "@reduxjs/toolkit"

const initialTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"

if (initialTheme === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialTheme,
  },
  reducers: {
    toggleColorMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light"
      localStorage.setItem("theme", state.mode)

      if (state.mode === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    },
  },
})

export const { toggleColorMode } = themeSlice.actions
export default themeSlice.reducer
