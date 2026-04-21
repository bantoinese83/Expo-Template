import React, { useMemo, useState, useEffect } from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
const TypedFlashList = FlashList as any;

import { AppText, AppCard, ScreenWrapper, AppCardSkeleton, EmptyState } from "@/components/ui";
import { Users } from "lucide-react-native";

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
    <AppCard className="mb-md">
      <AppText variant="h3">{item.name}</AppText>
      <AppText variant="body" className="text-slate-500">
        {item.email}
      </AppText>
    </AppCard>
  );

  return (
    <ScreenWrapper>
      <View className="py-md">
        <AppText variant="h1" className="mb-xs">
          Customers
        </AppText>
        <AppText variant="body" className="text-slate-500 mb-lg">
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
            <EmptyState
              title="No customers found"
              description="Your client list will appear here."
              Icon={Users}
            />
          }
        />
      )}
    </ScreenWrapper>
  );
}
