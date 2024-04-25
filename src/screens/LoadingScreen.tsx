import LoadingSpinner from "@components/LoadingSpinner";
import { ImageBackground, View } from "@gluestack-ui/themed";
import { loadResourcesAndDataAsync } from "@images/index";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

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
    <ImageBackground
      source={require("@images/background/loadingBackground.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View alignItems="center" justifyContent="flex-end" pb="$8" flexGrow={1}>
        <LoadingSpinner />
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;
