import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../src/hooks/useAuth";
import PrimaryButton from "../../src/components/common/PrimaryButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const { signIn } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: "center" }}>
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-indigo-100 rounded-3xl items-center justify-center mb-6">
            <MaterialCommunityIcons name="shield-lock-outline" size={40} color="#6366f1" />
          </View>
          <Text className="text-3xl font-bold text-slate-900">Welcome Back</Text>
          <Text className="text-slate-500 mt-2 text-center">
            Sign in to your account to continue building amazing apps.
          </Text>
        </View>

        <View className="space-y-4">
          <PrimaryButton title="Sign In with Clerk" onPress={() => signIn("clerk")} />
          <View className="h-4" />
          <PrimaryButton
            title="Sign In with Supabase"
            onPress={() => signIn("supabase")}
            className="bg-emerald-600"
          />
          <View className="h-4" />
          <PrimaryButton
            title="Continue with Mock Auth"
            onPress={() => signIn("mock")}
            className="bg-slate-800"
          />
        </View>

        <View className="mt-10 flex-row justify-center">
          <Text className="text-slate-500">Don't have an account? </Text>
          <TouchableOpacity>
            <Text className="text-indigo-600 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
