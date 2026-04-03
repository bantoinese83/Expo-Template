import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950">
      <View className="flex-row items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <MaterialIcons name="arrow-back" size={24} color="#6366f1" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 dark:text-white">Notifications</Text>
      </View>

      <ScrollView contentContainerClassName="flex-grow p-6 justify-center">
        <View className="items-center opacity-40">
          <MaterialIcons name="notifications-none" size={80} color="#64748b" />
          <Text className="text-lg font-medium text-slate-500 dark:text-slate-400 mt-4 text-center">
            No new notifications
          </Text>
          <Text className="text-sm text-slate-400 dark:text-slate-500 mt-2 text-center">
            When you have something new, it'll show up here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
