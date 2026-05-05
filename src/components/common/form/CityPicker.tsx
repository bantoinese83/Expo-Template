import React, { useState, useEffect, memo } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import { Image } from "expo-image";
import { AntDesign, Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/responsive/metrices";
import ErrorMessage from "../ErrorMessage";

interface PickerItem {
  label: string;
  value: any;
}

interface Props {
  heading: string;
  callBack: (items: PickerItem[]) => void;
  cityOptions: PickerItem[];
  value: PickerItem[];
  placeholder?: string;
  style?: any;
  wrapperStyle?: any;
  error?: string;
  icon?: any;
  label?: string;
  isMulti?: boolean;
}

const CityPicker = ({
  heading,
  callBack,
  cityOptions,
  value,
  placeholder,
  style,
  wrapperStyle,
  error,
  icon,
  label,
  isMulti,
}: Props) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState<PickerItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const searchItem = (search: string) => {
    if (Array.isArray(cityOptions)) {
      if (search == null || search?.length < 1) {
        setFilteredCities(cityOptions);
      } else {
        const filteredData = cityOptions?.filter((city: PickerItem) => {
          const labelUpper = city?.label?.toUpperCase();
          const searchIndex = labelUpper?.search(search?.toUpperCase());
          return searchIndex !== -1;
        });
        setFilteredCities(filteredData);
      }
    }
  };

  const handleSelectItem = async (city: PickerItem) => {
    if (isMulti) {
      const exist = value?.find((i: PickerItem) => i?.value == city?.value);
      if (!exist) {
        await callBack([...value, city]);
      } else {
        callBack(value?.filter((i: PickerItem) => i?.value !== city?.value));
      }
    } else {
      callBack([city]);
      setisModalOpen(false);
    }
  };

  useEffect(() => {
    setFilteredCities(cityOptions);
  }, [cityOptions]);

  return (
    <View className="self-stretch flex-col items-start" style={style}>
      <View className="w-full">
        {label && (
          <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-[7px]">
            {label}
          </Text>
        )}

        <TouchableOpacity
          className={`w-full min-h-[${verticalScale(50)}px] rounded-[${moderateScale(5)}px] bg-slate-50 dark:bg-slate-800 flex-row items-center px-[${horizontalScale(15)}px] justify-between mb-[${verticalScale(5)}px] border ${
            error ? "border-rose-500" : "border-transparent dark:border-slate-700"
          }`}
          activeOpacity={0.8}
          onPress={() => setisModalOpen(true)}
          style={wrapperStyle}
        >
          <View className="flex-row items-center flex-wrap gap-2 flex-1">
            {icon && (
              <Image
                source={icon}
                className={`w-[${moderateScale(18)}px] h-[${moderateScale(18)}px] mr-[${horizontalScale(10)}px]`}
              />
            )}

            {isMulti ? (
              <View className="flex-row flex-wrap gap-2 items-center">
                {value?.map((selectedCity: PickerItem, index: number) => (
                  <View
                    className={`bg-slate-200 dark:bg-slate-700 rounded-[${moderateScale(5)}px] py-[5px] px-[9px] relative`}
                    key={index}
                  >
                    <Text className="text-[13px] font-normal text-slate-900 dark:text-slate-100">
                      {selectedCity?.label}
                    </Text>
                    <TouchableOpacity
                      className="absolute -top-[6px] -right-[5px]"
                      onPress={() => {
                        callBack(
                          value?.filter((i: PickerItem) => i?.value !== selectedCity?.value)
                        );
                      }}
                    >
                      <MaterialIcons name="cancel" size={16} color="#f43f5e" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <Text
                className={`text-[13px] font-normal ${
                  value[0]?.label
                    ? "text-slate-900 dark:text-slate-100"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {value[0]?.label ? value[0]?.label : null}
              </Text>
            )}
            {value?.length == 0 && (
              <Text className="text-[13px] font-normal text-slate-400 dark:text-slate-500">
                {placeholder}
              </Text>
            )}
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
          <View className="flex-row items-center self-stretch gap-[${horizontalScale(5)}px]">
            <TouchableOpacity onPress={() => setisModalOpen(false)}>
              {/* @ts-expect-error: arrowleft name mismatch in this version of AntDesign */}
              <AntDesign name="arrowleft" size={moderateScale(20)} color="#64748b" />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              className="flex-1 h-[${verticalScale(44)}px] rounded-[${moderateScale(10)}px] px-[${horizontalScale(14)}px] ml-[${horizontalScale(10)}px] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-[13px] font-normal"
              placeholderTextColor="#94a3b8"
              value={searchValue}
              onChangeText={(text) => {
                setSearchValue(text);
                searchItem(text);
              }}
            />
          </View>
          <ScrollView
            className={`flex-grow bg-white dark:bg-slate-950 pt-[${verticalScale(20)}px] mb-[${verticalScale(20)}px]`}
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-[16px] font-normal mb-[${verticalScale(5)}px] text-slate-900 dark:text-slate-100">
              {heading}
            </Text>
            {Array.isArray(filteredCities) &&
              filteredCities?.map((city: PickerItem, index: number) => {
                const active = value?.some((i: PickerItem) => i.value === city.value);
                return (
                  <TouchableOpacity
                    onPress={() => handleSelectItem(city)}
                    className={`border-b border-slate-100 dark:border-slate-800 py-[${verticalScale(13)}px] px-[${horizontalScale(2)}px] flex-row items-center justify-between`}
                    key={index + 1}
                  >
                    <Text
                      className={`text-[14px] font-normal ${
                        active ? "text-indigo-600" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {city?.label}
                    </Text>

                    {active && <Feather name="check-circle" size={18} color="#6366f1" />}
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

export default memo(CityPicker);
