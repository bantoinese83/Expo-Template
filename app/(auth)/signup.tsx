import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, Link, Href } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AppText, AppInput, AppButton, ScreenWrapper } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/theme/tokens";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SignupScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await signUp(data.email, data.password, data.name);
      router.replace("/");
      Alert.alert("Welcome", "Your account is ready.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenWrapper scrollable className="bg-white dark:bg-slate-950">
      <ScrollView contentContainerClassName="flex-grow p-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-4 mb-8">
          <View className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl items-center justify-center mb-md">
            <MaterialCommunityIcons name="account-plus-outline" size={32} color={colors.primary} />
          </View>
          <AppText variant="h1" className="text-3xl text-center">
            Create Account
          </AppText>
          <AppText variant="body" className="text-slate-500 dark:text-slate-400 mt-1 text-center">
            Join Expo Template today
          </AppText>
        </View>

        <View className="mb-lg gap-y-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Full Name"
                placeholder="Enter your name"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.name?.message}
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Password"
                type="password"
                placeholder="Create a password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Confirm Password"
                type="password"
                placeholder="Repeat your password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        <AppButton
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          className="mb-lg"
        />

        <View className="flex-row justify-center items-center mt-auto pb-4">
          <AppText className="text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
          </AppText>
          <Link href={"/login" as Href} asChild>
            <TouchableOpacity>
              <AppText className="text-primary font-bold">Sign In</AppText>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
