import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Share } from "react-native";
import { X, Share2, Trash2 } from "lucide-react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

import { useLogStore, LogEntry } from "@/store/useLogStore";
import { AppText } from "../ui/AppText";
import { AppCard } from "../ui/AppCard";
import { AppButton } from "../ui/AppButton";

interface DebugLogViewerProps {
  isVisible: boolean;
  onClose: () => void;
}

export function DebugLogViewer({ isVisible, onClose }: DebugLogViewerProps) {
  const { logs, clearLogs } = useLogStore();
  const [filter, setFilter] = useState<LogEntry["level"] | "all">("all");

  const filteredLogs = logs.filter((log) => filter === "all" || log.level === filter);

  const handleShare = async () => {
    const formattedLogs = logs
      .map((l) => `[${l.timestamp}] [${l.level.toUpperCase()}]: ${l.message}`)
      .join("\n");
    await Share.share({ message: formattedLogs, title: "App Debug Logs" });
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={StyleSheet.absoluteFill}
      className="bg-white dark:bg-slate-900 z-[10000]"
    >
      <View className="flex-1 safe-pt">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <View>
            <AppText variant="h2">Debug Terminal</AppText>
            <AppText variant="caption">{logs.length} logs captured</AppText>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full"
          >
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View className="flex-row px-4 py-2 space-x-2 border-b border-slate-50 dark:border-slate-800 overflow-visible">
          {(["all", "debug", "info", "warn", "error"] as const).map((lv) => (
            <TouchableOpacity
              key={lv}
              onPress={() => setFilter(lv)}
              className={`px-3 py-1.5 rounded-full ${
                filter === lv ? "bg-slate-900 dark:bg-white" : "bg-slate-50 dark:bg-slate-800"
              }`}
            >
              <AppText
                variant="caption"
                className={`capitalize ${
                  filter === lv ? "text-white dark:text-slate-900" : "text-slate-500"
                }`}
              >
                {lv}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* List */}
        <FlatList
          data={filteredLogs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <AppCard className="mb-2 border-slate-50 dark:border-slate-800" padding="sm">
              <View className="flex-row items-center justify-between mb-1">
                <AppText
                  variant="caption"
                  className={`font-bold uppercase text-[10px] ${
                    item.level === "error"
                      ? "text-rose-500"
                      : item.level === "warn"
                        ? "text-amber-500"
                        : "text-blue-500"
                  }`}
                >
                  {item.level}
                </AppText>
                <AppText variant="caption" className="text-[10px] text-slate-400">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </AppText>
              </View>
              <AppText variant="body" className="font-mono text-xs leading-5">
                {item.message}
              </AppText>
              {item.data && (
                <AppText variant="caption" className="font-mono text-[10px] text-slate-400 mt-1">
                  {JSON.stringify(item.data, null, 2)}
                </AppText>
              )}
            </AppCard>
          )}
        />

        {/* Actions */}
        <View className="p-6 flex-row space-x-4 border-t border-slate-100 dark:border-slate-800">
          <AppButton
            variant="outline"
            className="flex-1 border-slate-200"
            onPress={clearLogs}
            leftIcon={<Trash2 size={18} color="#64748b" />}
            title="Clear"
          />
          <AppButton
            className="flex-1"
            onPress={handleShare}
            leftIcon={<Share2 size={18} color="white" />}
            title="Export"
          />
        </View>
      </View>
    </Animated.View>
  );
}
