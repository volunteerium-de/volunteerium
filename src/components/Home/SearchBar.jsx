import { FaSearch } from "react-icons/fa"

const SearchBar = () => {
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
      // placeholder: 'Choose Category',
      type: "select",
      options: [
        { value: "", label: "Choose Category", disabled: true, selected: true },
        { value: "tech", label: "Tech" },
        { value: "education", label: "Education" },
        { value: "health", label: "Health" },
      ],
    },
  ]

  return (
    <div className="relative h-[46px] sm:h-[64px] w-[370px] sm:w-[90vw] md:w-[750px] lg:w-[820px] mx-auto py-2 px-3 sm:py-2 sm:px-6 bottom-28 sm:bottom-48 rounded-lg border border-white border-opacity-50 bg-white flex items-center justify-between dark:bg-black dark:text-white  ">
      {searchBarItems.map(({ id, label, placeholder, type, options }) => (
        <div
          key={id}
          className={`flex flex-col ${
            id !== "event" && "border-l border-opacity-30 border-gray-300 pl-3"
          } `}
        >
          <label htmlFor={id} className=" text-[12px] sm:text-[16px] font-semibold mb-1">
            {label}
          </label>
          {type === "input" ? (
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              className="text-[9px] sm:text-[16px] focus:outline-none w-full"
            />
          ) : (
            <select
              id={id}
              name={id}
              className="text-[9px] sm:text-[0.9rem] rounded-md focus:outline-none appearance-none"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button className="bg-primary-green w-8 h-8 sm:w-10 sm:h-10 text-white rounded-full flex items-center justify-center ml-2 sm:ml-0">
        <FaSearch className="text-[13px] sm:text-[16px]" />
      </button>
    </div>
  )
}

export default SearchBar
