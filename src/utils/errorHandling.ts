import { Alert } from "react-native";
import { errorTracking } from "../services/ErrorTracking";
import { logger } from "./logger";

/**
 * A standardized utility to wrap async actions with consistent error handling.
 * Automatically logs, tracks, and alerts the user.
 */
export async function withErrorHandling<T>(
  action: () => Promise<T>,
  options: {
    errorMessage?: string;
    showDialog?: boolean;
    context?: Record<string, any>;
  } = {}
): Promise<T | null> {
  const {
    errorMessage = "An unexpected error occurred",
    showDialog = true,
    context = {},
  } = options;

  try {
    return await action();
  } catch (error) {
    logger.error(errorMessage, error, context);
    errorTracking.captureException(error, context);

    if (showDialog) {
      Alert.alert("Error", errorMessage, [{ text: "Keep Building" }]);
    }

    return null;
  }
}
