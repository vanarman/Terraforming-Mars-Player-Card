/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import { Image } from "react-native";

import waterTilePlacement from "./tilePlacement/aquifer.gif";
import temperatureRise from "./tilePlacement/asteroid.gif";
import cityTilePlacement from "./tilePlacement/city.gif";
import greeneryTilePlacement from "./tilePlacement/greenery.gif";

const assets: any = {
  images: {
    cityTile: cityTilePlacement,
    greeneryTile: greeneryTilePlacement,
    waterTile: waterTilePlacement,
    temperatureRise,
  },
};

export async function loadResourcesAndDataAsync() {
  try {
    await SplashScreen.preventAutoHideAsync();
    const imageAssets = cacheImages(Object.values(assets.images));
    await Promise.all([...imageAssets]);
  } catch (e) {
    console.warn(e);
  } finally {
    await SplashScreen.hideAsync();
  }
}

function cacheImages(images: string[]) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default assets;
