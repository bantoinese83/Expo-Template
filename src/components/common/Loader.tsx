import React from "react";
import { View, ActivityIndicator } from "react-native";

interface Props {
  isLoading?: boolean;
  color?: string;
}

const Loader: React.FC<Props> = ({ color = "white", isLoading = true }) => {
  if (!isLoading) return null;
  return (
    <View
      className="absolute -top-[10px] -right-[10px] -bottom-[10px] -left-[10px] justify-center items-center bg-black/60 z-[9999]"
      style={{ elevation: 10 }}
    >
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;
