import React from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppText } from "./AppText";

/**
 * Standardized Setting Item for the Expo Template.
 * Supports: Navigation, Toggle (Switch), and Danger variants.
 */
interface SettingItemProps {
  label: string;
  icon?: string;
  value?: string | boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  type?: "navigation" | "toggle" | "danger" | "info";
  isLoading?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = React.memo(
  ({ label, icon, value, onPress, onToggle, type = "navigation", isLoading = false }) => {
    const isToggle = type === "toggle";
    const isDanger = type === "danger";

    const content = (
      <View className="flex-row items-center justify-between py-[14px] px-md bg-transparent">
        <View className="flex-row items-center">
          {icon && (
            <View
              className={`w-8 h-8 rounded-sm items-center justify-center mr-3 ${
                isDanger ? "bg-rose-50 dark:bg-rose-900/20" : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <MaterialCommunityIcons
                name={icon as any}
                size={20}
                color={isDanger ? "#ef4444" : "#64748b"}
              />
            </View>
          )}
          <AppText
            variant="body"
            className={
              isDanger ? "text-rose-500 font-medium" : "text-slate-700 dark:text-slate-200"
            }
          >
            {label}
          </AppText>
        </View>

        <View className="flex-row items-center">
          {isToggle ? (
            <Switch
              value={!!value}
              onValueChange={onToggle}
              trackColor={{ false: "#e2e8f0", true: "#6366f1" }}
              thumbColor="#ffffff"
            />
          ) : (
            <>
              {typeof value === "string" && (
                <AppText variant="caption" className="mr-2 text-slate-400">
                  {value}
                </AppText>
              )}
              {type === "navigation" && (
                <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
              )}
            </>
          )}
        </View>
      </View>
    );

    if (isToggle) {
      return <View>{content}</View>;
    }

    return (
      <TouchableOpacity onPress={onPress} disabled={isLoading} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }
);
