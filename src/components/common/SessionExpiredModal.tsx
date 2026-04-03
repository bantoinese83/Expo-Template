import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface Props {
  visible?: boolean;
  title?: string;
  message?: string;
  onClose?: () => void;
}

const SessionExpiredModal = ({
  visible = false,
  title = "",
  message = "",
  onClose = () => {},
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[90%] max-w-[360px] bg-white dark:bg-slate-900 rounded-xl p-5 items-start">
          <Text className="text-[18px] font-bold text-slate-900 dark:text-white mb-2">
            {title || "Session Expired"}
          </Text>
          <Text className="text-[14px] text-slate-600 dark:text-slate-400">
            {message || "Your session has expired. Please contact the Support team for assistance."}
          </Text>

          <View className="w-full mt-[18px] items-center">
            <TouchableOpacity
              className="w-full bg-indigo-600 py-3 rounded-lg items-center"
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold">Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SessionExpiredModal;
