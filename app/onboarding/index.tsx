import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PrimaryButton from "../../src/components/common/PrimaryButton";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white p-6 justify-center items-center">
      <View className="w-64 h-64 bg-indigo-100 rounded-full mb-12 items-center justify-center">
        <Text className="text-6xl">🚀</Text>
      </View>

      <Text className="text-3xl font-bold text-center mb-4">Welcome to Expo Template</Text>

      <Text className="text-slate-500 text-center mb-12">
        The ultimate starting point for your next big idea. Built with performance and developer
        experience in mind.
      </Text>

      <PrimaryButton
        title="Get Started"
        onPress={() => router.replace("/login")}
        className="w-full"
      />
    </SafeAreaView>
  );
}
