import * as LocalAuthentication from "expo-local-authentication";

export async function authenticateWithBiometrics(
  promptMessage = "Authenticate to continue"
): Promise<{ success: boolean; error?: string }> {
  try {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return { success: false, error: "Biometrics not enrolled on this device" };
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return { success: false, error: "Biometric hardware not available" };
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      fallbackLabel: "Use passcode",
    });

    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error: any) {
    return { success: false, error: error.message || "An unknown error occurred" };
  }
}
