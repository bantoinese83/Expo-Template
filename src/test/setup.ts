import "@testing-library/jest-native/extend-expect";

jest.mock("@react-native-community/netinfo", () => {
  const unsub = jest.fn();
  return {
    __esModule: true,
    default: {
      addEventListener: jest.fn(() => unsub),
      fetch: jest.fn(() =>
        Promise.resolve({
          isConnected: true,
          isInternetReachable: true,
        })
      ),
    },
  };
});

// Mocking Expo constants and modules
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        clerkPublishableKey: "test-key",
      },
    },
  },
}));

jest.mock("expo-linking", () => ({
  createURL: () => "https://test-link.com",
}));

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
}));

// Add more mocks as needed for global services like SQLite
jest.mock("expo-sqlite", () => ({
  openDatabaseSync: jest.fn(() => ({
    transaction: jest.fn(),
    execAsync: jest.fn(),
  })),
}));

// Mock Moti/Reanimated if needed
jest.mock("react-native-reanimated", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Avoid "NativeEventEmitter" warnings
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
