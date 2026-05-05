import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidlineBaseWidth = 375;
const guildlineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidlineBaseWidth) * size;
const verticalScale = (size: number) => (height / guildlineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
