import React from "react";
import { Modal, View, TouchableOpacity, Dimensions } from "react-native";
import { MotiView, AnimatePresence } from "moti";
import { X } from "lucide-react-native";
import { AppText } from "./AppText";

interface AppModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const AppModal: React.FC<AppModalProps> = ({
  isVisible,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  return (
    <Modal transparent visible={isVisible} animationType="none" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <AnimatePresence>
          {isVisible && (
            <>
              {/* Backdrop */}
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ type: "timing", duration: 300 }}
                className="absolute inset-0 bg-black"
                onTouchStart={onClose}
              />

              {/* Modal Content */}
              <MotiView
                from={{ translateY: SCREEN_HEIGHT }}
                animate={{ translateY: 0 }}
                exit={{ translateY: SCREEN_HEIGHT }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="bg-white dark:bg-slate-900 rounded-t-3xl px-6 pt-4 pb-12 w-full"
              >
                {/* Handle for drag indicator style */}
                <View className="items-center mb-4">
                  <View className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </View>

                {/* Header */}
                {(title || showCloseButton) && (
                  <View className="flex-row items-center justify-between mb-6">
                    {title ? (
                      <AppText variant="h2" className="flex-1">
                        {title}
                      </AppText>
                    ) : (
                      <View className="flex-1" />
                    )}

                    {showCloseButton && (
                      <TouchableOpacity
                        onPress={onClose}
                        className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"
                      >
                        <X size={20} color="#94a3b8" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {children}
              </MotiView>
            </>
          )}
        </AnimatePresence>
      </View>
    </Modal>
  );
};
