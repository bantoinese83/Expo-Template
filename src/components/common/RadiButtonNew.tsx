import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}

const CustomRadioButton: React.FC<Props> = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(!selected)}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <View
        style={{
          height: 17,
          width: 17,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#4C0182",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 8,
        }}
      >
        {selected ? (
          <View
            style={{
              height: 8,
              width: 8,
              borderRadius: 6,
              backgroundColor: "#4C0182",
            }}
          />
        ) : null}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
