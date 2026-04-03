import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      home: "Home",
      profile: "Profile",
      settings: "Settings",
      logout: "Sign Out",
      save: "Save Changes",
      editProfile: "Edit Profile",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      home: "Inicio",
      profile: "Perfil",
      settings: "Ajustes",
      logout: "Cerrar Sesión",
      save: "Guardar Cambios",
      editProfile: "Editar Perfil",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
