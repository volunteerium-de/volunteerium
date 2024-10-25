import { useFormikContext } from "formik"
import Select from "react-select"

const SelectInput = ({ name, options, label, placeholder, isMultiple }) => {
  const { setFieldValue, values } = useFormikContext()

  return (
    <div className="mb-4">
      <label className="block text-dark-gray-2 mb-2">{label}</label>
      <Select
        name={name}
        options={options}
        className={isMultiple ? "basic-multi-select" : "basic-select"}
        classNamePrefix="select"
        isMulti={isMultiple}
        onChange={(selectedOption) => {
          console.log(selectedOption)
          setFieldValue(
            name,
            isMultiple
              ? selectedOption.map((option) => option.value)
              : selectedOption
                ? selectedOption.value
                : null
          )
        }}
        value={
          isMultiple
            ? options?.filter((option) => values[name]?.includes(option.value))
            : options?.find((option) => option.value === values[name]) || null
        }
        placeholder={placeholder || `Select ${label}`}
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
          singleValue: (provided) => ({
            ...provided,
            color: "#000000",
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

export default SelectInput
