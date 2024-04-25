import { useState, useEffect } from "react";
import { Animated, Easing, Image } from "react-native";

const LoadingSpinner = () => {
  const [rotateAnim] = useState(new Animated.Value(0)); // Initial value for rotate: 0

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: rotateInterpolate,
      },
    ],
  };

  return (
    <Animated.View
      style={{
        ...animatedStyle,
      }}
    >
      <Image source={require("@images/background/activityIndicator.png")} />
    </Animated.View>
  );
};

export default LoadingSpinner;
