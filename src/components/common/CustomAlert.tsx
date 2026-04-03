import React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomAlertProps {
  title: string;
  text: string;
  onClose: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
}

const { width, height } = Dimensions.get("window");

const CustomAlert: React.FC<CustomAlertProps> = ({ title, text, onClose, onDelete }) => {
  return (
    <View
      className="absolute inset-0 flex-1 p-5 justify-center items-center bg-black/50 z-[999]"
      style={{ width, height }}
    >
      <View className="bg-white dark:bg-slate-900 p-5 rounded-[15px] justify-center items-start w-full max-w-[340px]">
        <TouchableOpacity onPress={onClose} className="absolute top-2 right-2 p-1">
          <Ionicons name="close" size={20} color="#94a3b8" />
        </TouchableOpacity>

        <Text className="font-bold text-slate-900 dark:text-white mb-2 text-lg">{title}</Text>
        <Text className="text-slate-600 dark:text-slate-400 mb-6">{text}</Text>

        <View className="flex-row justify-end w-full gap-3">
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 py-3 px-2 rounded-lg items-center justify-center bg-slate-100 dark:bg-slate-800"
          >
            <Text className="text-slate-700 dark:text-slate-300 font-bold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            className="flex-1 py-3 px-2 rounded-lg items-center justify-center bg-rose-500"
          >
            <Text className="text-white font-bold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomAlert;
