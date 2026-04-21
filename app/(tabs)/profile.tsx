import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AppText } from "@/components/ui/AppText";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { useAuth } from "@/hooks/useAuth";

import { AvatarPicker } from "@/features/profile/components/AvatarPicker";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { useProfileUpdate } from "@/features/profile/hooks/useProfileUpdate";

/**
 * Profile Dashboard Screen.
 * High-fidelity, modular implementation using specialized feature components.
 */
export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { updateProfile, isUpdating } = useProfileUpdate();
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl || null);

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    website: "",
  };

  return (
    <ScreenWrapper className="bg-white dark:bg-slate-950">
      <ScrollView contentContainerClassName="p-6 pb-20" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <AppText variant="h1">{t("profile")}</AppText>
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center active:scale-95 transition-transform"
          >
            <MaterialCommunityIcons name="cog-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <AvatarPicker currentAvatar={avatar} onAvatarChange={setAvatar} />

        {/* Form Section (Modularized) */}
        <ProfileForm
          initialValues={initialValues}
          onSubmit={updateProfile}
          isSubmitting={isUpdating}
        />

        {/* Theme Settings */}
        <View className="mt-8">
          <AppText variant="h3" className="mb-4 dark:text-white">
            Appearance
          </AppText>
          <ThemeToggle />
        </View>

        {/* Footer Info */}
        <View className="mt-12 items-center opacity-30">
          <AppText variant="caption">Expo Template 2026 Edition</AppText>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
