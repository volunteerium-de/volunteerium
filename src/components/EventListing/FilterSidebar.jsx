import React, { useState, forwardRef, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../../styles/global.css"
import { IoCalendar } from "react-icons/io5"
import { useSelector, useDispatch } from "react-redux"
import {
  setEventListingCategoryFilters,
  setLanguageFilters,
  setStartDate,
  setEndDate,
  setHomeSelectedCategory,
} from "../../features/searchSlice"
import { axiosWithPublic } from "../../hooks/useAxios"
import { formatISO } from "date-fns"
import LangJson from "../../helpers/ISO-639-1-languages.json"

export const formatEndDate = (startDate) => {
  const newEndDate = new Date(startDate)
  newEndDate.setDate(newEndDate.getDate() + 1)
  newEndDate.setHours(23, 59, 59, 999)
  const formattedNewEndDate = formatISO(newEndDate)
  return formattedNewEndDate
}

export const getLangName = (langCode) => {
  const selectedLang = LangJson.filter((langData) => langData.code === langCode)
  return selectedLang[0].name
}

const FilterSidebar = () => {
  const dispatch = useDispatch()
  const [localStartDate, setLocalStartDate] = useState()
  const [localEndDate, setLocalEndDate] = useState()
  const categories = useSelector((state) => state.search.categories)
  const selectedCategories = useSelector((state) => state.search.categoryFilters)
  const [eventLanguages, setEventLanguages] = useState([])
  const selectedLanguages = useSelector((state) => state.search.languageFilters)

  useEffect(() => {
    fetchLanguages()
  }, [])

  const formatLocalDate = (dateStr) => {
    const date = new Date(dateStr)
    const formattedDate = formatISO(date)
    return formattedDate
  }

  useEffect(() => {
    const initialDate = new Date()
    initialDate.setHours(0, 0, 0, 0)
    setLocalStartDate(formatLocalDate(initialDate))
    const initialEndDate = formatEndDate(initialDate)
    setLocalEndDate(formatLocalDate(initialEndDate))
  }, [])

  const fetchLanguages = async () => {
    try {
      const { data } = await axiosWithPublic.get("events/languages")
      setEventLanguages(data.data)
      // console.log(data.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCategory = (category) => {
    const isSelected = selectedCategories.includes(category.name)

    const updatedCategories = isSelected
      ? selectedCategories.filter((selectedCategory) => selectedCategory !== category.name)
      : [...selectedCategories, category.name]

    dispatch(setEventListingCategoryFilters(updatedCategories))
    dispatch(setHomeSelectedCategory(null))
  }

  const handleLanguage = (langCode) => {
    const updatedLanguages = selectedLanguages.includes(langCode)
      ? selectedLanguages.filter((item) => item !== langCode)
      : [...selectedLanguages, langCode]

    dispatch(setLanguageFilters(updatedLanguages))
  }

  // Custom Input for DatePicker
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="bg-light-gray text-black font-medium text-[0.875rem] py-2 px-4 rounded hover:border hover:border-primary-green flex justify-between items-center gap-10 min-w-[250px]"
      ref={ref}
      onClick={onClick}
      aria-label="Select Date"
      title="Select Date"
    >
      {value}
      <IoCalendar className="text-dark-green w-[17px] h-[17px]" />
    </button>
  ))

  return (
    <div className="p-4 rounded-lg shadow-lg h-full overflow-auto dark:bg-dark-gray-3 ">
      <div className="lg:max-w-[700px] mb-4 shadow-lg bg-white p-5 max-w-[400px] mx-auto ">
        <h2 className="text-left font-semibold mb-2 p-2 text-black dark:text-white text-[0.9375rem] ">
          Availability
        </h2>
        <hr className="border border-light-gray-3 " />

        <div className="mb-4 p-5 flex flex-col gap-5 ">
          <div className="mx-auto">
            <h3 className="font-semibold mb-2 text-black dark:text-white text-[0.9375rem]">From</h3>

            <div className="flex flex-col items-center justify-center lg:items-start gap-5">
              {/* Start Date Picker */}
              <DatePicker
                selected={localStartDate}
                onChange={(dateStr) => {
                  setLocalStartDate(formatLocalDate(dateStr))
                  setLocalEndDate(formatEndDate(dateStr))
                }}
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy HH:mm"
                customInput={<CustomInput />}
                showTimeInput
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="mx-auto">
            <h3 className="font-semibold mb-2 text-black dark:text-white text-[0.9375rem]">To</h3>
            <div className="flex flex-col items-center justify-center gap-5 lg:items-start">
              {/* End Date Picker */}
              <DatePicker
                selected={localEndDate}
                onChange={(dateStr) => {
                  setLocalEndDate(formatLocalDate(dateStr))
                }}
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy HH:mm"
                customInput={<CustomInput />}
                showTimeInput
                minDate={new Date(localStartDate)}
              />
            </div>
          </div>
          <div className="mx-auto">
            <button
              className="text-[0.9375rem] font-medium text-white text-center bg-primary-green px-4 py-2 rounded w-[200px] "
              onClick={() => {
                dispatch(setStartDate(localStartDate))
                dispatch(setEndDate(localEndDate))
              }}
            >
              Check Events
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4 shadow-lg bg-light-white p-5 max-w-[400px] mx-auto ">
        <h3 className="font-semibold mb-2 p-2 text-black dark:text-white text-[0.9375rem] lg:text-left">
          Categories
        </h3>
        <hr className="border border-light-gray-3 mb-3" />
        <div className="max-h-[200px] overflow-y-scroll scrollbar">
          {categories.map((category) => (
            <label key={category.name} className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                value={category.name}
                onChange={() => handleCategory(category)}
                checked={selectedCategories.includes(category.name)}
              />
              <span className="text-[0.75rem] text-black font-medium">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-10 m-auto shadow-lg bg-light-white p-5 max-w-[400px] mx-auto ">
        <h3 className="font-semibold mb-2 p-2 text-black dark:text-white text-[0.9375rem] text-center lg:text-left">
          Languages
        </h3>
        <hr className="border border-light-gray-3 mb-3" />
        <div className="max-h-[200px] overflow-y-auto">
          {eventLanguages.map((language) => (
            <label key={language.langCode} className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                value={language.langCode}
                onChange={() => handleLanguage(language.langCode)}
                checked={selectedLanguages.includes(language.langCode)}
              />
              <span className="text-[0.75rem] text-black font-medium">
                {getLangName(language.langCode)} ({language.eventCount})
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
