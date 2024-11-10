import { string, date, boolean, object, array } from "yup"
import { useTranslation } from "react-i18next";
import { translations } from "../locales/translations";

export const AddEventSchema = () =>{
  const {t} = useTranslation()

 return object().shape({
  title: string()
    .trim()
    .required(t(translations.yup.required.eventName))
    .min(10, t(translations.yup.minLength.characters10)),

  date: date().required(t(translations.yup.required.date)).min(new Date(), t(translations.yup.required.newDate)),

  fromTime: string().required(t(translations.yup.required.startTime)),

  toTime: string()
    .required(t(translations.yup.required.endTime))
    .test("is-greater", t(translations.yup.required.endShouldLater), function (value) {
      const { fromTime } = this.parent
      return fromTime && value > fromTime
    }),
  isOnline: boolean().required(),

  streetName: string().when("isOnline", {
    is: false,
    then: () => string().required(t(translations.yup.required.streetNameOnline)),
  }),

  zipCode: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .matches(/^[0-9]+$/, t(translations.yup.required.onlyNumbers))
        .min(3, t(translations.yup.minLength.characters3))
        .max(8, t(translations.yup.maxLength.characters8))
        .required(t(translations.yup.required.zipCode)),
  }),

  city: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .required(t(translations.yup.required.city))
        .matches(/^[a-zA-Z]+$/, t(translations.yup.required.onlyLetters))
        .min(3, t(translations.yup.minLength.characters3)),
  }),

  country: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .required(t(translations.yup.required.country))
        .matches(/^[a-zA-Z]+$/, t(translations.yup.required.onlyLetters))
        .min(3, t(translations.yup.minLength.characters3)),
  }),

  interestIds: array()
    .required(t(translations.yup.required.category))
    .min(1, t(translations.yup.minLength.select1))
    .max(3, t(translations.yup.maxLength.select3)),

  maxParticipant: string().required(t(translations.yup.required.participants)),

  languages: array(),

  description: string().required(t(translations.yup.required.description)),

  isContactPersonAdded: boolean().required(),

  contactName: string().when("isContactPersonAdded", {
    is: true,
    then: () => string().min(3, t(translations.yup.minLength.characters3)).required(),
  }),

  contactEmail: string().when("isContactPersonAdded", {
    is: true,
    then: () => string().email(t(translations.yup.invalid.email)).required(),
  }),

  contactPhone: string().when("isContactPersonAdded", {
    is: true,
    then: () => string().min(10, t(translations.yup.minLength.phoneNumber)).required(),
  }),
})
}

export const AddEventStep1Schema = () =>{
  const {t} = useTranslation()

  return object().shape({
  title: string()
    .trim()
    .required(t(translations.yup.required.eventName))
    .min(10, t(translations.yup.minLength)),

  date: date().required(t(translations.yup.required.date)).min(new Date(), t(translations.yup.required.newDate)),

  fromTime: string().required(t(translations.yup.required.startTime)),

  toTime: string()
    .required(t(translations.yup.required.endTime))
    .test("is-greater", t(translations.yup.required.endShouldLater), function (value) {
      const { fromTime } = this.parent
      return fromTime && value > fromTime
    }),
  isOnline: boolean().required(),

  streetName: string().when("isOnline", {
    is: false,
    then: () => string().required(t(translations.yup.required.streetName)),
  }),

  zipCode: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .matches(/^[0-9]+$/, t(translations.yup.required.onlyLetters))
        .min(3, t(translations.yup.minLength.characters3))
        .max(8, t(translations.yup.maxLength.characters8))
        .required(t(translations.yup.required.zipCode)),
  }),

  city: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .required("City is required")
        .matches(/^[a-zA-Z]+$/, t(translations.yup.required.onlyLetters))
        .min(3, t(translations.yup.minLength.characters3)),
  }),

  country: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .required(t(translations.yup.required.country))
        .matches(/^[a-zA-Z]+$/, t(translations.yup.required.onlyLetters))
        .min(3, t(translations.yup.minLength.characters3)),
  }),
})
}