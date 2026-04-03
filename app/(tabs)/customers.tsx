import React, { useMemo } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "../../src/components/ui/AppText";
import { AppCard } from "../../src/components/ui/AppCard";

type Customer = {
  id: string;
  name: string;
  email: string;
};

const DUMMY_CUSTOMERS: Customer[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
];

export default function CustomersScreen() {
  const data = useMemo(() => DUMMY_CUSTOMERS, []);

  const renderItem = ({ item }: { item: Customer }) => (
    <AppCard className="mb-4">
      <AppText variant="h3">{item.name}</AppText>
      <AppText variant="body" className="text-slate-500">
        {item.email}
      </AppText>
    </AppCard>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={["top"]}>
      <View className="px-4 pt-4 pb-2">
        <AppText variant="h1" className="mb-2">
          Customers
        </AppText>
      </View>
      <FlashList
        data={data}
        renderItem={renderItem}
        // @ts-expect-error type missing in v2
        estimatedItemSize={85}
        contentContainerClassName="p-4"
      />
    </SafeAreaView>
  );
}
