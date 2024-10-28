import axios from "axios"
import { useSelector } from "react-redux"
import i18n from "../i18n"

// Function to create an axios instance with interceptors
const createAxiosInstance = (baseURL, token = null, bearer = null) => {
  const instance = axios.create({ baseURL })

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    if (bearer) {
      config.headers.Authorization = `Bearer ${bearer}`
    }
    config.headers["Accept-Language"] = i18n.language // Always use current language
    return config
  })

  return instance
}

// Create public axios instance
export const axiosWithPublic = createAxiosInstance(import.meta.env.VITE_BACKEND_URL)

// Hook to get axios instances with authentication
const useAxios = () => {
  const { token, bearer } = useSelector((state) => state.auth)

  // Create axios instances for authenticated requests
  const axiosWithToken = createAxiosInstance(import.meta.env.VITE_BACKEND_URL, token)
  const axiosWithBearer = createAxiosInstance(import.meta.env.VITE_BACKEND_URL, null, bearer)

  return { axiosWithToken, axiosWithBearer }
}

export default useAxios
