import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AppText } from "../../src/components/ui/AppText";
import { AppCard } from "../../src/components/ui/AppCard";
import { SettingItem } from "../../src/components/ui/SettingItem";
import { ThemeToggle } from "../../src/components/ThemeToggle";
import { useAuth } from "../../src/hooks/useAuth";

/**
 * Settings Dashboard.
 * Centralized screen for all app and user preferences.
 */
export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, user } = useAuth();

  const navigateToLegal = (type: string) => {
    router.push({
      pathname: "/settings/legal",
      params: { type },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Account Section */}
      <View style={styles.sectionHeader}>
        <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
          Account
        </AppText>
      </View>
      <AppCard style={styles.sectionCard}>
        <SettingItem
          label="Profile Information"
          icon="account-outline"
          value={user?.name}
          onPress={() => router.push("/(tabs)/profile")}
        />
        <View style={styles.divider} />
        <SettingItem label="Security & Password" icon="shield-lock-outline" onPress={() => {}} />
      </AppCard>

      {/* Preferences Section */}
      <View style={styles.sectionHeader}>
        <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
          Preferences
        </AppText>
      </View>
      <AppCard style={styles.sectionCard}>
        <View className="px-4 py-2">
          <AppText variant="body" className="mb-2 text-slate-700 dark:text-slate-200">
            Theme
          </AppText>
          <ThemeToggle />
        </View>
        <View style={styles.divider} />
        <SettingItem label="Language" icon="translate" value="English" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingItem
          label="Push Notifications"
          icon="bell-outline"
          type="toggle"
          value={true}
          onToggle={(val) => console.log("Toggle Notifications", val)}
        />
      </AppCard>

      {/* Legal Section */}
      <View style={styles.sectionHeader}>
        <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
          Legal
        </AppText>
      </View>
      <AppCard style={styles.sectionCard}>
        <SettingItem
          label="Privacy Policy"
          icon="file-document-outline"
          onPress={() => navigateToLegal("privacy")}
        />
        <View style={styles.divider} />
        <SettingItem
          label="Terms of Service"
          icon="file-document-outline"
          onPress={() => navigateToLegal("terms")}
        />
      </AppCard>

      {/* Support & Community */}
      <View style={styles.sectionHeader}>
        <AppText variant="caption" className="uppercase tracking-widest font-bold text-slate-400">
          Support
        </AppText>
      </View>
      <AppCard style={styles.sectionCard}>
        <SettingItem label="Help Center" icon="help-circle-outline" onPress={() => {}} />
        <View style={styles.divider} />
        <SettingItem label="Contact Us" icon="email-outline" onPress={() => {}} />
      </AppCard>

      {/* Logout */}
      <View style={{ marginTop: 24 }}>
        <AppCard style={styles.sectionCard}>
          <SettingItem label="Log Out" icon="logout" type="danger" onPress={signOut} />
        </AppCard>
      </View>

      {/* App Version Info */}
      <View style={styles.footer}>
        <AppText variant="caption" className="text-slate-400">
          Version 1.0.0 (Build 2026)
        </AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // Slate-50
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  sectionCard: {
    padding: 0,
    overflow: "hidden",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#f1f5f9", // Slate-100
    marginLeft: 56, // Icon width (32) + padding (16) + margin (8)
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
});
