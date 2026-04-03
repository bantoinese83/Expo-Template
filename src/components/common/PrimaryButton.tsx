import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../../utils/responsive/metrices";
import { colors } from "../../../theme/colors";
import textStyles from "../../../theme/styles";

interface Props {
  onPress?: () => void;
  title?: string;
  style?: ViewStyle | any;
  isLoading?: boolean;
  icon?: any;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function PrimaryButton({
  onPress,
  title,
  style,
  isLoading = false,
  icon,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style, opacity: isLoading ? 0.6 : 1 }}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={{ color: colors.white, ...textStyles.textMedium14 }}>
          <Text
            style={{
              marginLeft: moderateScale(5),
              marginRight: moderateScale(5),
            }}
          >
            {icon}{" "}
          </Text>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: moderateScale(50),
    borderRadius: moderateScale(12),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
