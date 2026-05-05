import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AppText } from "@/components/ui/AppText";

/**
 * Dynamic Legal Screen.
 * Renders Privacy Policy or Terms of Service based on 'type' parameter.
 */
export default function LegalScreen() {
  const { type } = useLocalSearchParams<{ type: "privacy" | "terms" }>();
  const navigation = useNavigation();

  // Set header title based on type
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: type === "privacy" ? "Privacy Policy" : "Terms of Service",
    });
  }, [type, navigation]);

  const isPrivacy = type === "privacy";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconHeader}>
        <MaterialCommunityIcons
          name={isPrivacy ? "shield-check-outline" : "file-document-outline"}
          size={48}
          color="#6366f1"
        />
      </View>

      <AppText variant="h2" className="mb-4 text-center">
        {isPrivacy ? "Our Commitment to Privacy" : "Agreement of Usage"}
      </AppText>

      <AppText variant="body" className="mb-6 text-slate-500 text-center">
        Last Updated:{" "}
        {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" })}
      </AppText>

      {/* Placeholder content for rapid development */}
      <View style={styles.section}>
        <AppText variant="h3" className="mb-2">
          1. Overview
        </AppText>
        <AppText variant="body" className="text-slate-600 leading-6">
          This is a placeholder for your {isPrivacy ? "Privacy Policy" : "Terms of Service"}. In a
          production environment, you should replace this text with your legally binding agreements.
          The template is designed to render large blocks of text cleanly with high readability.
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="h3" className="mb-2">
          2. Data Collection & Usage
        </AppText>
        <AppText variant="body" className="text-slate-600 leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="h3" className="mb-2">
          3. Rights & Limitations
        </AppText>
        <AppText variant="body" className="text-slate-600 leading-6">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </AppText>
      </View>

      <View style={styles.footer}>
        <AppText variant="caption" className="text-slate-400 text-center">
          For any questions regarding these {isPrivacy ? "policies" : "terms"}, please contact our
          support team at support@example.com.
        </AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  iconHeader: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  footer: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#f1f5f9",
  },
});
