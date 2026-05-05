import React, { useState, useRef } from "react";
import { View, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useRouter } from "expo-router";
import { AppText, AppButton, ScreenWrapper } from "@/components/ui";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  SharedValue,
} from "react-native-reanimated";
import { ShieldCheck, Zap, Rocket } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const STEPS: OnboardingStep[] = [
  {
    id: "1",
    title: "The Ultimate Foundation",
    description:
      "Start your next project with a battle-hardened template built for 2026 standards.",
    icon: <Rocket size={80} color="#6366f1" />,
    color: "#6366f1",
  },
  {
    id: "2",
    title: "Type Safety First",
    description:
      "100% strict TypeScript coverage ensures your application remains robust as it scales.",
    icon: <ShieldCheck size={80} color="#10b981" />,
    color: "#10b981",
  },
  {
    id: "3",
    title: "Blazing Performance",
    description: "Built with Reanimated 4 and NativeWind for a smooth, high-fidelity experience.",
    icon: <Zap size={80} color="#f59e0b" />,
    color: "#f59e0b",
  },
];

const PaginationDot = ({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) => {
  const dotStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [0.3, 1, 0.3],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
      [1, 1.4, 1],
      Extrapolate.CLAMP
    );
    return { opacity, transform: [{ scale }] };
  });

  return (
    <Animated.View
      className="w-2.5 h-2.5 rounded-full mx-1.5 bg-slate-900 dark:bg-white"
      style={dotStyle}
    />
  );
};

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveAtIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveAtIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < STEPS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      router.replace("/login");
    }
  };

  return (
    <ScreenWrapper className="bg-white dark:bg-slate-950" padding={false}>
      <FlatList
        ref={flatListRef}
        data={STEPS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH }} className="items-center justify-center p-lg">
            <View
              className="w-64 h-64 rounded-full items-center justify-center mb-12"
              style={{ backgroundColor: `${item.color}15` }}
            >
              {item.icon}
            </View>
            <AppText variant="h1" className="text-center text-[34px] leading-tight tracking-tight">
              {item.title}
            </AppText>
            <AppText
              variant="body"
              className="text-center text-slate-500 dark:text-slate-400 mt-5 text-[17px] leading-relaxed px-4"
            >
              {item.description}
            </AppText>
          </View>
        )}
      />

      <View className="p-lg pb-xl items-center">
        <View className="flex-row mb-10">
          {STEPS.map((_, index) => (
            <PaginationDot key={index} index={index} scrollX={scrollX} />
          ))}
        </View>

        <AppButton
          title={activeIndex === STEPS.length - 1 ? "Get Started" : "Continue"}
          onPress={handleNext}
          className="w-full h-[58px]"
        />

        <AppButton
          title="Skip"
          variant="ghost"
          className="mt-4"
          onPress={() => router.replace("/login")}
        />
      </View>
    </ScreenWrapper>
  );
}
