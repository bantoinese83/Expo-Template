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

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  withSafeArea?: boolean;
  padding?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  withSafeArea = true,
  padding = true,
  style,
  contentContainerStyle,
}) => {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const Container = withSafeArea ? SafeAreaView : View;
  const Wrapper = scrollable ? ScrollView : View;

  const baseStyles: ViewStyle = {
    flex: 1,
    backgroundColor: isDark ? "#020617" : "#ffffff", // slate-950 or white
  };

  const wrapperStyles: ViewStyle = {
    flex: 1,
    paddingHorizontal: padding ? 20 : 0,
  };

  return (
    <Container style={[baseStyles, style]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Wrapper
          style={wrapperStyles}
          contentContainerStyle={[
            scrollable ? { flexGrow: 1, paddingBottom: insets.bottom + 20 } : {},
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </Wrapper>
      </KeyboardAvoidingView>
    </Container>
  );
};
