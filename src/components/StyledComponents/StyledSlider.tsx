import { StyledComponentProps } from "@gluestack-style/react/lib/typescript/types";
import { InterfaceSliderProps } from "@gluestack-ui/slider/lib/typescript/types";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@gluestack-ui/themed";
import { JSX, RefAttributes } from "react";
import { StyleProp, ViewStyle, ViewProps } from "react-native";

const StyledSlider = (
  props: JSX.IntrinsicAttributes &
    StyledComponentProps<StyleProp<ViewStyle>, unknown, ViewProps, "Slider"> &
    RefAttributes<ViewProps> &
    InterfaceSliderProps,
) => {
  return (
    <Slider {...props}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default StyledSlider;
