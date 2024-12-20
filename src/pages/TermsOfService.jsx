import React, { useEffect } from 'react';
import Header from "../components/Header/Header";
import { useTranslation } from 'react-i18next';
import { translations } from '../locales/translations';

const TermsOfService = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="font-poppins bg-white dark:bg-black text-gray-2 dark:text-light-gray min-h-screen">
      <Header />
      <div className="mt-4 border-8 border-primary-green/40 max-w-[80%] mx-auto p-8 relative overflow-hidden">
        <div className="relative p-4 bg-white bg-opacity-10 dark:bg-black">
          <h1 className="text-[1.25rem] md:text-[1.5rem] font-bold mb-4 text-black dark:text-white text-justify">
            {t(translations.termsOfService.header)}
          </h1>
          <p className="text-[1rem] md:text-[1.125rem] text-dark-gray-3 dark:text-light-gray mt-2 text-justify">
            <strong>{t(translations.termsOfService.publishedDate)}</strong> {t(translations.termsOfService.date)}
          </p>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-4 text-justify">
            {t(translations.termsOfService.description)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Acceptance)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pAcceptance)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Responsibility)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pResponsibility)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2EmailRestriction)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pEmailRestriction)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Prohibited)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pProhibited)}
          </p>
          <ul className="list-disc pl-5 mt-2 text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray text-justify">
            <li>{t(translations.termsOfService.li1)}</li>
            <li>{t(translations.termsOfService.li2)}</li>
            <li>{t(translations.termsOfService.li3)}</li>
            <li>{t(translations.termsOfService.li4)}</li>
          </ul>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Intellectual)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pIntellectual)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2userGenerated)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pUserGenerated)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Limitation)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pLimitation)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Changes)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pChanges)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Governing)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pGoverning)}
          </p>

          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">
            {t(translations.termsOfService.h2Contact)}
          </h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.termsOfService.pContact)}
            <br />
            [{t(translations.termsOfService.email)}]
            <br /> <br />
            <strong>{t(translations.termsOfService.vTeam)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
