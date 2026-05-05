import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { memo } from "react";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/responsive/metrices";

interface LinkItem {
  label: string;
  icon: any;
  [key: string]: any;
}

interface Props {
  contactList: LinkItem[];
}

const ContactUsInformation = ({ contactList }: Props) => {
  return (
    <View className={`mt-[${verticalScale(15)}px] self-start`}>
      <Text className="text-[15px] font-medium text-indigo-600 dark:text-indigo-400">
        Contact US
      </Text>
      <View className={`mt-[${verticalScale(12)}px]`}>
        {contactList.map((link, index) => {
          return (
            <TouchableOpacity
              className={`flex-row items-center justify-between gap-[${horizontalScale(8)}px] h-[${moderateScale(33)}px]`}
              key={index}
            >
              <View className="flex-row items-center gap-2">
                <Image source={link.icon} contentFit="contain" className="w-4 h-4" />
                <Text className="text-[13px] font-normal text-slate-600 dark:text-slate-400">
                  {link.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(ContactUsInformation);
