import React from "react";
import { View } from "react-native";
import YouTube from "react-native-youtube-iframe";

const VideoComponent = ({ source = "9-148GVcbi8" }) => {
  try {
    return (
      <View className="h-[200px] self-stretch">
        <YouTube videoId={source} height={200} play={false} />
      </View>
    );
  } catch (error) {
    console.error("YouTube Rendering Error:", error);
    return null;
  }
};

export default VideoComponent;
