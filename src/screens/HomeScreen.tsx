import {
  Button,
  ButtonGroup,
  ButtonText,
  View,
  ImageBackground,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ImageBackground
      source={require("@images/background/homeScreen.png")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View flex={1} alignItems="center" justifyContent="center">
        <ButtonGroup flexDirection="column">
          <Button
            bgColor="$backgroundDarkError"
            onPress={() => {
              navigation.navigate("PlayCardScreen");
            }}
          >
            <ButtonText>Start Game</ButtonText>
          </Button>
          <Button
            bgColor="$backgroundDarkError"
            onPress={() => navigation.navigate("CreditsScreen")}
          >
            <ButtonText>Credits</ButtonText>
          </Button>
        </ButtonGroup>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
