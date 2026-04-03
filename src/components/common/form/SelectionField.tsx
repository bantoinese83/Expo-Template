import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
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

export default function SelectionField({ label, data, selected, onSelect }: Props) {
  const getLabel = (item: SelectionItem | undefined) => {
    if (!item) return "";
    return typeof item === "string" ? item : item.label;
  };

  const getValue = (item: SelectionItem | undefined) => {
    if (!item) return undefined;
    return typeof item === "string" ? item : item.value;
  };

  return (
    <View style={{ marginBottom: verticalScale(25) }}>
      <Text style={{ ...textStyles.textMedium14, color: colors.darkGray }}>{label}</Text>
      <ScrollView
        contentContainerStyle={styles.inputWrapper}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {data?.map((type, index) => {
          const active = getValue(selected) === getValue(type);
          return (
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: active ? colors.secondary : colors.lightBg,
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    height: moderateScale(44),
    borderRadius: moderateScale(5),
    backgroundColor: colors.white,
    marginTop: verticalScale(10),
    ...flexRow,
  },
  button: {
    width: moderateScale(168),
    height: moderateScale(44),
    borderRadius: moderateScale(5),
    backgroundColor: colors.secondary,
    marginRight: horizontalScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
});
