import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./assest/locals/ru.json"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ru: {
        translations: ru,
      }
    },
    lng: "ru",
    fallbackLng: "ru",
    ns: ['translations'],

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
