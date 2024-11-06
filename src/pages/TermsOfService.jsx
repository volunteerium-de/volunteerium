import React from 'react';
import Header from "../components/Header/Header";
import { useTranslation } from 'react-i18next';
import { translations } from '../locales/translations';

const TermsOfService = () => {
  const { t } = useTranslation();
  return (
    <div className="font-poppins bg-white dark:bg-black text-gray-2 dark:text-light-gray min-h-screen">
      <Header />
      <div className="mt-4 border-8 border-primary-green/40 max-w-[80%] mx-auto p-8 relative overflow-hidden">
        <div className="relative p-4 bg-white bg-opacity-10 dark:bg-black">
          <h1 className="text-[1.25rem] md:text-[1.5rem] font-bold mb-4 text-black dark:text-white text-justify">
            {t(translations.termsOfService.h1)}
          </h1>
          <p className="text-[1rem] md:text-[1.125rem] text-dark-gray-3 dark:text-light-gray mt-2 text-justify">
            <strong>{t(translations.termsOfService.p1)}</strong> {t(translations.termsOfService.p2)}
          </p>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-4 text-justify">
            {t(translations.termsOfService.p3)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2info)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p4)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2user)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p5)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2prohibited)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p6)}
          </p>
          <ul className="list-disc pl-5 mt-2 text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray text-justify">
            <li>{t(translations.termsOfService.li1)}</li>
            <li>{t(translations.termsOfService.li2)}</li>
            <li>{t(translations.termsOfService.li3)}</li>
            <li>{t(translations.termsOfService.li4)}</li>
          </ul>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2intellectual)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p7)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2userGenerated)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p8)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2limitation)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p9)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2changes)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p10)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2governing)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p11)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2contact)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.p12)}
            <br />
            <strong>{t(translations.termsOfService.p13)}</strong>
            <br />
            [{t(translations.termsOfService.p14)}]
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
