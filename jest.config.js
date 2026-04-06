module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["./src/test/setup.ts"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|nativewind|react-native-reanimated|moti|lucide-react-native|@shopify/flash-list|expo-router|expo-constants|expo-linking|expo-haptics|expo-sqlite|@clerk/clerk-expo|fetch-blob|formdata-polyfill)",
  ],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}", "!src/test/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "^axios$": require.resolve("axios"),
  },
};
