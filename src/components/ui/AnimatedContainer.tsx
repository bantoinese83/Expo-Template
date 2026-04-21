import React from "react";
import { ViewProps } from "react-native";
import { View as MotiView } from "moti";

interface AnimatedContainerProps extends ViewProps {
  children: React.ReactNode;
  /**
   * Delay in milliseconds before the animation starts.
   * Useful for staggered ingress.
   */
  delay?: number;
  /**
   * Transition duration.
   */
  duration?: number;
  /**
   * Animation type.
   */
  type?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right";
}

/**
 * A commercial-grade ingress wrapper for screens and components.
 * Provides smooth, staggered animations to enhance perceived performance.
 */
export function AnimatedContainer({
  children,
  delay = 0,
  duration = 500,
  type = "slide-up",
  style,
  ...props
}: AnimatedContainerProps) {
  const animations = {
    fade: {
      from: { opacity: 0 },
      animate: { opacity: 1 },
    },
    "slide-up": {
      from: { opacity: 0, translateY: 20 },
      animate: { opacity: 1, translateY: 0 },
    },
    "slide-down": {
      from: { opacity: 0, translateY: -20 },
      animate: { opacity: 1, translateY: 0 },
    },
    "slide-left": {
      from: { opacity: 0, translateX: 20 },
      animate: { opacity: 1, translateX: 0 },
    },
    "slide-right": {
      from: { opacity: 0, translateX: -20 },
      animate: { opacity: 1, translateX: 0 },
    },
  };

  const selectedAnimation = animations[type];

  return (
    <MotiView
      from={selectedAnimation.from}
      animate={selectedAnimation.animate}
      transition={{
        type: "timing",
        duration,
        delay,
      }}
      style={style}
      {...props}
    >
      {children}
    </MotiView>
  );
}
