import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import Navigator from './components/Navigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './lang/i18n';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Load any resources or data that you need before rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages([
          require('./assets/tilePlacement/cityTilePlacement.gif'),
          require('./assets/tilePlacement/greeneryTilePlacement.gif'),
          require('./assets/tilePlacement/temperatureRise.gif'),
          require('./assets/tilePlacement/waterTilePlacement.gif'),
        ]);

        await Promise.all([...imageAssets]);
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <SafeAreaView flex={1}>
          <NavigationContainer>
            <Navigator/>
          </NavigationContainer>
        </SafeAreaView>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </Provider>
  );
}

function cacheImages(images: string[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}