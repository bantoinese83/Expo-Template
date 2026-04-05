import React, { useMemo, useState, useEffect, useCallback } from "react";
import { View, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
const TypedFlashList = FlashList as any;

import { AppText } from "../../src/components/ui/AppText";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenWrapper } from "../../src/components/ui/ScreenWrapper";
import { AppCardSkeleton } from "../../src/components/ui/AppSkeleton";

type Order = {
  id: string;
  orderNumber: string;
  status: string;
  date: string;
};

const DUMMY_ORDERS: Order[] = [
  { id: "1", orderNumber: "Order #12345", status: "Delivered", date: "Oct 24, 2025" },
  { id: "2", orderNumber: "Order #12346", status: "Processing", date: "Oct 25, 2025" },
  { id: "3", orderNumber: "Order #12347", status: "Shipped", date: "Oct 26, 2025" },
  { id: "4", orderNumber: "Order #12348", status: "Pending", date: "Oct 27, 2025" },
  { id: "5", orderNumber: "Order #12349", status: "Cancelled", date: "Oct 28, 2025" },
  { id: "6", orderNumber: "Order #12350", status: "Shipped", date: "Oct 29, 2025" },
];

export default function OrdersScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const data = useMemo(() => DUMMY_ORDERS, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const renderItem = ({ item }: { item: Order }) => (
    <AppCard className="mb-4" variant="elevated">
      <View className="flex-row justify-between items-center">
        <View>
          <AppText variant="h3" className="text-base">
            {item.orderNumber}
          </AppText>
          <AppText variant="caption" className="text-slate-500 mt-1">
            {item.date}
          </AppText>
        </View>
        <View
          className={`px-2 py-1 rounded-md ${
            item.status === "Delivered"
              ? "bg-emerald-50"
              : item.status === "Processing"
                ? "bg-amber-50"
                : "bg-slate-50"
          }`}
        >
          <AppText
            variant="caption"
            className={`font-semibold ${
              item.status === "Delivered"
                ? "text-emerald-600"
                : item.status === "Processing"
                  ? "text-amber-600"
                  : "text-slate-600"
            }`}
          >
            {item.status}
          </AppText>
        </View>
      </View>
    </AppCard>
  );

  return (
    <ScreenWrapper scrollable={false}>
      <View className="pt-4 pb-6">
        <AppText variant="h1">Orders</AppText>
        <AppText variant="body" className="text-slate-500 mt-1">
          Track and manage your recent transactions.
        </AppText>
      </View>

      {loading ? (
        <View className="flex-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <AppCardSkeleton key={i} />
          ))}
        </View>
      ) : (
        <TypedFlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={85}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6366f1"
              colors={["#6366f1"]}
            />
          }
          ListEmptyComponent={
            <View className="items-center justify-center mt-20">
              <AppText variant="body" className="text-slate-400">
                No orders found.
              </AppText>
            </View>
          }
        />
      )}
    </ScreenWrapper>
  );
}
