import React, { useRef, useState, useMemo } from "react";
import { View, TouchableOpacity, Pressable } from "react-native";
import { ChevronDown, Check } from "lucide-react-native";
import { AppText } from "./AppText";
import { BaseBottomSheet, BaseBottomSheetRef } from "./BaseBottomSheet";
import { AppInput } from "./AppInput";
import { FlashList } from "@shopify/flash-list";
import * as Haptics from "expo-haptics";

interface Option {
  label: string;
  value: string | number;
}

interface AppSelectProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number;
  onValueChange: (value: string | number) => void;
  error?: string;
  searchable?: boolean;
}

export const AppSelect: React.FC<AppSelectProps> = React.memo(
  ({
    label,
    placeholder = "Select an option",
    options,
    value,
    onValueChange,
    error,
    searchable = true,
  }) => {
    const bottomSheetRef = useRef<BaseBottomSheetRef>(null);
    const [searchQuery, setSearchBarQuery] = useState("");

    const selectedOption = useMemo(
      () => options.find((opt) => opt.value === value),
      [options, value]
    );

    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [options, searchQuery]);

    const handleOpen = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      bottomSheetRef.current?.expand();
    };

    const handleSelect = (option: Option) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onValueChange(option.value);
      bottomSheetRef.current?.close();
    };

    return (
      <View className="mb-5">
        {label && (
          <AppText
            variant="caption"
            className="mb-2 ml-1 text-[13px] font-semibold tracking-tight text-slate-500 dark:text-slate-500 uppercase"
          >
            {label}
          </AppText>
        )}

        <Pressable
          onPress={handleOpen}
          className={`w-full flex-row items-center justify-between px-4 py-[14px] rounded-xl border bg-slate-50 dark:bg-slate-900/50 ${
            error ? "border-danger" : "border-slate-100 dark:border-slate-800"
          }`}
        >
          <AppText
            className={`text-[16px] ${
              selectedOption ? "text-slate-900 dark:text-white" : "text-slate-400"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </AppText>
          <ChevronDown size={20} color="#94a3b8" />
        </Pressable>

        {error && (
          <AppText variant="caption" className="mt-1.5 ml-1 text-danger font-medium">
            {error}
          </AppText>
        )}

        <BaseBottomSheet ref={bottomSheetRef} title={label || "Select Option"} snapPoints={["60%"]}>
          <View className="flex-1">
            {searchable && (
              <View className="mb-4">
                <AppInput
                  placeholder="Search..."
                  showSearchIcon
                  value={searchQuery}
                  onChangeText={setSearchBarQuery}
                />
              </View>
            )}

            <FlashList
              data={filteredOptions}
              keyExtractor={(item) => item.value.toString()}
              // @ts-expect-error - estimatedItemSize is required but causing TS issues in this generic context
              estimatedItemSize={60}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className="flex-row items-center justify-between py-4 border-b border-slate-50 dark:border-slate-800/50"
                >
                  <AppText
                    className={`text-[16px] ${
                      item.value === value
                        ? "text-primary font-semibold"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.label}
                  </AppText>
                  {item.value === value && <Check size={20} color="#6366f1" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </BaseBottomSheet>
      </View>
    );
  }
);
