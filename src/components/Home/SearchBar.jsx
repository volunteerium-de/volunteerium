import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const searchBarItems = [
    {
      id: "event",
      label: "Event",
      placeholder: "Search for opportunities",
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
      type: "select",
      options: [
        { value: "", label: "Choose Category", disabled: true, selected: true },
        { value: "tech", label: "Tech" },
        { value: "education", label: "Education" },
        { value: "health", label: "Health" },
      ],
    },
  ];

  return (
    <div className="relative w-[370px] sm:w-[80vw] lg:w-[60vw] mx-auto py-2 px-1 sm:p-2 bottom-20 sm:bottom-40 rounded-lg border border-white border-opacity-40 bg-white flex items-center justify-between">
      {searchBarItems.map(({ id, label, placeholder, type, options }) => (
        <div
          key={id}
          className={`flex flex-col ${
            id !== "event" && "border-l border-opacity-30 border-gray-300 pl-3"
          } `}
        >
          <label
            htmlFor={id}
            className=" text-[12px] sm:text-sm md:text-base font-bold mb-1"
          >
            {label}
          </label>
          {type === "input" ? (
            <input
              id={id}
              type="text"
              placeholder={placeholder}
              className="text-[9px] sm:text-sm md:text-base focus:outline-none w-full"
            />
          ) : (
            <select
              id={id}
              name={id}
              className="text-[9px] sm:text-[0.9rem] pr-2 rounded-md focus:outline-none opacity-60"
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
        <CiSearch className="text-xl" />
      </button>
    </div>
  );
};

export default SearchBar;
