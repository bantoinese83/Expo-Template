import React from "react";
import { View, TouchableOpacity, Switch, StyleSheet } from "react-native";
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
      <View style={styles.container}>
        <View style={styles.leftContent}>
          {icon && (
            <View style={[styles.iconContainer, isDanger && styles.dangerIconContainer]}>
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

        <View style={styles.rightContent}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dangerIconContainer: {
    backgroundColor: "#fef2f2",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
