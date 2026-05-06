import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AppButton } from "./AppButton";
import * as Haptics from "expo-haptics";

describe("AppButton", () => {
  it("renders correctly with title", () => {
    const { getByText } = render(<AppButton title="Click Me" />);
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("handles onPress and triggers haptics", () => {
    const onPress = jest.fn();
    const { getByText } = render(<AppButton title="Click Me" onPress={onPress} />);

    fireEvent.press(getByText("Click Me"));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).toHaveBeenCalled();
  });

  it("is disabled when loading", () => {
    const onPress = jest.fn();
    const { getByTestId, queryByText } = render(
      <AppButton title="Loading" loading={true} onPress={onPress} testID="submit-btn" />
    );

    // Title is hidden during loading state (replaced by ActivityIndicator)
    expect(queryByText("Loading")).toBeNull();

    fireEvent.press(getByTestId("submit-btn"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
