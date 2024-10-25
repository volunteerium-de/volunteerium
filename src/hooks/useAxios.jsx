import axios from "axios"
import { useSelector } from "react-redux"
import i18n from "../i18n"

const language = i18n.language

export const axiosWithPublic = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Accept-Language": language,
  },
})

const useAxios = () => {
  const { token, bearer } = useSelector((state) => state.auth)

  const axiosWithToken = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Authorization: `Token ${token}`,
      "Accept-Language": language,
    },
  })

  const axiosWithBearer = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Accept-Language": language,
    },
  })

  return { axiosWithToken, axiosWithBearer }
}

export default useAxios
