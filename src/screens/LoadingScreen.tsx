import LoadingSpinner from "@components/LoadingSpinner";
import { View } from "@gluestack-ui/themed";
import { loadResourcesAndDataAsync } from "@images/index";
import { ScreenBackground } from "@styles/global";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [, setLoading] = useState(true);

  useEffect(() => {
    loadResourcesAndDataAsync()
      .catch((e) => {
        console.error("Async preload error: ", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ScreenBackground
      source={require("@images/background/loadingBackground.png")}
    >
      <View alignItems="center" justifyContent="flex-end" pb="$8" flexGrow={1}>
        <LoadingSpinner />
      </View>
    </ScreenBackground>
  );
};

export default LoadingScreen;
