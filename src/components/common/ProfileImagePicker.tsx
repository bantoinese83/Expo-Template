import { Text, View, Image, TouchableHighlight } from "react-native";
import React from "react";
import { moderateScale } from "../../../utils/responsive/metrices";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  onChangeImage: (uri: string) => void;
  image?: string;
}

export default function ProfileImagePicker({ onChangeImage, image }: Props) {
  const { user } = useAuth();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled) {
      const picked = result?.assets && result.assets[0];
      if (picked && picked.uri) {
        onChangeImage(picked.uri);
      }
    }
  };

  return (
    <View className={`relative w-[${moderateScale(106)}px] h-[${moderateScale(106)}px]`}>
      {image ? (
        <Image
          source={{ uri: image }}
          className={`w-[${moderateScale(106)}px] h-[${moderateScale(106)}px] rounded-full`}
        />
      ) : (
        <View
          className={`w-[${moderateScale(106)}px] h-[${moderateScale(106)}px] rounded-full bg-indigo-600 items-center justify-center`}
        >
          <Text className="text-[24px] font-medium text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
      )}
      <TouchableHighlight
        className={`w-[${moderateScale(22)}px] h-[${moderateScale(22)}px] rounded-full bg-white dark:bg-slate-800 absolute border-[0.2px] border-slate-200 bottom-[6px] right-[6px] items-center justify-center`}
        onPress={pickImage}
        underlayColor="#f1f5f9"
      >
        <Entypo name="pencil" size={14} color="#6366f1" />
      </TouchableHighlight>
    </View>
  );
}
