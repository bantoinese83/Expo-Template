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
    <View className="items-center mb-8">
      <TouchableOpacity onPress={pickImage} className="relative active:opacity-90">
        <View className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl overflow-hidden">
          {currentAvatar ? (
            <Image source={{ uri: currentAvatar }} className="w-full h-full" />
          ) : (
            <MaterialCommunityIcons name="account" size={60} color="#cbd5e1" />
          )}
        </View>
        <View className="absolute bottom-1 right-1 w-9 h-9 bg-primary rounded-full items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
          <MaterialCommunityIcons name="camera" size={18} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
