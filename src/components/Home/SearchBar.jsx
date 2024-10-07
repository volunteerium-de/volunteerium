import { useState } from "react"
import { IoSearchCircleSharp } from "react-icons/io5"

const SearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose Category")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const searchBarItems = [
    {
      id: "event",
      label: "Event",
      placeholder: "Search opportunities",
      type: "input",
    },
    {
      id: "location",
      label: "Location",
      placeholder: "Choose Location",
      type: "input",
    },
    {
      id: "category",
      label: "Category",
      placeholder: "Choose Category",
      type: "category",
    },
  ]

  const categories = [
    { value: "", label: "Choose Category" },
    { value: "tech", label: "Tech" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "tech", label: "Tech" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "tech", label: "Tech" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
  ]

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.label)
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative h-[8vh] w-full max-w-[55%] min-w-[28rem] mx-auto py-3 px-3 sm:py-2 sm:px-4 bottom-28 sm:bottom-48 rounded-lg border border-light-gray-1 bg-white flex items-center justify-between dark:bg-black dark:text-white">
      {/* Event & Location Areas */}
      {searchBarItems.map(({ id, label, placeholder, type }) => (
        <div
          key={id}
          className={`flex flex-col ${
            id !== "event" && "border-l border-opacity-30 border-gray-2 pl-3"
          }`}
        >
          <label htmlFor={id} className="text-[1rem] font-semibold ">
            {label}
          </label>
          {type === "input" ? (
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              className="text-[0.6rem] text-gray-2 focus:outline-none w-full p-1"
            />
          ) : (
            <div className="relative">
              <div
                className="cursor-pointer text-[0.6rem] text-gray-2 p-1 rounded-md"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedCategory}
              </div>
              {/* Dropdown */}
              {isDropdownOpen && (
                <ul className="absolute top-full mt-1 w-[8rem] sm:w-[12rem] bg-white border border-light-gray-1 rounded-md shadow-lg z-10 max-h-28 overflow-y-auto text-gray-2">
                  {categories.map((category) => (
                    <li
                      key={category.value}
                      className="p-2 text-[0.7rem] hover:bg-light-green cursor-pointer"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Search Icon */}
      <IoSearchCircleSharp className="text-primary-green text-4xl	 cursor-pointer" />
    </div>
  )
}

export default SearchBar
