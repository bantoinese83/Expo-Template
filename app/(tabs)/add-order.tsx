import React from "react";
import { View, ScrollView } from "react-native";
import { AppText } from "../../src/components/ui/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../src/components/common/PrimaryButton";
import TextField from "../../src/components/common/form/TextField";

export default function AddOrderScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <AppText variant="h1" className="mb-6">
          New Order
        </AppText>

        <TextField
          label="Customer Name"
          placeholder="Enter customer name"
          value=""
          onTextChange={() => {}}
        />

        <TextField
          label="Order Amount"
          placeholder="Enter amount"
          value=""
          onTextChange={() => {}}
          keyboardType="numeric"
        />

        <PrimaryButton
          title="Create Order"
          onPress={() => alert("Order created!")}
          className="mt-6"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
