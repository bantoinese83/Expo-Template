import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import PrimaryButton from "../../src/components/common/PrimaryButton";
import TextField from "../../src/components/common/form/TextField";
import PasswordField from "../../src/components/common/form/PasswordField";
import { useAuth } from "../../src/hooks/useAuth";

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
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView contentContainerClassName="flex-grow p-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-4 mb-8">
          <View className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl items-center justify-center mb-4">
            <MaterialCommunityIcons name="account-plus-outline" size={32} color="#6366f1" />
          </View>
          <Text className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</Text>
          <Text className="text-slate-500 dark:text-slate-400 mt-1">Join Expo Template today</Text>
        </View>

        <View className="mb-6">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Full Name"
                placeholder="Enter your name"
                value={value}
                onTextChange={onChange}
                error={errors.name?.message}
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Email Address"
                placeholder="Enter your email"
                value={value}
                onTextChange={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <PasswordField
                label="Password"
                placeholder="Create a password"
                value={value}
                onTextChange={onChange}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <PasswordField
                label="Confirm Password"
                placeholder="Repeat your password"
                value={value}
                onTextChange={onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        <PrimaryButton
          title="Sign Up"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          className="mb-6"
        />

        <View className="flex-row justify-center items-center mt-auto pb-4">
          <Text className="text-slate-500 dark:text-slate-400">Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text className="text-indigo-600 dark:text-indigo-400 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
