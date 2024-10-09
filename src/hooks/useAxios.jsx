import axios from "axios"
import { useSelector } from "react-redux"

export const axiosWithPublic = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

const useAxios = () => {
  const { token } = useSelector((state) => state.auth)

  const axiosWithToken = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Authorization: `Token ${token}`,
    },
  })

  return axiosWithToken
}

export default useAxios
