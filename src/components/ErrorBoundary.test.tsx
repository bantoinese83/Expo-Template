import React from "react";
import { Text, View } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { ErrorBoundary } from "./ErrorBoundary";

jest.mock("../services/ErrorTracking", () => ({
  errorTracking: {
    captureException: jest.fn(),
    addBreadcrumb: jest.fn(),
  },
}));

jest.mock("../utils/logger", () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock("../store/useLogStore", () => ({
  useLogStore: {
    getState: () => ({
      addLog: jest.fn(),
    }),
  },
}));

jest.mock("expo-updates", () => ({
  reloadAsync: jest.fn().mockRejectedValue(new Error("Not in managed workflow")),
}));

jest.mock("expo-linear-gradient", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View: RNView } = require("react-native");
  return {
    LinearGradient: (props: any) => <RNView {...props} />,
  };
});

jest.mock("lucide-react-native", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View: RNView } = require("react-native");
  return {
    AlertCircle: (props: any) => <RNView testID="alert-circle" {...props} />,
    RefreshCw: (props: any) => <RNView testID="refresh-cw" {...props} />,
    ChevronRight: (props: any) => <RNView testID="chevron-right" {...props} />,
  };
});

function BrokenChild(): React.JSX.Element {
  throw new Error("Test crash");
}

describe("ErrorBoundary", () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });

  it("renders children when no error occurs", () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <View testID="child-view">
          <Text>Hello</Text>
        </View>
      </ErrorBoundary>
    );
    expect(getByTestId("child-view")).toBeTruthy();
  });

  it("renders error UI when child throws", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(getByText("Application Error")).toBeTruthy();
    expect(getByText("Restart Application")).toBeTruthy();
    expect(getByText("Send Error Report")).toBeTruthy();
  });

  it("toggles technical details", () => {
    const { getByText, queryByText } = render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );

    expect(queryByText("Error: Test crash")).toBeNull();

    fireEvent.press(getByText("Technical details"));

    expect(getByText("Error: Test crash")).toBeTruthy();
  });

  it("reports error to tracking service", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { errorTracking } = require("../services/ErrorTracking");
    errorTracking.captureException.mockClear();
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    );
    expect(errorTracking.captureException).toHaveBeenCalled();
  });
});
