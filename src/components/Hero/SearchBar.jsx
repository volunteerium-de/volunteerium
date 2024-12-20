import { useState, useRef, useEffect } from "react"
import { IoSearchCircleSharp } from "react-icons/io5"
import useEventCall from "../../hooks/useEventCall"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {
  setSearchTerm,
  setHomeSelectedCategory,
  setManualLocation,
  setCategoryFilters,
} from "../../features/searchSlice"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { translations } from "../../locales/translations"
import useLanguageOptions from "../../hooks/useLanguages"

const SearchBar = () => {
  const { t } = useTranslation() // i18next hook
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [term, setTerm] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const dropdownRef = useRef(null)
  const { getEventCategories } = useEventCall()
  const { categories, searchTermEvent, searchTermLocation, homeSelectedCategory } = useSelector(
    (state) => state.search
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { getTranslatedCategory } = useLanguageOptions()

  const searchBarItems = [
    {
      id: "event",
      label: t(translations.searchbar.event.label),
      placeholder: t(translations.searchbar.event.placeholder),
      type: "input",
    },
    {
      id: "location",
      label: t(translations.searchbar.location.label),
      placeholder: t(translations.searchbar.location.placeholder),
      type: "input",
    },
    {
      id: "category",
      label: t(translations.searchbar.category.label),
      placeholder: t(translations.searchbar.category.placeholder),
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
    dispatch(setSearchTerm(term))
    dispatch(setManualLocation(eventLocation))
    if (!location.pathname.includes("/events")) {
      const filters = []

      if (searchTermEvent) {
        filters.push(`search[title]=${searchTermEvent}`)
      }
      if (searchTermLocation) {
        filters.push(`search[location]=${searchTermLocation}`)
      }
      if (homeSelectedCategory && homeSelectedCategory !== "Choose Category") {
        filters.push(`filter[category]=${homeSelectedCategory}`)
      }

      if (filters.length > 0) {
        const query = filters.join("&")
        navigate(`events?${encodeURIComponent(query)}`)
      } else {
        navigate("events")
      }
    }
  }

  return (
    <div className="relative w-[80%] md:w-[75%] lg:w-[65%] xl:w-[55%] max-w-[1000px] min-w-[26rem] mx-auto p-2 bottom-28 sm:bottom-48 rounded-lg border border-light-gray-1 dark:border-dark-gray-2 bg-white flex items-center justify-between dark:bg-dark-gray-3 dark:text-white">
      {searchBarItems.map(({ id, label, placeholder, type }) => (
        <div
          key={id}
          className={`flex flex-col w-1/3 px-2 ${id !== "event" && "border-l border-opacity-30 border-gray-2 sm:pl-3"}`}
        >
          <label htmlFor={id} className="font-semibold ml-1">
            {label}
          </label>
          {type === "input" ? (
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              className="text-[0.6rem] sm:text-[0.8rem] text-gray-2 focus:outline-none w-full p-1 dark:bg-dark-gray-3"
              onChange={(e) => {
                id === "event" ? setTerm(e.target.value) : setEventLocation(e.target.value)
              }}
            />
          ) : (
            <div className="relative w-full">
              <div
                className="cursor-pointer text-[0.6rem] sm:text-[0.8rem] text-gray-2 p-1 rounded-md"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {getTranslatedCategory(homeSelectedCategory) || t("searchbar.category.placeholder")}
              </div>
              {isDropdownOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute top-full mt-1 w-[8rem] sm:w-[12rem] bg-white dark:bg-dark-gray-3 border border-light-gray-1 dark:border-dark-gray-2 rounded-md shadow-lg z-10 max-h-28 overflow-y-auto text-gray-2  scrollbar"
                >
                  {categories
                    ?.filter((cat) => cat.name !== homeSelectedCategory)
                    .map((category) => (
                      <li
                        key={category._id}
                        className="p-2 text-[0.6rem] sm:text-[0.8rem] hover:bg-light-green hover:dark:bg-primary-green cursor-pointer dark:hover:text-white"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {getTranslatedCategory(category.name)}
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
        className="text-primary-green dark:text-light-green hover:text-dark-green text-4xl cursor-pointer"
      />
    </div>
  )
}

export default SearchBar
