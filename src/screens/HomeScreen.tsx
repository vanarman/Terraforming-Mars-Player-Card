import { Button, ButtonGroup, ButtonText, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenBackground } from "@styles/global";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ScreenBackground source={require("@images/background/homeScreen.png")}>
      <View flex={1} alignItems="center" justifyContent="center">
        <ButtonGroup flexDirection="column">
          <Button
            onPress={() => {
              navigation.navigate("PlayCardScreen");
            }}
          >
            <ButtonText>Start Game</ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate("CreditsScreen")}>
            <ButtonText>Credits</ButtonText>
          </Button>
        </ButtonGroup>
      </View>
    </ScreenBackground>
  );
};

export default HomeScreen;
