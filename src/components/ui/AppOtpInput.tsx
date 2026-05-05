import React, { useRef, useState } from "react";
import { View, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { AppText } from "./AppText";

interface AppOtpInputProps {
  length?: number;
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  error?: string;
}

export const AppOtpInput: React.FC<AppOtpInputProps> = React.memo(
  ({ length = 6, value, onValueChange, label, error }) => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const inputs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
      const newValue = value.split("");
      newValue[index] = text;
      const finalValue = newValue.join("");
      onValueChange(finalValue);

      if (text && index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };

    return (
      <View className="mb-5">
        {label && (
          <AppText
            variant="caption"
            className="mb-3 ml-1 text-[13px] font-semibold tracking-tight text-slate-500 uppercase"
          >
            {label}
          </AppText>
        )}

        <View className="flex-row justify-between">
          {Array.from({ length }).map((_, index) => (
            <View
              key={index}
              className={`w-[50px] h-[64px] rounded-xl border-2 items-center justify-center bg-slate-50 dark:bg-slate-900/50 ${
                focusedIndex === index
                  ? "border-primary shadow-sm shadow-indigo-100"
                  : "border-slate-100 dark:border-slate-800"
              } ${error ? "border-danger" : ""}`}
            >
              <TextInput
                ref={(ref) => {
                  if (ref) inputs.current[index] = ref;
                }}
                className="text-[24px] font-bold text-slate-900 dark:text-white text-center w-full h-full"
                keyboardType="number-pad"
                maxLength={1}
                value={value[index] || ""}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                selectTextOnFocus
              />
            </View>
          ))}
        </View>

        {error && (
          <AppText variant="caption" className="mt-2 ml-1 text-danger font-medium">
            {error}
          </AppText>
        )}
      </View>
    );
  }
);
