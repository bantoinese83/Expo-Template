import React, { useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { AppText } from "./AppText";
import { useTheme } from "@/hooks/useTheme";

/**
 * Standardized Bottom Sheet primitive for the Expo Template.
 * Optimized for performance and consistent "Glassmorphism" aesthetics.
 */
interface BaseBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[] | number[];
  title?: string;
  onClose?: () => void;
  index?: number;
}

export interface BaseBottomSheetRef {
  expand: () => void;
  collapse: () => void;
  close: () => void;
}

export const BaseBottomSheet = forwardRef<BaseBottomSheetRef, BaseBottomSheetProps>(
  ({ children, snapPoints = ["25%", "50%", "90%"], title, onClose, index = -1 }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { isDark } = useTheme();

    // Expose methods to parent components via ref
    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      collapse: () => bottomSheetRef.current?.collapse(),
      close: () => bottomSheetRef.current?.close(),
    }));

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
      ),
      []
    );

    const handleSheetChanges = useCallback(
      (newIndex: number) => {
        if (newIndex === -1 && onClose) {
          onClose();
        }
      },
      [onClose]
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{
          backgroundColor: isDark ? "#475569" : "#cbd5e1",
          width: 44,
          height: 5,
        }}
        backgroundStyle={{
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
      >
        <BottomSheetView style={styles.contentContainer} accessibilityRole="none">
          {title && (
            <View
              className="py-4 border-b border-slate-50 dark:border-slate-800/50"
              style={styles.header}
              accessibilityRole="header"
            >
              <AppText variant="h3" className="text-center text-[18px] tracking-tight">
                {title}
              </AppText>
            </View>
          )}
          <View className="flex-1 px-6 pt-4" accessibilityRole="none">
            {children}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  header: {
    paddingVertical: 14,
  },
});
