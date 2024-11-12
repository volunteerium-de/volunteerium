import { string, date, boolean, object, array } from "yup"

export const AddEventSchema = object().shape({
  title: string()
    .trim()
    .required("Event name is required")
    .min(10, "Event name must contain at least 10 characters"),

  date: date().required("Date is required").min(new Date(), "Date cannot be in the past"),

  fromTime: string().required("Start time is required"),

  toTime: string()
    .required("End time is required")
    .test("is-greater", "End time should be later than start time", function (value) {
      const { fromTime } = this.parent
      return fromTime && value > fromTime
    }),
  isOnline: boolean().required(),

  streetName: string().when("isOnline", {
    is: false,
    then: () => string().required("Street Name is required when online"),
  }),

  zipCode: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .matches(/^[0-9]+$/, "Must contain only numbers")
        .min(1, "Zip Code must contain at least 1 character")
        .max(8, "Zip Code cannot exceed 8 characters")
        .required("Zip code is required"),
  }),

  city: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .required("City is required")
        .matches(/^[a-zA-Z]+$/, "City must contain just letters")
        .min(3, "City must contain at least 3 characters"),
  }),

  country: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .required("Country is required")
        .matches(/^[a-zA-Z]+$/, "Country must contain just letters")
        .min(3, "Country must contain at least 3 characters"),
  }),

  interestIds: array()
    .required("Category is required")
    .min(1, "At least one category must be selected.")
    .max(3, "You can select up to 3 categories."),

  maxParticipant: string().required("Max Participants is required"),

  languages: array(),

  description: string().required("Description is required"),

  isContactPersonAdded: boolean().required(),

  contactName: string().when("isContactPersonAdded", {
    is: true,
    then: () => string().min(3, "Contact Name must be at least 5 characters").required(),
  }),

  contactEmail: string().when("isContactPersonAdded", {
    is: true,
    then: () => string().email("Invalid email format").required(),
  }),

  contactPhone: string().when("isContactPersonAdded", {
    is: true,
    then: () => string().min(10, "Phone number must be at least 10 digits").required(),
  }),
})

export const AddEventStep1Schema = object().shape({
  title: string()
    .trim()
    .required("Event name is required")
    .min(10, "Event name must contain at least 10 characters"),

  date: date().required("Date is required").min(new Date(), "Date cannot be in the past"),

  fromTime: string().required("Start time is required"),

  toTime: string()
    .required("End time is required")
    .test("is-greater", "End time should be later than start time", function (value) {
      const { fromTime } = this.parent
      return fromTime && value > fromTime
    }),
  isOnline: boolean().required(),

  streetName: string().when("isOnline", {
    is: false,
    then: () => string().required("Street Name is required when online"),
  }),

  zipCode: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .matches(/^[0-9]+$/, "Must contain only numbers")
        .min(1, "Zip Code must contain at least 1 character")
        .max(8, "Zip Code cannot exceed 8 characters")
        .required("Zip code is required"),
  }),

  city: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .required("City is required")
        .matches(/^[a-zA-Z]+$/, "City must contain just letters")
        .min(3, "City must contain at least 3 characters"),
  }),

  country: string().when("isOnline", {
    is: false,
    then: () =>
      string()
        .trim()
        .required("Country is required")
        .matches(/^[a-zA-Z]+$/, "Country must contain just letters")
        .min(3, "Country must contain at least 3 characters"),
  }),
})