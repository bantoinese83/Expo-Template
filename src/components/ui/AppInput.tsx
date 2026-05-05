import React, { useState } from "react";
import { TextInput, TextInputProps, View, TouchableOpacity } from "react-native";
import { AppText } from "./AppText";
import { Eye, EyeOff, Search } from "lucide-react-native";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  showSearchIcon?: boolean;
  type?: "text" | "password" | "email" | "number";
  containerStyle?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  showSearchIcon,
  type = "text",
  containerStyle = "",
  className = "",
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const inputClasses = `
    w-full px-4 py-[14px] rounded-xl border bg-slate-50 dark:bg-slate-900/50 
    ${
      isFocused
        ? "border-primary/50 ring-2 ring-primary/10"
        : "border-slate-100 dark:border-slate-800"
    }
    ${error ? "border-danger" : ""}
    text-slate-900 dark:text-white
    ${showSearchIcon ? "pl-[44px]" : ""}
    ${type === "password" ? "pr-[44px]" : ""}
    ${className}
  `;

  return (
    <View className={`w-full mb-5 ${containerStyle}`}>
      {label && (
        <AppText
          variant="caption"
          className="mb-2 ml-1 text-[13px] font-semibold tracking-tight text-slate-500 dark:text-slate-500 uppercase"
        >
          {label}
        </AppText>
      )}

      <View className="relative shadow-sm shadow-slate-100 dark:shadow-none">
        {showSearchIcon && (
          <View
            className="absolute left-[15px] z-10 top-[15px]"
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants"
          >
            <Search size={19} color={isFocused ? "#6366f1" : "#cbd5e1"} />
          </View>
        )}

        <TextInput
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#cbd5e1"
          secureTextEntry={isPasswordVisible}
          accessibilityLabel={label || props.placeholder}
          accessibilityHint={error || props.accessibilityHint}
          accessibilityState={{ disabled: props.editable === false }}
          {...props}
        />

        {type === "password" && (
          <TouchableOpacity
            className="absolute right-[15px] top-[15px] p-0.5"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? "Show password" : "Hide password"}
          >
            {isPasswordVisible ? (
              <Eye size={19} color="#cbd5e1" />
            ) : (
              <EyeOff size={19} color="#cbd5e1" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <AppText
          variant="caption"
          className="mt-1 ml-1 text-danger font-medium"
          accessibilityRole="alert"
        >
          {error}
        </AppText>
      )}
    </View>
  );
};
