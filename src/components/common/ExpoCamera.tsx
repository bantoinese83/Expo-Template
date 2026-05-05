import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, interpolate } from "react-native-reanimated";
import { verticalScale } from "@/utils/responsive/metrices";

const { width } = Dimensions.get("screen");

interface ExpoCameraProps {
  visibility: boolean;
  onCLose: () => void;
  callBack: (capturePicture: string) => void;
}

const ExpoCamera: React.FC<ExpoCameraProps> = ({ visibility, onCLose, callBack }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();

  const [camera, setCamera] = useState<any>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [enableTorch, setEnableTorch] = useState(false);
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [capturePicture, setCapturePicture] = useState("");

  const r = useSharedValue(63);

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: r.value,
      height: r.value,
    };
  }, [r]);

  const innerCircleAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(r.value, [63, 100], [0, 1]);
    return {
      opacity: scale,
    };
  }, [r]);

  const flipCam = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setEnableTorch((prev) => !prev);
  };

  useEffect(() => {
    if (visibility) {
      requestCameraPermission();
      requestMicrophonePermission();
    }
  }, [visibility]);

  const takePicture = async () => {
    if (!camera) return;
    try {
      const data = await camera.takePictureAsync({
        quality: 0.2,
        base64: true,
      });
      setCapturePicture(data?.uri ?? "");
      setTimeout(() => {
        setIsPictureTaken(true);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  if (!cameraPermission || !microphonePermission) {
    return <View />;
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-slate-950 p-6">
        <Text className="text-center text-slate-900 dark:text-white mb-4">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          className="bg-indigo-600 px-6 py-3 rounded-xl"
          onPress={() => {
            requestCameraPermission();
            requestMicrophonePermission();
          }}
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    visibility && (
      <View className="absolute inset-0 bg-white dark:bg-slate-950 z-[9]">
        <View className="flex-1">
          {!isPictureTaken ? (
            <View className="flex-1 relative">
              <CameraView
                ref={(ref: any) => setCamera(ref)}
                className="flex-1"
                facing={facing}
                enableTorch={enableTorch}
                onCameraReady={() => setIsCameraReady(true)}
              />

              <TouchableOpacity
                className="absolute bottom-20 align-self-center"
                style={{ left: width / 2 - 31.5 }}
                activeOpacity={0.8}
                onPress={() => {
                  if (isCameraReady) takePicture();
                }}
              >
                <Animated.View
                  className="border-2 border-white rounded-full items-center justify-center relative"
                  style={[circleAnimatedStyle]}
                >
                  <Animated.View
                    className="bg-rose-500 rounded-full w-[90%] h-[90%]"
                    style={[innerCircleAnimatedStyle]}
                  />
                </Animated.View>
              </TouchableOpacity>

              <View
                className={`w-full absolute flex-row items-start justify-between px-5 mt-[${verticalScale(60)}px]`}
              >
                <TouchableOpacity
                  className="h-11 w-11 bg-black/60 rounded-full items-center justify-center"
                  onPress={onCLose}
                >
                  <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>

                <View className="bg-black/60 rounded-full items-center py-2 px-1">
                  <TouchableOpacity className="p-3" onPress={flipCam}>
                    <MaterialIcons name="flip-camera-android" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-3" onPress={toggleFlash}>
                    <Ionicons
                      name={enableTorch ? "flash-off-outline" : "flash-outline"}
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View className="flex-1 relative">
              <Image
                className="w-full h-full"
                source={{ uri: capturePicture }}
                contentFit="contain"
              />
              <View
                className={`w-full absolute flex-row items-start justify-between px-5 mt-[${verticalScale(60)}px]`}
              >
                <TouchableOpacity
                  className="h-11 w-11 bg-black/60 rounded-full items-center justify-center"
                  onPress={() => {
                    setIsPictureTaken(false);
                  }}
                >
                  <AntDesign name="close" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  className="h-11 w-11 bg-black/60 rounded-full items-center justify-center"
                  onPress={() => {
                    callBack(capturePicture);
                    setIsPictureTaken(false);
                    onCLose();
                  }}
                >
                  <AntDesign name="check" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    )
  );
};

export default ExpoCamera;
