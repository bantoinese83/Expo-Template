declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
declare module "*.sql";
declare module "*.json";

// FALLBACK DECLARATIONS for libraries that may be missing types in some environments
declare module "react-native-google-places-autocomplete";
declare module "react-native-maps";
declare module "react-native-star-rating-widget";
declare module "react-native-youtube-iframe";
declare module "expo-location";
declare module "expo-camera";
declare module "@react-native-community/datetimepicker";
declare module "react-native-toast-message";

// Asset wildcards
declare module "*/assets/*";
declare module "*/hooks/*";
declare module "*/components/*";
