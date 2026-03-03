import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const UserProfile = ({ userName, userImage, greeting = "Hi 👋" }) => {
  const [imageError, setImageError] = useState(false);
  console.log("userImage", userImage);
  const [image, setImage] = useState(null);
  // Get initials from user name for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleImageError = () => {
    setImageError(true);
  };
  useEffect(() => {
    setImage(`https://etailerbackend.etailer.site/${userImage}`);
  }, [userImage]);

  const renderAvatar = () => {
    if (!userImage || imageError) {
      return (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{getInitials(userName)}</Text>
        </View>
      );
    }

    return (
      <Image
        source={{
          uri: image,
        }}
        style={styles.userImage}
        onError={handleImageError}
      />
    );
  };

  return (
    <View style={styles.userInfo}>
      {renderAvatar()}
      <View style={styles.userText}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6A0DAD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userText: {
    flexDirection: "column",
  },
  greeting: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default UserProfile;
