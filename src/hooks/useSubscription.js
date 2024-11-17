import { useState } from "react"
import axios from "axios"
import toastNotify from "../utils/toastNotify"

const useSubscription = () => {
  const subscribe = async (email) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/subscriptions`, {
        email,
      })
      console.log(data)
      toastNotify("success", data.message)
    } catch (error) {
      console.log(error)
      toastNotify("error", error.response.data.message)
    }
  }

  const unsubscribe = async (id) => {}
  const listSubscriptions = async () => {}

  return {
    subscribe,
  }
}

export default useSubscription
