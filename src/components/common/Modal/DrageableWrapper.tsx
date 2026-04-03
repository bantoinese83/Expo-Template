import React from "react";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
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

  const workletFunction = (args: number) => {
    if (args > 200) {
      onThresholdReached();
    }
  };

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_: any, context: any) => {
      context.y = y.value;
    },
    onActive: (event: any, context: any) => {
      runOnJS(workletFunction)(y.value);
      if (y.value > -5) {
        y.value = event.translationY + context.y;
      }
    },
    onEnd: () => {
      if (y.value > 200) {
        y.value = withSpring(400);
      } else {
        y.value = withSpring(0);
      }
    },
  });

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  }, [y]);

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[panStyle]}>{children}</Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default DrageableWrapper;
