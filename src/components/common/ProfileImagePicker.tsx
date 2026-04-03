import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import React, { useEffect } from "react";
import { flexCenter } from "../../../theme/styles";
import { moderateScale, verticalScale } from "../../../utils/responsive/metrices";
import textStyles from "../../../theme/styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

interface Props {
  onChangeImage: (uri: string) => void;
  image?: string;
}

export default function ProfileImagePicker({ onChangeImage, image }: Props) {
  const data = useSelector((state: any) => state?.auth);
  const pickImage = async () => {
    // Request a file URI instead of base64 so uploads can be sent as file multipart/form-data
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.7,
      base64: false,
    });

    if (!result.canceled) {
      // expo-image-picker returns an assets array. Use the uri so the caller can append a file to FormData.
      const picked = result?.assets && result.assets[0];
      if (picked && picked.uri) {
        onChangeImage(picked.uri);
      }
    }
  };

  return (
    <View style={styles.imageWrapper}>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.profile}
        />
      ) : (
        <View
          style={{
            ...styles.profile,
            backgroundColor: colors.primary,
            ...flexCenter,
          }}
        >
          <Text style={{ ...textStyles.textMedium24, color: colors.white }}>
            {data?.user?.user_name ? data?.user?.user_name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>
      )}
      <TouchableHighlight style={styles.pin} onPress={pickImage}>
        <Entypo name="pencil" size={14} color={colors.primary} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: "relative",
    width: moderateScale(106),
    height: moderateScale(106),
  },
  profile: {
    width: moderateScale(106),
    height: moderateScale(106),
    borderRadius: moderateScale(106),
  },
  pin: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(22),
    backgroundColor: colors.white,
    position: "absolute",
    borderWidth: 0.2,
    bottom: 6,
    right: 6,
    ...flexCenter,
  },
});
