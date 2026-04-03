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
import { colors } from "../../theme/colors";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
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
      // For demo, we still use the provider-based signIn but simulate traditional login
      await signIn("mock");
      // Navigation is handled by RootLayout's useEffect based on auth state
    } catch (error: any) {
      Alert.alert("Error", error.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-10 mb-10">
          <View className="w-16 h-16 bg-indigo-50 rounded-2xl items-center justify-center mb-4">
            <MaterialCommunityIcons name="shield-lock-outline" size={32} color={colors.primary} />
          </View>
          <Text className="text-2xl font-bold text-slate-900">Welcome Back</Text>
          <Text className="text-slate-500 mt-1">Sign in to your account</Text>
        </View>

        <View className="mb-6">
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
                placeholder="Enter your password"
                value={value}
                onTextChange={onChange}
                error={errors.password?.message}
              />
            )}
          />

          <TouchableOpacity className="align-self-end mt-[-10px] mb-6">
            <Text className="text-indigo-600 font-medium text-right">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          className="mb-6"
        />

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-slate-200" />
          <Text className="mx-4 text-slate-400 text-xs font-medium">OR CONTINUE WITH</Text>
          <View className="flex-1 h-[1px] bg-slate-200" />
        </View>

        <View className="flex-row justify-between mb-8">
          <TouchableOpacity className="w-[48%] h-12 border border-slate-200 rounded-xl items-center justify-center flex-row">
            <MaterialCommunityIcons name="google" size={20} color="#EA4335" />
            <Text className="ml-2 font-semibold text-slate-700">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] h-12 border border-slate-200 rounded-xl items-center justify-center flex-row">
            <MaterialCommunityIcons name="apple" size={20} color="#000000" />
            <Text className="ml-2 font-semibold text-slate-700">Apple</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center mt-auto pb-4">
          <Text className="text-slate-500">Don't have an account? </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text className="text-indigo-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
