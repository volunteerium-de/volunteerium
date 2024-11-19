import { string, date, boolean, object, array } from "yup"

export const AddEventSchema = (t) => {
  return object().shape({
    title: string()
      .trim()
      .required(t("newEventValidation.nameRequired"))
      .min(10, t("newEventValidation.nameMin")),

    date: date()
      .required(t("newEventValidation.dateRequired"))
      .min(new Date(), t("newEventValidation.dateInPast")),

    fromTime: string().required(t("newEventValidation.fromTimeRequired")),

    toTime: string()
      .required(t("newEventValidation.toTimeRequired"))
      .test("is-greater", t("newEventValidation.toTimeLater"), function (value) {
        const { fromTime } = this.parent
        return fromTime && value > fromTime
      }),

    isOnline: boolean().required(),

    streetName: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .required(t("newEventValidation.streetNameRequired"))
          .matches(/^[\p{L}0-9\s.'-]+$/u, t("newEventValidation.streetNameInvalid")),
    }),

    streetNumber: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .trim()
          .matches(/^[0-9]+$/, t("newEventValidation.streetNumberInvalid"))
          .required(t("newEventValidation.streetNumberRequired")),
    }),

    zipCode: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .trim()
          .matches(/^[0-9]+$/, t("newEventValidation.zipCodeInvalid"))
          .min(1, t("newEventValidation.zipCodeMin"))
          .max(8, t("newEventValidation.zipCodeMax"))
          .required(t("newEventValidation.zipCodeRequired")),
    }),

    city: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .required(t("newEventValidation.cityRequired"))
          .matches(/^[\p{L}]+$/u, t("newEventValidation.cityInvalid"))
          .min(3, t("newEventValidation.cityMin")),
    }),

    country: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .trim()
          .required(t("newEventValidation.countryRequired"))
          .matches(/^[\p{L}]+$/u, t("newEventValidation.countryInvalid"))
          .min(3, t("newEventValidation.countryMin")),
    }),

    interestIds: array()
      .required(t("newEventValidation.categoryRequired"))
      .min(1, t("newEventValidation.categoryMin"))
      .max(3, t("newEventValidation.categoryMax")),

    maxParticipant: string().required(t("newEventValidation.maxParticipantsRequired")),

    languages: array(),

    description: string().required(t("newEventValidation.descriptionRequired")),

    isContactPersonAdded: boolean().required(),

    contactName: string().when("isContactPersonAdded", {
      is: true,
      then: () =>
        string()
          .min(3, t("newEventValidation.contactNameMin"))
          .required(t("newEventValidation.contactNameRequired")),
    }),

    contactEmail: string().when("isContactPersonAdded", {
      is: true,
      then: () =>
        string()
          .email(t("newEventValidation.contactEmailInvalid"))
          .required(t("newEventValidation.contactEmailRequired")),
    }),

    contactPhone: string().when("isContactPersonAdded", {
      is: true,
      then: () =>
        string()
          .min(10, t("newEventValidation.contactPhoneMin"))
          .required(t("newEventValidation.contactPhoneRequired")),
    }),
  })
}

export const AddEventStep1Schema = (t) => {
  return object().shape({
    title: string()
      .trim()
      .required(t("newEventValidation.nameRequired"))
      .min(10, t("newEventValidation.nameMin")),

    date: date()
      .required(t("newEventValidation.dateRequired"))
      .min(new Date(), t("newEventValidation.dateInPast")),

    fromTime: string().required(t("newEventValidation.fromTimeRequired")),

    toTime: string()
      .required(t("newEventValidation.toTimeRequired"))
      .test("is-greater", t("newEventValidation.toTimeLater"), function (value) {
        const { fromTime } = this.parent
        return fromTime && value > fromTime
      }),
    isOnline: boolean().required(),

    streetName: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .required(t("newEventValidation.streetNameRequired"))
          .matches(/^[\p{L}0-9\s.'-]+$/u, t("newEventValidation.streetNameInvalid")),
    }),

    streetNumber: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .trim()
          .matches(/^[0-9]+$/, t("newEventValidation.streetNumberInvalid"))
          .required(t("newEventValidation.streetNumberRequired")),
    }),

    zipCode: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .trim()
          .matches(/^[0-9]+$/, t("newEventValidation.zipCodeInvalid"))
          .min(1, t("newEventValidation.zipCodeMin"))
          .max(8, t("newEventValidation.zipCodeMax"))
          .required(t("newEventValidation.zipCodeRequired")),
    }),

    city: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .required(t("newEventValidation.cityRequired"))
          .matches(/^[\p{L}]+$/u, t("newEventValidation.cityInvalid"))
          .min(3, t("newEventValidation.cityMin")),
    }),

    country: string().when("isOnline", {
      is: false,
      then: () =>
        string()
          .trim()
          .required(t("newEventValidation.countryRequired"))
          .matches(/^[\p{L}]+$/u, t("newEventValidation.countryInvalid"))
          .min(3, t("newEventValidation.countryMin")),
    }),
  })
}
