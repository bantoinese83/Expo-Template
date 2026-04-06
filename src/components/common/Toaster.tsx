import React, { useEffect, useRef } from "react";
import { View, Dimensions, Text, Animated, Easing, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { create } from "zustand";

const { width } = Dimensions.get("screen");

interface ToastMessage {
  id: string | number;
  type: "success" | "error";
  message: string;
}

interface ToasterState {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string | number) => void;
  clearToasts: () => void;
}

export const useToasterStore = create<ToasterState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  clearToasts: () => set({ toasts: [] }),
}));

export const useToaster = () => {
  const addToast = useToasterStore((state) => state.addToast);

  const toastAlert = (message: string, isSuccess: boolean = true) => {
    addToast({
      type: isSuccess ? "success" : "error",
      message,
    });
  };

  return { toastAlert };
};

const CustomToaster = () => {
  const toasts = useToasterStore((state) => state.toasts);

  return (
    <View className="absolute -bottom-[100px] w-full px-5 flex-col">
      {toasts.map((message: ToastMessage) => (
        <Toaster key={message.id} toast={message} />
      ))}
    </View>
  );
};

interface ToasterProps {
  toast: ToastMessage;
}

const Toaster = ({ toast }: ToasterProps) => {
  const removeToast = useToasterStore((state) => state.removeToast);
  const animationValue = useRef(new Animated.Value(0)).current;
  const horizontalTranslationAnimationValue = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1.5)),
    }).start();
  };

  const dismiss = () => {
    Animated.timing(horizontalTranslationAnimationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        removeToast(toast.id);
      }
    });
  };

  const xTransaltion = horizontalTranslationAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  const yTransalation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -140],
  });

  const opacityValue = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    animate();
  }, []);

  const isSuccess = toast.type === "success";

  return (
    <Animated.View
      style={{
        opacity: opacityValue,
        transform: [{ translateY: yTransalation }, { translateX: xTransaltion }],
      }}
      className="self-stretch bg-white dark:bg-slate-900 rounded-xl mb-3 shadow-lg pl-3 py-4 pr-4 border border-slate-100 dark:border-slate-800"
    >
      <TouchableOpacity className="absolute right-3 top-2 p-1" onPress={dismiss}>
        <MaterialCommunityIcons name="close" size={18} color="#94a3b8" />
      </TouchableOpacity>

      <View className="flex-row items-start">
        <View
          className={`h-11 w-11 rounded-lg items-center justify-center mr-3 ${
            isSuccess ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-rose-50 dark:bg-rose-900/20"
          }`}
        >
          <MaterialCommunityIcons
            name={isSuccess ? "check-circle" : "alert-circle"}
            size={24}
            color={isSuccess ? "#10b981" : "#f43f5e"}
          />
        </View>
        <View className="flex-1 pr-4">
          <Text className="text-[14px] font-semibold text-slate-900 dark:text-white">
            {isSuccess ? "Success" : "Error"}
          </Text>
          <Text className="text-[13px] font-normal text-slate-500 dark:text-slate-400">
            {toast.message}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default CustomToaster;
