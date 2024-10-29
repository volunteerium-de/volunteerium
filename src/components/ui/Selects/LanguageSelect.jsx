import Select from "react-select"
import { useFormikContext } from "formik"
import useLanguageOptions from "../../../hooks/useLanguages"

const LanguageSelect = () => {
  const { setFieldValue, values } = useFormikContext()
  const languageOptions = useLanguageOptions()

  return (
    <div className="mb-4">
      <label className="block text-dark-gray-2 mb-2 dark:text-white">Language</label>
      <Select
        isMulti
        name="languages"
        options={languageOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selectedOptions) => {
          setFieldValue(
            "languages",
            selectedOptions ? selectedOptions.map((option) => option.value) : []
          )
        }}
        value={languageOptions.filter((option) => values.languages?.includes(option.value))}
        placeholder="Add event languages"
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderColor: "#C1C2C4",
            color: "#FFFFFF",
            "&:hover": {
              borderColor: "#69957B",
            },
            boxShadow: state.isFocused ? "0 0 0 .1px #69957B" : provided.boxShadow,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#69957B" : "#FFFFFF",
            color: state.isSelected ? "#FFFFFF" : "#000000",
            "&:hover": {
              backgroundColor: "#DCE6E0",
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: "#69957B",
            color: "#FFFFFF",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "#FFFFFF",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#AC242F",
              color: "#FFFFFF",
            },
          }),
        }}
      />
    </div>
  )
}

export default LanguageSelect
