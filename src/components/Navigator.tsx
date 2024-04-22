import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PlayCardScreen, HomeScreen } from "@screens/index";

const Stack = createNativeStackNavigator();

const Navigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="PlayCardScreen"
			screenOptions={{ headerShown: false }}
		>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
			<Stack.Screen name="PlayCardScreen" component={PlayCardScreen} />
		</Stack.Navigator>
	);
}

export default Navigator;