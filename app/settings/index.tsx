import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import { AppText, AppCard, SettingItem, ScreenWrapper } from "@/components/ui";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { useDebugStore } from "@/store/useDebugStore";

/**
 * Settings Dashboard.
 * Centralized screen for all app and user preferences.
 */
export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth();

  const navigateToLegal = (type: string) => {
    router.push({
      pathname: "/settings/legal" as any,
      params: { type },
    });
  };

  return (
    <ScreenWrapper scrollable className="bg-slate-50 dark:bg-slate-950">
      <ScrollView contentContainerClassName="p-md pb-xxl" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View className="mt-lg mb-xs px-2">
          <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
            Account
          </AppText>
        </View>
        <AppCard padding="none" className="overflow-hidden">
          <SettingItem
            label="Profile Information"
            icon="account-outline"
            value={user?.name}
            onPress={() => router.push("/(tabs)/profile" as any)}
          />
          <View className="h-[1px] bg-slate-100 dark:bg-slate-800 ml-[56px]" />
          <SettingItem label="Security & Password" icon="shield-lock-outline" onPress={() => {}} />
        </AppCard>

        {/* Preferences Section */}
        <View className="mt-lg mb-xs px-2">
          <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
            Preferences
          </AppText>
        </View>
        <AppCard padding="none" className="overflow-hidden">
          <View className="px-md py-sm">
            <AppText variant="body" className="mb-xs text-slate-700 dark:text-slate-200">
              Theme
            </AppText>
            <ThemeToggle />
          </View>
          <View className="h-[1px] bg-slate-100 dark:bg-slate-800 ml-[56px]" />
          <SettingItem label="Language" icon="translate" value="English" onPress={() => {}} />
          <View className="h-[1px] bg-slate-100 dark:bg-slate-800 ml-[56px]" />
          <SettingItem
            label="Push Notifications"
            icon="bell-outline"
            type="toggle"
            value={true}
            onToggle={(val) => console.log("Toggle Notifications", val)}
          />
        </AppCard>

        {/* Legal Section */}
        <View className="mt-lg mb-xs px-2">
          <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
            Legal
          </AppText>
        </View>
        <AppCard padding="none" className="overflow-hidden">
          <SettingItem
            label="Privacy Policy"
            icon="file-document-outline"
            onPress={() => navigateToLegal("privacy")}
          />
          <View className="h-[1px] bg-slate-100 dark:bg-slate-800 ml-[56px]" />
          <SettingItem
            label="Terms of Service"
            icon="file-document-outline"
            onPress={() => navigateToLegal("terms")}
          />
        </AppCard>

        {/* Support & Community */}
        <View className="mt-lg mb-xs px-2">
          <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
            Support
          </AppText>
        </View>
        <AppCard padding="none" className="overflow-hidden">
          <SettingItem label="Help Center" icon="help-circle-outline" onPress={() => {}} />
          <View className="h-[1px] bg-slate-100 dark:bg-slate-800 ml-[56px]" />
          <SettingItem label="Contact Us" icon="email-outline" onPress={() => {}} />
        </AppCard>

        {/* Debug Section (Template Only) */}
        {__DEV__ && (
          <>
            <View className="mt-lg mb-xs px-2">
              <AppText
                variant="caption"
                className="uppercase tracking-widest font-bold text-rose-400"
              >
                Developer Tools
              </AppText>
            </View>
            <AppCard padding="none" className="overflow-hidden">
              <SettingItem
                label="Debug Terminal"
                icon="console"
                onPress={() => useDebugStore.getState().showViewer()}
              />
              <View className="h-[1px] bg-slate-100 dark:bg-slate-800 ml-[56px]" />
              <SettingItem
                label="Check for Updates"
                icon="refresh"
                onPress={() => console.log("Manual check for updates")}
              />
            </AppCard>
          </>
        )}

        {/* Logout */}
        <View className="mt-lg">
          <AppCard padding="none" className="overflow-hidden">
            <SettingItem label="Log Out" icon="logout" type="danger" onPress={signOut} />
          </AppCard>
        </View>

        {/* App Version Info */}
        <View className="mt-xl items-center">
          <AppText variant="caption" className="text-slate-400">
            Version 1.0.0 (Build 2026)
          </AppText>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
