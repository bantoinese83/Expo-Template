import React from "react";
import { View, Text } from "react-native";
import { verticalScale } from "../../../utils/responsive/metrices";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <View className={`mt-[${verticalScale(3)}px]`}>
      <Text className="text-red-500 w-full text-left text-[12px]">{message}</Text>
    </View>
  );
};

export default ErrorMessage;
