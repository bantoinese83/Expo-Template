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
      style={{ paddingTop: Math.max(insets.top, 16) }}
      className={`flex-row justify-between items-center px-md pb-sm bg-white dark:bg-slate-950 ${
        showShadow ? "shadow-sm" : ""
      }`}
    >
      <View className="flex-row items-center">
        <Logo size={32} />
        <View className="ml-3">
          <UserProfile userName={userName} userImage={userImage} greeting={greeting} />
        </View>
      </View>
      <TouchableOpacity
        className="p-2 relative"
        onPress={handleNotificationPress}
        activeOpacity={0.7}
      >
        <MaterialIcons name="notifications" size={28} color="#6366f1" />
        {notificationCount > 0 && (
          <View className="absolute top-1 right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] justify-center items-center px-1 border-2 border-white dark:border-slate-950">
            <Text className="text-white text-[10px] font-bold text-center">
              {notificationCount > 99 ? "99+" : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;
