import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import UserProfile from "./UserProfile";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "./common/Logo";

interface Props {
  userName: string;
  userImage: string;
  greeting: string;
  onNotificationPress?: () => void;
  notificationCount?: number;
  showShadow?: boolean;
}

const AppHeader: React.FC<Props> = ({
  userName,
  userImage,
  greeting,
  onNotificationPress,
  notificationCount = 0,
  showShadow = true,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      router.push("/notifications" as any);
    }
  };

  return (
    <View
      style={{ paddingTop: Math.max(insets.top, 20) }}
      className={`flex-row justify-between items-center px-lg pb-4 bg-white dark:bg-slate-950 ${
        showShadow ? "border-b border-slate-50 dark:border-slate-900 shadow-sm" : ""
      }`}
    >
      <View className="flex-row items-center">
        <Logo size={36} />
        <View className="ml-4">
          <UserProfile userName={userName} userImage={userImage} greeting={greeting} />
        </View>
      </View>
      <TouchableOpacity
        className="w-11 h-11 bg-slate-50 dark:bg-slate-900 rounded-full items-center justify-center relative"
        onPress={handleNotificationPress}
        activeOpacity={0.7}
      >
        <MaterialIcons name="notifications-none" size={26} color="#6366f1" />
        {notificationCount > 0 && (
          <View className="absolute top-1.5 right-1.5 bg-rose-500 rounded-full min-w-[14px] h-[14px] justify-center items-center px-0.5 border-[2.5px] border-white dark:border-slate-950">
            {notificationCount > 1 && (
              <Text className="text-white text-[8px] font-bold text-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;
