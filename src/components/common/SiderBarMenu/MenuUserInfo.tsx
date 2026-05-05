import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { memo } from "react";
import PrimaryButton from "../PrimaryButton";
import { moderateScale, verticalScale } from "@/utils/responsive/metrices";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks/useAuth";

interface Props {
  onLoginClick: () => void;
  onClose: () => void;
}

const MenuUserInfo = ({ onLoginClick, onClose }: Props) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <PrimaryButton
          title="Log in or create your account"
          className={`h-[${moderateScale(44)}px] my-[${verticalScale(32)}px] rounded-[${moderateScale(5)}px]`}
          onPress={onLoginClick}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push("/profile");
          }}
          className="self-start"
        >
          <View className={`flex-row items-center gap-[12px] my-[${verticalScale(32)}px]`}>
            {user?.avatarUrl ? (
              <Image
                source={{ uri: user?.avatarUrl }}
                className={`w-[${moderateScale(37)}px] h-[${moderateScale(37)}px] rounded-full`}
              />
            ) : (
              <View
                className={`w-[${moderateScale(37)}px] h-[${moderateScale(37)}px] rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center`}
              >
                <Text className="text-slate-900 dark:text-white font-bold">
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="text-[14px] font-medium text-slate-900 dark:text-white">
              {user?.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default memo(MenuUserInfo);
