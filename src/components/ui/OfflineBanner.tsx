import React from "react";
import { useIsOnline } from "@/hooks/useIsOnline";
import { AppText } from "./AppText";
import { MotiView, AnimatePresence } from "moti";
import { WifiOff } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * A non-intrusive banner that appears only when the user is offline.
 * Handles the "no-internet" edge case across the entire app.
 */
export function OfflineBanner() {
  const isOnline = useIsOnline();
  const insets = useSafeAreaInsets();

  return (
    <AnimatePresence>
      {isOnline === false && (
        <MotiView
          from={{ translateY: -100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="absolute top-0 left-0 right-0 z-[1000] bg-danger rounded-b-xl shadow-lg"
          style={{ paddingTop: Math.max(insets.top, 20), paddingBottom: 12, paddingHorizontal: 20 }}
        >
          <MotiView
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ loop: true, duration: 2000 }}
            className="flex-row items-center justify-center"
          >
            <WifiOff size={16} color="white" strokeWidth={2.5} />
            <AppText className="text-white font-bold ml-2 text-sm">No Internet Connection</AppText>
          </MotiView>
        </MotiView>
      )}
    </AnimatePresence>
  );
}
