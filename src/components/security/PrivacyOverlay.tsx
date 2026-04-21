import React, { useEffect, useState } from "react";
import { AppState, AppStateStatus, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { SplashView } from "../SplashView";

interface PrivacyOverlayProps {
  /**
   * Enabled privacy overlay when the app is in background/inactive.
   * Standard for banking and high-security apps.
   */
  enabled?: boolean;
}

/**
 * A security component that hides app content when it goes into the background
 * (App Switcher / Multitasker). This prevents sensitive data from being visible
 * in system snapshots.
 */
export function PrivacyOverlay({ enabled = true }: PrivacyOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false);
      return;
    }

    const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
      // On iOS, "inactive" is used for the app switcher.
      // On Android, "background" is used.
      const shouldHide = nextAppState === "inactive" || nextAppState === "background";
      setIsVisible(shouldHide);
    });

    return () => {
      subscription.remove();
    };
  }, [enabled]);

  if (!isVisible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={StyleSheet.absoluteFill}
      className="z-[9999]"
    >
      <SplashView />
    </Animated.View>
  );
}
