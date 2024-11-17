import { HiArrowSmRight } from "react-icons/hi"
import { translations } from "../../locales/translations"
import { useTranslation } from "react-i18next"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const Subscribe = () => {
  const { t } = useTranslation()

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t(translations.yup.invalid.email))
      .required(t(translations.yup.required.email)),
  })

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 bg-light-green dark:bg-dark-gray-3 rounded-md shadow-md max-w-[60%] mx-auto">
      <h3 className="text-xl font-bold mb-2 text-dark-gray-3 dark:text-white">
        {t(translations.subscribe.h3)}
      </h3>
      <p className="text-dark-gray-1 mb-4 text-center dark:text-gray-1">
        {t(translations.subscribe.p)}
      </p>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Submitted:", values)
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="relative w-full">
            <Field
              type="email"
              name="email"
              placeholder={t(translations.subscribe.emailPH)}
              className="p-3 pr-12 border border-gray-1 rounded-lg w-full focus:outline-none"
            />
            <ErrorMessage name="email" component="div" className="text-danger text-sm mt-1" />

            <button
              type="submit"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-primary-green text-white rounded-full"
            >
              <HiArrowSmRight size={20} />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Subscribe
