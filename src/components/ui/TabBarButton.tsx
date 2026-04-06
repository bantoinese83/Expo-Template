import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Platform, GestureResponderEvent, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface TabBarButtonProps {
  children?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}

export const TabBarButton: React.FC<TabBarButtonProps> = ({ onPress }) => {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 100,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = (e: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Pulse effect on press
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
      }),
    ]).start();

    onPress?.(e);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={{
        top: -20,
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
          ios: {
            shadowColor: "#6366f1",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          },
          android: {
            elevation: 8,
          },
        }),
      }}
    >
      <Animated.View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "#6366f1",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 4,
          borderColor: "rgba(255,255,255,0.2)",
          transform: [{ scale }],
          opacity,
        }}
      >
        <MaterialCommunityIcons name="plus" size={32} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};
