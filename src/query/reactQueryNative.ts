import { AppState, type AppStateStatus, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager } from "@tanstack/react-query";

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === "active");
}

let initialized = false;

/**
 * Binds TanStack Query to connectivity and app foreground (native + web).
 * Call once at startup before rendering queries.
 */
export function ensureReactQueryNative(): void {
  if (initialized) return;
  initialized = true;

  onlineManager.setEventListener((setOnline) => {
    if (Platform.OS === "web") {
      const handle = () => setOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
      if (typeof window !== "undefined") {
        window.addEventListener("online", handle);
        window.addEventListener("offline", handle);
        handle();
        return () => {
          window.removeEventListener("online", handle);
          window.removeEventListener("offline", handle);
        };
      }
      setOnline(true);
      return () => {};
    }

    return NetInfo.addEventListener((state) => {
      setOnline(state.isInternetReachable ?? !!state.isConnected);
    });
  });

  if (Platform.OS !== "web") {
    void NetInfo.fetch().then((state) => {
      onlineManager.setOnline(state.isInternetReachable ?? !!state.isConnected);
    });
  }

  focusManager.setFocused(AppState.currentState === "active");
  AppState.addEventListener("change", onAppStateChange);
}
