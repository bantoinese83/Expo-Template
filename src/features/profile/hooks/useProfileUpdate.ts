import { useState } from "react";
import { Alert } from "react-native";
import { UserProfileFormValues } from "@/schemas/userSchema";
import { logger } from "@/utils/logger";

export function useProfileUpdate() {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateProfile = async (data: UserProfileFormValues): Promise<void> => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      logger.info("Profile updated", data);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      logger.error("Failed to update profile", error);
      Alert.alert("Error", "Could not update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateProfile, isUpdating };
}
