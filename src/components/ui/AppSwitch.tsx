import React from "react";
import { Pressable, View } from "react-native";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import { AppText } from "./AppText";

interface AppSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const AppSwitch: React.FC<AppSwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
}) => {
  const toggle = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onValueChange(!value);
  };

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      className="flex-row items-center justify-between py-3 mb-2"
    >
      {label && (
        <AppText variant="body" className="flex-1 font-medium text-slate-800 dark:text-slate-200">
          {label}
        </AppText>
      )}

      <View
        className={`w-14 h-8 rounded-full p-1 ${
          value ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
        } ${disabled ? "opacity-50" : ""}`}
      >
        <MotiView
          animate={{
            translateX: value ? 22 : 0,
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 150,
          }}
          className="w-6 h-6 rounded-full bg-white shadow-sm"
        />
      </View>
    </Pressable>
  );
};
