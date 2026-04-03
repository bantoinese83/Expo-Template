import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import UserProfile from "./UserProfile";
import { useRouter } from "expo-router";

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
  const router = useRouter();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      // @ts-expect-error router push type is dynamic
      router.push("/notifications");
    }
  };

  return (
    <View
      className={`flex-row justify-between items-center px-4 pt-10 pb-3 bg-white ${
        showShadow ? "shadow-sm" : ""
      }`}
    >
      <UserProfile userName={userName} userImage={userImage} greeting={greeting} />
      <TouchableOpacity
        className="p-2 relative"
        onPress={handleNotificationPress}
        activeOpacity={0.7}
      >
        <MaterialIcons name="notifications" size={28} color="#0f172a" />
        {notificationCount > 0 && (
          <View className="absolute top-1 right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] justify-center items-center px-1 border-2 border-white">
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
