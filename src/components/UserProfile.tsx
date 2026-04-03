import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { getAvatarUrl } from "../utils/avatar";

interface Props {
  userName: string;
  userImage?: string;
  greeting?: string;
}

const UserProfile: React.FC<Props> = ({ userName, userImage, greeting = "Hi 👋" }) => {
  const [imageError, setImageError] = useState(false);

  // Generate avatar URL based on userName if no specific image is provided
  const avatarUri = userImage?.startsWith("http") ? userImage : getAvatarUrl(userName);

  // Get initials from user name for fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word: string) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderAvatar = () => {
    if (imageError) {
      return (
        <View className="w-10 h-10 rounded-full bg-indigo-600 justify-center items-center mr-3">
          <Text className="text-white text-base font-bold">{getInitials(userName)}</Text>
        </View>
      );
    }

    return (
      <Image
        source={{ uri: avatarUri }}
        className="w-10 h-10 rounded-full mr-3"
        onError={handleImageError}
      />
    );
  };

  return (
    <View className="flex-row items-center">
      {renderAvatar()}
      <View className="flex-col">
        <Text className="text-slate-500 text-[11px] mb-0.5">{greeting}</Text>
        <Text className="text-slate-900 text-sm font-bold">{userName}</Text>
      </View>
    </View>
  );
};

export default UserProfile;
