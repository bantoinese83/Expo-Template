import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useRouter, Link } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { userProfileSchema, UserProfileFormValues } from "../../src/schemas/userSchema";
import { AppText } from "../../src/components/ui/AppText";
import { AppCard } from "../../src/components/ui/AppCard";
import PrimaryButton from "../../src/components/common/PrimaryButton";
import { useAuth } from "../../src/hooks/useAuth";
import { ThemeToggle } from "../../src/components/ThemeToggle";

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl || null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      bio: "",
      website: "",
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: UserProfileFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Saving profile...", data);
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={["top"]}>
      <ScrollView contentContainerClassName="p-6">
        <View className="flex-row justify-between items-center mb-8">
          <AppText variant="h1">{t("profile")}</AppText>
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center"
          >
            <MaterialCommunityIcons name="cog-outline" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={pickImage} className="relative">
            <View className="w-32 h-32 rounded-full bg-slate-100 items-center justify-center border-4 border-white shadow-xl overflow-hidden">
              {avatar ? (
                <Image source={{ uri: avatar }} className="w-full h-full" />
              ) : (
                <MaterialCommunityIcons name="account" size={60} color="#cbd5e1" />
              )}
            </View>
            <View className="absolute bottom-1 right-1 w-8 h-8 bg-indigo-600 rounded-full items-center justify-center border-2 border-white">
              <MaterialCommunityIcons name="camera" size={16} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <AppCard className="space-y-6">
          <View>
            <AppText variant="caption" className="mb-2 uppercase tracking-widest font-bold">
              Full Name
            </AppText>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 p-4 rounded-xl border ${
                    errors.name ? "border-rose-500" : "border-slate-100"
                  }`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Your Name"
                />
              )}
            />
            {errors.name && (
              <AppText className="text-rose-500 text-xs mt-1 italic">{errors.name.message}</AppText>
            )}
          </View>

          <View>
            <AppText variant="caption" className="mb-2 uppercase tracking-widest font-bold">
              Email Address
            </AppText>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 p-4 rounded-xl border ${
                    errors.email ? "border-rose-500" : "border-slate-100"
                  }`}
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  placeholder="your@email.com"
                />
              )}
            />
            {errors.email && (
              <AppText className="text-rose-500 text-xs mt-1 italic">
                {errors.email.message}
              </AppText>
            )}
          </View>

          <View>
            <AppText variant="caption" className="mb-2 uppercase tracking-widest font-bold">
              Bio
            </AppText>
            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-24"
                  multiline
                  numberOfLines={4}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Tell us about yourself..."
                />
              )}
            />
          </View>

          <PrimaryButton
            title={isSubmitting ? "Saving..." : t("save")}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="mt-4"
          />
        </AppCard>

        {/* Theme Settings */}
        <View className="mt-8">
          <AppText variant="h3" className="mb-4 dark:text-white">
            Appearance
          </AppText>
          <ThemeToggle />
        </View>

        {/* Footer Info */}
        <View className="mt-12 items-center opacity-50">
          <AppText variant="caption" className="dark:text-slate-400">
            Expo Template 2026 Edition
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
