import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Href } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AppText, AppInput, AppButton, ScreenWrapper } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import Logo from "@/components/common/Logo";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await signIn("mock", { email: data.email, password: data.password });
    } catch (error: any) {
      Alert.alert("Error", error.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenWrapper scrollable>
      <ScrollView contentContainerClassName="flex-grow p-lg" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-xl mb-lg">
          <Logo size={80} className="mb-md shadow-lg" />
          <AppText variant="h1" className="text-3xl text-center">
            Welcome Back
          </AppText>
          <AppText variant="body" className="text-slate-500 dark:text-slate-400 mt-2 text-center">
            Sign in to your account
          </AppText>
        </View>

        <View className="mb-8">
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

          <View className="mt-md">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />
          </View>

          <Link href={"/forgot-password" as Href} asChild>
            <TouchableOpacity className="self-end mt-sm mb-md px-1">
              <AppText className="text-primary font-medium text-right">Forgot Password?</AppText>
            </TouchableOpacity>
          </Link>
        </View>

        <AppButton
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          className="mb-lg"
        />

        <View className="flex-row items-center my-lg">
          <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
          <AppText
            variant="caption"
            className="mx-4 text-slate-400 uppercase tracking-widest font-bold"
          >
            or continue with
          </AppText>
          <View className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
        </View>

        <View className="flex-row justify-between mb-8 gap-x-4">
          <TouchableOpacity className="flex-1 h-[52px] border-2 border-slate-100 dark:border-slate-800 rounded-md items-center justify-center flex-row active:bg-slate-50 dark:active:bg-slate-900 transition-colors">
            <MaterialCommunityIcons name="google" size={20} color="#EA4335" />
            <AppText className="ml-2 font-semibold">Google</AppText>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 h-[52px] border-2 border-slate-100 dark:border-slate-800 rounded-md items-center justify-center flex-row active:bg-slate-50 dark:active:bg-slate-900 transition-colors">
            <MaterialCommunityIcons name="apple" size={20} color={isDark ? "white" : "black"} />
            <AppText className="ml-2 font-semibold">Apple</AppText>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center mt-auto pb-md">
          <AppText className="text-slate-500 dark:text-slate-400">Don't have an account? </AppText>
          <Link href={"/signup" as Href} asChild>
            <TouchableOpacity>
              <AppText className="text-primary font-bold">Sign Up</AppText>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
