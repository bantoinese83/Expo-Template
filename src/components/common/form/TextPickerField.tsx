import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
  Platform,
  ViewStyle,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../utils/responsive/metrices";
import ErrorMessage from "../ErrorMessage";

const { width, height } = Dimensions.get("screen");

interface PickerItem {
  label: string;
  value: any;
}

interface Props {
  heading: string;
  callBack: (item: any) => void;
  options: PickerItem[];
  value: any;
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  wrapperStyle?: ViewStyle | ViewStyle[];
  error?: string;
  icon?: any;
  label?: string;
}

const TextPickerField = ({
  heading,
  callBack,
  options,
  value,
  placeholder,
  style,
  wrapperStyle,
  error,
  icon,
  label,
}: Props) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<PickerItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchItem = (search: string) => {
    if (Array.isArray(options)) {
      if (!search || search.length < 1) {
        setFilteredOptions(options);
      } else {
        const filteredData = options.filter((item: PickerItem) => {
          const labelUpper = item.label?.toUpperCase();
          const searchIndex = labelUpper?.search(search.toUpperCase());
          return searchIndex !== -1;
        });
        setFilteredOptions(filteredData);
      }
    }
  };

  const handleOnPress = (item: PickerItem) => {
    if (Array.isArray(value)) {
      const isItemAlreadySelected = value.some((option: PickerItem) => option.value === item.value);
      if (isItemAlreadySelected) {
        const filteredValue = value.filter((v: PickerItem) => v.value !== item.value);
        callBack(filteredValue);
      } else {
        const updatedValue = [...value, item];
        callBack(updatedValue);
      }
    } else {
      callBack(item);
      setisModalOpen(false);
    }
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const getDisplayValue = () => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.map((v: PickerItem) => v.label).join(", ") : placeholder;
    }
    return value?.label ? value.label : placeholder;
  };

  const hasValue = () => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return !!value?.label;
  };

  return (
    <View className="self-stretch flex-col items-start" style={style}>
      <View className="w-full">
        {label && (
          <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-[7px]">
            {label}
          </Text>
        )}

        <TouchableOpacity
          className={`w-full h-[${verticalScale(50)}px] rounded-[${moderateScale(5)}px] bg-slate-50 dark:bg-slate-800 flex-row items-center px-[${horizontalScale(15)}px] justify-between mb-[${verticalScale(5)}px] border ${
            error ? "border-rose-500" : "border-transparent dark:border-slate-700"
          }`}
          activeOpacity={0.8}
          onPress={() => setisModalOpen(true)}
          style={wrapperStyle}
        >
          <View className="flex-row items-center flex-1">
            {icon && (
              <Image
                source={icon}
                className={`w-[${moderateScale(18)}px] h-[${moderateScale(18)}px] mr-[${horizontalScale(10)}px]`}
              />
            )}
            <Text
              numberOfLines={1}
              className={`text-[13px] font-normal flex-1 ${
                hasValue()
                  ? "text-slate-900 dark:text-slate-100"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {getDisplayValue()}
            </Text>
          </View>

          <Entypo name="chevron-small-down" size={moderateScale(24)} color="#64748b" />
        </TouchableOpacity>
        {error && <ErrorMessage message={error} />}
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalOpen}
        onRequestClose={() => {
          setisModalOpen(false);
        }}
      >
        <View className="flex-1 bg-white dark:bg-slate-950 px-[${horizontalScale(20)}px] py-[${verticalScale(20)}px]">
          <View
            className={`flex-row items-center self-stretch gap-[${horizontalScale(5)}px] ${
              Platform.OS === "ios" ? `mt-[${moderateScale(45)}px]` : ""
            }`}
          >
            <TouchableOpacity onPress={() => setisModalOpen(false)}>
              <AntDesign name="arrowleft" size={moderateScale(20)} color="#64748b" />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              className="flex-1 h-[${verticalScale(44)}px] rounded-[${moderateScale(10)}px] px-[${horizontalScale(14)}px] ml-[${horizontalScale(10)}px] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-[13px] font-normal"
              placeholderTextColor="#94a3b8"
              value={searchValue}
              onChangeText={(text: string) => {
                setSearchValue(text);
                searchItem(text);
              }}
            />
          </View>
          <ScrollView
            className={`flex-grow bg-white dark:bg-slate-950 pt-[${verticalScale(20)}px]`}
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-[16px] font-normal mb-[${verticalScale(5)}px] text-slate-900 dark:text-slate-100">
              {heading}
            </Text>
            {Array.isArray(filteredOptions) &&
              filteredOptions.map((option: PickerItem, index: number) => {
                return (
                  <TouchableOpacity
                    onPress={() => handleOnPress(option)}
                    className={`border-b border-slate-100 dark:border-slate-800 py-[${verticalScale(13)}px] px-[${horizontalScale(2)}px] flex-row items-center justify-between`}
                    key={index + 1}
                  >
                    <Text className="text-[14px] font-normal text-slate-700 dark:text-slate-300">
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            <View className="h-[200px]" />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default memo(TextPickerField);
