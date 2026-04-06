import React from "react";
import { View } from "react-native";

import { AppText } from "./ui/AppText";
import { AppButton } from "./ui/AppButton";

type Props = {
  message: string;
  onRetry: () => void;
};

export function MigrationErrorView({ message, onRetry }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-950 px-8">
      <AppText variant="h2" className="text-center mb-2 text-slate-900 dark:text-white">
        Storage could not be prepared
      </AppText>
      <AppText
        variant="body"
        className="text-center text-slate-500 dark:text-slate-400 mb-8 leading-5"
      >
        {message}
      </AppText>
      <AppButton title="Try again" onPress={onRetry} className="w-full max-w-sm" />
    </View>
  );
}
