import { ViewProps, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  withKeyboard?: boolean;
}

export default function Screen({ className = "", withKeyboard = true, children, ...props }: Props) {
  const content = (
    <SafeAreaView className={`flex-1 bg-white dark:bg-slate-950 ${className}`} {...props}>
      {children}
    </SafeAreaView>
  );

  if (withKeyboard) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}
