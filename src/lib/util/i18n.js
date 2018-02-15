// FROM: https://react.i18next.com/components/i18next-instance.html

import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';


i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      crossdomain: false,
      allowMultiloading: false
    },

    // react i18next special options (optional)
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });


export default i18n;
