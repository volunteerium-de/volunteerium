import { useState, useRef, useEffect } from "react"
import { IoSearchCircleSharp } from "react-icons/io5"

const SearchBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose Category")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

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
  ]

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.label)
    setIsDropdownOpen(false)
  }

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative h-[8vh] w-full max-w-[55%] min-w-[28rem] mx-auto py-3 px-3 sm:py-2 sm:px-4 bottom-28 sm:bottom-48 rounded-lg border border-light-gray-1 dark:border-dark-gray-2 bg-white flex items-center justify-between dark:bg-dark-gray-3 dark:text-white">
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
              className="text-[0.6rem] text-gray-2 focus:outline-none w-full p-1 dark:bg-dark-gray-3"
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
                <ul
                  ref={dropdownRef}
                  className="absolute top-full mt-1 w-[8rem] sm:w-[12rem] bg-white dark:bg-dark-gray-3 border border-light-gray-1 dark:border-dark-gray-2 rounded-md shadow-lg z-10 max-h-28 overflow-y-auto text-gray-2"
                >
                  {categories.map((category) => (
                    <li
                      key={category.value}
                      className="p-2 text-[0.7rem] hover:bg-light-green hover:dark:bg-primary-green cursor-pointer dark:hover:text-white"
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
      <IoSearchCircleSharp className="text-primary-green dark:text-light-green text-4xl cursor-pointer" />
    </div>
  )
}

export default SearchBar
