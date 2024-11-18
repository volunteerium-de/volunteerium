import * as Yup from "yup"

export const UserDetailSchema = (t) => {
  return Yup.object().shape({
    isFullNameDisplay: Yup.boolean().optional(),

    gender: Yup.string()
      .oneOf(["male", "female", "n/a"], t("yup.oneOf.gender"))
      .required("Gender is required"),
    ageRange: Yup.string()
      .oneOf(["16-25", "26-35", "35+"], t("yup.oneOf.ageRange"))
      .required(t("yup.oneOf.ageRange")),
    bio: Yup.string().max(300).optional(),
    languages: Yup.array()
      .of(Yup.string().oneOf(["en", "fr", "de", "tr"], t("yup.oneOf.language")))
      .optional(),
    avatar: Yup.string().trim().optional(),
    totalPoint: Yup.number().min(0, t("yup.minLength.totalPoint")).optional(),

    interests: Yup.array().max(3, t("yup.maxLength.select3")),
    interestIds: Yup.array().of(
      Yup.string().matches(/^[0-9a-fA-F]{24}$/, t("yup.required.interestId"))
    ),
    organizationLogo: Yup.string().trim().required(t("yup.required.logo")),
    organizationDesc: Yup.string().max(1000).trim().required(t("yup.required.description")),

    organizationUrl: Yup.string().url(t("yup.invalid.url")).optional(),
    addressId: Yup.string()
      .transform((value) => (value === "" ? null : value)) // transform empty string to null
      .nullable() // Allow null values
      .notRequired() // Allow undefined or missing values
      .matches(/^[0-9a-fA-F]{24}$/, t("yup.required.addressId"))
      .optional(),
    //! We haven't used addressId and interestIds in frontend yet. Added for future use.
    //* Parameters that are not in the backend structure: interests, street Name, street Number, zip Code, city, country
    streetName: Yup.string()
      .trim()
      .matches(/^[a-zA-Z]+$/, "Must contain just letters")
      .required(t("yup.required.streetName"))
      .min(3, "Street name must contain min 3 character"),
    streetNumber: Yup.string()
      .required(t("yup.required.streetNumber"))
      .trim()
      .matches(/^[0-9]+$/, t("yup.required.onlyNumbers"))
      .min(1, "Min 1 character")
      .max(8, "Max 8 character"),
    zipCode: Yup.string()
      .required(t("yup.required.zipCode"))
      .trim()
      .matches(/^[0-9]+$/, t("yup.required.onlyNumbers"))
      .min(1, t("yup.minLength.characters1"))
      .max(8, t("yup.maxLength.characters8")),
    city: Yup.string()
      .trim()
      .required(t("yup.required.city"))
      .matches(/^[a-zA-Z]+$/, t("yup.required.onlyLetters"))
      .min(3, t("yup.minLength.characters3")),
    country: Yup.string()
      .trim()
      .required(t("yup.required.country"))
      .matches(/^[a-zA-Z]+$/, t("yup.required.onlyLetters"))
      .min(3, t("yup.minLength.characters3")),
  })
}
