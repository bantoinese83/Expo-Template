import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import textStyles, { flexRow } from "../../../../theme/styles";
import { colors } from "../../../../theme/colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../utils/responsive/metrices";

type SelectionItem = string | { label: string; value: any };

interface Props {
  label: string;
  data: SelectionItem[];
  selected?: SelectionItem;
  onSelect: (item: SelectionItem) => void;
}

export default function InlineSelectionField({ label, data, selected, onSelect }: Props) {
  const getLabel = (item: SelectionItem | undefined) => {
    if (!item) return "";
    return typeof item === "string" ? item : item.label;
  };

  const getValue = (item: SelectionItem | undefined) => {
    if (!item) return undefined;
    return typeof item === "string" ? item : item.value;
  };

  return (
    <View
      style={{
        ...flexRow,
        alignItems: "center",
        marginBottom: verticalScale(25),
      }}
    >
      <Text style={{ ...textStyles.textMedium14, color: colors.darkGray, flex: 1 }}>{label}</Text>
      <View style={styles.inputWrapper}>
        {data.map((type, index) => {
          const active = getValue(selected) === getValue(type);
          return (
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: active ? colors.secondary : "transparent",
              }}
              onPress={() => onSelect(type)}
              key={index}
            >
              <Text
                style={{
                  ...textStyles.textRegular13,
                  color: active ? colors.white : colors.lightGray,
                }}
              >
                {getLabel(type)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    height: moderateScale(44),
    borderRadius: moderateScale(5),
    backgroundColor: colors.lightBg,
    ...flexRow,
  },
  button: {
    width: moderateScale(89),
    height: moderateScale(44),
    borderRadius: moderateScale(5),
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
