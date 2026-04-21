import React from "react";
import { View, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import { userProfileSchema, UserProfileFormValues } from "@/schemas/userSchema";
import { AppText } from "@/components/ui/AppText";
import { AppCard } from "@/components/ui/AppCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";

interface ProfileFormProps {
  initialValues: UserProfileFormValues;
  onSubmit: (data: UserProfileFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function ProfileForm({ initialValues, onSubmit, isSubmitting }: ProfileFormProps) {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: initialValues,
  });

  return (
    <AppCard padding="lg" className="space-y-6">
      <View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              label="Full Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.name?.message}
              placeholder="Your Name"
            />
          )}
        />
      </View>

      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <AppInput
              label="Email Address"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              error={errors.email?.message}
              placeholder="your@email.com"
            />
          )}
        />
      </View>

      <View>
        <AppText
          variant="caption"
          className="mb-1.5 ml-1 font-medium text-slate-700 dark:text-slate-300"
        >
          Bio
        </AppText>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="bg-slate-100 dark:bg-slate-900 px-md py-md rounded-md border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-24"
              multiline
              numberOfLines={4}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#94a3b8"
              placeholder="Tell us about yourself..."
            />
          )}
        />
      </View>

      <AppButton
        title={isSubmitting ? "Saving..." : t("save")}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        className="mt-4"
      />
    </AppCard>
  );
}
