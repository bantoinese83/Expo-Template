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
      orders: "Orders",
      customers: "Customers",
      add: "Add",
      notifications: "Notifications",
      noInternet: "No Internet Connection",
      signIn: "Sign In",
      signUp: "Sign Up",
      forgotPassword: "Forgot Password?",
      email: "Email Address",
      password: "Password",
      appearance: "Appearance",
      language: "Language",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      helpCenter: "Help Center",
      contactUs: "Contact Us",
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
      orders: "Pedidos",
      customers: "Clientes",
      add: "Agregar",
      notifications: "Notificaciones",
      noInternet: "Sin Conexión a Internet",
      signIn: "Iniciar Sesión",
      signUp: "Registrarse",
      forgotPassword: "¿Olvidaste tu Contraseña?",
      email: "Correo Electrónico",
      password: "Contraseña",
      appearance: "Apariencia",
      language: "Idioma",
      legal: "Legal",
      privacyPolicy: "Política de Privacidad",
      termsOfService: "Términos de Servicio",
      helpCenter: "Centro de Ayuda",
      contactUs: "Contáctanos",
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
