import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../src/components/common/PrimaryButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignupScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: "center" }}>
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-emerald-100 rounded-3xl items-center justify-center mb-6">
            <MaterialCommunityIcons name="rocket-launch-outline" size={40} color="#10b981" />
          </View>
          <Text className="text-3xl font-bold text-slate-900">Create Account</Text>
          <Text className="text-slate-500 mt-2 text-center">
            Zero configuration to get started with Supabase or Clerk.
          </Text>
        </View>

        <View className="space-y-4">
          <PrimaryButton title="Get Started with Clerk" onPress={() => {}} />
          <View className="h-4" />
          <PrimaryButton
            title="Get Started with Supabase"
            onPress={() => {}}
            className="bg-emerald-600"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
