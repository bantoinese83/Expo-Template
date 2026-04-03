import React from "react";
import { View, Text, ActivityIndicator, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Logo from "./common/Logo";

const { width } = Dimensions.get("window");
const LOGO_SIZE = width * 0.45;

export function SplashView() {
  return (
    <View className="flex-1 bg-[#263238] items-center justify-center">
      <StatusBar style="light" />

      <View className="items-center">
        {/* SVG Logo Implementation */}
        <View className="mb-10 shadow-2xl">
          <Logo size={LOGO_SIZE} />
        </View>

        {/* Branding */}
        <Text className="text-[#80deea] text-4xl font-black tracking-tighter mb-1">EXPO</Text>
        <Text className="text-white text-lg font-light tracking-[0.3em] uppercase mb-12">
          TEMPLATE
        </Text>

        <ActivityIndicator size="small" color="#4dd0e1" />
      </View>

      {/* Footer */}
      <View className="absolute bottom-16 items-center">
        <Text className="text-slate-500 font-bold tracking-[0.2em] text-[10px] uppercase">
          Build 2026 • Official Logo
        </Text>
      </View>
    </View>
  );
}
