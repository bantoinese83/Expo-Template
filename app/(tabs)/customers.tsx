import React, { useMemo, useState, useEffect } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
const TypedFlashList = FlashList as any;

import { AppText } from "../../src/components/ui/AppText";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenWrapper } from "../../src/components/ui/ScreenWrapper";
import { AppCardSkeleton } from "../../src/components/ui/AppSkeleton";

type Customer = {
  id: string;
  name: string;
  email: string;
};

const DUMMY_CUSTOMERS: Customer[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
  { id: "4", name: "Alice Brown", email: "alice@example.com" },
];

export default function CustomersScreen() {
  const [loading, setLoading] = useState(true);
  const data = useMemo(() => DUMMY_CUSTOMERS, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({ item }: { item: Customer }) => (
    <AppCard className="mb-4">
      <AppText variant="h3">{item.name}</AppText>
      <AppText variant="body" className="text-slate-500">
        {item.email}
      </AppText>
    </AppCard>
  );

  return (
    <ScreenWrapper>
      <View className="py-4">
        <AppText variant="h1" className="mb-2">
          Customers
        </AppText>
        <AppText variant="body" className="text-slate-500 mb-6">
          Your client directory and contact information.
        </AppText>
      </View>

      {loading ? (
        <View>
          {[1, 2, 3].map((i) => (
            <AppCardSkeleton key={i} />
          ))}
        </View>
      ) : (
        <TypedFlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={85}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="items-center justify-center mt-10">
              <AppText variant="body" className="text-slate-400">
                No customers found.
              </AppText>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
}
