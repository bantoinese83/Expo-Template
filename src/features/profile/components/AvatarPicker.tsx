import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AvatarPickerProps {
  currentAvatar: string | null;
  onAvatarChange: (uri: string) => void;
}

export function AvatarPicker({ currentAvatar, onAvatarChange }: AvatarPickerProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onAvatarChange(result.assets[0].uri);
    }
  };

  return (
    <View className="items-center mb-10">
      <TouchableOpacity
        onPress={pickImage}
        className="relative active:scale-95 transition-transform"
      >
        <View className="w-28 h-28 rounded-full bg-slate-100 dark:bg-slate-900/50 items-center justify-center border-[3px] border-white dark:border-slate-900 shadow-xl shadow-slate-200 dark:shadow-none overflow-hidden">
          {currentAvatar ? (
            <Image source={{ uri: currentAvatar }} className="w-full h-full" />
          ) : (
            <MaterialCommunityIcons name="account" size={56} color="#cbd5e1" />
          )}
        </View>
        <View className="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full items-center justify-center border-[3px] border-white dark:border-slate-900 shadow-md">
          <MaterialCommunityIcons name="camera" size={18} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
