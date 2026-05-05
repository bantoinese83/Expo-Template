import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { memo } from "react";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/responsive/metrices";
import MenuLogout from "./MenuLogout";
import { useAuth } from "../../../hooks/useAuth";

interface LinkItem {
  label: string;
  icon: any;
  [key: string]: any;
}

interface Props {
  links: LinkItem[];
  onPress: (link: LinkItem) => void;
  onLogout: () => void;
}

const AccountRelatedLinks = ({ links, onPress, onLogout }: Props) => {
  const { user } = useAuth();

  return (
    <View className={`pb-[${verticalScale(8)}px] mt-[${verticalScale(20)}px] self-start w-full`}>
      {links.map((link, index) => {
        return (
          <TouchableOpacity
            className={`flex-row items-center justify-between gap-[${horizontalScale(8)}px] h-[${moderateScale(38)}px]`}
            key={index}
            onPress={() => {
              onPress(link);
            }}
          >
            <View className="flex-row items-center gap-2">
              {typeof link.icon === "number" ? (
                <Image source={link.icon} className="w-4 h-4" contentFit="contain" />
              ) : (
                link.icon
              )}
              <Text className="text-[13px] font-normal text-slate-600 dark:text-slate-400">
                {link.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {user && <MenuLogout onLogout={onLogout} />}
    </View>
  );
};

export default memo(AccountRelatedLinks);
