import React, { useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { AppText } from "./AppText";

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
        handleIndicatorStyle={styles.handleIndicator}
        backgroundStyle={styles.background}
      >
        <BottomSheetView style={styles.contentContainer}>
          {title && (
            <View style={styles.header}>
              <AppText variant="h3" className="text-center">
                {title}
              </AppText>
            </View>
          )}
          <View className="flex-1 px-4 pt-2">{children}</View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  handleIndicator: {
    backgroundColor: "#cbd5e1",
    width: 40,
  },
  background: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f1f5f9",
  },
});
