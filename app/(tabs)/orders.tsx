import React, { useMemo } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "../../src/components/ui/AppText";
import { AppCard } from "../../src/components/ui/AppCard";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  date: string;
};

const DUMMY_ORDERS: Order[] = [
  { id: "1", orderNumber: "Order #12345", status: "Delivered", date: "Oct 24, 2025" },
  { id: "2", orderNumber: "Order #12346", status: "Processing", date: "Oct 25, 2025" },
];

export default function OrdersScreen() {
  const data = useMemo(() => DUMMY_ORDERS, []);

  const renderItem = ({ item }: { item: Order }) => (
    <AppCard className="mb-4">
      <AppText variant="h3">{item.orderNumber}</AppText>
      <AppText variant="body" className="text-slate-500">
        {item.status} on {item.date}
      </AppText>
    </AppCard>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-950" edges={["top"]}>
      <View className="px-4 pt-4 pb-2">
        <AppText variant="h1" className="mb-2">
          Orders
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
