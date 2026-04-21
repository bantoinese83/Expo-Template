import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";

import { MotiView } from "moti";
import { colors } from "@/theme/tokens";

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  withSafeArea?: boolean;
  padding?: boolean;
  title?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  animate?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  withSafeArea = true,
  padding = true,
  className = "",
  style,
  contentContainerStyle,
  animate = true,
}) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const Container = withSafeArea ? SafeAreaView : View;
  const Wrapper = scrollable ? ScrollView : (View as any);

  return (
    <Container
      className={`flex-1 ${className}`}
      style={[
        { backgroundColor: isDark ? colors.background.dark : colors.background.light },
        style,
      ]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <MotiView
          from={animate ? { opacity: 0, translateY: 10 } : {}}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
          style={{ flex: 1 }}
        >
          <Wrapper
            className={`flex-1 ${padding ? "px-md" : ""}`}
            contentContainerStyle={[
              scrollable ? { flexGrow: 1, paddingBottom: insets.bottom + 20 } : {},
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </Wrapper>
        </MotiView>
      </KeyboardAvoidingView>
    </Container>
  );
};
