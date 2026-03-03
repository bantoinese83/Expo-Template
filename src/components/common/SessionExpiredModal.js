import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SessionExpiredModal = ({
  visible = false,
  title = "",
  message = "",
  onClose = () => {},
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title || "Session Expired"}</Text>
          <Text style={styles.message}>
            {message ||
              "Your session has expired. Please contact the Support team for assistance."}
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SessionExpiredModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: Math.min(windowWidth - 48, 360),
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#333",
  },
  actions: {
    width: "100%",
    marginTop: 18,
    alignItems: "center",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2E6CEF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
