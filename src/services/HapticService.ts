import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

/**
 * Commercial-grade haptics orchestrator.
 * Centralizes feedback patterns to ensure consistency across the app.
 */
export const hapticService = {
  /** Light tap for button presses and interactions */
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),

  /** Medium tap for toggles and impactful shifts */
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),

  /** Heavy tap for destructive actions */
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),

  /** Soft tap for scroll snapping or minor feedback */
  soft: () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  /** Success feedback for completions or payments */
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),

  /** Error feedback for failures or validation issues */
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),

  /** Warning feedback */
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),

  /** Selection feedback for pickers and tab bars */
  selection: () => Haptics.selectionAsync(),
};
