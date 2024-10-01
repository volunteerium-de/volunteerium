import { useDispatch } from "react-redux"
import { toggleColorMode } from "../features/themeSlice"

const useTheme = () => {
  const dispatch = useDispatch()

  const toggleTheme = () => {
    dispatch(toggleColorMode())
  }

  return { toggleTheme }
}

export default useTheme
