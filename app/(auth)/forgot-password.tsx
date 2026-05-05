import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import PrimaryButton from "@/components/common/PrimaryButton";
import TextField from "@/components/common/form/TextField";
import { AppText } from "@/components/ui/AppText";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-6">
        <AppText variant="h1" className="mb-4">
          Reset Password
        </AppText>
        <AppText variant="body" className="text-slate-500 mb-8">
          Enter your email address and we'll send you a link to reset your password.
        </AppText>

        <TextField
          label="Email Address"
          placeholder="Enter your email"
          value=""
          onTextChange={() => {}}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PrimaryButton
          title="Send Link"
          onPress={() => {
            alert("Reset link sent!");
            router.back();
          }}
          className="mt-6"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
