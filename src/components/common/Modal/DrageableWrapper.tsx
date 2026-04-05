import React from "react";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

interface Props {
  children: React.ReactNode;
  onThresholdReached: () => void;
}

const DrageableWrapper = ({ children, onThresholdReached }: Props) => {
  const y = useSharedValue(0);
  const contextY = useSharedValue(0);

  const triggerThreshold = () => {
    onThresholdReached();
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = y.value;
    })
    .onUpdate((event) => {
      y.value = event.translationY + contextY.value;
      if (y.value > 200) {
        runOnJS(triggerThreshold)();
      }
    })
    .onEnd(() => {
      if (y.value > 200) {
        y.value = withSpring(400);
      } else {
        y.value = withSpring(0);
      }
    });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: Math.max(0, y.value), // Prevent dragging upwards
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[panStyle]}>{children}</Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default DrageableWrapper;
