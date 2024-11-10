import { useTranslation } from "react-i18next"
import * as Yup from "yup"
import { translations } from "../locales/translations"

export const UserDetailSchema = () => {
  const {t} = useTranslation()

  return Yup.object().shape({
  isFullNameDisplay: Yup.boolean().optional(),

  gender: Yup.string()
    .oneOf(["male", "female", "n/a"], t(translations.yup.oneOf.gender))
    .required("Gender is required"),
  ageRange: Yup.string()
    .oneOf(["16-25", "26-35", "35+"], t(translations.yup.oneOf.ageRange))
    .required("Age is required"),
  bio: Yup.string().max(300).optional(),
  languages: Yup.array()
    .of(Yup.string().oneOf(["en", "fr", "de", "tr"], t(translations.yup.oneOf.language)))
    .optional(),
  avatar: Yup.string().trim().optional(),
  totalPoint: Yup.number().min(0, t(translations.yup.minLength.totalPoint)).optional(),

  interests: Yup.array().max(3, t(translations.yup.maxLength.select3)),
  interestIds: Yup.array().of(
    Yup.string().matches(/^[0-9a-fA-F]{24}$/, t(translations.yup.required.interestId))
  ),
  organizationLogo: Yup.string().trim().required(t(translations.yup.required.logo)),
  organizationDesc: Yup.string().max(1000).trim().required(t(translations.yup.required.description)),

  organizationUrl: Yup.string().url(t(translations.yup.invalid.url)).optional(),
  addressId: Yup.string()
    .transform((value) => (value === "" ? null : value)) // transform empty string to null
    .nullable() // Allow null values
    .notRequired() // Allow undefined or missing values
    .matches(/^[0-9a-fA-F]{24}$/, t(translations.yup.oneOf.addressId))
    .optional(),
  //! We haven't used addressId and interestIds in frontend yet. Added for future use.
  //* Parameters that are not in the backend structure: interests, street Name, street Number, zip Code, city, country
  streetName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z]+$/, t(translations.yup.required.onlyLetters))
    .required(t(translations.yup.required.streetName))
    .min(3, t(translations.yup.minLength.characters3)),
  streetNumber: Yup.string()
    .required(t(translations.yup.required.streetNumber))
    .trim()
    .matches(/^[0-9]+$/, t(translations.yup.required.onlyNumbers))
    .min(1, t(translations.yup.minLength.characters1))
    .max(8, t(translations.yup.maxLength.characters8)),
  zipCode: Yup.string()
    .required(t(translations.yup.required.zipCode))
    .trim()
    .matches(/^[0-9]+$/, t(translations.yup.required.onlyNumbers))
    .min(1, t(translations.yup.minLength.characters1))
    .max(8, t(translations.yup.maxLength.characters8)),
  city: Yup.string()
    .trim()
    .required(t(translations.yup.required.city))
    .matches(/^[a-zA-Z]+$/, t(translations.yup.required.onlyLetters))
    .min(3, t(translations.yup.minLength.characters3)),
  country: Yup.string()
    .trim()
    .required(t(translations.yup.required.country))
    .matches(/^[a-zA-Z]+$/, t(translations.yup.required.onlyLetters))
    .min(3, t(translations.yup.minLength.characters3)),
})
} 