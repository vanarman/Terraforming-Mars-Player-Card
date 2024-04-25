import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  PlayCardScreen,
  HomeScreen,
  LoadingScreen,
  CreditsScreen,
} from "@screens/index";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreditsScreen" component={CreditsScreen} />
      <Stack.Screen name="PlayCardScreen" component={PlayCardScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
