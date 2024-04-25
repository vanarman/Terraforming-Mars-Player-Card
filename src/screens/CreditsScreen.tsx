import { A } from "@expo/html-elements";
import { Button, ButtonText, Heading, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenBackground } from "@styles/global";

const CreditsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ScreenBackground
      source={require("@images/background/loadingBackground.png")}
    >
      <View alignItems="center" justifyContent="center" pt="$32" flexGrow={1}>
        <Heading color="$secondary50">Game Credits:</Heading>
        <Text color="$secondary50">Game design: Jacob Fryxelius</Text>
        <Text color="$secondary50">Graphic design: Isaac Fryxelius</Text>
        <Text color="$secondary50">Assistant design: FryxGames</Text>
        <Text color="$secondary50" fontWeight="$bold" pt="$2">
          All right reserved:
        </Text>
        <Text color="$primary200">
          <A href="www.fryxgames.se/games/terraformingmars">FryxGames</A>
        </Text>
        <Text color="$primary200">
          <A href="www.StrongholdGames.com">Stronghold Games LLC</A>
        </Text>
        <Heading color="$secondary50" pt="$3">
          Image Credits:
        </Heading>
        <Text color="$primary200">
          <A href="https://pixabay.com/users/orlandow-19952631/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6370393">
            Orlando
          </A>{" "}
          from{" "}
          <A href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=6370393">
            Pixabay
          </A>
        </Text>
        <Text color="$primary200">
          <A href="https://pixabay.com/users/alexantropov86-2691829/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3607928">
            Alexander Antropov
          </A>{" "}
          from{" "}
          <A href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3607928">
            Pixabay
          </A>
        </Text>
        <Text color="$primary200">
          <A href="https://pixabay.com/users/tumisu-148124/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5268447">
            Tumisu
          </A>{" "}
          from{" "}
          <A href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5268447">
            Pixabay
          </A>
        </Text>
        <Text color="$primary200">
          <A href="https://pixabay.com/users/-mayaq--6833322/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5539118">
            -MayaQ-
          </A>{" "}
          from{" "}
          <A href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5539118">
            Pixabay
          </A>
        </Text>
        <Heading color="$secondary50" pt="$3">
          Developed By:
        </Heading>
        <Text color="$darkBlue100" fontWeight="$bold">
          <A href="https://github.com/vanarman">Dmytro Sytnik</A>
        </Text>
        <Button
          bgColor="$backgroundDarkError"
          m="$5"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ButtonText>Back</ButtonText>
        </Button>
      </View>
    </ScreenBackground>
  );
};

export default CreditsScreen;
