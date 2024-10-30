import React from 'react';
import Header from "../components/Header/Header";
import { useTranslation } from 'react-i18next';
import { translations } from '../locales/translations';
const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="font-poppins bg-white dark:bg-black text-gray-2 dark:text-light-gray min-h-screen">
      <Header />
      <div className="mt-4 border-8 border-primary-green/40 max-w-[48rem] mx-auto p-8 relative overflow-hidden">
        <div className="relative p-4 bg-white bg-opacity-10 dark:bg-black">
          <h1 className="text-[1.25rem] md:text-[1.5rem] font-bold mb-4 text-black dark:text-white text-justify">{t(translations.privacyPolicy.h1)}</h1>
          <p className="text-[1rem] md:text-[1.125rem] text-dark-gray-3 dark:text-light-gray mt-2 text-justify">
            <strong>{t(translations.privacyPolicy.p1)}</strong> [30.10.2024]
          </p>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-4 text-justify">
            {t(translations.privacyPolicy.p3)}
          </p>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2info)}</h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.privacyPolicy.p4)}
            <br />
            <strong>{t(translations.privacyPolicy.p5)}</strong> {t(translations.privacyPolicy.p6)}
            <br />
            <strong>{t(translations.privacyPolicy.p7)}</strong> {t(translations.privacyPolicy.p8)}
            <br />
            <strong>{t(translations.privacyPolicy.p9)}</strong> {t(translations.privacyPolicy.p10)}
          </p>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2use)}</h2>
          <ul className="list-disc pl-5 mt-2 text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray text-justify">
            <li>{t(translations.privacyPolicy.li1)}</li>
            <li>{t(translations.privacyPolicy.li2)}</li>
            <li>{t(translations.privacyPolicy.li3)}</li>
            <li>{t(translations.privacyPolicy.li4)}</li>
            <li>{t(translations.privacyPolicy.li5)}</li>
          </ul>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2share)}</h2>
          <ul className="list-disc pl-5 mt-2 text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray text-justify">
            <li><strong>{t(translations.privacyPolicy.li6)}</strong> {t(translations.privacyPolicy.li7)}</li>
            <li><strong>{t(translations.privacyPolicy.li8)}</strong> {t(translations.privacyPolicy.li9)}</li>
            <li><strong>{t(translations.privacyPolicy.li10)}</strong> {t(translations.privacyPolicy.li11)}</li>
          </ul>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2retention)}</h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.privacyPolicy.p11)}
          </p>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2security)}</h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.privacyPolicy.p12)}
          </p>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2rights)}</h2>
          <ul className="list-disc pl-5 mt-2 text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray text-justify">
            <li><strong>{t(translations.privacyPolicy.li12)}</strong> {t(translations.privacyPolicy.li13)}</li>
            <li><strong>{t(translations.privacyPolicy.li14)}</strong> {t(translations.privacyPolicy.li15)}</li>
            <li><strong>{t(translations.privacyPolicy.li16)}</strong> {t(translations.privacyPolicy.li17)}</li>
          </ul>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2changes)}</h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.privacyPolicy.p13)}
          </p>
          <h2 className="text-[1.125rem] md:text-[1.25rem] font-bold mt-6 text-dark-gray-3 dark:text-light-gray text-justify">{t(translations.privacyPolicy.h2contact)}</h2>
          <p className="text-[0.875rem] md:text-[1rem] text-dark-gray-1 dark:text-light-gray mt-2 text-justify">
            {t(translations.privacyPolicy.p14)}
            <br />
            <strong>{t(translations.privacyPolicy.p15)}</strong>
            <br />
            Email: [{t(translations.privacyPolicy.p16)}]
          </p>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;