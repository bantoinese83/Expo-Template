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
    w-full px-4 py-3 rounded-xl border-2 bg-slate-50 dark:bg-slate-900 
    ${isFocused ? "border-indigo-600 dark:border-indigo-500" : "border-slate-200 dark:border-slate-800"}
    ${error ? "border-red-500" : ""}
    text-slate-900 dark:text-white
    ${showSearchIcon ? "pl-11" : ""}
    ${type === "password" ? "pr-11" : ""}
    ${className}
  `;

  return (
    <View className={`w-full mb-4 ${containerStyle}`}>
      {label && (
        <AppText
          variant="caption"
          className="mb-1.5 ml-1 font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </AppText>
      )}

      <View className="relative">
        {showSearchIcon && (
          <View className="absolute left-3.5 z-10 top-3.5">
            <Search size={18} color={isFocused ? "#4f46e5" : "#94a3b8"} />
          </View>
        )}

        <TextInput
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#94a3b8"
          secureTextEntry={isPasswordVisible}
          {...props}
        />

        {type === "password" && (
          <TouchableOpacity
            className="absolute right-3.5 top-3.5 p-1"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Eye size={18} color="#94a3b8" />
            ) : (
              <EyeOff size={18} color="#94a3b8" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <AppText variant="caption" className="mt-1 ml-1 text-red-500 font-medium">
          {error}
        </AppText>
      )}
    </View>
  );
};
