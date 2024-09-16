import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//? toastNotify('success', 'It works')
// types: "success" | "error" | "info" | "warn"

const toastNotify = (type, msg) => {
  const validTypes = ['success', 'error', 'info', 'warn']

  if (!validTypes.includes(type)) {
    console.error(`Invalid toast type: ${type}`)
    return
  }

  switch (type) {
    case 'success':
      toast.success(msg)
      break
    case 'error':
      toast.error(msg)
      break
    case 'info':
      toast.info(msg)
      break
    case 'warn':
      toast.warn(msg)
      break
    default:
      break
  }
}

export default toastNotify
