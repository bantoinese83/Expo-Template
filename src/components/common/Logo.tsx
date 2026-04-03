import React from "react";
import Svg, { Circle, Rect, Path, G, SvgProps } from "react-native-svg";

interface LogoProps extends SvgProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 128, className, ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 128 128" className={className} {...props}>
      <G id="Filled_outline">
        <G id="Color">
          <Circle cx="64" cy="64" fill="#455a64" r="57.5" />
          <Rect fill="#80deea" height="125" rx="12" width="75" x="26.5" y="1.5" />
          <Path
            d="m44.2 1.5 3.589 6.688a7.812 7.812 0 0 0 6.811 4.312h18.8a7.813 7.813 0 0 0 6.811-4.312l3.589-6.688z"
            fill="#4dd0e1"
          />
          <G fill="#fff">
            <Rect height="21" rx="3" width="59" x="34.5" y="22.5" />
            <Rect height="21" rx="3" width="59" x="34.5" y="78.5" />
            <Rect height="21" rx="3" width="26" x="34.5" y="50.5" />
            <Rect height="21" rx="3" width="26" x="67.5" y="50.5" />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default Logo;
