import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Navigator from './components/Navigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './lang/i18n';

export default function App() {
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
