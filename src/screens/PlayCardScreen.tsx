import Icon from "@components/Icon";
import ModalWrapper from "@components/ModalWrapper";
import ResourceCard from "@components/ResourceCard";
import ModalPresentationWrapper from "@components/modals/ModalPresentationWrapper";
import {
  Box,
  ButtonText,
  Button,
  ButtonGroup,
  HStack,
  Text,
  VStack,
  Pressable,
} from "@gluestack-ui/themed";
import { ResourceType } from "@models/ResourceType";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenBackground } from "@styles/global";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { show } from "src/redux/modalSlice";
import { adjustRank } from "src/redux/rankSlice";
import { production } from "src/redux/resourceSlice";
import { RootState } from "src/redux/store";
const PlayCardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [rankAdjustmentVisibility, setRankAdjustmentVisibility] =
    useState(false);
  const rank = useSelector((state: RootState) => state.rank);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground
      source={require("@images/background/playerCard.jpg")}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: "center" }}
      pt={insets.top}
    >
      <VStack width="$full" flexGrow={1}>
        <Pressable
          alignItems="center"
          justifyContent="center"
          h="$10"
          onPress={() => {
            setRankAdjustmentVisibility(true);
          }}
        >
          <Text
            fontSize="$4xl"
            alignSelf="center"
            textAlign="center"
            fontWeight="$extrabold"
            flexShrink={1}
            color="$secondary100"
          >
            {t("screen.playCard.rank", { rank })}
          </Text>
        </Pressable>
        <HStack flexGrow={1}>
          <ResourceCard
            iconName="BadgeEuro"
            type={ResourceType.CREDIT}
            bgColor="rgba(254, 219, 49, 1)"
            iconColor="rgb(243, 163, 39)"
          />
          <ResourceCard
            iconName="Pickaxe"
            type={ResourceType.STEEL}
            bgColor="rgba(174, 128, 87, 1)"
            iconColor="rgb(61, 37, 21)"
          />
        </HStack>
        <HStack flexGrow={1}>
          <ResourceCard
            iconName="Star"
            type={ResourceType.TITANIUM}
            bgColor="rgba(111, 111, 111, 1)"
            iconColor="rgb(252, 239, 80)"
          />
          <ResourceCard
            iconName="Leaf"
            type={ResourceType.PLANTS}
            bgColor="rgba(146, 191, 81, 1)"
            iconColor="rgb(61, 128, 75)"
          />
        </HStack>
        <HStack flexGrow={1}>
          <ResourceCard
            iconName="Zap"
            type={ResourceType.ENERGY}
            bgColor="rgba(155, 55, 138, 1)"
            iconColor="rgb(255, 255, 255)"
          />
          <ResourceCard
            iconName="Flame"
            type={ResourceType.HEAT}
            bgColor="rgba(231, 97, 59, 1)"
            iconColor="rgb(254, 234, 67)"
          />
        </HStack>
        <HStack width="$full" h="$10" justifyContent="space-around" my="$5">
          <Button
            bgColor="$backgroundDarkError"
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <Icon name="Earth" strokeWidth={1.5} />
          </Button>
          <Button
            bgColor="$backgroundDarkError"
            onPress={() => {
              dispatch(show({ modalType: "researchModalStateVisibility" }));
            }}
          >
            <ButtonText>{t("screen.playCard.researchButton")}</ButtonText>
          </Button>
          <Button
            bgColor="$backgroundDarkError"
            onPress={() => {
              dispatch(show({ modalType: "actionModalVisibility" }));
            }}
          >
            <ButtonText>{t("screen.playCard.actionButton")}</ButtonText>
          </Button>
          <Button
            bgColor="$backgroundDarkError"
            onPress={() => {
              dispatch(production({ rank }));
            }}
          >
            <ButtonText>{t("screen.playCard.productionButton")}</ButtonText>
          </Button>
        </HStack>
      </VStack>
      <ModalPresentationWrapper />
      <ModalWrapper
        title={t("screen.playCard.terraformRankModal.title")}
        isOpen={rankAdjustmentVisibility}
        onClose={() => setRankAdjustmentVisibility(false)}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          my="$1.5"
        >
          <Text fontSize="$2xl">
            {t("screen.playCard.terraformRankModal.current", {
              amount: rank,
            })}
          </Text>
          <ButtonGroup>
            <Button
              isDisabled={rank <= 0}
              size="lg"
              onPress={() => dispatch(adjustRank({ value: -1 }))}
            >
              <Icon name="Minus" size={16} strokeWidth={3} />
            </Button>
            <Button
              size="lg"
              onPress={() => {
                dispatch(adjustRank({ value: 1 }));
              }}
            >
              <Icon name="Plus" size={16} strokeWidth={3} />
            </Button>
          </ButtonGroup>
        </Box>
      </ModalWrapper>
    </ScreenBackground>
  );
};

export default PlayCardScreen;
