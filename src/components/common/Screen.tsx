import { View, ViewProps } from "react-native";
import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

interface Props extends ViewProps {
  children?: React.ReactNode;
  className?: string;
  withKeyboard?: boolean;
}

export default function Screen({ className = "", withKeyboard = true, children, ...props }: Props) {
  const insets = useSafeAreaInsets();

  const content = (
    <SafeAreaView
      className={`flex-1 bg-white dark:bg-slate-950 ${className}`}
      style={{ paddingTop: insets.top }}
      {...props}
    >
      {children}
    </SafeAreaView>
  );

  if (withKeyboard) {
    return (
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}
