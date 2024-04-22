import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import en from './en.json';
import fr from './fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const expoLocale = getLocales();

i18n.createInstance()
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    load: 'languageOnly',
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    // debug: true,
    lng: expoLocale[0].languageCode === 'fr' ? 'fr' : 'en', // default language to use.
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;