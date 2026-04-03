import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle | any;
  showAddButton?: boolean;
  callBack?: () => void;
}

const PageHeader: React.FC<Props> = ({
  title,

  showBackButton = true,
  onBackPress, // optional override
  backgroundColor = "#A020EF",
  textColor = "#ffffff",
  style,
  showAddButton = false,
  callBack,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.content}>
        {/* BACK BUTTON */}
        {showBackButton && (
          <TouchableOpacity style={styles.backButtonContainer} onPress={handleBack}>
            <View style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        )}

        {/* Center Title & Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        </View>
        {/* Add Button */}
        {showAddButton && (
          <TouchableOpacity style={styles.backButtonContainer} onPress={callBack}>
            <View style={styles.backButton}>
              <MaterialIcons name="add" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButtonContainer: {
    marginRight: 0,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default PageHeader;
