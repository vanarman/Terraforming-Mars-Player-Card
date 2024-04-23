import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";
import { loadResourcesAndDataAsync } from "@images/index";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Provider } from "react-redux";

import Navigator from "./components/Navigator";
import { store } from "./redux/store";

import "./lang/i18n";

export default function App() {
  useEffect(() => {
    loadResourcesAndDataAsync().catch((e) => {
      console.error("Async preload error: ", e);
    });
  }, []);

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1}>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </SafeAreaView>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </Provider>
  );
}
