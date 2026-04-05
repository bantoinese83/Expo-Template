import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Image,
  Platform,
  ViewStyle,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
const TypedFlashList = FlashList as any;
import * as Haptics from "expo-haptics";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../utils/responsive/metrices";
import ErrorMessage from "../ErrorMessage";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface PickerItem {
  label: string;
  value: string | number;
}

interface Props<T extends PickerItem> {
  heading: string;
  callBack: (item: T | T[]) => void;
  options: T[];
  value: T | T[] | null;
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  wrapperStyle?: ViewStyle | ViewStyle[];
  error?: string;
  icon?: any;
  label?: string;
  multiple?: boolean;
}

const TextPickerField = <T extends PickerItem>({
  heading,
  callBack,
  options,
  value,
  placeholder = "Select an option",
  style,
  wrapperStyle,
  error,
  icon,
  label,
  multiple = false,
}: Props<T>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  // Memoize filtered options to avoid unnecessary recalculations
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    const searchLower = searchValue.toLowerCase();
    return options.filter((item) => item.label.toLowerCase().includes(searchLower));
  }, [options, searchValue]);

  const toggleModal = useCallback((open: boolean) => {
    if (!open) {
      setSearchValue(""); // Reset search on close
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsModalOpen(open);
  }, []);

  const handleOnPress = useCallback(
    (item: T) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (multiple && Array.isArray(value)) {
        const isItemAlreadySelected = value.some((option) => option.value === item.value);
        if (isItemAlreadySelected) {
          const filteredValue = value.filter((v) => v.value !== item.value);
          callBack(filteredValue);
        } else {
          callBack([...value, item]);
        }
      } else {
        callBack(item);
        toggleModal(false);
      }
    },
    [multiple, value, callBack, toggleModal]
  );

  const displayValue = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value.length > 0 ? value.map((v) => v.label).join(", ") : placeholder;
    }
    const singleValue = value as T;
    return singleValue?.label ? singleValue.label : placeholder;
  }, [multiple, value, placeholder]);

  const hasValue = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value.length > 0;
    }
    return !!(value as T)?.label;
  }, [multiple, value]);

  const renderItem = useCallback(
    ({ item }: { item: T }) => {
      const isSelected =
        multiple && Array.isArray(value)
          ? value.some((v) => (v as T).value === item.value)
          : (value as T)?.value === item.value;

      return (
        <TouchableOpacity
          onPress={() => handleOnPress(item)}
          className={`border-b border-slate-100 dark:border-slate-800 py-[${verticalScale(14)}px] px-[${horizontalScale(4)}px] flex-row items-center justify-between ${
            isSelected ? "bg-indigo-50/50 dark:bg-indigo-900/10" : ""
          }`}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{ selected: isSelected }}
        >
          <Text
            className={`text-[14px] font-normal ${isSelected ? "text-indigo-600 font-medium" : "text-slate-700 dark:text-slate-300"}`}
          >
            {item.label}
          </Text>
          {isSelected && <AntDesign name="check" size={16} color="#4f46e5" />}
        </TouchableOpacity>
      );
    },
    [multiple, value, handleOnPress]
  );

  return (
    <View className="self-stretch flex-col items-start" style={style}>
      <View className="w-full">
        {label && (
          <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-[7px]">
            {label}
          </Text>
        )}

        <TouchableOpacity
          className={`w-full h-[${verticalScale(52)}px] rounded-[${moderateScale(12)}px] bg-slate-50 dark:bg-slate-900 flex-row items-center px-[${horizontalScale(16)}px] justify-between mb-[${verticalScale(4)}px] border ${
            error ? "border-rose-500" : "border-slate-200 dark:border-slate-800"
          }`}
          activeOpacity={0.7}
          onPress={() => toggleModal(true)}
          style={wrapperStyle}
          accessibilityLabel={label || heading}
          accessibilityHint={placeholder}
          accessibilityRole="combobox"
        >
          <View className="flex-row items-center flex-1">
            {icon && (
              <Image
                source={icon}
                className={`w-[${moderateScale(18)}px] h-[${moderateScale(18)}px] mr-[${horizontalScale(10)}px]`}
                resizeMode="contain"
              />
            )}
            <Text
              numberOfLines={1}
              className={`text-[14px] font-normal flex-1 ${
                hasValue
                  ? "text-slate-900 dark:text-slate-100"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {displayValue}
            </Text>
          </View>
          <Entypo name="chevron-small-down" size={24} color="#94a3b8" />
        </TouchableOpacity>
        {error && <ErrorMessage message={error} />}
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalOpen}
        onRequestClose={() => toggleModal(false)}
      >
        <View className="flex-1 bg-white dark:bg-slate-950 px-[${horizontalScale(20)}px] py-[${verticalScale(20)}px]">
          <View
            className={`flex-row items-center self-stretch gap-[${horizontalScale(12)}px] ${
              Platform.OS === "ios" ? `mt-[${moderateScale(48)}px]` : ""
            }`}
          >
            <TouchableOpacity
              onPress={() => toggleModal(false)}
              accessibilityLabel="Close"
              accessibilityRole="button"
            >
              <AntDesign name="arrow-left" size={20} color="#64748b" />
            </TouchableOpacity>

            <View className="flex-1 relative">
              <View className="absolute left-3.5 z-10 top-[13px]">
                <AntDesign name="search" size={16} color="#94a3b8" />
              </View>
              <TextInput
                placeholder="Search resources..."
                className="w-full h-[${verticalScale(44)}px] rounded-[${moderateScale(12)}px] pl-10 pr-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-[14px] font-normal"
                placeholderTextColor="#94a3b8"
                value={searchValue}
                onChangeText={setSearchValue}
                autoCorrect={false}
                autoFocus={true}
              />
            </View>
          </View>

          <View className="pt-[${verticalScale(24)}px] flex-1">
            <Text className="text-[18px] font-bold mb-[${verticalScale(16)}px] text-slate-900 dark:text-white">
              {heading}
            </Text>

            <TypedFlashList
              data={filteredOptions}
              renderItem={renderItem as any}
              keyExtractor={(item: any) => String(item.value)}
              estimatedItemSize={moderateScale(60)}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View className="items-center justify-center mt-10">
                  <Text className="text-slate-400 dark:text-slate-500">
                    No results found for "{searchValue}"
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(TextPickerField) as typeof TextPickerField;
