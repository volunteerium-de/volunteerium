import { useState, useRef, useEffect } from "react"
import { IoSearchCircleSharp } from "react-icons/io5"
import useEventCall from "../../hooks/useEventCall"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {
  setSearchTerm,
  setHomeSelectedCategory,
  setManualLocation,
  clearFilters,
  setCategoryFilters,
} from "../../features/searchSlice"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { getEventCategories } = useEventCall()
  const { categories, searchTermEvent, searchTermLocation, homeSelectedCategory } = useSelector(
    (state) => state.search
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const handleCategorySelect = (category) => {
    dispatch(setHomeSelectedCategory(category.name))
    dispatch(setCategoryFilters([category.name]))
    setIsDropdownOpen(false)
  }

  // Close dropdown when clicked outside
  useEffect(() => {
    getEventCategories()
    dispatch(clearFilters())
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

  const handleSearch = () => {
    const filters = []

    // Eğer başlık arama terimi varsa ekle
    if (searchTermEvent) {
      filters.push(`search[title]=${encodeURIComponent(searchTermEvent.toLowerCase())}`)
    }
    if (searchTermLocation) {
      filters.push(`search[location]=${encodeURIComponent(searchTermLocation.toLowerCase())}`)
    }
    if (homeSelectedCategory && homeSelectedCategory !== "Choose Category") {
      filters.push(`filter[category]=${encodeURIComponent(homeSelectedCategory.toLowerCase())}`)
    }

    if (filters.length > 0) {
      const query = filters.join("&")
      navigate(`events?${query}`)
    } else {
      navigate("events")
    }
  }

  return (
    <div className="relative w-[80%] md:w-[75%] lg:w-[65%] xl:w-[55%] min-w-[27.2rem] mx-auto p-2 sm:p-2 bottom-28 sm:bottom-48 rounded-lg border border-light-gray-1 dark:border-dark-gray-2 bg-white flex items-center justify-between dark:bg-dark-gray-3 dark:text-white">
      {searchBarItems.map(({ id, label, placeholder, type }) => (
        <div
          key={id}
          className={`flex flex-col ${id !== "event" && "border-l border-opacity-30 border-gray-2 pl-3"}`}
        >
          <label htmlFor={id} className="text-[1rem] font-semibold">
            {label}
          </label>
          {type === "input" ? (
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              className="text-[0.6rem] sm:text-[0.8rem] text-gray-2 focus:outline-none w-full p-1 dark:bg-dark-gray-3"
              onChange={(e) => {
                id === "event"
                  ? dispatch(setSearchTerm(e.target.value))
                  : dispatch(setManualLocation(e.target.value))
              }}
            />
          ) : (
            <div className="relative sm:min-w-[110px]">
              <div
                className="cursor-pointer text-[0.6rem] sm:text-[0.8rem] text-gray-2 p-1 rounded-md"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {homeSelectedCategory || "Choose Category"}
              </div>
              {isDropdownOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute top-full mt-1 w-[8rem] sm:w-[12rem] bg-white dark:bg-dark-gray-3 border border-light-gray-1 dark:border-dark-gray-2 rounded-md shadow-lg z-10 max-h-28 overflow-y-auto text-gray-2"
                >
                  {categories?.map((category) => (
                    <li
                      key={category._id}
                      className="p-2 text-[0.7rem] hover:bg-light-green hover:dark:bg-primary-green cursor-pointer dark:hover:text-white"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category?.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      <IoSearchCircleSharp
        onClick={handleSearch}
        className="text-primary-green dark:text-light-green text-4xl cursor-pointer"
      />
    </div>
  )
}

export default SearchBar
