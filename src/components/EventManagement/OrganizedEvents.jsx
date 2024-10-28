import { FaPlus } from "react-icons/fa"

const OrganizedEvents = ({ onAddEvent }) => {
  return (
    <div className="p-5">
      <button
        onClick={onAddEvent}
        className="flex items-center border hover:bg-dark-green px-4 py-2 rounded-lg bg-primary-green text-white"
      >
        <FaPlus className="mr-2" />
        Add New Event
      </button>
    </div>
  )
}

export default OrganizedEvents
