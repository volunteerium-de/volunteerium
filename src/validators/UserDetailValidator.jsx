import * as Yup from "yup"

export const UserDetailSchema = Yup.object().shape({
  isFullNameDisplay: Yup.boolean().optional(),

  gender: Yup.string()
    .oneOf(["male", "female", "n/a"], "Please choose a valid gender")
    .required("Gender is required"),
  ageRange: Yup.string()
    .oneOf(["16-25", "26-35", "35+"], "Please choose a valid age range")
    .required("Age is required"),
  bio: Yup.string().max(300).optional(),
  languages: Yup.array()
    .of(Yup.string().oneOf(["en", "fr", "de", "tr"], "Please choose a valid language"))
    .optional(),
  avatar: Yup.string().trim().optional(),
  totalPoint: Yup.number().min(0, "Total point cannot be negative").optional(),

  interests: Yup.array().max(3, "Select up to 3 interests only"),
  interestIds: Yup.array().of(
    Yup.string().matches(/^[0-9a-fA-F]{24}$/, "InterestIds must be a valid ObjectId")
  ),
  organizationLogo: Yup.string().trim().required("Logo is required"),
  organizationDesc: Yup.string().max(1000).trim().required("Description is required"),

  organizationUrl: Yup.string().url("Invalid URL format.").optional(),
  addressId: Yup.string()
    .transform((value) => (value === "" ? null : value)) // transform empty string to null
    .nullable() // Allow null values
    .notRequired() // Allow undefined or missing values
    .matches(/^[0-9a-fA-F]{24}$/, "AddressId must be a valid ObjectId")
    .optional(),
  //! We haven't used addressId and interestIds in frontend yet. Added for future use.
  //* Parameters that are not in the backend structure: interests, street Name, street Number, zip Code, city, country
  streetName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z]+$/, "Must contain just letters")
    .required("Street name is required")
    .min(3, "Street name must contain min 3 character"),
  streetNumber: Yup.string()
    .required("Street nr is required")
    .trim()
    .matches(/^[0-9]+$/, "Must contain just digits")
    .min(1, "Min 1 character")
    .max(8, "Max 8 character"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .trim()
    .matches(/^[0-9]+$/, "Must contain just numbers")
    .min(1, "Min 1 character")
    .max(8, "Max 8 character"),
  city: Yup.string()
    .trim()
    .required("City is required")
    .matches(/^[a-zA-Z]+$/, "Must contain just letters")
    .min(3, "City must contain min 3 character"),
  country: Yup.string()
    .trim()
    .required("Country is required")
    .matches(/^[a-zA-Z]+$/, "Must contain just letters")
    .min(3, "Country must contain min 3 character"),
})
