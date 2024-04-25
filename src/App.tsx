import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { loadResourcesAndDataAsync } from "@images/index";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import Navigator from "./components/Navigator";
import { store } from "./redux/store";

import "./lang/i18n";

export default function App() {
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

  if (loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </SafeAreaProvider>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </Provider>
  );
}
